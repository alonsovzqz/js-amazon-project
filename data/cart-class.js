import { deliveryOptions } from "./deliveryOptions.js";

class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "b3e47d2f-674a-48e6-8c1b-32fd781a4b29",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "fc9127e8-21f4-4b59-9e1c-45a1d0935d2e",
      },
    ];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity) {
    let matchingItem;
    const cartQuantity = quantity || 1;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += cartQuantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: cartQuantity,
        deliveryOptionId: "b3e47d2f-674a-48e6-8c1b-32fd781a4b29",
      });
    }

    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const productExists = this.cartItems.some(
      (cartItem) => cartItem.productId === productId
    );
    if (!productExists) return;

    this.cartItemst = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItemst.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const productExists = this.cartItems.some(
      (cartItem) => cartItem.productId === productId
    );
    const deliveryOptionExists = deliveryOptions.some(
      (deliveryOption) => deliveryOption.id === deliveryOptionId
    );

    if (!productExists || !deliveryOptionExists) return;

    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart();
const businessCart = new Cart();

console.log(cart);
console.log(businessCart);
