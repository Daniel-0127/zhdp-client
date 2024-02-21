<template>

    <div style="width: 40%;height:572px;margin:30px  auto">
      <p style="font-size: 23px;margin-bottom: 20px;margin-left: -100px;" >修改信息：</p>
      <Form :model="formItem" :label-width="80">
        <FormItem label="昵称">
          <Input v-model="formItem.nickname" :placeholder="store.state.user.nickname"/>
        </FormItem>
        <FormItem label="密码">
          <Input type="password" v-model="formItem.password"/>
        </FormItem>
        <FormItem label="头像">
          <div style="display: inline-block;width: 80%;">
            <Upload
                :before-upload="handleUpload"
                accept="file"
                action="/user/upload"
                style="float:left;">
              <Button>更新头像</Button>
            </Upload>
            <span style="font-size: 13px;color: #9d9a9a;line-height: 23px;display: inline-block;">单张图片不超过10MB，尺寸不小于300*300px，支持jpg、png和bmp格式</span>
            <div>
              <div v-show="img!==null">
                <Image :src="img" fit="contain" width="120px" height="80px" preview style="float:left;"
                       :preview-list="img"/>
              </div>
            </div>
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">保存</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>


import { Button, Form, FormItem, Image, Upload} from "view-ui-plus";
import store from "@/store";

export default {
  name: "MyInfo",
  computed: {
    store() {
      return store
    }
  },
  components: {Image, Upload, FormItem, Form, Button},
  data() {
    return {
      file: null,
      img: null,
      loadingStatus: false,
      formItem: {
        nickname: null,
        password: null,
        picture: null,
      }
    }
  },
  methods: {
    handleUpload(file) {
      // console.log(file)
      this.file = file
      this.upload()
      return false
    },
    // 上传图片
    upload() {
      this.axios.post(
          '/user/upload',
          {file: this.file},
          {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
      ).then((res) => {
        if (res.data.success) {
          this.$Message.success('上传成功')
          // 这里返回的是头像的url
          this.img = `${store.state.img_path}/head_pic/${res.data.data}`
          this.formItem.picture = `/head_pic/${res.data.data}`
        } else {
          this.$Message.error(res.data.data)
        }
      })
    },
    //保存
    handleSubmit() {
      this.axios.post('/user/update', {
        id: store.state.user.id,
        nickname: this.formItem.nickname,
        password: this.formItem.password,
        picture: this.formItem.picture
      }).then((res) => {
        console.log(res)
        if(res.data.success ===true){
          this.$Message.success(res.data.data);
        }else {
          this.$Message.error(res.data.message);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
