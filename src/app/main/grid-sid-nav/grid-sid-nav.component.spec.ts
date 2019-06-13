import { NO_ERRORS_SCHEMA } from "@angular/core";
import { GridSidNavComponent } from "./grid-sid-nav.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("GridSidNavComponent", () => {

  let fixture: ComponentFixture<GridSidNavComponent>;
  let component: GridSidNavComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [GridSidNavComponent]
    });

    fixture = TestBed.createComponent(GridSidNavComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
