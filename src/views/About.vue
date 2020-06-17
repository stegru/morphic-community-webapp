<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h3>About Morphic Community</h3>
        <p>Etiam gravida, orci ut fermentum pharetra, diam mauris aliquam ex, in malesuada felis sem in libero. Aliquam ac risus scelerisque, suscipit enim eget, facilisis orci. Ut dignissim consectetur neque, id dapibus nisl efficitur a. Aenean lobortis tempus libero, vitae mattis risus aliquet ut. Nunc egestas arcu nunc, ut eleifend enim pharetra a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit neque non tortor vestibulum pharetra. Integer laoreet enim quis nisi scelerisque laoreet. Morbi sit amet enim quis mauris viverra venenatis quis vitae nisl. </p>
        <p>Etiam ornare odio id urna commodo, at dignissim velit gravida. Phasellus pharetra nisl leo, ut gravida nisl convallis eu. Etiam vestibulum nunc purus, at ultricies magna rhoncus ut. Mauris auctor diam quis mi rutrum semper. Nullam id turpis sed felis tincidunt mollis. Phasellus ac dolor condimentum, interdum mauris sed, fermentum ligula. Curabitur venenatis, purus ut porta facilisis, justo ante vehicula mauris, id pharetra neque risus et ipsum. Aenean consectetur ac felis non eleifend. Vestibulum posuere mi eget ultrices euismod. Suspendisse diam nibh, maximus vitae ullamcorper eu, faucibus a diam. Ut interdum dolor in risus mollis, a venenatis ligula lacinia. Quisque pharetra imperdiet tortor, a iaculis erat placerat in. </p>
      </b-col>
      <b-col cols="3">
        <InfoLogin />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import InfoLogin from '@/components/InfoLogin'

  export default {
    components: {
      InfoLogin
    }
  }
</script>