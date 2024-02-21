<template>
  <div class="home">
    <!--创建地图容器-->
    <div id="admap" :style="{height:!myh?'520px':'88vh'}" class="allmap"></div>
  </div>
</template>

<script>

import {BMPGL} from "@/js/bmp.js"

export default {
  name: "MyMap",
  props: {
    myh: Boolean,
    // eslint-disable-next-line vue/require-prop-type-constructor
    required: true,
  },
  data() {
    return {
      ak: "TvKt8pO9eZWQ9qrGhm08sAgEFUzgiQHx", // 百度的地图密钥
      myMap: null
    };
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // 传入密钥获取地图回调。
      BMPGL(this.ak).then((BMapGL) => {
        // 创建地图实例
        let map = new BMapGL.Map("admap");
        // 创建点坐标 axios => res 获取的初始化定位坐标
        let point = new BMapGL.Point(106.660107,29.348399)

        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 19)

        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true)
        map.setHeading(64.5)

        // 添加比例尺控件
        var scaleCtrl = new BMapGL.ScaleControl();
        map.addControl(scaleCtrl);

        // 添加缩放控件
        var zoomCtrl = new BMapGL.ZoomControl();
        map.addControl(zoomCtrl);

        // 添加3D控件
        var navi3DCtrl = new BMapGL.NavigationControl3D();
        map.addControl(navi3DCtrl);

        // 创建城市选择控件
        var cityControl = new BMapGL.CityListControl({
          // 控件基于停靠位置的偏移量（可选）
          offset: new BMapGL.Size(10, 5)
        });
        map.addControl(cityControl);
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  created() {

  }
};
</script>
<style scoped>
:root {

}

#admap {
  width: 100%;
  //height: 520px;
  display: flex;
  z-index: 1;
}
</style>