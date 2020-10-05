<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <div v-if="errors.length" class="alert alert-danger">
        <b>Error:</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          v-model="name"
          :readonly="getCurrentPunchStatus"
          type="text"
          class="form-control"
          id="name"
        />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="form-group">
        <label for="date">Fecha de entrada</label>
        <input
          v-model="date"
          :readonly="getCurrentPunchStatus"
          type="date"
          class="form-control"
          id="date"
        />
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="getCurrentPunchStatus || loading"
      >
        {{ loading ? "Cargando..." : "Guardar" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "InitPunch",
  created() {
    this.name = this.getEmployeeName;
    this.date = this.getInitPunchDate;
  },
  data() {
    return {
      loading: false,
      errors: [],
      name: null,
      date: this.getInitPunchDate,
    };
  },
  methods: {
    ...mapActions(["initPunch", "addPunch"]),
    onSubmit() {
      this.errors = [];

      if (!this.name) {
        this.errors.push("Nombre es requerido");
      }

      if (!this.date) {
        this.errors.push("Fecha de entrada es requerido");
      }

      if (!this.errors.length) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          const data = { employeeName: this.name, date: this.date };

          this.initPunch(data);
          this.addPunch("Entrada");
        }, 1000);
      }
    },
  },
  computed: {
    ...mapGetters([
      "getCurrentPunchStatus",
      "getInitPunchDate",
      "getEmployeeName",
    ]),
  },
};
</script>

<style scoped>
</style>
