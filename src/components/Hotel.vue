<template>
  <div id="hotel">
    <img :src="img_path" alt="1">
    <div id="count">
      <p>最新点评， 对比低价。</p>
      <input type="search" placeholder="酒店名称或目的地">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Hotel',
  data() {
    return {
      img_path: require('@/assets/hotel.jpg')
    }
  }
}
</script>

<style scoped>
#hotel {
  height: 500px;
}

img {
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
