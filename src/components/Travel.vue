<template>
<div id="travel">
  <img :src="img_path" alt="1">
  <div id="count">
    <p>致力寻找旅行者喜爱的目的地</p>
    <input type="search" placeholder="去哪儿？">
  </div>
</div>
</template>

<script>
export default {
  name: 'Travel',
  data() {
    return {
      img_path: require('@/assets/travel.jpg')
    }
  }
}
</script>

<style scoped>
#travel{
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
