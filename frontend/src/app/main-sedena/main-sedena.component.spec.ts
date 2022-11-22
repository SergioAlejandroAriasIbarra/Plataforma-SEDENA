import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSedenaComponent } from './main-sedena.component';

describe('MainSedenaComponent', () => {
  let component: MainSedenaComponent;
  let fixture: ComponentFixture<MainSedenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSedenaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSedenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
