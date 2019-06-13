import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberImagesComponent } from './member-images.component';

describe('MemberImagesComponent', () => {
  let component: MemberImagesComponent;
  let fixture: ComponentFixture<MemberImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
