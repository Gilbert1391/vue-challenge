<template>
  <div id="app">
    <AppHeader />
    <div class="container pt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style>
.form-container {
  width: 40%;
  height: 50vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  box-shadow: 0px 2px 3px 0px rgba(50, 50, 50, 0.2);
}

form {
  width: 100%;
  height: auto;
  padding: 20px;
}
</style>
