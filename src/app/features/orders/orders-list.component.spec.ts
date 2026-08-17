import { TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { OrderService } from '../../core/services/order.service';
import { of } from 'rxjs';

describe('OrdersListComponent', () => {
  let orderSvc: any;
  beforeEach(async () => {
    orderSvc = { list: jasmine.createSpy('list').and.returnValue(of([])) };
    await TestBed.configureTestingModule({
      imports: [OrdersListComponent],
      providers: [{ provide: OrderService, useValue: orderSvc }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(OrdersListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load orders', () => {
    TestBed.createComponent(OrdersListComponent);
    expect(orderSvc.list).toHaveBeenCalled();
  });
});
