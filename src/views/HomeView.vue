<style scoped>
.home-page {
  height: 620px;
  background: no-repeat url("../site-images/background-book.jpg");
  background-size: cover;
  display: flex;
}

.welcome-text {
  width: 30em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 2rem;
}

.welcome-text h2 {
  color: rgb(12, 110, 239);
  font-size: 3.5em;
  font-family: "Proza Libre";
  font-weight: 400;
}

.welcome-text p {
  color: black;
  font-size: 1.5em;
  font-weight: 100;
}

.shop-button {
  width: 15em;
  margin-top: 2rem;
}
</style>
<template>
  <div class="home-page">
    <section class="welcome-text flow-content container">
      <h2>Rhine Books</h2>
      <p>Explore the empire of knowledge!!!</p>
      <button class="button shop-button">Explore Books</button>
    </section>
  </div>
</template>
