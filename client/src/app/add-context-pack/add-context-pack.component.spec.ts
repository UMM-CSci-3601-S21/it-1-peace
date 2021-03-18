import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContextPackComponent } from './add-context-pack.component';

describe('AddContextPackComponent', () => {
  let component: AddContextPackComponent;
  let fixture: ComponentFixture<AddContextPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContextPackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContextPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
