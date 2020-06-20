<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
            <h4>{{"Edit" | localize}}</h4>
            </div>

            <form @submit.prevent="editCategory">
            <div class="input-field" >
                <select ref="select" v-model="current">
                <option 
                    v-for="c of categories"
                    :key="c.id"
                    :value="c.id"
                >
                    {{c.title}}
                </option>
                </select>
                <label>{{"Choose_the_category" | localize}}</label>
            </div>

            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model="title"
                    :class="{invalid: $v.title.$dirty && !$v.title.required}"
                >
                <label for="name">{{"Title" | localize}}</label>
                <span 
                    v-if="$v.title.$dirty && !$v.title.required"
                    class="helper-text invalid"
                >
                    {{"Enter_category_name" | localize}}
                </span>
            </div>

            <div class="input-field">
                <input
                    id="limit"
                    type="number"
                    v-model.number="limit"
                    :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
                >
                <label for="limit">{{"Limit" | localize}}</label>
                <span 
                    v-if="$v.limit.$dirty && !$v.limit.minValue"
                    class="helper-text invalid"
                >
                    {{"Min_value" | localize}} {{$v.limit.$params.minValue.min}}
                </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{"Update" | localize}}
                <i class="material-icons right">send</i>
            </button>
            </form>
        </div>
    </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
    props: ["categories"],
    data: () => ({
        select: null,
        title: "",
        limit: 100,
        current: null
    }),
    validations: {
      title: {required},
      limit: {
        minValue: minValue(100)
      }
    },
    created() {
      const {id, title, limit} = this.categories[0];

      this.current = id;
      this.title = title;
      this.limit = limit;
    },
    mounted() {
        this.select = window.M.FormSelect.init(this.$refs.select,);
        window.M.updateTextFields();
    },
    destroyed() {
        if(this.select && this.select.destroy) {
            this.select.destroy;
        }
    },
    watch: {
        current(id) {
          const {title, limit} = this.categories.find(c => c.id == id);
          this.title = title;
          this.limit = limit;
        }
    },
    methods: {
      async editCategory() {
        if(this.$v.$invalid) {
          this.$v.$touch();
          return;
        }
        
        try {
          const categoryData = {
            id: this.current,
            title: this.title,
            limit: this.limit
          };
          await this.$store.dispatch("editCategory", categoryData);
          this.$message("Категория успешно обновлена");
          this.$emit("updated", categoryData);
        } catch (e) {
          console.log(e);
        }
      }
    }
}
</script>