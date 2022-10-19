import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { products } from '../products';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });
  testResults!: Observable<{ id: number, foo: string }[]>;
  numResults!: number;

  constructor(
      public cartService: CartService,
      private formBuilder: FormBuilder,
  ) { }

  get items() {
    return this.cartService.getCartItems()
  }

  onSubmit(): void {
    // Process checkout data here
    this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  removeCartItem(id: Number) {
    const removedItem = this.cartService.removeCartItem(id);
    if (!removedItem) return
    window.alert(`${removedItem.name} removed from cart`)
  }

  clearCart() {
    this.cartService.clearCart()
    window.alert('Cart cleared!')
  }

  ngOnInit(): void {
    this.testResults = this.cartService.getTestResults()
    this.testResults.subscribe((data) => {
      this.numResults = data.length
      window.alert(`Results received:${data}`)
    })
  }

  onTestResults(): void {

  }
}
