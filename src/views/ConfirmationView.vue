<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
const cartStore = useCartStore();
</script>
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em auto;
  color: black !important;
}
.space-above {
  margin-top: 15%;
}
</style>

<template>
  <div class="space-above"></div>
  <div class="confirmationView">
    <h2 class="center">Order placed successfully! Thank you for shopping with us :)</h2>
  </div>
  <div class="center">
    <router-link :to="'/category/' + cartStore.selectedCategoryName">
      <input type="submit" name="submit" class="button" value="Continue Shopping" />
    </router-link>
  </div>
  <div class="center">
    <router-link :to="'/'">
      <input type="submit" name="submit" class="button" value="Back to home" />
    </router-link>
  </div>
  <div class="space-above"></div>
</template>
