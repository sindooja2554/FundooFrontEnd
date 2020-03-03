import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteIconComponent } from './note-icon.component';

describe('NoteIconComponent', () => {
  let component: NoteIconComponent;
  let fixture: ComponentFixture<NoteIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
