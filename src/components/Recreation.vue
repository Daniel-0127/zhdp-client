<template>
<div id="recreation">
  <img :src="img_path" alt="1">
  <div id="count">
    <p>休闲娱乐</p>
    <input prefix="md-search" type="search" placeholder="休闲娱乐">
  </div>
</div>
</template>

<script>
export default {
  name: 'Recreation',
  data() {
    return {
      img_path: require('@/assets/recreation.jpg')
    }
  }
}
</script>

<style scoped>
#recreation{
  height: 500px;
}
img{
  width: 100%;
  height: 100%;
}
#count {
  margin-top: -350px;
  margin-bottom: 200px;
  text-align: center;
}

#count p {
  font-weight: bolder;
  font-size: 33px;
  color: white;

}

#count input {
  width: 80%;
  height: 60px;
  margin-top: 30px;
  border-radius: 27px;
  border: none;
  text-indent: 40px;
  font-size: 20px;
}
</style>
