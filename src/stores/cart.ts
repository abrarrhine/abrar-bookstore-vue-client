import { defineStore } from "pinia";
import { ShoppingCart } from "@/types";
import type {
  BookItem,
  CustomerForm,
  OrderDetails,
  ServerErrorResponse,
} from "@/types";
import { apiUrl } from "@/api";

const CART_STORAGE_KEY = "ShoppingCart";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    const initCart = new ShoppingCart();
    const selectedCategoryName = "Science";
    const cartString = localStorage.getItem(CART_STORAGE_KEY);
    if (cartString !== null) {
      // cartString is a string
      const cartFromStorage = JSON.parse(cartString) as ShoppingCart;
      Object.assign(initCart, cartFromStorage);
    }
    return {
      cart: initCart,
      selectedCategoryName: selectedCategoryName,
    };
  },
  getters: {
    count(): number {
      console.log(this.cart.numberOfItems);
      return this.cart.numberOfItems;
    },
    subtotalPrice(): number {
      return this.cart.subtotal;
    },
    totalPrice(): number {
      return this.cart.total;
    },
  },

  actions: {
    clearCart() {
      this.cart.clear();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    },
    addToCart(book: BookItem) {
      this.cart.addBook(book);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    },
    updateBookQuantity(book: BookItem, quantity: number) {
      this.cart.update(book, quantity);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
    },
    async placeOrder(
      customerForm: CustomerForm
    ): Promise<OrderDetails | ServerErrorResponse> {
      const order = { cart: this.cart, customerForm: customerForm };
      console.log(JSON.stringify(order));

      const response: Response = await fetch(`${apiUrl}/orders`, {
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "client",
        method: "POST", // or 'PUT'
        body: JSON.stringify(order),
      });

      const placeOrderResponse: OrderDetails | ServerErrorResponse =
        await response.json();

      if (response.ok) {
        this.clearCart();
      }
      return placeOrderResponse;
    },
  },
});
