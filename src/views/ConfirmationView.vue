<script setup lang="ts">
import { computed } from "vue";
import ConfirmationTable from "@/components/ConfirmationTable.vue";
import { useOrderDetailsStore } from "@/stores/OrderDetailsStore";
import { useCategoryStore } from "@/stores/category";
import { useCartStore } from "@/stores/cart";

const categoryStore = useCategoryStore();
const cartStore = useCartStore();

const orderDetailsStore = useOrderDetailsStore();
const orderDetails = orderDetailsStore.orderDetails;

const orderDate = computed(function () {
  let date = new Date(orderDetails.order.dateCreated);
  // return date.toLocaleTimeString();
  return date.toUTCString();
});

const ccExpDate = computed(function (): Date {
  return new Date(orderDetails.customer.ccExpDate);
});

const ccExpYear = computed(function (): number {
  return ccExpDate.value.getFullYear();
});

const ccExpMonth = computed(function (): string {
  let month = ccExpDate.value.getMonth() + 1;
  let result = "" + month;
  if (month < 10) {
    result = "0" + month;
  }
  return result;
});
</script>

<style scoped>
.sorry-msg {
  margin: 1em auto;
  text-align: center;
}

.sorry-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em auto;
}

a {
  text-decoration: none;
}

.confirmationView {
  width: 100vw;
  background: white;
  color: var(--neutral-color);
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: flex-start;*/
  /*margin: 1em auto;*/
}

h2 {
  margin: 1em auto;
  text-align: center;
}

.confirmation-page-body {
  display: flex;
  /*align-items: center;*/
  justify-content: space-around;
  width: 100vw;
  /*height: 80%;*/
  padding: 1em;
  padding: 2em 6em;
}

.customer-details {
  /*width: fit-content;*/
  height: min-content;
  /*display: flex;*/
  /*flex-direction: column;*/
  align-items: center;
  color: var(--neutral-color);
  background-color: var(--card-background-color);
  border-radius: 3%;
  padding: 1em 1em 2em 1em;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.1);
}

ul {
  text-align: left;
}

ul > li {
  margin: 0.25em;
}

.right {
  padding-left: 10px;
  text-align: right;
}

.special {
  font-weight: bolder;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em auto;
}

.continue-btn {
  width: auto;
  height: 2.25rem;
  text-align: center;
  font-size: small;
  font-weight: lighter;
  border: thin solid #ff7518;
  border-radius: 0.5rem;
  color: #ff7518;
  background-color: #f9f9f3;
  cursor: pointer;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
  margin: 0.5em;
}

.continue-btn:hover,
.continue-btn:active {
  background-color: #ff7518;
  color: #f9f9f3;
  border: none;
}
</style>

<template>
  <div class="confirmationView" v-if="!orderDetailsStore.hasOrderDetails()">
    <p class="sorry-msg">We are sorry, the order you requested could not be found.</p>
    <div class="sorry-button">
      <router-link :to="{ name: 'home-view' }">
        <button class="continue-btn">Go to Home Page</button>
      </router-link>
    </div>
  </div>
  <div class="confirmationView" v-else>
    <h2 class="center">Order placed successfully! Thank you for shopping with us :)</h2>
    <section class="confirmation-page-body">
      <div class="customer-details">
        <h1>Order Details</h1>
        <br />
        <ul>
          <li>
            <span class="special">Confirmation #: </span>
            <span class="right">{{ orderDetails.order.confirmationNumber }}</span>
          </li>
          <li>
            <i class="fa-solid fa-clock"></i>
            <span class="right">{{ orderDate }}</span>
          </li>
        </ul>
        <ul>
          <li>
            <i class="fa-solid fa-user"></i>
            <span class="right">{{ orderDetails.customer.customerName }}</span>
          </li>
          <li>
            <i class="fa-solid fa-location-dot"></i>
            <span class="right">{{ orderDetails.customer.address }}</span>
          </li>
          <li>
            <i class="fa-solid fa-phone"></i>
            <span class="right">{{ orderDetails.customer.phone }}</span>
          </li>
          <li>
            <i class="fa-solid fa-envelope"></i>
            <span class="right">{{ orderDetails.customer.email }}</span>
          </li>
          <li>
            <i class="fa-solid fa-credit-card"></i>
            <span class="right"
              >**** **** **** {{ orderDetails.customer.ccNumber.slice(12) }} ({{
                ccExpMonth
              }}-{{ ccExpYear }})
            </span>
          </li>
        </ul>
      </div>
      <div class="order-summary-table">
        <confirmation-table> </confirmation-table>
        <router-link :to="'/category/' + cartStore.selectedCategoryName">
          <button class="continue-btn">
            <i class="fa-solid fa-arrow-left-long"></i> Continue Shopping
          </button>
        </router-link>
      </div>
    </section>
  </div>
</template>