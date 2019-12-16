<template>
  <a-layout id="components-layout">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user" />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-popover placement="bottom">
          <template slot="content">
            <p>Content</p>
            <a-button type="primary" @click="logout">退出登录</a-button>
          </template>
          <span class="userBar">
            <a-avatar style="margin:0 5px;background:#87d068" icon="user" />
            <span style="margin-right:5px">{{ userName }}</span>
          </span>
        </a-popover>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        Content
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        BackManage ©2019 Created by LJun
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      userName: ""
    };
  },
  mounted() {
    this.userName = sessionStorage.userName;
  },
  methods: {
    logout() {
      sessionStorage.setItem("isLogin", 0);
      sessionStorage.removeItem("userName");
      this.$router.push("/login");
    }
  }
};
</script>
<style>
#components-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 450px;
}

.userBar {
  float: right;
  margin: 0 15px;
  cursor: pointer;
  transition: 0.3s;
}
.userBar:hover {
  background: #f8f8f8;
}

#components-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  float: left;
}

#components-layout .trigger:hover {
  color: #1890ff;
}

#components-layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
