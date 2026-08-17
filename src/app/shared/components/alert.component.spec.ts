import { TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertComponent] }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AlertComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
