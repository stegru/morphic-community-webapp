<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h3>About Morphic Lite</h3>
        <br/>
        <p>Etiam gravida, orci ut fermentum pharetra, diam mauris aliquam ex, in malesuada felis sem in libero. Aliquam ac risus scelerisque, suscipit enim eget, facilisis orci. Ut dignissim consectetur neque, id dapibus nisl efficitur a. Aenean lobortis tempus libero, vitae mattis risus aliquet ut. Nunc egestas arcu nunc, ut eleifend enim pharetra a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit neque non tortor vestibulum pharetra. Integer laoreet enim quis nisi scelerisque laoreet. Morbi sit amet enim quis mauris viverra venenatis quis vitae nisl.</p>
        <br/>
        <b-row>
          <b-col>
            <b-embed
              type="iframe"
              aspect="4by3"
              src="https://maps.google.com/maps?q=manhatan&z=13&output=embed">
            </b-embed>
          </b-col>
          <b-col>
            <h4>Address information</h4>
            <p>Etiam ornare odio id urna commodo, at dignissim velit gravida. Phasellus pharetra nisl leo, ut gravida nisl convallis eu.</p>
            <p>Nullam id turpis sed felis tincidunt mollis. Phasellus ac dolor condimentum, interdum mauris sed, fermentum ligula.
            Morbi sit amet enim quis mauris viverra venenatis quis vitae nisl.</p>
          </b-col>
        </b-row>
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
