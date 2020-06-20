<template>
    <div>
  <div class="page-title">
    <h3>{{"ProfileTitle" | localize}}</h3>
  </div>

  <form class="form" @submit.prevent="onSubmit">
    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
      >
      <label for="description">{{"Name" | localize}}</label>
      <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
      >{{"EnterNameMessage" | localize}}</span>
    </div>

    <div class="switch">
      <label>
        English
        <input 
          type="checkbox"
          v-model="isRuLocale">
        <span class="lever"></span>
        Русский
      </label>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{"Update" | localize}}
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>

<script>
import { required } from "vuelidate/src/validators";

export default {
  metaInfo() {
    return {
      title: this.$title("ProfileTitle")
    }
  },
  data: () => ({
    name: "",
    isRuLocale: true
  }),
  validations: {
    name: {
      required
    }
  },
  mounted() {
    this.name = this.$store.getters.info.name;
    this.isRuLocale = this.$store.getters.info.locale == "ru-RU";
    setTimeout(() => window.M.updateTextFields(), 0);
  }, 
  methods: {
    async onSubmit() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      await this.$store.dispatch("updateInfo", {
        name: this.name,
        locale: this.isRuLocale ? "ru-RU" : "en-US"
      });
    }
  }
}
</script>