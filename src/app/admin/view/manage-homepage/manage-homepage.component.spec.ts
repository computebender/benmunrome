import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHomepageComponent } from './manage-homepage.component';

describe('ManageHomepageComponent', () => {
  let component: ManageHomepageComponent;
  let fixture: ComponentFixture<ManageHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
