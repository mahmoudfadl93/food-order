import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { Subscriptions } from '../../shared/utilities/subscription.class';
import { OrdersService } from '../../services/orders/orders.service';
import { forkJoin } from 'rxjs';
import { IItemByUser, IOrderItems } from '../../models/orders.model';
import { MenusService } from '../../services/menus/menus.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CardModule,
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    TableModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  ordersService = inject(OrdersService);
  menusService = inject(MenusService);
  id!: number;
  itemByuser: WritableSignal<IItemByUser> = signal(null!);
  orderItems: WritableSignal<IOrderItems> = signal(null!);
  calcTotalOrders: WritableSignal<any> = signal([]);
  menuItems: WritableSignal<any> = signal(null!);
  form!: FormGroup;
  cartList = [
    {
      name: 'fol',
      quantity: 1,
      price: 30,
      totalPrice: 30,
    },
  ];
  subscription = new Subscriptions();

  ngOnInit(): void {
    this.form = new FormGroup({
      items: new FormArray([]),
    });
    this.addItem();
    this.subscription.add = this.activatedRoute.params.subscribe((param) => {
      this.id = +param['id'];
      if (this.id) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.subscription.add = forkJoin({
      GetOrderItemsByUser: this.ordersService.GetOrderItemsByUser({
        id: this.id,
      }),
      GetOrderItems: this.ordersService.GetOrderItems({ id: this.id }),
    }).subscribe({
      next: ({ GetOrderItemsByUser, GetOrderItems }) => {
        this.itemByuser.set(GetOrderItemsByUser);
        this.orderItems.set(GetOrderItems);
        this.totalOrders();
      },
    });
  }

  addItem() {
    const item = new FormGroup({
      // Define your form controls here
      id: new FormControl(0, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      quantity: new FormControl(null, [Validators.required]),
    });

    // Add the new form group to the FormArray
    this.items.push(item);
  }

  Done() {}
  submit() {}

  existingItems = new Set();
  totalOrders() {
    const orders = this.orderItems().OrderFullData.map((data) => data.FullList);
    for (const order of orders.flat()) {
      if (this.existingItems.has(order.ItemName)) {
        const existingItem = this.calcTotalOrders().find(
          (item: any) => item.ItemName === order.ItemName
        );
        existingItem.Quantity += order.Quantity;
        existingItem.TotalItemPrice =
          existingItem.Price * existingItem.Quantity;
      } else {
        this.existingItems.add(order.ItemName);
        this.calcTotalOrders.update((values) => {
          return [
            ...values,
            {
              ItemName: order.ItemName,
              Price: order.Price,
              Quantity: order.Quantity,
              TotalItemPrice: order.Price * order.Quantity,
            },
          ];
        });
      }
    }
    console.log(
      '🚀 ~ OrderComponent ~ totalOrders ~ this.calcTotalOrders():',
      this.calcTotalOrders()
    );
  }

  // Helper method to get the 'items' FormArray
  get items() {
    return this.form.get('items') as FormArray;
  }
}
