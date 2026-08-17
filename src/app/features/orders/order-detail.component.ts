import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  order?: Order;
  customerName = '';
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'The requested resource was not found.';
      return;
    }
    this.loading = true;
    this.orderService.get(id).subscribe({
      next: (o) => {
        this.order = o;
        this.customerService.get(o.customerId).subscribe((c) => {
          this.customerName = c.name;
        });
        this.loading = false;
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  back() {
    this.router.navigate(['/orders']);
  }

  formatMoney(v: number) {
    return new Intl.NumberFormat('en-US').format(v);
  }

  handleError(err: any) {
    this.loading = false;
    if (err?.status === 400)
      this.error = 'Please check the submitted information.';
    else if (err?.status === 404)
      this.error = 'The requested resource was not found.';
    else if (err?.status === 409)
      this.error = 'Insufficient stock or conflicting operation.';
    else this.error = 'Something went wrong. Please try again.';
  }
}
