import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAnnaComponent } from './header-anna.component';

describe('HeaderAnnaComponent', () => {
  let component: HeaderAnnaComponent;
  let fixture: ComponentFixture<HeaderAnnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAnnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAnnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
