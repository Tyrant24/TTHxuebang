import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemPage } from './problem.page';

describe('ProblemPage', () => {
  let component: ProblemPage;
  let fixture: ComponentFixture<ProblemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
