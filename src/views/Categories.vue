<template>
    <div>
  <div class="page-title">
  <h3>{{"Categories_" | localize}}</h3>
  </div>
  <section>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <CategoryCreate @created="addNewCategory"/>
      
      <CategoryEdit 
        v-if="categories.length"
        :categories="categories"
        :key="categories.length + updateCount"
        @updated="updateCategories"
      />
      <p v-else class="center">{{"Categories_is_absent" | localize}}</p>
    </div>
  </section>
</div>
</template>

<script>
import CategoryCreate from "@/components/app/CategoryCreate";
import CategoryEdit from "@/components/app/CategoryEdit";

export default {
  metaInfo() {
    return {
      title: this.$title("Categories_")
    }
  },
  name: "Categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
    updateCategories(category) {
      const index = this.categories.findIndex(c => c.id == category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  components: {
    CategoryCreate,
    CategoryEdit
  }
}
</script>