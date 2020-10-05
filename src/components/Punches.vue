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
        <label for="punchType">Tipo de ponche</label>
        <select class="form-control" id="punchType" v-model="punchStatus">
          <option value="" selected disabled>Seleccione opción</option>
          <option v-for="(type, index) in punchTypes" :key="index">
            {{ type }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!getCurrentPunchStatus || loading"
      >
        {{ loading ? "Cargando..." : "Guardar" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Punches",
  data() {
    return { loading: false, errors: [], punchStatus: "" };
  },
  methods: {
    ...mapActions([
      "addPunch",
      "incrementBreakCounter",
      "incrementLunchCounter",
      "punchOut",
    ]),
    onSubmit() {
      this.errors = [];
      if (!this.punchStatus) {
        this.errors.push("Tipo de ponche es requerido");
      }

      if (this.getBreakCounter >= 2 && this.punchStatus === "Break") {
        this.errors.push("Solo puede tomar 2 breaks");
      }

      if (this.getLunchCounter >= 1 && this.punchStatus === "Almuerzo") {
        this.errors.push("Solo puede tomar 1 almuerzo");
      }

      if (!this.errors.length) {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.addPunch(this.punchStatus);

          if (this.punchStatus === "Break") {
            this.incrementBreakCounter();
          } else if (this.punchStatus === "Almuerzo") {
            this.incrementLunchCounter();
          } else if (this.punchStatus === "Salida") {
            this.punchOut();
          }

          this.punchStatus = "";
        }, 800);
      }
    },
  },
  computed: {
    ...mapGetters([
      "getCurrentPunchStatus",
      "getBreakCounter",
      "getLunchCounter",
    ]),
    punchTypes() {
      const types = ["Entrada", "Break", "Almuerzo", "Salida"];
      const deletetype = (type) => types.splice(types.indexOf(type), 1);

      switch (this.getCurrentPunchStatus) {
        case "Entrada":
          deletetype("Entrada");
          break;
        case "Break":
          deletetype("Break");
          break;
        case "Almuerzo":
          deletetype("Almuerzo");
          break;
        default:
          deletetype("Entrada");
      }

      return types;
    },
  },
};
</script>

<style scoped>
</style>