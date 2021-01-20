<template>

    <b-link class="barItemLink"
            :style="{ color: barItem.configuration.color }"
            @click="$emit('click', {data: item})"
            @mouseover="$emit('mouseover', {data: barItem})"
            @mouseleave="$emit('mouseleave', {data: barItem})"
            :to="focusMode && { path: '/focused/button-edit', query: { barId: barDetails.id, buttonIndex: buttonIndex, communityId: communityId, memberId: memberId } }"
    >{{barItem.configuration.label}}</b-link>


</template>

<style lang="scss">
.barItemLink {
  font-weight: bold;
}

</style>

<script>

import { colors, icons } from "@/utils/constants";
import * as Bar from "@/utils/bar";

export default {
    name: "BarItemLink",
    props: {
        /** @type {BarItem} */
        barItem: Object,
        noImage: Boolean
    },
    data() {
        return {
            colors: colors,
            icons: icons
        };
    },
    computed: {
        buttonIndex: function () {
            return Bar.getItemIndex(this.barItem, this.barDetails);
        },
        /** @return {BarDetails} The bar that the item belongs to. */
        barDetails: function () {
            return Bar.getItemBar(this.barItem);
        }
    }
};
</script>
