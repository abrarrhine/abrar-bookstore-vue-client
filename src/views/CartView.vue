<script setup lang="ts">
import CartTable from "@/components/CartTable.vue";
import { useCartStore } from "@/stores/cart";
import { asDollarsAndCents } from "@/main";
const cartStore = useCartStore();
const clearCart = function () {
  cartStore.cart.clear();
};
</script>
<style scoped>
h1 {
  margin: 1em auto;
  text-align: center;
  color: black !important;
}
.cart-area {
  width: 100vw;
}
.lr-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em auto;
}
.left {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.5em;
}
.right {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 0.5em;
}
.continue-btn {
  width: auto;
  height: 2.25rem;
  text-align: center;
  font-size: small;
  font-weight: lighter;
  border: thin solid #000000;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--primary-color);
  cursor: pointer;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
.checkout-btn {
  width: auto;
  height: 2.25rem;
  text-align: center;
  font-size: small;
  font-weight: lighter;
  border: none;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--primary-color);
  cursor: pointer;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
}
.continue-btn:hover,
.continue-btn:active {
  background-color: var(--primary-color-dark);
  color: #f9f9f3;
  border: none;
}
.checkout-btn:hover,
.checkout-btn:active {
  background-color: var(--primary-color-dark);
  color: #f9f9f3;
  border: none;
}
.align-right {
  width: 47%;
  margin: 0 auto;
  text-align: right;
}
em {
  padding-left: 1em;
}
.cart-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  margin: 2em auto 1em auto;
}
</style>

<template>
  <div class="cart-area">
    <div v-if="cartStore.count > 0">
      <h1>Your Cart</h1>
      <div class="lr-wrapper">
        <div class="left">
          <router-link :to="'/category/Engineering'">
            <button class="continue-btn">
              <i class="fa-solid fa-arrow-left-long"></i> Continue Shopping
            </button>
          </router-link>
        </div>
        <div class="right">
          <router-link to="/checkout">
            <button class="checkout-btn">
              Checkout <i class="fa-solid fa-arrow-right-long"></i>
            </button>
          </router-link>
        </div>
      </div>
      <cart-table></cart-table>
      <p class="align-right">
        Subtotal:
        <em>{{ asDollarsAndCents(cartStore.subtotalPrice) }}</em>
      </p>
      <p class="align-right">
        Tax & Shipping:
        <em>{{ asDollarsAndCents(500) }}</em>
      </p>
      <p class="align-right">
        <strong
          >Total: <em>{{ asDollarsAndCents(cartStore.totalPrice) }}</em></strong
        >
      </p>
      <div class="cart-info">
        <p class="left">Item(s): {{ cartStore.count }}</p>
        <div class="right">
          <button class="continue-btn" @click="cartStore.clearCart()">
            Clear Cart <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Your Cart is Empty!</h1>
      <div class="center">
        <router-link :to="'/category/Engineering'">
          <button class="continue-btn">
            <i class="fa-solid fa-arrow-left-long"></i> Continue Shopping
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>