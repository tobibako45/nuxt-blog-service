<template>
  <div>
    <TheHeader/>
    <div class="wrapper">
      <div class="container">
        <nuxt class="container"/>
      </div>
    </div>
  </div>
</template>

<script>
    import TheHeader from "../components/TheHeader";

    export default {
        components: {
            TheHeader
        }
    }
</script>
