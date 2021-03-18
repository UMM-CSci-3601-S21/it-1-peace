import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockCtxPkService } from 'src/testing/ctxPk.service.mock';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { MockUserService } from '../../testing/user.service.mock';
import { CtxPk } from './context-pack';
import { ContextPackProfileComponent } from './context-pack-profile.component';
import { CtxPkService } from './context-pack.service';

describe('ContextPackProfileComponent', () => {
  let component: ContextPackProfileComponent;
  let fixture: ComponentFixture<ContextPackProfileComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [ ContextPackProfileComponent ],
      providers: [
        { provide: CtxPkService, useValue: new MockCtxPkService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPackProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a specific context pack profile', () => {
    const expectedCtxPk: CtxPk = MockCtxPkService.testCtxPks[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedCtxPk._id });

    expect(component.id).toEqual(expectedCtxPk._id);
    expect(component.ctxPk).toEqual(expectedCtxPk);
  });

  it('should navigate to correct context pack when the id parameter changes', () => {
    let expectedCtxPk: CtxPk = MockCtxPkService.testCtxPks[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedCtxPk._id });

    expect(component.id).toEqual(expectedCtxPk._id);

    // Changing the paramMap should update the displayed user profile.
    expectedCtxPk = MockCtxPkService.testCtxPks[1];
    activatedRoute.setParamMap({ id: expectedCtxPk._id });

    expect(component.id).toEqual(expectedCtxPk._id);
  });

  it('should have `null` for the context pack for a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });

    // If the given ID doesn't map to a user, we expect the service
    // to return `null`, so we would expect the component's user
    // to also be `null`.
    expect(component.id).toEqual('badID');
    expect(component.ctxPk).toBeNull();
  });
});
