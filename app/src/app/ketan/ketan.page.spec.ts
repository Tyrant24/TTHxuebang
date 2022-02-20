import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KetanPage } from './ketan.page';

describe('KetanPage', () => {
  let component: KetanPage;
  let fixture: ComponentFixture<KetanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KetanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KetanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
