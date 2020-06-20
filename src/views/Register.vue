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
        {{"Min_password_length" | localize}}{{this.$v.password.$params.minLength.min}} {{this.$v.password.$params.minLength.min}}. {{"Now" | localize}} {{this.password.length}}
      </small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid : ($v.name.$dirty && !$v.name.required)}"
      >
      <label for="name">{{"Name" | localize}}</label>
      <small
        v-if="$v.name.$dirty && !$v.name.required" 
        class="helper-text invalid"
      >
        {{"Enter_your_name" | localize}}
      </small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree" />
        <span>{{"I_agree_with_the_rules" | localize}}</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        {{"Register" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      {{"Alreagy_have_an_account" | localize}}?
      <router-link to="/login">{{"Enter" | localize}}!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators"

export default {
  metaInfo() {
    return {
      title: this.$title("RegisterTitle")
    }
  },
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(8),
      required
    },
    name: {
      required
    },
    agree: {
      checked: value => value
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try{
        await this.$store.dispatch("register", {
          email: this.email,
          password: this.password,
          name: this.name
        });
        this.$router.push("/");
      } catch(e) {
        console.log(e);
      }
    }
  },
}
</script>