import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  inclusion: FormArray;
  exclusion: FormArray;

  constructor(protected formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      inclusion: new FormArray([]),
      exclusion: new FormArray([])
    });

    // Inclusion rules
    this.addEntry('inclusion', 0);

    this.manageVisibility('inclusion', 0);

    // Exclusion rules

    this.addEntry('exclusion', 0);

    this.manageVisibility('exclusion', 0);
  }

  createEntry(section): FormGroup {
    return this.formBuilder.group({
      page: ['all', [Validators.required]],
      contains: [{value: 'contains', disabled: true}, [Validators.required]],
      url: [{value: '', disabled: true}, [Validators.required]],
    });
  }

  isErrorVisible(section, error, id): boolean {
    return this.formGroup.get(section)['controls'][id].get('url').dirty
      && this.formGroup.get(section)['controls'][id].get('url').errors
      && this.formGroup.get(section)['controls'][id].get('url').errors[error];

  }

  isFirstEntry(id): boolean {
    return id === 0;
  }

  addEntry(section, id): void {
    this[section] = this.formGroup.get(section) as FormArray;
    this[section].insert(id, this.createEntry(section));
  }

  deleteEntry(section, id): void {
    this[section].removeAt(id);
  }

  manageVisibility(section, id): void {
    if (this.formGroup.get(section)['controls'][id].get('page').value === 'custom') {
      this.formGroup.get(section)['controls'][id].get('contains').enable();

      this.formGroup.get(section)['controls'][id].get('url').enable();
    } else {
      this.formGroup.get(section)['controls'][id].get('contains').disable();

      this.formGroup.get(section)['controls'][id].get('url').disable();
    }
  }

  submitData(formValue): void {
    console.log('Data submitted', formValue);
  }
}
