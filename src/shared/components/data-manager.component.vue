<script>
import { FilterMatchMode } from '@primevue/core/api';

export default {
  name: "data-manager",
  data() {
    return {
      /**
       * @type {Array}
       * @description Array of currently selected items in the data table
       */
      selectedItems: [],

      /**
       * @description Filter configuration for the data table
       */
      filters: null
    }
  },
  props: {
    items: { type: Array, required: true },
    title: { type: { singular: '', plural: '' }, required: true },
    dynamic: { type: Boolean, default: false },
    columns: { type: Array, default: [] },
  },
  emits: ['new-item-requested', 'edit-item-requested'],
  methods: {
    newItem() {
      this.$emit('new-item-requested');
    },
    exportToCsv() {
      this.$refs.exportToCsv();
    },
    editItem(item) {
      this.$emit('edit-item-requested', item);
    },
    confirmDeleteSelected() {
      this.$confirm.require({
        message: `Are you sure you want to delete the selected ${this.title.plural}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Delete',
        accept: () => this.$emit('delete-selected-item-requested', this.selectedItems),
        reject: () => {}
      });
    },
    confirmDeleteItem(item) {
      this.$confirm.require({
        message: `Are you sure you want to delete this ${this.title.singular}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Delete',
        accept: () => this.$emit('delete-item-requested', item),
        reject: () => {}
      });
    },
    initFilters() {
      this.filters = { global: { value: null, matchMode: FilterMatchMode.CONTAINS } };
    },
    /**
     * Lifecycle hook called after the instance is created
     * Initializes the data table filters
     */
    created() {
      this.initFilters();
    }
  }
}
</script>

<template>
  <h3>Manage {{ title.plural }}</h3>

  <!-- Toolbar Section -->
  <pv-toolbar class="mb-4">
    <template #start>
      <pv-button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click="newItem" />
      <pv-button :disabled="!selectedItems || !selectedItems.length" icon="pi pi-trash" label="Delete" severity="danger" @click="confirmDeleteSelected" />
    </template>
    <template #end>
      <pv-button icon="pi pi-download" label="Export" severity="help" @click="exportToCsv($event)" />
    </template>
  </pv-toolbar>

  <pv-data-table
    ref="dt"
    v-model:selection="selectedItems"
    :filters="filters"
    :paginator="true"
    :rows="10"
    :rows-per-page-options="[10, 20, 50]"
    :values="items"
    current-page-report-template="Showing {first} to {last} of {totalRecords} ${{title.plural}}"
    data-key="id"
    paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPageDropdown">
    <pv-column :exportable="false" selection-mode="multiple" style="width: 3rem" />
    <slot name="custom-columns"></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field" :field="column.field" :header="column.header" />
    <pv-column :exportable="false" style="min-width: 8rem">
      <template #body="slotProps">
        <pv-button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)" />
        <pv-button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)" />
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>

</style>