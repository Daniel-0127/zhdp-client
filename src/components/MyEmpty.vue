<template>
  <div>213213</div>
</template>

<script>
export default {
  name: 'MyEmpty',
  created() {
    this.$router.push({ path: this.$route.query.path_ })
  }
}
</script>

<style scoped>

</style>
