<script setup lang="ts">
import { reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import { useCartStore } from "@/stores/cart";
import { isCreditCard, isMobilePhone } from "@/validators";
import CheckoutFieldError from "@/components/CheckoutFieldError.vue";
import router from "@/router";
import { asDollarsAndCents } from "@/main";
import type { OrderDetails, ServerErrorResponse } from "@/types";
import { useCategoryStore } from "@/stores/category";

const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const cart = cartStore.cart;
const defaultServerErrorMessage =
  "An unexpected error occurred, please try again.";
const serverErrorMessage = ref(defaultServerErrorMessage);

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function generateYears() {
  // Get current year
  const today = new Date();
  const currentYear = today.getFullYear();
  const years = [currentYear];
  // Get next 15 years
  for (let i = 1; i <= 15; i++) {
    years.push(currentYear + i);
  }
  return years;
}
const years: number[] = generateYears();

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage("Name must have at least 4 letters.", minLength(4)),
    maxLength: helpers.withMessage("Name can have at most 45 letters.", maxLength(45)),
  },
  address: {
    required: helpers.withMessage("Please provide an address.", required),
    minLength: helpers.withMessage(
      "Address must have at least 4 characters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Address can have at most 45 characters.",
      maxLength(45)
    ),
  },
  email: {
    required: helpers.withMessage("Please provide a valid email address.", required),
    email: email,
  },
  phone: {
    required: helpers.withMessage("Please provide a phone number.", required),
    phone: helpers.withMessage(
      "Please provide a valid phone number.",
      (value: string) => !helpers.req(value) || isMobilePhone(value)
    ),
  },
  ccNumber: {
    required: helpers.withMessage("Please provide a credit card number.", required),
    ccNumber: helpers.withMessage(
      "Please provide a valid credit card number.",
      (value: string) => !helpers.req(value) || isCreditCard(value)
    ),
  },
  ccExpiryMonth: {},
  ccExpiryYear: {},
};
const v$ = useVuelidate(rules, form);

async function submitOrder() {
  console.log("Submit order");
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    try {
      form.checkoutStatus = "PENDING";
      serverErrorMessage.value = defaultServerErrorMessage;

      const placeOrderResponse: OrderDetails | ServerErrorResponse =
        await cartStore.placeOrder({
          name: form.name,
          address: form.address,
          phone: form.phone,
          email: form.email,
          ccNumber: form.ccNumber,
          ccExpiryMonth: form.ccExpiryMonth,
          ccExpiryYear: form.ccExpiryYear,
      });

      if ("error" in placeOrderResponse) {
        form.checkoutStatus = "SERVER_ERROR";
        serverErrorMessage.value = placeOrderResponse.message;
        console.log("Error placing order", placeOrderResponse);
      } else {
        form.checkoutStatus = "OK";
        await router.push({ name: "confirmation-view" });
      }
    } catch (e) {
      form.checkoutStatus = "SERVER_ERROR";
      serverErrorMessage.value = defaultServerErrorMessage;
      console.log("Error placing order", e);
    }
  }
}

/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}
</script>

<style scoped>
label {
  font-weight: bold;
}
.checkout-page {
  background: rgba(255, 255, 255);
  color: #000000;
}
.checkout-page-body {
  display: block;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 40%;
  margin-right: 40%;
  padding-top: 5%;
  padding-bottom: 5%;
}

form {
  display: flex;
  flex-direction: column;
}

form > div {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5em;
}

form > div > input,
form > div > select {
  background-color: #ffffff;
  margin-left: 0.5em;
}

form > .error {
  color: red;
  text-align: right;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 1em;
  text-align: center;
}

.submit-btn {
  max-width: fit-content !important;
  min-width: fit-content !important;
  align-self: end;
}
</style>

<template>
  <div class="checkout-page">
    <!-- TODO: Add an HTML section to display when checking out with an empty cart -->
    <section class="checkout-page-body" v-if="cart.empty">
      <div>
        <p>You have no items to checkout</p>
      </div>
    </section>

    <section class="checkout-page-body" v-if="!cart.empty">
      <form @submit.prevent="submitOrder">
        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            size="20"
            id="name"
            name="name"
            v-model.lazy="v$.name.$model"
          />
        </div>
        <CheckoutFieldError :field-name="v$.name"></CheckoutFieldError>
        <!-- TODO: Add address input and validation messages -->
        <div>
          <label for="name">Address:</label>
          <input
            type="text"
            size="20"
            id="address"
            name="address"
            v-model.lazy="v$.address.$model"
          />
        </div>
        <CheckoutFieldError :field-name="v$.address"></CheckoutFieldError>

        <div>
          <label for="phone">Phone:</label>
          <input
            type="text"
            size="20"
            id="phone"
            name="phone"
            v-model.lazy="v$.phone.$model"
          />
        </div>
        <!-- TODO: Add phone validation message(s) -->
        <CheckoutFieldError :field-name="v$.phone"></CheckoutFieldError>
        <div>
          <label for="email">Email:</label>
          <input
            type="text"
            size="20"
            id="email"
            name="email"
            v-model.lazy="v$.email.$model"
          />
        </div>
        <!-- TODO: Add email validation message(s) -->
        <CheckoutFieldError :field-name="v$.email"></CheckoutFieldError>
        <div>
          <label for="ccNumber">Credit card:</label>
          <input
            type="text"
            size="20"
            id="ccNumber"
            name="ccNumber"
            v-model.lazy="v$.ccNumber.$model"
          />
        </div>
        <!-- TODO: Add credit card validation message(s) -->
        <CheckoutFieldError :field-name="v$.ccNumber"></CheckoutFieldError>

        <div>
          <label>Exp Date:</label>
          <select v-model="v$.ccExpiryMonth.$model">
            <option v-for="(month, index) in months" :key="index" :value="index + 1">
              {{ month }} ({{ index + 1 }})
            </option>
          </select>
          <select>
            <option v-for="(year, index) in years" :key="index" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <!-- TODO (style): Use a single label for both month and date and put the on the same line. -->
        <!-- TODO (style): For example: Exp Date {Month} {Year}, with space between month/year selectors. -->

        <input
          type="submit"
          name="submit"
          class="button submit-btn"
          :disabled="form.checkoutStatus === 'PENDING'"
          value="Complete Purchase"
        />
        <!-- TODO (style): The submit button should not take up the entire width of the form. -->
        <!-- TODO (style): The submit button should be styled consistent with your own site. -->
      </form>
      <!-- TODO (style): Fix error message placement so they nearer to the correct fields. -->
      <!-- TODO (style): HINT: Use another <div> and label, input, and error, and use flexbox to style. -->

      <!-- TODO: Display the cart total, subtotal and surcharge. -->
      <div class="checkout-details">
        <p>-----------------------------------------------</p>
        <section>
          Your credit card will be charged
          <strong>{{ asDollarsAndCents(cart.subtotal + cart.surcharge) }}</strong>
          <br />
          (<strong>{{ asDollarsAndCents(cart.subtotal) }}</strong> +
          <strong>{{ asDollarsAndCents(cart.surcharge) }}</strong> shipping)
        </section>
      </div>

      <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
        <div v-if="form.checkoutStatus === 'ERROR'">
          Error: Please fix the problems above and try again.
        </div>

        <div v-else-if="form.checkoutStatus === 'PENDING'">Processing...</div>

        <div v-else-if="form.checkoutStatus === 'OK'">Your order has been placed</div>

        <div v-else>{{ serverErrorMessage }}</div>
      </section>
    </section>
  </div>
</template>
