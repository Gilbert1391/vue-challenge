<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit">
      <div v-if="errors.length" class="alert alert-danger">
        <b>Error:</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>
      <div v-if="showWarning" class="alert alert-warning">
        <b>Advertencia:</b>
        Ha excedido el tiempo de break!
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
import moment from "moment";

export default {
  name: "Punches",
  data() {
    return {
      loading: false,
      errors: [],
      punchStatus: "",
      maxNumOfBreaks: 2,
      maxNumOfLunches: 1,
      showWarning: false,
    };
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
      this.showWarning = false;
      if (!this.punchStatus) {
        this.errors.push("Tipo de ponche es requerido");
      }

      if (
        this.getBreakCounter >= this.maxNumOfBreaks &&
        this.punchStatus === "Break"
      ) {
        this.errors.push("Solo puede tomar 2 breaks");
      }

      if (
        this.getLunchCounter >= this.maxNumOfLunches &&
        this.punchStatus === "Almuerzo"
      ) {
        this.errors.push("Solo puede tomar 1 almuerzo");
      }

      if (!this.errors.length) {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.addPunch(this.punchStatus);

          if (this.getAllPunches.length && this.punchStatus === "Entrada") {
            const secondToLastPunch = this.getAllPunches[
              this.getAllPunches.length - 2
            ];
            const now = moment().format("h:mm:ss a");
            const startTime = moment(secondToLastPunch.time, "hh:mm:ss a");
            const endTime = moment(now, "hh:mm:ss a");
            const duration = moment.duration(endTime.diff(startTime));
            const diff = parseInt(duration.asSeconds());

            this.showWarning = diff > 10;
          } else if (this.punchStatus === "Break") {
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
      "getAllPunches",
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
          deletetype("Almuerzo");
          break;
        case "Almuerzo":
          deletetype("Almuerzo");
          deletetype("Break");
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