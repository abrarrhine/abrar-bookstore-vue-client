<script setup lang="ts">
import TheHeaderDropdown from "@/components/TheHeaderDropdown.vue";
</script>

<style scoped>
header {
  background-color: black;
  display: flex;
  justify-content: space-between;
  padding: 1em;
  gap: 1em;
  z-index: 1;
}

.header-with-shadow {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

header .button:not(.icon-only-button) {
  background-color: rgb(12, 110, 239);
}

header .button:not(.icon-only-button):hover,
header .button:not(.icon-only-button):active,
.header-dropdown:hover .categories-button {
  background-color: var(--neutral-color-dark);
}

header .icon-only-button {
  color: rgb(12, 110, 239);
}

header .icon-only-button:hover,
header .icon-only-button:active {
  color: rgb(1, 59, 135);
}

header a {
  text-decoration: none;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: white !important;
}

.search-bar-text {
  padding: 0.5em 1.5em;
  border-radius: 50px;
  border: 0;
  background: var(--primary-background-color);
  width: 350px;
}

.search-bar-text:focus,
.search-bar-text:focus-visible {
  outline: none;
  box-shadow: 0 0 3pt 2pt var(--neutral-color);
}

.search-bar-button {
  margin-left: 0.4em;
  box-shadow: none;
  border-left: 1px solid;
  border-radius: 50%;
}

.logo-title-divider {
  height: 0;
  width: 40px;
  border: 2px solid #ffffff;
  transform: rotate(-90deg);
}

.header-dropdown-and-cart {
  gap: 0.5em;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
</style>

<template>
  <header class="container header-with-shadow">
    <section class="bookstore-logo-title flex-centered-container">
      <a href="index.html">
        <img
          src="/site-images/bookstore-logo.png"
          alt="Rhine Books Logo"
          width="57px"
          height="auto"
        />
      </a>
      <span class="logo-title-divider"></span>
      <a href="index.html">
        <h1 class="logo-text">Rhine Books</h1>
      </a>
    </section>
    <section class="search-bar flex-centered-container">
      <form action="category.html" class="flex-centered-container">
        <input
          type="text"
          class="search-bar-text"
          placeholder="Search books..."
        /><br />
        <input
          type="submit"
          class="button icon-inside-button search-bar-button"
          value="&#xf002;"
        />
      </form>
    </section>
    <section class="header-dropdown-and-cart flex-centered-container">
      <the-header-dropdown></the-header-dropdown>
      <button class="button icon-only-button">
        <i class="fas fa-shopping-cart icon-only-button-icon">
          <span class="icon-only-button-text">0</span>
        </i>
      </button>
      <button class="button" style="padding: 7px">GA</button>
    </section>
  </header>
</template>
