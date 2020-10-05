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
        <label for="punchType">Ponche</label>
        <select class="form-control" id="punchType" v-model="punchStatus">
          <option v-for="(punch, index) in punchTypeData" :key="index">
            {{ punch }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!getCurrentPunchStatus"
      >
        Guardar
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Punches",
  data() {
    return { errors: [], punchStatus: "Break" };
  },
  methods: {
    ...mapActions([
      "addPunch",
      "incrementBreakCounter",
      "incrementLunchCounter",
    ]),
    onSubmit() {
      if (this.getBreakCounter >= 2) {
        this.errors.push("Solo puede tomar 2 breaks");
      }

      if (this.getLunchCounter >= 1) {
        this.errors.push("Solo puede tomar 1 almuerzo");
      }

      if (!this.errors.length) {
        if (this.punchStatus === "Break") {
          this.incrementBreakCounter();
        }

        if (this.punchStatus === "Almuerzo") {
          this.incrementLunchCounter();
        }

        this.addPunch(this.punchStatus);
      }
    },
  },
  computed: {
    ...mapGetters([
      "getCurrentPunchStatus",
      "getBreakCounter",
      "getLunchCounter",
    ]),
    punchTypeData() {
      const data = ["Break", "Almuerzo", "Salida"];
      if (
        this.getCurrentPunchStatus &&
        this.getCurrentPunchStatus !== "Entrada"
      ) {
        data.push("Entrada");
      }

      return data;
    },
  },
};
</script>

<style scoped>
</style>