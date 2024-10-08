import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeComponent } from './fake.component';

describe('FakeComponent', () => {
  let component: FakeComponent;
  let fixture: ComponentFixture<FakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
