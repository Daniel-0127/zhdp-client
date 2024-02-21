<template>
  <div>
    <Affix :offset-top="112">
      <div style="margin-top: 4px;height: 84vh">
        <Menu theme="light" active-name="/my/info" style="height: 100%" >
          <MenuGroup title="信息相关">
            <MenuItem name="/my/info" to="/my/info">
              <Icon type="md-document" />
              个人信息
            </MenuItem>
            <MenuItem name="/my/message" to="/my/message">
              <Icon type="md-chatbubbles" />
              我的消息
            </MenuItem>
          </MenuGroup>
          <MenuGroup title="点评相关">
            <MenuItem  name="/my/comments" to="/my/comments">
              <Icon type="md-heart" />
              我的点评
            </MenuItem>
            <MenuItem  name="/my/collect" to="/my/collect">
              <Icon type="md-leaf" />
              我的收藏
            </MenuItem>
          </MenuGroup>
        </Menu>
      </div>
    </Affix>
<!--    <router-view></router-view>-->

  </div>
</template>

<script>
import {Menu, Icon, MenuGroup, MenuItem, Affix} from "view-ui-plus";

export default {
  name: "MyMenu",
  components: {Affix, Menu,MenuItem, Icon, MenuGroup}
}
</script>

<style scoped>

</style>
