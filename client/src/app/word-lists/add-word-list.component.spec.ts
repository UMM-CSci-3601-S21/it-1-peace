import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockWordListService } from 'src/testing/word-list.service.mock';
import { AddWordListComponent } from './add-word-list.component';
import { WordListService } from './word-list.service';

describe('AddWordListComponent', () => {
  let addWordListComponent: AddWordListComponent;
  let addWordListForm: FormGroup;
  let fixture: ComponentFixture<AddWordListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ AddWordListComponent ],
      providers: [{ provide: WordListService, useValue: new MockWordListService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWordListComponent);
    addWordListComponent = fixture.componentInstance;
    addWordListComponent.ngOnInit();
    fixture.detectChanges();
    addWordListForm = addWordListComponent.addWordListForm;
    expect(addWordListForm).toBeDefined();
    expect(addWordListForm.controls).toBeDefined();
  });

  it('should create the component and form', () => {
    expect(addWordListComponent).toBeTruthy();
    expect(addWordListForm).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(addWordListForm.valid).toBeFalsy();
  });

  describe('The name field', () => {
    let nameControl: AbstractControl;

    beforeEach(() => {
      nameControl = addWordListComponent.addWordListForm.controls.name;
    });

    it('should not allow empty names', () => {
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
    });

    it('should be fine with "Chris Smith"', () => {
      nameControl.setValue('Chris Smith');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should fail on single character names', () => {
      nameControl.setValue('x');
      expect(nameControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.minLength(2)`.
      expect(nameControl.hasError('minlength')).toBeTruthy();
    });

    // In the real world, you'd want to be pretty careful about
    // setting upper limits on things like name lengths just
    // because there are people with really long names.
    it('should fail on really long names', () => {
      nameControl.setValue('x'.repeat(100));
      expect(nameControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.maxLength(2)`.
      expect(nameControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the name', () => {
      nameControl.setValue('Bad2Th3B0ne');
      expect(nameControl.valid).toBeTruthy();
    });

    it('should fail if we provide an "existing" name', () => {
      // We're assuming that "abc123" and "123abc" already
      // exist so we disallow them.
      nameControl.setValue('abc123');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('existingName')).toBeTruthy();

      nameControl.setValue('123abc');
      expect(nameControl.valid).toBeFalsy();
      expect(nameControl.hasError('existingName')).toBeTruthy();
    });
  });

  describe('The enabled field', () => {
    let enabledControl: AbstractControl;

    beforeEach(() => {
      enabledControl = addWordListComponent.addWordListForm.controls.enabled;
    });

    it('should not allow empty enabled', () => {
      enabledControl.setValue('');
      expect(enabledControl.valid).toBeFalsy();
    });

    it('should be fine with "true"', () => {
      enabledControl.setValue('true');
      expect(enabledControl.valid).toBeTruthy();
    });

    it('should fail on non boolean enableds', () => {
      enabledControl.setValue('hi');
      expect(enabledControl.valid).toBeFalsy();
      //expect(enabledControl.hasError('Incorrect form')).toBeTruthy();
    });
  });
});
