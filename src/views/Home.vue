<template>
  <div>
    <b-jumbotron class="mb-0" id="splash">
      <b-row>
        <b-col lg="6"></b-col>
        <b-col md="12" lg="6" class="text-right text-white">
          <h1>Welcome to Morphic Community</h1>
          <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultrices est lacus, id gravida quam placerat vitae.</p>
          <hr class="my-4">
          <p>Phasellus tincidunt maximus orci in scelerisque. Nulla enim nisi, dignissim vel quam eu, aliquet efficitur sapien. Morbi eleifend ligula sit amet justo vestibulum euismod.</p>
          <p>
            <b-button to="/registration" size="lg" variant="primary" class="mb-2">Register Community</b-button>
            <b-button to="/registration" size="lg" variant="success" class="mb-2">Download Morphic Lite</b-button>
          </p>
        </b-col>
      </b-row>
    </b-jumbotron>

    <BlockStatistics />

    <BlockHowItWorks />

    <b-jumbotron class="mt-4" id="intro-1">
      <b-row>
        <b-col md="12" lg="6">
          <h1>What's Morphic Lite?</h1>
          <p class="lead">
            Praesent varius risus at sapien fringilla euismod. Vestibulum elementum ultrices nibh, eget fringilla sapien facilisis vel. Donec congue vulputate ipsum sit amet pellentesque. Sed facilisis lacus condimentum quam aliquam eleifend. Phasellus quis lacus at quam gravida condimentum non et augue. Nulla vel eros iaculis, porta magna vel, tincidunt nisi.
          </p>
          <p>
            <b-button to="/about-morphic" size="lg" variant="success">Learn More</b-button>
          </p>
        </b-col>
      </b-row>
    </b-jumbotron>

    <b-jumbotron id="intro-2">
      <b-row>
        <b-col lg="6"></b-col>
        <b-col md="12" lg="6" class="text-right text-white">
          <h1>How Morphic Community can help you:</h1>
          <ul>
            <li>
              <h4 class="text-warning">First Reason</h4>
              <p>Nullam in tincidunt odio. Ut mattis, dui at finibus auctor.</p>
            </li>
            <li>
              <h4 class="text-warning">Second Reason</h4>
              <p>Pellentesque interdum congue est id tincidunt.</p>
            </li>
            <li>
              <h4 class="text-warning">Third Reason</h4>
              <p>Morbi finibus pulvinar quam vitae gravida. Vivamus faucibus nulla sodales finibus faucibus.</p>
            </li>
            <li>
              <h4 class="text-warning">Fourth Reason</h4>
              <p>Duis vel imperdiet diam, sit amet pretium nisi.</p>
            </li>
          </ul>
          <p>
            <b-button to="/our-communities" size="lg" variant="success">Learn More</b-button>
          </p>
        </b-col>
      </b-row>
    </b-jumbotron>
  </div>
</template>

<style>
  #splash, #intro-1, #intro-2 {
    background: url(/img/splashFixed.jpg) no-repeat top center;
    background-size: cover;
  }
  #intro-1 {
    background-image: url(/img/introFixed-1.jpg);
    background-position: bottom center;
  }
  #intro-2 {
    background-image: url(/img/introFixed-2.jpg);
  }
  #intro-2 ul {
      list-style: none;
      margin: 2rem 0 0 0;
      padding: 0;
  }
  #intro-2 h4 {
      margin: 0;
  }
</style>

<script>
import BlockStatistics from '@/components/BlockStatistics'
import BlockHowItWorks from '@/components/BlockHowItWorks'

export default {
  name: 'Home',

  components: {
    BlockStatistics,
    BlockHowItWorks
  }
}
</script>
