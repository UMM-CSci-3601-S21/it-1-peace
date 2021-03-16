import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockCtxPkService } from '../../testing/ctxPk.service.mock';
import { CtxPk } from './context-pack';
import { CtxPkListComponent } from './context-pack-list.component';
import { CtxPkService } from './context-pack.service';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('Context pack list', () => {

  let ctxPkList: CtxPkListComponent;
  let fixture: ComponentFixture<CtxPkListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [CtxPkListComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: CtxPkService, useValue: new MockCtxPkService() }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(CtxPkListComponent);
      ctxPkList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));


  it('contains all the context packs', () => {
    expect(ctxPkList.serverFilteredCtxPks.length).toBe(3);
  });

  it('contains a context pack named \'Birthday Pack\'', () => {
    expect(ctxPkList.serverFilteredCtxPks.some((ctxPk: CtxPk) => ctxPk.name === 'Birthday Pack')).toBe(true);
  });

  it('contain a context pack named \'farm\'', () => {
    expect(ctxPkList.serverFilteredCtxPks.some((ctxPk: CtxPk) => ctxPk.name === 'farm')).toBe(true);
  });

  it('doesn\'t contain a context pack named \'Santa\'', () => {
    expect(ctxPkList.serverFilteredCtxPks.some((ctxPk: CtxPk) => ctxPk.name === 'Santa')).toBe(false);
  });

  it('has two context packs that are enabled', () => {
    expect(ctxPkList.serverFilteredCtxPks.filter((ctxPk: CtxPk) => ctxPk.enabled === true).length).toBe(2);
  });

});

describe('Misbehaving CtxPk List', () => {
  let ctxPkList: CtxPkListComponent;
  let fixture: ComponentFixture<CtxPkListComponent>;

  let ctxPkServiceStub: {
    getCtxPks: () => Observable<CtxPk[]>;
    getCtxPksFiltered: () => Observable<CtxPk[]>;
  };

  beforeEach(() => {
    // stub UserService for test purposes
    ctxPkServiceStub = {
      getCtxPks: () => new Observable(observer => {
        observer.error('Error-prone observable');
      }),
      getCtxPksFiltered: () => new Observable(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [CtxPkListComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{ provide: CtxPkService, useValue: ctxPkServiceStub }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(CtxPkListComponent);
      ctxPkList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a CtxPkListService', () => {
    // Since the observer throws an error, we don't expect users to be defined.
    expect(ctxPkList.serverFilteredCtxPks).toBeUndefined();
  });
});
