import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopurcsuccPage } from './videopurcsucc.page';

describe('VideopurcsuccPage', () => {
  let component: VideopurcsuccPage;
  let fixture: ComponentFixture<VideopurcsuccPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideopurcsuccPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopurcsuccPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
