<script setup lang="ts">
import { inject } from "vue";
import type { CategoryItem } from "@/types";
const categoryList = inject("categoryList") as CategoryItem[];
</script>

<style scoped>
.category-buttons {
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: white;
  border-top: 2px solid rgb(3, 64, 145);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.category-buttons .button {
  margin: 5px;
  box-shadow: none;
}

.button.category-button.router-link-active {
  background-color: rgb(12, 110, 239);
  color: white;
}

.button.category-button {
  background-color: white;
  color: rgb(12, 110, 239);
}

.button.category-button:hover,
.button.category-button:active {
  background-color: rgb(60 121 123 / 7%);
}
</style>

<template>
  <nav class="category-nav">
    <ul class="category-buttons">
      <li v-for="category in categoryList" :key="category.categoryId">
        <router-link
          :to="'/category/' + category.name"
          class="button category-button"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
