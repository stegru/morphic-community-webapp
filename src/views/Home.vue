<template>
    <b-container>
        <h1>Morphic Community</h1>
        <UserLogin/>
    </b-container>
</template>

<script>

import UserLogin from '@/components/UserLogin'

export default {
  name: 'Home',
  components: {
    UserLogin
  }
}
</script>
