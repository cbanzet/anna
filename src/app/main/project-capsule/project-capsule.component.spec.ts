import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCapsuleComponent } from './project-capsule.component';

describe('ProjectCapsuleComponent', () => {
  let component: ProjectCapsuleComponent;
  let fixture: ComponentFixture<ProjectCapsuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCapsuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
