<script>
import {Category} from "@/publishing/model/category.entity.js";
import {CategoryService} from "@/publishing/services/category.service.js";

export default {
  name: "category-management",
  data() {
    return {
      title: { singular: 'Category', plural: 'Categories' },

      categories: [],

      category: new Category({}),

      selectedCategories: [],

      categoryService: null,

      createAndEditDialogIsVisible: false,

      isEdit: false,

      submitted: false
    }
  },
  methods: {
    onNewItem() {

    },
    onEditItem() {

    },
    onDeleteItem() {

    },
    onDeleteSelectedItems() {

    },
    onCancelRequested() {

    },
    onSaveRequested() {

    },
    created() {
      this.categoryService = new CategoryService();
      this.categoryService.getAll().then(response => {
        this.categories = response.data.map(category => new Category(category));
        console.log(this.categories);
      }).catch(error => console.log(error));
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>