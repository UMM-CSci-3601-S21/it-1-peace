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
});
