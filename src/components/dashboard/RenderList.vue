<template>
  <div class="MorphicBarRenderList">
    <b-row>
      <b-col md="5">
        <h6><b>Morphic Bar buttons</b></h6>
        <ul class="small list-unstyled mb-0">
          <li v-for="item in buttons" class="item" :key="item.id">
            <RenderListItem :item="item" />
          </li>
        </ul>
      </b-col>
      <b-col md="7">
        <h6><b>Extra Panel buttons</b></h6>
        <ul class="small list-unstyled mb-0">
          <li v-for="item in extra" class="item" :key="item.id">
            <RenderListItem :item="item" />
          </li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RenderListItem from '@/components/dashboard/RenderListItem'

export default {
  name: 'RenderList',
  props: {
    items: Array
  },
  components: {
    RenderListItem
  },
  computed: {
    buttons () {
      const list = []
      if (this.items.length > 0) {
        for (var i = this.items.length - 1; i >= 0; i--) {
          if (this.items[i].is_primary) {
            list.push(this.items[i])
          }
        }
      }
      return list
    },
    extra () {
      const list = []
      if (this.items.length > 0) {
        for (var i = this.items.length - 1; i >= 0; i--) {
          if (this.items[i].is_primary === false) {
            list.push(this.items[i])
          }
        }
      }
      return list
    }
  }
}
</script>
