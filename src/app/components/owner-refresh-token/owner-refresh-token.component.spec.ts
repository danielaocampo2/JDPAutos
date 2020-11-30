import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRefreshTokenComponent } from './owner-refresh-token.component';

describe('OwnerRefreshTokenComponent', () => {
  let component: OwnerRefreshTokenComponent;
  let fixture: ComponentFixture<OwnerRefreshTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerRefreshTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerRefreshTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
