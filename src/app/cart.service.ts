import { Injectable } from '@angular/core';
import { CartProduct, Product, products } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // items: CartProduct[] = []
  items: CartProduct[] = [{...products[0], amount: 1}, {...products[1], amount: 1}]
  constructor(
      private http: HttpClient
  ) { }

  getCartItems(): CartProduct[] {
    return this.items
  }

  getItemById(id: number): CartProduct | undefined {
    return this.items.find((i) => i.id === id)
  }

  addCartItem(item: Product) {
    const foundItem = this.getItemById(item.id)
    if (foundItem) {
      foundItem.amount++
      return
    }
    this.items.push({...item, amount: 1});
  }

  alterAmount(id: number, add: boolean) {
    const foundItem = this.getItemById(id)
    if (!foundItem) return
    add ? foundItem.amount++ : foundItem.amount --
    if (foundItem.amount <= 0) {
      this.items = this.items.filter((i) => i.id !== id)
    }
  }

  removeCartItem(itemId: Number): CartProduct | undefined {
    const removeIndex = this.items.findIndex((i) => i.id === itemId)
    if (removeIndex === undefined) return undefined
    const removeItem = this.items[removeIndex]
    this.items.splice(removeIndex, 1)
    return removeItem
  }

  get totalPrice(): number {
    return this.items.reduce((prev, curr) => curr.amount*curr.price + prev, 0)
  }

  clearCart(): Product[] {
    this.items = []
    return this.items
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>
    ('/assets/shipping.json')
  }

  getTestResults() {
    return this.http.get<{id: number, foo: string}[]>
    ('https://railway-planner-backend-production.up.railway.app')
  }

}
