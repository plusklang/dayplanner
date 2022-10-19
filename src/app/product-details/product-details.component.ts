import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, products } from '../products';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  constructor(
      private route: ActivatedRoute,
      private cartService: CartService
  ) {}

  ngOnInit(): void {
    const routerParams = this.route.snapshot.paramMap
    const productIdFromRoute = Number(routerParams.get('productId'));
    this.product = products.find((p) => p.id === productIdFromRoute)
  }

  addToCart(product: Product) {
    this.cartService.addCartItem(product)
    window.alert('Your product has been added to the cart!');
  }


}
