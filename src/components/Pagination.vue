<template>
  <div class="overflow-auto">
    <b-table
      id="table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="table"
    ></b-pagination>

  </div>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      perPage: 5,
      rows: 0,
      currentPage: 1
    }
  },
  watch: {
    items: function (value) {
      this.rows = this.computeRows(value)
    }
  },
  methods: {
    computeRows () {
      return this.items.length
    }
  }
}
</script>
