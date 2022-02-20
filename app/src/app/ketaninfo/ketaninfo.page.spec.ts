import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KetaninfoPage } from './ketaninfo.page';

describe('KetaninfoPage', () => {
  let component: KetaninfoPage;
  let fixture: ComponentFixture<KetaninfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetaninfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetaninfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
