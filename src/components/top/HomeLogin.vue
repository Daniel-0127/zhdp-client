<template>
  <div>
    <Modal
        v-model="modal"
        title="登录"
        footer-hide
        width="30">

      <div>
        <img :src="img" alt="图标" style="width: 55px;height: 55px;">
        <div style="text-align: center">
          <p style="font-size: 26px;font-weight: bolder;margin-top: 10px">登录后即可使用</p>
          <p style="font-size: 26px;font-weight: bolder;margin-bottom: 30px">Smart Review 的全部功能。</p>
        </div>
      </div>
          <div class="demo-login">
            <Login @on-submit="login">
              <Mobile name="mobile" ref="mob"/>
              <Captcha name="captcha" :field="['mobile']" @on-get-captcha="handleGetCaptcha"/>
              <Submit/>
            </Login>
          </div>

    </Modal>
  </div>
</template>

<script>
import {
  Captcha, Login, Mobile, Modal, Submit
} from 'view-ui-plus'

export default {
  name: 'HomeLogin',
  components: {
    Login,
    Submit,
    Captcha,
    Mobile,
    Modal
  },
  data() {
    return {
      modal: false,
      img: require('@/assets/icon.png'),
    }
  },
  methods: {
    login(valid, { mobile, captcha }) {
      if (valid) {
        this.axios.post('/user/login', { phone: mobile, code: captcha }).then((res) => {
          if (res.data.success) {
            this.$Message.success('登录成功！')
            // 保存用户信息到session
            // console.log(res.data.data.token)
            this.$store.commit('updateToken', res.data.data.token)
            this.$store.commit('updateUser', res.data.data.user)
          }
        })
        this.modal = false
        this.$router.push({ path: '/MyEmpty', query: { path_: '/gourmet' } })
      }
    },
    handleGetCaptcha(valid, { mobile }) {
      this.$Message.info('获取验证码')
      this.axios.post('/user/code', { phone: mobile }).then(() => {
      })
    }

  }
}
</script>

<style scoped>

</style>
