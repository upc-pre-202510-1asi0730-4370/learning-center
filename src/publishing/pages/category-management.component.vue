<script>
import {Category} from "@/publishing/model/category.entity.js";
import {CategoryService} from "@/publishing/services/category.service.js";
import DataManager from "@/shared/components/data-manager.component.vue";
import {Column as PvColumn} from "primevue";
import CategoryItemCreateAndEdit from "@/publishing/componentes/category-item-create-and-edit.component.vue";

export default {
  name: "category-management",
  components: {CategoryItemCreateAndEdit, PvColumn, DataManager},
  data() {
    return {
      title: {singular: 'Category', plural: 'Categories'},

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
    notifySuccessfulAction(message) {
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: message,
        life: 3000,
      });
    },
    findIndexById(id){
      return this.categories.findIndex(category => category.id === id);
    },
    onNewItem() {
      this.category = new Category({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    onEditItem(item) {
      this.category = new Category(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.category = { ...item };
      this.deleteCategory();
    },
    deleteCategory() {
      this.categoryService.delete(this.category.id).then(() => {
        let index = this.findIndexById(this.category.id);
        this.categories.splice(index, 1);
        this.notifySuccessfulAction("Category deleted successfully.");
        console.log(`Delete index: ${index}`);
      }).catch(error => console.log(error));
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedCategories = selectedItems;
      this.deleteSelectedItems();
    },
    deleteSelectedItems(){
      this.selectedCategories.forEach((category) => {
        this.categoryService.delete(category.id).then(() => {
          this.categories = this.categories.filter((i) => i.id !== category.id);
        });
      });
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      console.log('onSaveRequested');
      this.submitted = true;
      if (this.category.name.trim()) {
        if (item.id) {
          this.updateCategory();
        } else {
          this.createCategory();
        }
      }
    },
    updateCategory() {
      this.categoryService.update(this.category.id, this.category).then(response => {
        console.log('update category');
        let index = this.findIndexById(this.category.id);
        this.categories[index] = new Category(response);
        this.notifySuccessfulAction("Category updated successfully.");
      }).catch(error => console.log(error));
    },
    createCategory() {
      this.categoryService.create(this.category).then(response => {
        let category = new Category(response);
        this.categories.push(category);
        this.notifySuccessfulAction("Category created successfully.");
      }).catch(error => console.log(error));
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
  <div class="w-full">
    <data-manager :title="title"
                  :items="categories"
                  @new-item-requested="onNewItem"
                  @edit-item-requested="onEditItem($event)"
                  @delete-item-requested="onDeleteItem($event)"
                  @delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <pv-column field="id" header="Id" :sortable="true" />
        <pv-column field="name" header="Name" :sortable="true" />
      </template>
    </data-manager>

    <!-- Dialog - Category Item Create and Edit -->
    <category-item-create-and-edit
      :edit="isEdit"
      :item="category"
      :visible="createAndEditDialogIsVisible"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested($event)" />
  </div>
</template>

<style scoped>

</style>