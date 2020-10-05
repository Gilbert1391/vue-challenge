<template>
  <nav class="bg-light">
    <div>
      <router-link to="/" class="logo">Logo</router-link>
    </div>
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Entrada</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/ponches" class="nav-link">Ponches</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/historial" class="nav-link">Historial</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/diario" class="nav-link">Diario</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.nav-link {
  color: #4c4c4c;
}

.nav-link:hover {
  color: #007bff;
}

.logo {
  color: #4c4c4c;
  padding-left: 15px;
}
</style>
