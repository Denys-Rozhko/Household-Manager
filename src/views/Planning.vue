<template>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="categories.length == 0">
      {{"Categories_are_absentCreate" | localize}}<router-link to="/categories">{{"Here" | localize}}</router-link>
    </p>
    <div v-else>
      <div class="page-title">
        <h3>{{"Planning_" | localize}}</h3>
        <h4>{{$store.getters.info.bill | currency("RUB")}}</h4>
      </div>

      <section>
        <div 
          v-for="cat of categories"
          :key="cat.id"
        >
          <p>
            <strong>{{cat.title}}:</strong>
            {{cat.spent | currency("RUB")}} /  {{cat.limit | currency("RUB")}}
          </p>
          <div class="progress" v-tooltip="cat.tooltip">
            <div
                class="determinate"
                :class="[cat.progressColor]"
                :style="{width: `${cat.progressPercent}%`  }"
            ></div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import currencyFilter from "@/filters/currencyFilter";
import localizeFilter from "@/filters/localizeFilter"

export default {
  metaInfo() {
    return {
      title: this.$title("Planning_")
    }
  },
  name: "planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    try {
      const records = await this.$store.dispatch("fetchRecords")
      const categories = await this.$store.dispatch("fetchCategories");

      this.categories = categories.map(category => {
        const spent = records
          .filter(r => r.categoryID == category.id &&
                       r.type == "outcome")
          .reduce((total, current) => total + +current.amount, 0);
        
        const percent = 100 * spent / category.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60 
          ? "green"
          : percent < 100
            ? "yellow"
            : "red";

        const tooltipValue = category.limit - spent;
        const tooltip = `${tooltipValue < 0 
            ? localizeFilter("Limit_exceeded_by") 
            : localizeFilter("Left")} ${currencyFilter(Math.abs(tooltipValue))}`;

        return {
          ...category,
          progressPercent,
          progressColor,
          spent,
          tooltip
        }
      });

      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  }
}
</script>