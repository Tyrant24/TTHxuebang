import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipingoumaiPage } from './shipingoumai.page';

describe('ShipingoumaiPage', () => {
  let component: ShipingoumaiPage;
  let fixture: ComponentFixture<ShipingoumaiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipingoumaiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipingoumaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
