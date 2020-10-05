<template>
  <table class="table border" v-if="getAllPunches.length">
    <thead>
      <tr>
        <th scope="col">Nombre de empleado</th>
        <th scope="col">Fecha</th>
        <th scope="col">Tipo</th>
        <th scope="col">Hora</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(punch, index) in getAllPunches" :key="index">
        <td>{{ punch.employeeName }}</td>
        <td>{{ punch.date }}</td>
        <td>{{ punch.type }}</td>
        <td>{{ punch.time }}</td>
      </tr>
    </tbody>
  </table>
  <h3 v-else class="text-center">No hay datos disponible</h3>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "PunchHistory",
  computed: {
    ...mapGetters(["getAllPunches"]),
  },
};
</script>

<style scoped>
</style>