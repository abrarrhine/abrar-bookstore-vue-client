<script setup lang="ts"></script>

<style scoped>
footer {
  background: black;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem !important;
}

footer .links a:not(:first-child) {
  padding-left: 0.5em;
  border-left: 1px solid white;
}

footer a:hover {
  color: #f1d3a4 !important;
}

.copyright,
.links,
.social-media-icons,
footer a {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white !important;
  gap: 0.5em;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

.social-media-icons {
  text-align: center;
  cursor: pointer;
  font-size: 0.7em;
  gap: 1.5em;
}
</style>

<template>
  <footer class="container">
    <section class="copyright">
      <i class="far fa-copyright"></i>
      <span>2023</span>
      <img src="/site-images/bookstore-logo.png" alt="Rhine Books Logo" width="57px" height="auto" />
    </section>
    <section class="links">
      <router-link to="/">about</router-link>
      <router-link to="/">contact</router-link>
      <router-link to="/">directions</router-link>
    </section>
    <section class="social-media-icons">
      <router-link to="/" class="button"
        ><i class="fab fa-facebook" style="font-size: 2em"></i
      ></router-link>
      <router-link to="/" class="button"
        ><i class="fab fa-twitter" style="font-size: 2em"></i
      ></router-link>
      <router-link to="/" class="button"
        ><i class="fab fa-instagram" style="font-size: 2em"></i
      ></router-link>
    </section>
  </footer>
</template>
