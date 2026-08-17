import { TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LoadingComponent] }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoadingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
