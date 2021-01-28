import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReparationsComponent } from './owner-reparations.component';

describe('OwnerReparationsComponent', () => {
  let component: OwnerReparationsComponent;
  let fixture: ComponentFixture<OwnerReparationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerReparationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerReparationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
