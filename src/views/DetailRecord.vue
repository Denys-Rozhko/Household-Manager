<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{"History_" | localieze}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.typeText }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div 
            class="card"
            :class="[record.typeClass]"
          >
            <div class="card-content white-text">
              <p>{{"Description" | localize}} :{{ record.description }}</p>
              <p>{{"Amount" | localize}} :{{ record.amount }}</p>
              <p>{{"Category" | localize}} :{{ record.categoryName }}</p>

              <small>{{processDate(record.date) | dateTimeFormat("datetime")}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      {{"Record_is_absent" | localize}}
    </p>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title("Detail")
    }
  },
  name: "detail",
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    try {
      const record = await this.$store.dispatch("fetchRecordById", this.$route.params.id);
      const category = await this.$store.dispatch("fetchCategoryById", record.categoryID);

      this.record = {
        ...record,
        categoryName: category.title,
        typeText: record.type == "income" ? "Доход" : "Расход",
        typeClass: record.type == "income" ? "green" : "red"
      }

      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    processDate(date) {
      date = date.slice(1, date.length - 1); // \"dfdfd\" => dfdfd 
      return date;
    }
  }
}
</script>