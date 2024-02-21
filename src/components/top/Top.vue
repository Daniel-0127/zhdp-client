<template>
  <div id="body">
    <div style="margin: 0 200px;padding-top: 10px">
      <div class="div1">
        <img :src="img" alt="图标" style="width: 45px;height: 45px;float:left;">
        <p id="title">Smart Review</p>
      </div>
      <div class="div2">

        <input type="search" v-model="search" id="search" placeholder="搜索美食、娱乐、旅游等" @keyup.enter="search_"/>
        <Icon type="md-search" size="23"
              style="display: inline-block;float: left;margin-left: -293px;margin-top: 17px"/>
      </div>
      <div class="div3">
        <router-link to="/my/comments">
          <div>
            <Icon type="md-create" size="22" fill="#333"/>
            <p>点评</p>
          </div>
        </router-link>
        <router-link to="/my/collect">
        <div>
          <Icon type="md-heart-outline" size="22" fill="#333"/>
          <p>收藏</p>
        </div>
        </router-link>
        <router-link to="/my/message">
        <div>
          <Icon type="md-notifications-outline" size="22" fill="#333"/>
          <p>消息</p>
        </div>
        </router-link>
        <router-link to="/my/info">
        <div>
          <Icon type="md-person" size="22" fill="#333"/>
          <p>个人中心</p>
        </div>
        </router-link>
        <div @click="login" v-if="store.state.user === ''">
          <Button type="primary"
                  style="background-color: black;border: none;width: 88px;height: 38px;margin-top: -10px;">
            <p style="font-weight: bolder">
              登录</p>
          </Button>
        </div>
        <div v-else style="float: right;margin-top: -30px">
          <Dropdown placement="right-start">
            <a href="javascript:void(0)">
              <img :src="store.state.img_path+store.state.user.picture" alt="11">
            </a>
            <template #list>
              <DropdownMenu>
                <DropdownItem @click="lagOut">退出</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </div>
      </div>
      <div id="div4">
        <Menu mode="horizontal" theme="light" active-name="美食">
          <MenuItem name="美食" to="/gourmet">
            美食
          </MenuItem>
          <MenuItem name="酒店" to="/hotel">
            酒店
          </MenuItem>
          <MenuItem name="休闲娱乐" to="/recreation">
            休闲娱乐
          </MenuItem>
          <MenuItem name="旅游" to="/travel">
            旅游
          </MenuItem>
        </Menu>
      </div>
      <HomeLogin ref="login"></HomeLogin>

    </div>
  </div>
</template>

<script>

import {
  Dropdown, DropdownItem, DropdownMenu,
  Icon, Menu, MenuItem, Button, TabPane, Tabs
} from 'view-ui-plus'
import Gourmet from '@/components/gourmet/show/GourmetShow.vue'
import HomeLogin from '@/components/top/HomeLogin.vue'
import store from '@/store'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Top',
  computed: {
    store() {
      return store
    }
  },
  components: {
    DropdownItem,
    DropdownMenu,
    Dropdown,
    HomeLogin,
    Button,
    Menu,
    MenuItem,
    // eslint-disable-next-line vue/no-unused-components
    Gourmet,
    // eslint-disable-next-line vue/no-unused-components
    TabPane,
    // eslint-disable-next-line vue/no-unused-components
    Tabs,
    Icon
  },

  data() {
    return {
      img: require('@/assets/icon.png'),
      user: null,
      search: '',
    }
  },
  methods: {
    login() {
      this.$refs.login.modal = true
    },
    isLogin() {
      this.axios.post('/user/isLogin')
          .then((res) => {
            if (res.data.success !== false) {
              this.$store.commit('updateUser', res.data.data)
            }
          })
    },
    //   退出
    lagOut() {
      this.axios.post('/user/lagOut').then((res) => {
        console.log(res)
        this.$Message.success(res.data.data)
        this.store.commit('updateUser', '')
        this.store.commit('updateToken', '')
      })
    },
    // 搜索
    search_() {
      this.axios.get('/shop/search', {params: {se: this.search}}).then((res) => {
        //TODO 展示
        console.log(res)
      })
    },
  },
  created() {
    this.isLogin()
  }
}
</script>

<style scoped>
a:visited{
  /*color: #5b5656;*/
}
#body {
  width: 100%;
  height: 110px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.25) 0 14px 28px, rgba(0, 0, 0, 0.22) 0 5px 5px;
}

.div1 {
  height: 50px;
  float: left;
}

.div1 #title {
  font-size: 25px;
  font-weight: bold;
  font-family: Georgia, serif;
  display: inline-block;
  margin-top: 8px;
}

.div2 {
  height: 50px;

}

.div2 #search {
  float: left;
  width: 300px;
  margin-left: 25px;
  margin-top: 8px;
  height: 40px;
  border-radius: 25px;
  /*border: 1px solid rgba(93, 91, 91, 0.51);*/
  background-color: transparent;
  text-indent: 34px;
}

.div3 {
  float: right;
  display: block;
  height: 50px;
  margin-top: -50px;
}

.div3 div {
  display: inline-block;
  padding: 16px 10px;
}

.div3 div > p {
  font-size: 16px;
  display: inline-block;
  font-weight: 900;
  margin-left: 4px;
}

.div3 img {
  float: right;
  height: 50px;
  width: 50px;
}

#div4 {
  width: 50%;
}

#div4 ul {
  height: 50px;
}

#div4 a {
  font-size: 20px;
  /*padding: -10px;*/
}

</style>
