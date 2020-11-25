<template>
  <div class="MorphicBarRenderList">
    <b-row>
      <b-col md="5">
        <h6><b>Morphic Bar buttons</b></h6>
        <ul class="small list-unstyled mb-0">
          <li v-for="item in primaryItems" class="item" :key="item.configuration.label">
            <RenderListItem :item="item" />
          </li>
        </ul>
      </b-col>
      <b-col md="7">
        <h6><b>Extra Panel buttons</b></h6>
        <ul class="small list-unstyled mb-0">
          <li v-for="item in extraItems" class="item" :key="item.configuration.label">
            <RenderListItem :item="item" />
          </li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RenderListItem from "@/components/dashboard/RenderListItem";
import { getCommunityBar } from "@/services/communityService";

export default {
    name: "RenderList",
    props: {
        barId: String
    },
    components: {
        RenderListItem
    },
    data() {
        return {
            primaryItems: [],
            extraItems: []
        };
    },
    computed: {
        communityId: function () { return this.$store.getters.communityId; }
    },
    mounted() {
        getCommunityBar(this.communityId, this.barId)
            .then(resp => {
                const items = resp.data.items;
                if (items.length > 0) {
                    for (var i = items.length - 1; i >= 0; i--) {
                        if (items[i].is_primary) {
                            this.primaryItems.push(items[i]);
                        } else {
                            this.extraItems.push(items[i]);
                        }
                    }
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
};
</script>
