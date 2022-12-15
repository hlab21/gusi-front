import { Component, Input, OnInit } from '@angular/core';
import {
  DynamicFormControlModel,
  DynamicFormValueControlModel,
  DynamicInputModel,
  DynamicSelectModel
} from '@ng-dynamic-forms/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { EPerson } from '../../core/eperson/models/eperson.model';
import { TranslateService } from '@ngx-translate/core';
import { hasValue, isNotEmpty } from '../../shared/empty.util';
import { LangConfig } from '../../../config/lang-config.interface';
import { EPersonDataService } from '../../core/eperson/eperson-data.service';
import { cloneDeep } from 'lodash';
import { getRemoteDataPayload, getFirstSucceededRemoteData } from '../../core/shared/operators';
import { FormBuilderService } from '../../shared/form/builder/form-builder.service';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { environment } from '../../../environments/environment';
import { number, string } from 'prop-types';

@Component({
  selector: 'ds-profile-page-metadata-form',
  templateUrl: './profile-page-metadata-form.component.html'
})
/**
 * Component for a user to edit their metadata
 * Displays a form containing:
 * - readonly email field,
 * - required first name text field
 * - required last name text field
 * - phone text field
 * - language dropdown
 */
export class ProfilePageMetadataFormComponent implements OnInit {
  /**
   * The user to display the form for
   */
  form: FormGroup;
  @Input() user: EPerson;

  /**
   * The form's input models
   */
  formModel: DynamicFormControlModel[] = [
    new DynamicInputModel({
      id: 'email',
      name: 'email',
      readOnly: true
    }),
    new DynamicInputModel({
      id: 'firstname',
      name: 'eperson.firstname',
      required: true,
      validators: {
        required: null,
        // pattern:`/^[a-z ,.'-]+$/i`,
      },
      errorMessages: {
        required: 'This field is required',
      },
    }),
    new DynamicInputModel({
      id: 'lastname',
      name: 'eperson.lastname',
      required: true,
      // pattern:`/^[a-z ,.'-]+$/i`,
      validators: {
        required: null,
        // pattern:`/^[a-z ,.'-]+$/i`,
      },
      errorMessages: {
        required: 'This field is required'
      },
    }),
    new DynamicInputModel({
      id: 'phone',
      name: 'eperson.phone',
    }),
    new DynamicSelectModel<string>({
      id: 'language',
      name: 'eperson.language'
    })
  ];

  /**
   * The form group of this form
   */
  formGroup: FormGroup;

  /**
   * Prefix for the form's label messages of this component
   */
  LABEL_PREFIX = 'profile.metadata.form.label.';

  /**
   * Prefix for the form's error messages of this component
   */
  ERROR_PREFIX = 'profile.metadata.form.error.';

  /**
   * Prefix for the notification messages of this component
   */
  NOTIFICATION_PREFIX = 'profile.metadata.form.notifications.';

  /**
   * All of the configured active languages
   * Used to populate the language dropdown
   */
  activeLangs: LangConfig[];

