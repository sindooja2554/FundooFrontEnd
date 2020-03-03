import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelKeyComponent } from './label-key.component';

describe('LabelKeyComponent', () => {
  let component: LabelKeyComponent;
  let fixture: ComponentFixture<LabelKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
