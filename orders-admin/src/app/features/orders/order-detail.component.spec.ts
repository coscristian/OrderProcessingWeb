import { TestBed } from '@angular/core/testing';
import { OrderDetailComponent } from './order-detail.component';
import { OrderService } from '../../core/services/order.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('OrderDetailComponent', () => {
  beforeEach(async () => {
    const orderSvc = { get: () => of({ id:1, customerId:1, createdAt:'', total:0, items:[] }) };
    await TestBed.configureTestingModule({
      imports: [OrderDetailComponent],
      providers: [
        { provide: OrderService, useValue: orderSvc },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: new Map([['id','1']]) } } }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OrderDetailComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
