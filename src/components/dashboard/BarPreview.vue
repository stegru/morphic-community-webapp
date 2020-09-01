<template>
  <div class="barPreview pl-3 pt-3 pr-3 pb-0">
    <div v-if="primaryItems && primaryItems.length > 0">
      <div v-for="item in primaryItems" :key="item.configuration.label">
        <PreviewItem v-if="item.is_primary" :item="item" class="mb-3" />
      </div>
    </div>
    <div v-else>
      <p class="text-center mt-5 mb-5">
        This bar has no buttons at the moment, click on the <b-link :to="{ name: 'MorphicBar Editor', query: { barId: bar.id } }"><b>Customize</b></b-link> button to add some.
      </p>
    </div>
    <div class="logoHolder text-center mt-5 m-3">
      <b-img src="/img/logo-color.svg" />
    </div>
  </div>
</template>

<style>
  .barPreview {
    background: white;
    border: 1px solid #002957;
  }
  .barPreview button {
    cursor: default !important;
    line-height: 100%;
    height: 5rem;
  }
  .logoHolder {
    margin: 0 -1.5rem;
    text-align: center;
  }
</style>

<script>
import PreviewItem from '@/components/dashboard/PreviewItem'
import { getCommunityBar } from '@/services/communityService'

export default {
  name: 'BarPreview',
  data () {
    return {
      bar: {}
    }
  },
  props: {
    barData: Object,
    barId: String
  },
  components: {
    PreviewItem
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId },
    primaryItems: function() {
      const data = []
      if (this.bar && this.bar.items && this.bar.items.length > 0) {
        for (let i = 0; i < this.bar.items.length; i++) {
          if (this.bar.items[i].is_primary === true) {
            data.push(this.bar.items[i])
          }
        }
      }
      return data
    }
  },
  mounted () {
    if (this.barId) {
      getCommunityBar(this.communityId, this.barId)
        .then(resp => {
          this.bar = resp.data
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      // the data comes in the bar prop
      this.bar = this.barData
    }
  }
}
</script>
