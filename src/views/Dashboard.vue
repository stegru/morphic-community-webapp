<template>
  <div id="morphicBarList">
    <div class="bg-light rounded p-3">
      <b-row>
        <b-col md="6">
          <h4>Your Community</h4>
        </b-col>
        <b-col md="6">
          <div class="text-right">
            <b-button to="/dashboard/member-invite" variant="primary" class="ml-1">Invite New Member</b-button>
          </div>
        </b-col>
      </b-row>
      <hr>
      <div v-if="list.length > 0" class="memberItemList">
        <div v-for="(member, index) in list"
          class="memberItem p-2"
          :rel="index"
          @click="setActive(index)"
          :class="{even: index % 2 === 0, odd: index % 2 !== 0, active: isActive(index)}"
          >
          <MemberListItem :member=member />
        </div>
      </div>
      <div v-else>
        You don't have any members in your community, use the <b>Invite button</b> above to get started.
      </div>
    </div>
  </div>
</template>

<style>
  .memberItem {
    cursor: pointer;
  }
  .memberItem.odd {
    background: #eee;
  }
  .memberItem.active {
    background: #ccc;
  }
</style>

<script>

import MemberListItem from '@/components/dashboard/MemberListItem'

export default {
  name: 'DashboardFull',
  components: {
    MemberListItem
  },
  methods: {
    setActive: function(rowIndex) {
      // making all of the items inactive first
      for (var i = this.list.length - 1; i >= 0; i--) {
        this.list[i].listActive = false;
      }
      // making active only the right one
      this.list[rowIndex].listActive = true;
    },
    setInactive: function(rowIndex) {
      // making inactive the right row
      this.list[rowIndex].listActive = false;
    },
    isActive: function(rowIndex) {
      if (this.list[rowIndex].listActive) {
        // returns true if the item is active
        return true;
      }
      // returns false by default
      return false;
    }
  },
  data() {
    return {
      // Full Dashboard example data
      // in the future this needs to use the Vue Storage
      list: [
        {
          id: 1,
          name: "John Smith",
          status: "invited",
          listActive: false,
          bar: {
            id: 100,
            status: "applied",
            shared: false,
            options: [
              { color: "blue", text: "Text Zoom"},
              { color: "red", text: "Magnifier"},
              { color: "teal", text: "Read Aloud"},
              { color: "orange", text: "Sound Volume"},
              { color: "green", text: "High Contrast"},
            ],
            extra: [
              { color: "blue", text: "Reddit"},
              { color: "red", text: "Call Mom"},
              { color: "teal", text: "Open Task Manager"},
              { color: "green", text: "Photos Folder"},
            ]
          }
        },
        {
          id: 2,
          name: "Karoline",
          status: "accepted",
          listActive: false,
          bar: {
            id: 100,
            status: "applied",
            shared: true,
            options: [
              { color: "blue", text: "Text Zoom"},
              { color: "red", text: "Magnifier"},
              { color: "teal", text: "Read Aloud"},
              { color: "orange", text: "Sound Volume"},
              { color: "green", text: "High Contrast"},
            ],
            extra: [
              { color: "blue", text: "Reddit"},
              { color: "red", text: "Call Mom"},
              { color: "teal", text: "Open Task Manager"},
              { color: "green", text: "Photos Folder"},
            ]
          }
        },
        {
          id: 3,
          name: "Jane Allister",
          status: "accepted",
          listActive: false,
          bar: {
            id: 100,
            status: "applied",
            shared: true,
            options: [
              { color: "blue", text: "Text Zoom"},
              { color: "red", text: "Magnifier"},
              { color: "teal", text: "Read Aloud"},
              { color: "orange", text: "Sound Volume"},
              { color: "green", text: "High Contrast"},
            ],
            extra: [
              { color: "blue", text: "Reddit"},
              { color: "red", text: "Call Mom"},
              { color: "teal", text: "Open Task Manager"},
              { color: "green", text: "Photos Folder"},
            ]
          }
        },
        {
          id: 4,
          name: "Cp. Pierce",
          status: "not-invited",
          listActive: false,
          bar: {
            id: 0,
            status: "missing",
            shared: false,
            options: [],
            extra: []
          }
        },
        {
          id: 5,
          name: "Jill Valentine",
          status: "accepted",
          listActive: false,
          bar: {
            id: 100,
            status: "not-applied",
            shared: false,
            options: [
              { color: "blue", text: "Text Zoom"},
              { color: "red", text: "Magnifier"},
              { color: "teal", text: "Read Aloud"},
              { color: "orange", text: "Sound Volume"},
              { color: "green", text: "High Contrast"},
            ],
            extra: [
              { color: "blue", text: "Reddit"},
              { color: "red", text: "Call Mom"},
              { color: "teal", text: "Open Task Manager"},
              { color: "green", text: "Photos Folder"},
            ],
            notApplied: {
              options: [
                { color: "green", text: "High Contrast"},
                { color: "red", text: "Magnifier"},
                { color: "blue", text: "Text Zoom"},
                { color: "orange", text: "Sound Volume"},
                { color: "teal", text: "Read Aloud"},
              ],
              extra: [
                { color: "red", text: "Call Mom"},
                { color: "green", text: "Photos Folder"},
              ]
            }
          }
        }
      ],

      // OLD data
      oldList: [
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
