<template>
  <Loader v-if="loading"/>
  <p class="center" v-else-if="categories.length == 0">
     {{"Categories_are_absentCreate" | localize}}<router-link to="/categories">{{"Here" | localize}}</router-link>
  </p>
  <div v-else>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <form class="form" @submit.prevent="addRecord">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="cat of categories"
            :key="cat.id"
            :value="cat.id"
          >{{cat.title}}</option>
        </select>
        <label>{{"Choose_the_category" | localize}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{"Income" | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{"Outcome" | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">{{"Amount" | localize}}</label>
        <span 
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          {{"Min_amount" | localize}}{{1 | currency}} .
        </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">{{"Description" | localize}}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >
          {{"Enter_description" | localize}}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Create" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  metaInfo() {
    return {
      title: this.$title("NewRecord_")
    }
  },
  name: "record",
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,

    type: "outcome",
    amount: 1,
    description: ""
  }),
  validations: {
    amount: {
      required,
      minValue: minValue(1)
    },
    description: {
      required
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    if(Object.keys(this.categories).length) { // this.categories != {}
      this.category = this.categories[0].id;
    }
    this.loading = false;

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0)
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy;
    }
  },
  methods: {
    async addRecord() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      try {
        if(this.canCreateRecord) {
          await this.$store.dispatch("addRecord", {
            categoryID: this.category,
            amount: this.amount,
            type: this.type,
            description: this.description,
            date: JSON.stringify(new Date())
          });
          const newBill = this.type == "income" ? this.$store.getters.info.bill + this.amount : this.$store.getters.info.bill - this.amount;
          await this.$store.dispatch("updateInfo", {
            bill: newBill
          })
          this.$message("Запись успешно создана");
          this.$v.$reset;
          this.description = "";
          this.amount = 1;
        } else {
          this.$message("На счету недостаточно средств")
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  computed: {
    canCreateRecord() {
      if(this.type == "income") {
        return true;
      }

      return this.$store.getters.info.bill >= this.amount
    }
  }
}
</script>