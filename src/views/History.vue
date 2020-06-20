<template>
    <div>
  <div class="page-title">
    <h3>{{"History_" | localize}}</h3>
  </div>

  <div class="history-chart">
    <canvas ref="canvas"></canvas>
  </div>

  <Loader v-if="loading"/>

  <p class="center" v-else-if="!records.length">
    {{"Records_are_absent" | localize}}<router-link to="/record">{{"Here" | localize}}</router-link>
  </p>

  <section v-else>
    <historyTable 
      :records="items"
    />

    <Paginate 
      v-if="pageCount > 1"
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination center'"
      :page-class="'waves-effect'"
    />

  </section>
</div>
</template>

<script>
import historyTable from "@/components/app/historyTable";
import PaginationMixin from "@/mixins/paginationMixin";

import { Pie } from "vue-chartjs";

export default {
  metaInfo() {
    return {
      title: this.$title("History_")
    }
  },
  name: "history",
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    try {
      this.records = await this.$store.dispatch("fetchRecords");
      console.log(`Records ${this.records}\n`);
      const categories = await this.$store.dispatch("fetchCategories");
      console.log(`Categories ${categories}\n`);
      this.setup(categories);

      this.loading = false;
    } catch(e) {
      console.log(e);
    }
  },
  components: {
    historyTable
  },
  extends: Pie
  ,
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map(record => ({
        ...record,
        categoryName: categories.find(c => c.id == record.categoryID).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход"
      })));

      this.renderChart({
            labels: categories.map(c => c.title),
            datasets: [{
                label: 'Расходы по категориям',
                data: categories.map(c => {
                  return this.records.reduce((total, r) => {
                    if(r.categoryID == c.id && r.type == "outcome") {
                      total += r.amount;
                    }
                    // debugger;
                    return total;
                  }, 0);
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        
      });
    }
  }
  ,
  mixins: [
    PaginationMixin
  ]
}
</script>