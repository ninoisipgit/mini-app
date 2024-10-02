import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngrDetailsComponent } from './engr-details.component';

describe('EngrDetailsComponent', () => {
  let component: EngrDetailsComponent;
  let fixture: ComponentFixture<EngrDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngrDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EngrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
