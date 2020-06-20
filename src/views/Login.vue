<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"App_name" | localize}}</span>
      <div class="input-field">
        <input
            v-model.trim="email"
            id="email"
            type="email"
            :class="{ 'invalid' : ($v.email.$dirty && (!$v.email.required || !$v.email.email)) }"
        >
        <label for="email">Email</label>
        <small 
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >
          {{"Incorrect_email" | localize}}
        </small>
        <small 
          v-else-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >
          {{"Empty_email" | localize}}
        </small>
      </div>
      <div class="input-field">
        <input
            v-model="password"
            id="password"
            type="password"
            :class="{invalid : ($v.password.$dirty && (!$v.password.required || !$v.password.minLength))}"
        >
        <label for="password">{{"Password" | localize}}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required" 
          class="helper-text invalid"
        >
          {{"Enter_password" | localize}}
        </small>
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength" 
          class="helper-text invalid"
        >
          {{"Min_password_length" | localize}}{{this.$v.password.$params.minLength.min}}. {{"Now" | localize}} {{this.password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{"Enter" | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"Dont_have_an_account" | localize}}
        <router-link to="/register">{{"Register" | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<style lang="less" scoped>
  form {
    min-width: 320px;
  }
</style>

<script>
import {email, minLength, required} from "vuelidate/lib/validators"
import messages from "@/util/messagesMap";

export default {
  metaInfo() {
    return {
      title: this.$title("Login")
    }
  },
  data: () => ({
    email: "",
    password: "",
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(8),
      required
    }
  },
  mounted() {
    if(messages[this.$route.query['message']]) {
      this.$message(messages[this.$route.query['message']]);
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const loginData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch("login", loginData);
        this.$router.push("/");
      } catch(e) {
        console.log(e);
      }
    }
  },
}
</script>