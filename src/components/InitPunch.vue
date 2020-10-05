<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <div v-if="errors.length" class="alert alert-danger">
        <b>Por favor corregir errores:</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div class="form-group">
        <label for="name">Nombre</label>
        <input v-model="name" type="text" class="form-control" id="name" />
        <div class="invalid-feedback">Please provide a valid city.</div>
      </div>
      <div class="form-group">
        <label for="initDate">Fecha de entrada</label>
        <input v-model="initDate" type="date" class="form-control" id="initDate" />
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="punchStatus === 'Entrada' || loading"
      >
        {{ loading ? 'Cargando...' : 'Guardar' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'InitPunch',
  data() {
    return {
      loading: false,
      errors: [],
      name: null,
      initDate: null,
    };
  },
  methods: {
    ...mapActions(['initPunch']),
    onSubmit() {
      this.errors = [];

      if (!this.name) {
        this.errors.push('Nombre es requerido');
      }

      if (!this.initDate) {
        this.errors.push('Fecha de entrada es requerido');
      }

      this.loading = true;

      if (!this.errors.length) {
        setTimeout(() => {
          this.loading = false;
          const data = { name: this.name, initDate: this.initDate };
          this.initPunch(data);
        }, 1000);
      }
    },
  },
  computed: {
    ...mapGetters(['punchStatus']),
  },
};
</script>

<style scoped>
.form-container {
  width: 50%;
  height: 40vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

form {
  width: 100%;
}
</style>
