<template>
  <div>
    <b-row>
      <b-col cols="9">
        <h3>What is Morphic Community and how to register</h3>
        <p>Aliquam mollis maximus enim eget laoreet. Aliquam semper enim eu efficitur fringilla. Integer non ligula tristique, viverra massa in, euismod orci. Morbi tempor urna ante, ut gravida diam rutrum id. Morbi a diam ut nulla pharetra finibus sed in nulla. Vivamus aliquam ex ac ex posuere efficitur. Etiam nulla lacus, vulputate et convallis eget, tempus ac ligula. In in turpis non lorem porta finibus placerat vitae lorem. Donec sit amet tristique justo. Ut nisl nibh, tempor eget sollicitudin sit amet, luctus sed odio. Etiam aliquam mauris pretium nibh maximus, nec placerat erat malesuada. </p>
        <p>In at varius dui, sed tincidunt lacus. Sed sed dolor non libero tincidunt sagittis. Ut bibendum maximus mi quis eleifend. Ut elit urna, pharetra in est sed, pretium efficitur mauris. Duis at ligula ornare eros hendrerit pellentesque a condimentum diam. Vestibulum sit amet tristique turpis. Nulla eget lectus lectus. Curabitur tincidunt sed urna in porta. Duis sed tristique eros. Nulla porta odio non pulvinar varius. Nunc finibus eros vel porttitor suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus id sem facilisis malesuada. Integer vestibulum varius tincidunt. Etiam tellus leo, scelerisque id malesuada a, iaculis vitae erat. </p>
        <p>Vivamus commodo, risus et porta cursus, dolor massa semper erat, sit amet blandit est leo sed diam. Aenean risus metus, gravida et mauris ac, congue fringilla ex. Aenean consectetur elit odio, vitae viverra quam congue a. Sed eget neque a ligula commodo iaculis. Ut tempor ultricies elementum. Aliquam nec eros a odio accumsan blandit. Aliquam nec nisl quis tortor maximus imperdiet vitae sit amet massa. Ut ligula velit, sodales vitae malesuada congue, elementum id nisi. Nulla id tincidunt augue. Fusce blandit, urna sed sollicitudin euismod, quam sem ultrices augue, ut efficitur velit quam quis ipsum. Curabitur magna lacus, molestie at nulla finibus, sagittis pulvinar nulla. Aenean volutpat arcu a pretium blandit. </p>
        <p>
          <b-link to="/registration" class="btn btn-primary">Register Now</b-link>
        </p>
      </b-col>
      <b-col cols="3">
        <UserLogin />
      </b-col>
    </b-row>
  </div>
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