  constructor(protected formBuilderService: FormBuilderService,
              protected translate: TranslateService,
              private formBuilder: FormBuilder,
              protected epersonService: EPersonDataService,
              protected notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    // this.formModel.forEach({})
    this.form = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required,
          // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
          Validators.pattern('^[a-z0-9._%+-]+@ue.edu.ph$')
        ],
      })
    });
    this.activeLangs = environment.languages.filter((MyLangConfig) => MyLangConfig.active === true);
    this.setFormValues();
    this.updateFieldTranslations();
    this.translate.onLangChange
      .subscribe(() => {
        this.updateFieldTranslations();
      });
  }

  /**
   * Loop over all the form's input models and set their values depending on the user's metadata
   * Create the FormGroup
   */
  setFormValues() {
    this.formModel.forEach(
      (fieldModel: any) => {
        if (fieldModel.name === 'email') {
          fieldModel.value = this.user.email;
        } else {
          fieldModel.value = this.user.firstMetadataValue(fieldModel.name);
        }
        if (fieldModel.id === 'language') {
          (fieldModel as DynamicSelectModel<string>).options =
            this.activeLangs.map((langConfig) => Object.assign({ value: langConfig.code, label: langConfig.label }));
        }
      }
    );
    this.formGroup = this.formBuilderService.createFormGroup(this.formModel);
  }

  /**
   * Update the translations of the field labels and error messages
   */
  updateFieldTranslations() {
    const reName = /^[a-z ,.'-]+$/i;
    const rePhone = /^(09|\+639)\d{9}$/;
    this.formModel.forEach(
      (fieldModel: DynamicInputModel) => {
        fieldModel.label = this.translate.instant(this.LABEL_PREFIX + fieldModel.id);
        if (isNotEmpty(fieldModel.validators)) {
          fieldModel.errorMessages = {};
          Object.keys(fieldModel.validators).forEach((key) => {
            console.log(key)
            fieldModel.errorMessages[key] = this.translate.instant(this.ERROR_PREFIX + fieldModel.id + '.' + key);
          });
        }
        if (isNotEmpty(fieldModel.pattern)) {
          fieldModel.errorMessages = {};
          Object.keys(fieldModel.validators).forEach((key) => {
            console.log(key)
            fieldModel.errorMessages[key] = this.translate.instant(this.ERROR_PREFIX + fieldModel.id + '.invalidinput');
          });
        }
        // if(fieldModel.name === "eperson.firstname" || fieldModel.name === "eperson.lastname"){
        //   fieldModel.errorMessages = {};
        //   Object.keys(fieldModel.validators).forEach((key) => {
        //     fieldModel.errorMessages[key] = this.translate.instant(this.ERROR_PREFIX + fieldModel.id + '.invalidinput' );
        //   });
        // }
        // else if(fieldModel.name === "eperson.phone"){

        // }
        
      }
    );
  }

  /**
   * Update the user's metadata
   *
   * Sends a patch request for updating the user's metadata when at least one value changed or got added/removed and the
   * form is valid.
   * Nothing happens when the form is invalid or no metadata changed.
   *
   * Returns false when nothing happened.
   */
  updateProfile(): boolean {
    if (!this.formGroup.valid) {
      return false;
    }
    const newMetadata = cloneDeep(this.user.metadata);
    let changed = false;
    const reName = /^[a-z ,.'-]+$/i;
    const rePhone = /^(09|\+639)\d{9}$/;
    this.formModel.filter((fieldModel) => fieldModel.id !== 'email').forEach((fieldModel: DynamicFormValueControlModel<string>) => {
      if (newMetadata.hasOwnProperty(fieldModel.name) && newMetadata[fieldModel.name].length > 0) {
        if (hasValue(fieldModel.value)) {
          if (newMetadata[fieldModel.name][0].value !== fieldModel.value) {
            if(fieldModel.name === "eperson.firstname" || fieldModel.name === "eperson.lastname"){
              if(reName.test(fieldModel.value)){
                newMetadata[fieldModel.name][0].value = fieldModel.value;
                changed = true;
              }
              else{
                fieldModel.label = this.translate.instant(this.LABEL_PREFIX + fieldModel.id);
                if (isNotEmpty(fieldModel.validators)) {
                  fieldModel.errorMessages = {};
                  Object.keys(fieldModel.validators).forEach((key) => {
                    fieldModel.errorMessages[key] = this.translate.instant(this.ERROR_PREFIX + fieldModel.id + '.' + key);
                  });
                }
              }
            }
            else if(fieldModel.name === "eperson.phone"){
              if(rePhone.test(fieldModel.value)){
                newMetadata[fieldModel.name][0].value = fieldModel.value;
                changed = true;
              }
              else{
                fieldModel.label = this.translate.instant(this.LABEL_PREFIX + fieldModel.id);
                if (isNotEmpty(fieldModel.validators)) {
                  fieldModel.errorMessages = {};
                  Object.keys(fieldModel.validators).forEach((key) => {
                    fieldModel.errorMessages[key] = this.translate.instant(this.ERROR_PREFIX + fieldModel.id + '.' + key);
                  });
                }
              }
            }
          }
        } else {
          newMetadata[fieldModel.name] = [];
          changed = true;
        }
      } else if (hasValue(fieldModel.value)) {
        newMetadata[fieldModel.name] = [{
          value: fieldModel.value,
          language: null
        } as any];
        changed = true;
      }
    });

    if (changed) {
      this.epersonService.update(Object.assign(cloneDeep(this.user), {metadata: newMetadata})).pipe(
        getFirstSucceededRemoteData(),
        getRemoteDataPayload()
      ).subscribe((user) => {
        this.user = user;
        this.setFormValues();
        this.notificationsService.success(
          this.translate.instant(this.NOTIFICATION_PREFIX + 'success.title'),
          this.translate.instant(this.NOTIFICATION_PREFIX + 'success.content')
        );
      });
    }

    return changed;
  }
}
