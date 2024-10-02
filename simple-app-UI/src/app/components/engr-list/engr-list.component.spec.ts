import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngrListComponent } from './engr-list.component';

describe('EngrListComponent', () => {
  let component: EngrListComponent;
  let fixture: ComponentFixture<EngrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngrListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EngrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
