<template>
  <div class="overflow-auto">
    <b-table
      id="table"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="success">
          Ask to Join
        </b-button>
      </template>
    </b-table>

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
      currentPage: 1,
      fields: [
        { key: 'community', label: 'Community' },
        { key: 'url', label: 'URL' },
        { key: 'type', label: 'Type' },
        { key: 'members', label: 'Members' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
      ]
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
