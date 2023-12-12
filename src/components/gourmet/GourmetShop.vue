<template>
  <div id="body">
    <!--    详情-->
    <div style="padding:12px 0 12px 18px">
      <p style="font-size: 26px;font-weight: bolder">{{ shop.name }}</p>
      <Rate class="title" show-text allow-half disabled v-model="shop.shop_score" style="float:left;">
        <span style="color: #f5a623">{{ shop.shop_score }}</span>
      </Rate>
      <div class="title" style="margin-top: 3px;height: 28px">
        <span style="padding-left: 15px">{{ shop.rating_amount }}条评论</span>
        <span style="padding-left: 15px">口味:&nbsp;{{ shop.taste_score }}</span>
        <span style="padding-left: 15px">包装:&nbsp;{{ shop.package_score }}</span>
        <span style="padding-left: 15px">配送(骑手):&nbsp;{{ shop.rider_score }}</span>
      </div>
      <div class="title">地址:&nbsp;{{ shop.address }}</div>
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
        <Button type="primary">
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
    <!--    促销-->
    <div style="margin-top: 20px;padding:12px 0 12px 18px">
      <p style="font-size: 21px;font-weight: bolder">优惠促销</p>
      <Grid :col="1" style=" background-color: #fff;">
        <GridItem v-for="(item, index) in voucher" :key="index">
          <GourmetCoupon :type_="item.type" :price_="item.free_price" :limit_="item.full"
                         style="float:left;margin-right: 30px;width: 230px;height: 110px"></GourmetCoupon>
          <div style="font-size: 18px;left: 120px">{{ item.type }}1张</div>
          <div style="font-size: 33px;color: #fa5e00;display: inline;line-height: 120px">￥{{ item.now_price }}</div>
          <div style="text-decoration: line-through;display: inline;">￥{{ item.before_price }}</div>
          <div style="float:right;color: red">剩余{{ item.amount }}</div>
          <div style="float: right;margin-right: 10%">
            <Button type="primary" @click="grab(item.id,index)">立即抢购</Button>
          </div>

        </GridItem>
      </Grid>
      <!--      <Grid :col="1" :hover="true" style=" background-color: #fff;">-->
      <!--        <GridItem>-->
      <!--          <GourmetCoupon type_="优惠券" price_="120" limit_="满666" style="float:left;margin-right: 30px"></GourmetCoupon>-->
      <!--          <div style="font-size: 23px;left: 120px">优惠券1张</div>-->
      <!--          <div style="font-size: 66px;color: #fa5e00">￥5.00</div>-->
      <!--          <div style="float:right;">已售10</div>-->
      <!--        </GridItem>-->
      <!--        <GridItem>-->
      <!--          <GourmetCoupon type_="代金券" price_="50" style="float:left;margin-right: 30px"></GourmetCoupon>-->
      <!--          <div style="font-size: 23px;left: 120px">代金券1张</div>-->
      <!--          <div style="font-size: 66px;color: #fa5e00">￥75.00</div>-->
      <!--          <div style="float:right;">已售99</div>-->
      <!--        </GridItem>-->
      <!--      </Grid>-->
    </div>
        评论
    <div style="margin-top: 20px;padding:12px 0 12px 18px">
      <p style="font-size: 21px;font-weight: bolder">评论区</p>
      <GourmetComments></GourmetComments>
    </div>
    <!--    我要评论-->
    <div style="margin-top: 20px;padding:12px 0 12px 18px" id="myComments">
      <p style="font-size: 21px;font-weight: bolder">我要评价</p>
      <div><span class="span">总体评价</span>
        <Rate class="title" show-text allow-half v-model="mydata.score">
          <span style="color: #f5a623">{{ mydata.score }}</span>
        </Rate>
      </div>
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
        <Input v-model="mydata.text" type="textarea" :rows="5" placeholder="亲，菜品的口味如何，环境怎么样，服务满意吗？" style="width: 80%"/>
      </div>
      <div><span class="span" style="display: block;float:left;">图片</span>
        <div style="display: inline-block;width: 80%;">
          <Upload
              :before-upload="handleUpload"
              accept="file"
              action="/comments/update"
              style="float:left;">
            <Button >上传图片</Button>
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

      <div><span class="span"></span><div style="display: inline-block;width: 80%;background: #f6f6f6;font-size: 13px;line-height: 18px;padding: 5px">评价和打分都将是其他网友的参考依据，并影响该商户评价。请发布真实、客观的本人消费体验评价。如您收到威逼、利诱如优惠等干扰而发布的评价或并非本人体验的虚假/恶意评价，则评价视为违规，同时影响您的信誉度。</div></div>
      <div><span class="span"></span><Button type="info" style="width: 120px;" @click="mySubmit">发表评论</Button></div>
    </div>
  </div>
</template>

<script>
import {
  Grid, GridItem, Icon, Rate, Space, Input, Button, Upload, Image
} from 'view-ui-plus'
import { ShareTwo, Star, Caution } from '@icon-park/vue-next'
import axios from 'axios'
import GourmetCoupon from '@/components/gourmet/GourmetCoupon.vue'
import GourmetComments from '@/components/gourmet/GourmetComments.vue'
import store from '@/store'

export default {
  name: 'GourmetShop',
  computed: {
    store() {
      return store
    }
  },
  components: {
    Image,
    Upload,
    // eslint-disable-next-line vue/no-unused-components
    Space,
    Input,
    Button,
    GourmetComments,
    Grid,
    GridItem,
    GourmetCoupon,
    Icon,
    Rate,
    ShareTwo,
    Star,
    Caution
  },
  data() {
    return {
      shop: {},
      voucher: {},
      showDetail: false,
      mydata: {
        score: 0,
        kw: 0,
        fw: 0,
        hj: 0,
        text: '',
      },
      file: null,
      loadingStatus: false,
      index: 0,
      files: [],
    }
  },
  methods: {
    getById(id) {
      this.axios.get('/shop/queryById', { params: { id } })
        .then((res) => {
          this.shop = res.data.data
        })
    },
    getVouchers(id) {
      this.axios.get('/voucher/selectByShopId', { params: { shop_id: id } })
        .then((res) => {
          console.log(res.data)
          this.voucher = res.data.data
        })
    },
    changeShow() {
      this.showDetail = !this.showDetail
    },
    grab(id, index) {
      this.axios.post('/voucher/grabVoucher', { voucher_id: id })
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
      this.axios.post(
        '/comments/update',
        { file: this.file },
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
      if (this.mydata.score === 0 || this.mydata.text === '') {
        this.$Message.error('评分和评论不能为空')
        return
      }
      axios.post('/comments/addOne', {
        user_id: store.state.user.id,
        shop_id: this.$route.query.id,
        text: this.mydata.text,
        store_score: this.mydata.score,
        pics: pic
      }).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.$Message.success('发布成功！')
          this.mydata = {
            score: 0,
            kw: 0,
            fw: 0,
            hj: 0,
            text: '',
          }
          this.files = []
        } else {
          this.$Message.error(res.data.data)
        }
      })
    }
  },
  created() {
    this.getById(this.$route.query.id)
    this.getVouchers(this.$route.query.id)
  }
}
</script>

<style scoped>
#body {
  width: 75%;
  /*height: 1200px;*/
  margin: 20px auto;
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

#myComments>div{
  margin-top: 10px;
}
</style>
