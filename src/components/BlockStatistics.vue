<template>
  <div id="stats" class="mt-4">
    <b-row>
      <b-col md="3" class="text-center pt-4 pb-4">
        <h4>6</h4>
        <hr>
        <p>Functions</p>
      </b-col>
      <b-col md="3" class="text-center pt-4 pb-4">
        <h4>43,223</h4>
        <hr>
        <p>Morphic Lite Installs</p>
      </b-col>
      <b-col md="3" class="text-center pt-4 pb-4">
        <h4>27</h4>
        <hr>
        <p>Communities</p>
      </b-col>
      <b-col md="3" class="text-center pt-4 pb-4">
        <h4>7,124</h4>
        <hr>
        <p>Community Members</p>
      </b-col>
    </b-row>
  </div>
</template>

<style>
  #stats {
    border-radius: .3rem;
    background: #002957;
    color: white;
  }
  #stats h4 {
    font-weight: 800;
    font-size: 32pt;
  }
  #stats hr {
    display: inline-block;
    width: 30%;
    border-top: 2px solid white;
  }
</style>
