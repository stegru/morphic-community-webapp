<template>
  <div class="barPreview pl-3 pt-3 pr-3 pb-0">
    <b-row v-if="drawerItems && drawerItems.length > 0">
      <b-col md="6">
        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
          <div v-if="index < preview.drawer.h" class="previewHolder mb-3">
            <PreviewItem :item="item" />
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <div v-for="(item, index) in drawerItems" :key="item.configuration.label">
          <div v-if="index >= preview.drawer.h" class="previewHolder mb-3">
            <PreviewItem :item="item" />
          </div>
        </div>
      </b-col>
    </b-row>
    <div v-else>
      <p class="text-center mt-5 mb-5">
        This bar has no buttons at the moment, click on the <b-link :to="{ name: 'MorphicBar Editor', query: { barId: bar.id } }"><b>Customize</b></b-link> button to add some.
      </p>
    </div>
  </div>
</template>

<style>
  .barPreview {
    background: white;
  }
</style>

<script>
import PreviewItem from "@/components/dashboard/PreviewItem";
import { getCommunityBar } from "@/services/communityService";

export default {
    name: "BarPreview",
    props: {
        barId: String
    },
    components: {
        PreviewItem
    },
    data() {
        return {
            bar: {},
            // configurations
            preview: {
                drawer: {
                    w: 2,
                    h: 5
                }
            }
        };
    },
    computed: {
        drawerItems: function () {
            const data = [];
            if (this.bar.items && this.bar.items.length > 0) {
                for (let i = 0; i < this.bar.items.length; i++) {
                    if (this.bar.items[i].is_primary === false) {
                        data.push(this.bar.items[i]);
                    }
                }
            }
            return data;
        }
    },
    mounted() {
        getCommunityBar(this.communityId, this.barId)
            .then(resp => {
                this.bar = resp.data;
            })
            .catch(err => {
                console.error(err);
            });
    }
};
</script>
