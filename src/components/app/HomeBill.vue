<template>
    <div class="col s12 m6 l4">
            <div class="card light-blue bill-card">
              <div class="card-content white-text">
                <span class="card-title">{{"Bill_in_currency" | localize}}</span>

                <p 
                  class="currency-line"
                  v-for="cur of currencies"
                  :key="cur">
                  <span>{{getCurrency(cur) | currency(cur)}}</span>
                </p>
              </div>
            </div>
          </div>
</template>

<script>
export default {
  props: ["rates"],
  data: () => ({
    currencies: ["RUB", "USD" , "EUR"]
  }),
  methods: {
    getCurrency(currency) {
      return this.$store.getters.info.bill * this.rates[currency];
    }
  }
}
</script>