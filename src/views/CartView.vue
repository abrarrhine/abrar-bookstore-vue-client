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
          <router-link :to="'/category/' + cartStore.selectedCategoryName">
            <input type="submit" name="submit" class="button" value="Continue Shopping" />
          </router-link>
        </div>
        <div class="right">
          <router-link to="/checkout">
            <input type="submit" name="submit" class="button" value="Checkout" />
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
          <input
            type="submit"
            name="submit"
            class="button"
            value="Clear Cart"
            @click="cartStore.clearCart()"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Your Cart is Empty!</h1>
      <div class="center">
        <router-link :to="'/category/' + cartStore.selectedCategoryName">
          <input type="submit" name="submit" class="button" value="Continue Shopping" />
        </router-link>
      </div>
    </div>
  </div>
</template>
