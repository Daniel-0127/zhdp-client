<!--店铺详情-->
<template>
  <!--    返回-->
  <a href="javascript:void(0)" title="返回" @click="onBack">
    <left theme="outline" size=42 fill="#333" style="float:left;margin-left: 140px;margin-top: 15px"/>
  </a>

  <div id="body">


    <!--    详情-->
    <div style="padding:12px 0 12px 18px">
      <p style="font-size: 26px;font-weight: bolder">{{ shop.name }}</p>
      <Rate class="title" show-text allow-half disabled v-model="shop.star_shop" style="float:left;">
        <span style="color: #f5a623">{{ shop.star_shop }}</span>
      </Rate>
      <div class="title" style="margin-top: 3px;height: 28px">
        <span style="padding-left: 15px">{{ shop.comment }}条评论</span>
        <span style="padding-left: 15px">口味:&nbsp;{{ shop.star_kw }}</span>
        <span style="padding-left: 15px">环境:&nbsp;{{ shop.star_hj }}</span>
        <span style="padding-left: 15px">服务:&nbsp;{{ shop.star_fw }}</span>
      </div>
      <div class="title">地址:&nbsp;{{ shop.address2 }}
        <a href="javaScript:void(0);">
          <local-two theme="outline" size="20" fill="#2d8cf0" @click="showModal"/>
        </a>
      </div>
      <div class="title">电话:&nbsp;{{ shop.phone }}</div>
      <div style="font-size: 12px">
        <div v-if="!showDetail">
          <a class="title" @click="changeShow">更多信息
            <Icon type="ios-arrow-down"/>
          </a>
        </div>
        <div v-else>
          <a class="title" @click="changeShow">收起
            <Icon type="ios-arrow-up"/>
          </a>
          <div class="title">营业时间:&nbsp;{{ shop.opening_hours }}</div>
          <div class="title">提示信息:&nbsp;此商户为网友创建公共信息，智慧点评聚合展现</div>
        </div>
      </div>

      <div style="margin-top: 20px">

        <Button type="primary" href="#pl" @click="goAnchor('#pl')">
          <Icon type="md-create"/>
          写评论
        </Button>


        <div id="other" style="float:right;">
          <a>
            <share-two theme="outline" size="25" fill="#4a4a4a"/>
          </a>
          <a>
            <star theme="outline" size="25" fill="#4a4a4a"/>
          </a>
          <a>
            <caution theme="outline" size="25" fill="#4a4a4a"/>
          </a>
          <a>
            <Icon type="ios-more" size="28" color="#4a4a4a"/>
          </a>
        </div>
      </div>

    </div>

    <!--    地图-->
    <div>
      <Modal
          v-model="modal"
          :footer-hide="true"
          width="1100"
          :fullscreen="fullscreen"
          :reset-drag-position="true"
          :style="{top:!fullscreen?'75px':'0'}"
      >
        <template #header>
          <p style="color:#f60;text-align:center">
            {{ shop.name }}
            <a href="javaScript:void(0);" style="float:right;margin-right: 32px" @click="fullscreen = !fullscreen">
              <full-screen v-if="!fullscreen" style="position:fixed;margin-top: 60px;z-index: 2;" theme="outline"
                           size="22" fill="#000"/>
              <off-screen v-else theme="outline" style="position:fixed;margin-top: 60px;z-index: 2;" size="24"
                          fill="#000"/>
            </a>
          </p>
        </template>
        <MyMap :myh="fullscreen" :data_="shop"></MyMap>
      </Modal>
    </div>

    <!--    推荐菜-->
    <div style="margin-top: 20px;padding:12px 0 12px 18px">
      <p style="font-size: 21px;font-weight: bolder">推荐菜</p>
      <div style="margin-left: 30px;">
        <ul style="display:table;height:124px;">
          <li style="list-style: none;height: 125px;width:175px;float:left;" v-for="(item,index) in dish" :key="index">
            <a href="javaScript:void(0);" class="dish">
              <img :src="store.state.img_path+item.img" alt="" style="width: 140px;height: 90px;padding:3px;">
              <div>
                <span style="font-size: 13px;margin-left: 3px">{{ item.name }}</span>
                <span style="float:right;margin-right: 3px">{{ item.price }}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <br>

    <!--    促销-->
    <div v-show="voucher.length > 0" style="margin-top: 20px;padding:12px 0 12px 18px">
      <p style="font-size: 21px;font-weight: bolder">优惠促销</p>
      <Grid :col="1" style=" background-color: #fff;">
        <GridItem v-for="(item, index) in voucher" :key="index">
          <GourmetCoupon :type_="item.type" :price_="item.free_price" :limit_="item.full"
                         style="float:left;margin-right: 30px;width: 230px;height: 110px"></GourmetCoupon>
          <div style="font-size: 18px;left: 120px">{{ item.type }}1张</div>
          <div style="font-size: 33px;color: #fa5e00;display: inline;line-height: 120px">￥{{ item.now_price }}</div>
          <div style="text-decoration: line-through;display: inline;">￥{{ item.before_price }}</div>
          <div style="float:right;color: red;width: 50px;">剩余{{ item.amount }}</div>
          <div style="float: right;margin-right: 10%">
            <Button type="primary" @click="grab(item.id,index)">立即抢购</Button>
          </div>
        </GridItem>
      </Grid>
    </div>
    <!--        评论-->
    <GourmetComments></GourmetComments>
    <!--    我要评论-->
    <div style="margin-top: 20px;padding:12px 0 12px 18px" id="myComments">
      <p style="font-size: 21px;font-weight: bolder">我要评价</p>
      <div><span class="span">口味</span>
        <Rate class="title" show-text allow-half v-model="mydata.kw">
          <span style="color: #f5a623">{{ mydata.kw }}</span>
        </Rate>
      </div>
      <div><span class="span">环境</span>
        <Rate class="title" show-text allow-half v-model="mydata.hj">
          <span style="color: #f5a623">{{ mydata.hj }}</span>
        </Rate>
      </div>
      <div><span class="span">服务</span>
        <Rate class="title" show-text allow-half v-model="mydata.fw">
          <span style="color: #f5a623">{{ mydata.fw }}</span>
        </Rate>
      </div>
      <div><span class="span" style="display: block;float:left;">评价</span>
        <Input v-model="mydata.text" type="textarea" :rows="5" placeholder="亲，菜品的口味如何，环境怎么样，服务满意吗？"
               style="width: 80%"/>
      </div>
      <div><span class="span" style="display: block;float:left;">图片</span>
        <div style="display: inline-block;width: 80%;">
          <Upload
              :before-upload="handleUpload"
              accept="file"
              action="/comments/update"
              style="float:left;">
            <Button>上传图片</Button>
          </Upload>
          <span style="font-size: 13px;color: #9d9a9a;line-height: 33px;display: inline-block;margin-bottom: 10px">&nbsp;&nbsp;单张图片不超过10MB，尺寸不小于300*300px，支持jpg、png和bmp格式</span>
          <div>
            <div v-for="(item, index) in files" :key="item">
              <div>
                <Image :src="item" fit="contain" width="120px" height="80px" preview style="float:left;"
                       :preview-list="files" :initial-index="index"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div><span class="span"></span>
        <div
            style="display: inline-block;width: 80%;background: #f6f6f6;font-size: 13px;line-height: 18px;padding: 5px">
          评价和打分都将是其他网友的参考依据，并影响该商户评价。请发布真实、客观的本人消费体验评价。如您收到威逼、利诱如优惠等干扰而发布的评价或并非本人体验的虚假/恶意评价，则评价视为违规，同时影响您的信誉度。
        </div>
      </div>
      <div id="pl"><span class="span"></span>
        <Button type="info" style="width: 120px;" @click="mySubmit">发表评论</Button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Grid, GridItem, Icon, Rate, Input, Button, Upload, Image, Modal
} from 'view-ui-plus'
import {ShareTwo, Star, Caution, LocalTwo, FullScreen, OffScreen, Left} from '@icon-park/vue-next'
import axios from 'axios'
import store from '@/store'
import MyMap from "@/components/MyMap.vue";
import GourmetCoupon from "@/components/gourmet/shop/GourmetCoupon.vue";
import GourmetComments from "@/components/gourmet/shop/GourmetComments.vue";

