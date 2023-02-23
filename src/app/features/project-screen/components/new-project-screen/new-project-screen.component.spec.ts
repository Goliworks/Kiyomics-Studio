import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectScreenComponent } from './new-project-screen.component';

describe('NewProjectScreenComponent', () => {
  let component: NewProjectScreenComponent;
  let fixture: ComponentFixture<NewProjectScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewProjectScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProjectScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
