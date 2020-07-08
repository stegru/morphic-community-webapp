<template>
  <div>
    <b-row>
      <b-col md="12">
        <div class="bg-silver rounded p-3">
          <article>
            <b-img src="/img/dashboard-intro.jpg" fluid rounded alt="Dashboard Intro Image"></b-img>
            <p class="lead mt-3">
              Before you get started with creating the Morphic Bar please chooce if you want to start with a blank state, or with our pre-created configurations
            </p>
            <p class="text-center mt-5">
              <b-button to="/dashboard/morphicbar-editor" variant="primary">I want to make my own</b-button>
              <b-button to="/dashboard/morphicbar-preconfigured" variant="success" class="ml-1">Let me look at several options first</b-button>
              <b-button to="/dashboard/welcome" variant="outline-secondary" class="ml-1">Cancel</b-button>
            </p>
          </article>
        </div>
      </b-col>
    </b-row>
  </div>
</template>