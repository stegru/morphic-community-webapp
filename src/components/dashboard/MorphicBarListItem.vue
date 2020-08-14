<template>
  <div class="bg-silver rounded p-3">
    <b-row>
      <b-col md="9">
        <div v-if="barDetails.name == 'Default'">
          <h5><b>Starter Bar for Morphic Community</b></h5>
          <p>When you invite somebody to your community, this is the default Morphic Bar they will see. You can customize this Bar and make a personal bar for specific people.</p>
        </div>
        <div v-else>
          <h5><b>{{ barDetails.name }}</b></h5>
        </div>
      </b-col>
      <b-col md="3">
        <div class="text-right small">
          <span v-if="bar.showDetails" @click="bar.showDetails = false">(<b-link>Hide Details</b-link>)</span>
          <span v-else @click="bar.showDetails = true">(<b-link>Show Details</b-link>)</span>
        </div>
      </b-col>
    </b-row>
    <b-row :class="{ 'd-none': bar.showDetails === false }">
      <b-col md="9">
        <div v-if="barDetails.name == 'Default'" class="desktop">
          <div class="taskbarMac"></div>
          <b-row>
            <b-col md="6">
              <div class="desktopHolder text-center mt-3">
                <img src="/img/logo-color.svg" alt="icon" class="iconMorphic"><br>
                <p>Open Morphic</p>
              </div>
            </b-col>
            <b-col md="6">
              <BarPreview :barId="bar.id" />
            </b-col>
          </b-row>
          <div class="taskbarWindows"></div>
        </div>
        <RenderList v-else-if="barDetails.items" :barId="bar.id" />
        <div v-else>No items</div>
      </b-col>
      <b-col md="3">
        <div v-if="barDetails.name == 'Default'">
          <b-button :to="{ name: 'MorphicBar Editor', query: { barId: barDetails.id } }" size="sm" variant="primary" class="btn-block mt-1">Customize Starter Bar</b-button>
        </div>
        <div v-else class="text-right">
          <b-button size="sm" variant="secondary" class="btn-block mt-1" @click="emitModalEvent">Make a Copy</b-button>
          <b-button size="sm" variant="light" class="btn-block" @click="emitPreviewEvent">Preview</b-button>
          <b-button :to="{ name: 'MorphicBar Editor', query: { barId: barDetails.id } }" size="sm" variant="primary" class="btn-block mt-1">Edit</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss">
  .desktop {
    background: url(/img/wallpaper.jpg) no-repeat bottom right;
    .desktopHolder {
      width: 100px;
      .iconMorphic {
        background: white;
        padding: .5rem;
        border-radius: 100%;
      }
      p {
        line-height: 120%;
      }
    }
    .taskbarMac {
      height: 28px;
      background: url(/img/taskbarMac.png) no-repeat top right;
    }
    .taskbarWindows {
      height: 40px;
      background: url(/img/taskbarWindows.png) no-repeat top right;
    }
  }
</style>

<script>
import RenderList from '@/components/dashboard/RenderList'
import PreviewList from '@/components/dashboard/PreviewList'
import BarPreview from '@/components/dashboard/BarPreview'
import { getCommunityBar } from '@/services/communityService'

export default {
  name: 'MorphicBarListItem',
  components: {
    RenderList,
    PreviewList,
    BarPreview
  },
  props: {
    bar: Object
  },
  data () {
    return {
      barDetails: {}
    }
  },
  computed: {
    communityId: function () { return this.$store.getters.communityId }
  },
  mounted () {
    getCommunityBar(this.communityId, this.bar.id)
      .then(resp => {
        this.barDetails = resp.data
        this.bar.items = resp.data.items
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    emitModalEvent: function () {
      this.$emit('open-modal', this.barDetails)
    },
    emitPreviewEvent: function () {
      this.$emit('preview-modal', this.barDetails)
    }
  }
}
</script>
