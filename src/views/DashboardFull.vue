<template>
  <div id="morphicBarList">
    <div class="morphicBarItem mb-3" v-for="bar in list">
      <b-row>
        <b-col md="5">
          <div class="bg-light rounded p-3">
            <h4>Your Community</h4>
            <MemberPills :members=bar.members />
          </div>
        </b-col>
        <b-col md="7">
          <div class="bg-silver rounded p-3">
            <h4>Customized Morphic Bars</h4>
            <MorphicBarListItem :bar=bar />
          </div>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col md="5">
        <div class="bg-light rounded p-3">
          <b-button to="/dashboard/member-invite" variant="primary" class="ml-1">Invite New Member</b-button>
        </div>
      </b-col>
      <b-col md="7">
        <div class="bg-silver rounded p-3 text-right">
          <b-button to="/dashboard/morphicbar-preconfigured" variant="primary">Pick or Make a new Morphic Bar</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import MemberPills from '@/components/dashboard/MemberPills'
import MorphicBarListItem from '@/components/dashboard/MorphicBarListItem'

export default {
  name: 'DashboardFull',
  components: {
    MemberPills,
    MorphicBarListItem
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "My First MorphicBar",
          options: ["Text Zoom", "Magnifier", "Read Aloud", "Sound Volume", "High Contrast"],
          members: [
            {
              id: 1,
              name: "John Smith",
              status: "invited"
            },
            {
              id: 2,
              name: "Karoline",
              status: "invited"
            },
            {
              id: 3,
              name: "Dan McDan",
              status: "accepted"
            }
          ]
        },
        {
          id: 2,
          name: "My Second MorphicBar",
          options: ["Magnifier", "Text Zoom", "High Contrast", "Read Aloud", "Sound Volume"],
          members: []
        },
        {
          id: 3,
          name: "My Third MorphicBar",
          options: ["High Contrast", "Text Zoom", "Read Aloud", "Sound Volume", "Magnifier"],
          members: [
            {
              id: 4,
              name: "Jody La Forge",
              status: "accepted"
            },
            {
              id: 5,
              name: "Cp. Kirk",
              status: "accepted"
            }
          ]
        }
      ]
    }
  }
}  
</script>
