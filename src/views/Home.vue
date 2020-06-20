<template>
  <div>
        <div class="page-title">
          <h3>{{"Bill_" | localize}}</h3>

          <button class="btn waves-effect waves-light btn-small" @click="refresh">
            <i class="material-icons">refresh</i>
          </button>
        </div>  

        <Loader v-if="loading" />

        <div v-else class="row">
          <HomeBill 
            :rates="this.currency.rates"
          />
          <HomeCurrency 
            :date="currency.date"
            :rates="currency.rates"
          />
          
        </div>
      </div>
</template>

<script>
import HomeBill from "@/components/app/HomeBill";
import HomeCurrency from "@/components/app/HomeCurrency";

export default {
  metaInfo() {
    return {
      title: this.$title("Home")
    }
  },
  name: "Home",
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    try {
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async refresh() {
      try {
        this.loading = true;
        this.currency = await this.$store.dispatch("fetchCurrency");
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
};
</script>