export default {
  name: 'GourmetShop',
  computed: {
    store() {
      return store
    }
  },
  components: {
    GourmetComments,
    GourmetCoupon,
    FullScreen,
    OffScreen,
    Modal,
    MyMap,
    Image,
    Upload,
    Input,
    Button,
    Left,
    Grid,
    GridItem,
    Icon,
    Rate,
    ShareTwo,
    Star,
    Caution,
    LocalTwo
  },
  data() {
    return {
      shop: {},
      dish: [{
        id: 49,
        img:
            "https://qcloud.dpfile.com/pc/DwzWaL7Ga2Uq7yPS4Zxkg8fzw8_jSDlBYmaP-2NONtxddzh3SIx9_DMt34ghD4vnuzFvxlbkWx5uwqY2qcjixFEuLYk00OmSS1IdNpm8K8sG4JN9RIm2mTKcbLtc2o2vfCF2ubeXzk49OsGrXt_KYDCngOyCwZK-s3fqawWswzk.jpg",
        name:
            "招牌秘制烤鸡",
        price:
            "¥78",
        shop_id:
            "G3nY8eohdIM9nJEA",
        update_time:
            "2024-02-23T11:36:32",
      }],
      voucher: {},
      showDetail: false,
      mydata: {
        kw: 0,
        fw: 0,
        hj: 0,
        text: '',
      },
      file: null,
      loadingStatus: false,
      index: 0,
      files: [],
      modal: false,
      fullscreen: false,
      center: {lng: 0, lat: 0},
      zoom: 3
    }
  },
  methods: {
    // 获取店铺信息
    getById(id) {
      this.axios.get('/shop/queryById', {params: {id}})
          .then((res) => {
            this.shop = res.data.data
            this.shop.star_shop = Number(((this.shop.star_kw + this.shop.star_fw + this.shop.star_hj) / 3).toFixed(2))

          })
    },
    // 获取优惠券
    getVouchers(id) {
      this.axios.get('/voucher/selectByShopId', {params: {shop_id: id}})
          .then((res) => {
            console.log(res.data)
            this.voucher = res.data.data
          })
    },
    changeShow() {
      this.showDetail = !this.showDetail
    },
    grab(id, index) {
      if (store.state.user === '') {
        this.$Message.error('未登录，请先登录!')
        return
      }
      this.axios.post('/voucher/grabVoucher', {voucher_id: id})
          .then((res) => {
            // console.log(res)
            if (res.data.success) {
              this.$Message.success(res.data.data)
              // eslint-disable-next-line no-plusplus
              this.voucher[index].amount--
            } else {
              this.$Message.warning(res.data.message)
            }
          })
    },
    handleUpload(file) {
      // console.log(file)
      this.file = file
      this.upload()
      return false
    },
    // 上传图片
    upload() {
      if (store.state.user === '') {
        this.$Message.error('未登录，请先登录!')
        return
      }
      this.axios.post(
          '/comments/update',
          {file: this.file},
          {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
      ).then((res) => {
        if (res.data.success) {
          this.$Message.success('Success')
          // 这里返回的是头像的url
          const img = `${store.state.img_path}/comments/${res.data.data}`
          this.files.push(img)
        } else {
          this.$Message.error(res.data.data)
        }
      })
    },
    // 发表评论
    mySubmit() {
      let pic = ''
      this.files.forEach((s) => {
        if (pic === '') {
          pic = `${pic}${s.split('/IMG')[1]}`
        } else {
          pic = `${pic};${s.split('/IMG')[1]}`
        }
      })
      if (this.mydata.kw === 0 || this.mydata.hj === 0 || this.mydata.fw === 0 || this.mydata.text === '') {
        this.$Message.error('评分和评论不能为空!')
        return
      }
      if (store.state.user === '') {
        this.$Message.error('未登录，请先登录!')
        return
      }
      axios.post('/comments/addOne', {
        user_id: store.state.user.id,
        shop_id: this.$route.params.id,
        text: this.mydata.text,
        score_kw: this.mydata.kw,
        score_hj: this.mydata.hj,
        score_fw: this.mydata.fw,
        pics: pic
      }).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.$Message.success('发布成功！')
          // this.mydata = {
          //   kw: 0,
          //   fw: 0,
          //   hj: 0,
          //   text: '',
          // }
          this.$router.push({path: '/MyEmpty', query: {path_: '/gourmet/shop/' + this.$route.params.id}})
          this.files = []
        } else {
          this.$Message.error(res.data.data)
        }
      })
    },
    //   锚点定位
    //模拟锚点跳转
    goAnchor(selector) {//参数selector是id选择器（#anchor14）
      document.querySelector(selector).scrollIntoView({behavior: "smooth"})
    },
    //展示地图
    showModal() {
      this.modal = true
    },
    //查询菜谱
    getDish(shop_id) {
      axios.get('/shop/' + shop_id + '/dish').then((res) => {
        console.log(res.data)
        this.dish = res.data.data
      })
    },
    //返回主页
    onBack() {
      this.$router.push('../')
    },
  },
  created() {
    this.getById(this.$route.params.id)
    this.getVouchers(this.$route.params.id)
    this.getDish(this.$route.params.id)
  }
}
</script>

<style scoped>
#body {
  width: 75%;
  /*height: 1200px;*/
  margin: 15px auto;
}

#body > div {
  background-color: #fff;
}

.title {
  height: 30px;
  line-height: 30px;
}

#other a {
  margin-right: 20px;
  float: left;
}

.ivu-grid-item {
  height: 152px;

}

#myComments .span {
  width: 80px;
  display: inline-block;
  text-align: right;
  padding-right: 10px;
}

#myComments > div {
  margin-top: 10px;
}

.dish {
  display: table;
  border: 2px solid #ebebeb;
}

.dish:hover {
  border: 2px solid #fa5e00;
}

</style>
