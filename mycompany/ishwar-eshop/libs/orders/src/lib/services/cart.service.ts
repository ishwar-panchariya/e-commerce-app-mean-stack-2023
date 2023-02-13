import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

const CART_KEY = 'cart'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart())

  constructor() { }

  // initialize cart storage
  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    if(!cart) {
      const initialCart = {
        items: []
      }
  
      const initialCartJSON = JSON.stringify(initialCart)
      localStorage.setItem(CART_KEY, initialCartJSON)
    } 
    else {
      this.cart$.next(cart)
    }
  }

  // empty the Cart
  emptyCart() {
    const initialCart = {
      items: []
    }

    const initialCartJSON = JSON.stringify(initialCart)
    localStorage.setItem(CART_KEY, initialCartJSON)
    this.cart$.next(initialCart)
  
  }

  // get cart 
  getCart() {
    const cartJsonString = localStorage.getItem(CART_KEY)
    const cart: Cart = JSON.parse(cartJsonString)
    return cart
  }

  // set cart item
  setCartItem(cartItem: CartItem, updateCartQuantity?: boolean): Cart {
    const cart = this.getCart()

    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId)
    if(cartItemExist) {
      cart.items?.map((item) => {
        if(item.productId === cartItem.productId) {
          if(updateCartQuantity) {
            item.quantity = cartItem.quantity
          } else {
            item.quantity = item.quantity + cartItem.quantity
          }

          return item;
        }
      })
    } else {
      cart.items?.push(cartItem)
    }

    const cartJSON = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJSON)

    this.cart$.next(cart)
    return cart
  }

  // delete cart item
  deleteCartItem(productId: string) {
    const cart = this.getCart()
    const newCart = cart.items?.filter(item => item.productId !== productId)

    cart.items = newCart
    const cartJsonString = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJsonString)

    this.cart$.next(cart)
  }
}
