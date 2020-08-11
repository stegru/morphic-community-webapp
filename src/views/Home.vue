<template>
  <div>
    <b-alert variant="success" :show="showMessage">
      <span> {{ messageData }}</span>
    </b-alert>
    <BlockLoginRegister />
  </div>
</template>

<script>
import BlockLoginRegister from '@/components/BlockLoginRegister'
import { MESSAGES } from '@/utils/constants'

export default {
  name: 'Home',
  components: {
    BlockLoginRegister
  },
  data () {
    return {
      showMessage: false,
      messageData: MESSAGES.sessionTimedOut
    }
  },
  props: {
    messageId: String
  },
  mounted () {
    if (this.messageId) {
      this.showMessage = true
    }
  }
}
</script>
