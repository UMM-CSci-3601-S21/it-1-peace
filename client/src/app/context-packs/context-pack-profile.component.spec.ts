import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextPackProfileComponent } from './context-pack-profile.component';

describe('ContextPackProfileComponent', () => {
  let component: ContextPackProfileComponent;
  let fixture: ComponentFixture<ContextPackProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextPackProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPackProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
