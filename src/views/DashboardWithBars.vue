<template>
  <div>
    <b-row>
      <b-col md="4">
        <div class="bg-light rounded p-3">
          <article>
            <b-img src="/img/invite_members.jpg" fluid rounded alt="Invite Members image"></b-img>
            <p class="lead mt-3">
              That's great! Now you have your first Morphic Bar! You can see and manage all of your Morphic Bars on the right.
            </p>
            <p class="lead">
              Now you can start inviting members to your community. Don't worry, it's easy - just <b>click the button</b> you see below!
            </p>
            <p class="text-center mt-5">
              <b-button to="/dashboard/member-invite" variant="primary" size="lg">Invite a person</b-button>
            </p>
          </article>
        </div>
      </b-col>
      <b-col md="8">
        <div class="bg-silver rounded p-3">
          <h4 class="mb-3">Customized Morphic Bars</h4>
          <div v-for="bar in list">
            <MorphicBarListItem class="mb-3" :bar=bar />
            <hr class="mt-5 mb-5">
          </div>
          <div class="text-right">
            <b-button to="/dashboard/morphicbar-preconfigured" variant="primary">Pick or Make a new Morphic Bar</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MorphicBarListItem from '@/components/dashboard/MorphicBarListItem'

export default {
  name: 'Dashboard',
  components: {
    MorphicBarListItem
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "My First MorphicBar",
          options: ["Text Zoom", "Magnifier", "Read Aloud", "Sound Volume", "High Contrast"],
        }
      ]
    }
  }
}
</script>
