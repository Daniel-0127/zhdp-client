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
    myh: {
      type: Boolean,
      default: () => {
      }
    },
    data_:{
      type:Object,
      default: ()=>{
        return {
          address: '故宫博物院',
          address2: '北京市东城区王府井大街88号乐天银泰百货八层',
          lon: '106.660107',
          lat: '29.348399'
        }
      }
    }
  },
  data() {
    return {
      ak: "TvKt8pO9eZWQ9qrGhm08sAgEFUzgiQHx", // 百度的地图密钥
      myMap: null
    };
  },
  updated() {
    this.initMap()
  },
  methods: {
    initMap() {
      // 传入密钥获取地图回调。
      BMPGL(this.ak).then((BMapGL) => {
        // 创建地图实例
        let map = new BMapGL.Map("admap");
        // 创建点坐标 axios => res 获取的初始化定位坐标
        let point = new BMapGL.Point(this.$props.data_.lon, this.$props.data_.lat)

        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 19)

        // 创建点标记
        var marker = new BMapGL.Marker(point);
        map.addOverlay(marker);
// 创建信息窗口
        var opts = {
          width: 200,
          height: 100,
          title: this.$props.data_.address
        };
        var infoWindow = new BMapGL.InfoWindow('地址：'+this.$props.data_.address2, opts);
// 点标记添加点击事件
        marker.addEventListener('click', function () {
          map.openInfoWindow(infoWindow, point); // 开启信息窗口
        });

        //开启鼠标滚轮缩放
        map.enableScrollWheelZoom(true)
        map.setHeading(64.5)

        // 添加比例尺控件
        const scaleCtrl = new BMapGL.ScaleControl();
        map.addControl(scaleCtrl);

        // 添加缩放控件
        const zoomCtrl = new BMapGL.ZoomControl({offset: new BMapGL.Size(20, 65)});
        map.addControl(zoomCtrl);

        // 添加3D控件
        const navi3DCtrl = new BMapGL.NavigationControl3D();
        map.addControl(navi3DCtrl);

        // 创建定位控件
        const locationControl = new BMapGL.LocationControl({
          // 控件的停靠位置（可选，默认左上角）
          anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
          // 控件基于停靠位置的偏移量（可选）
          offset: new BMapGL.Size(14, 20)
        });
        // 将控件添加到地图上
        map.addControl(locationControl);

      }).catch((err) => {
        console.log(err)
      })
    },
  },
  created() {

  }
}
</script>
<style scoped>
:root {

}

#admap {
  width: 100%;
  display: flex;
  z-index: 1;
}
</style>
