<template>
  <nav>
    <router-link to="/">Home</router-link> 
  </nav>
  <router-view/>
  <FooterComponent></FooterComponent>

</template>

<script>
import FooterComponent from "@/components/footer/FooterComponent"

export default {
  data() {
      return {

      }
  },

  components: {
      FooterComponent: FooterComponent,
  }
}
</script>
<style>

</style>
