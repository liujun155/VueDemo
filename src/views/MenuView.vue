<template>
  <a-layout id="components-layout" hasSider="true">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <!-- <div class="logo" /> -->
      <div
        style="font-family:'YouYuan';font-size:18px;font-weight:bold;margin:14px;color:#fff"
      >
        管理系统
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        @click="menuClick"
        :defaultSelectedKeys="['userManage']"
      >
        <a-menu-item key="userManage">
          <a-icon type="user" />
          <span>用户管理</span>
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
        <a-dropdown placement="bottomLeft">
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1"><a-icon type="lock" /> 修改密码 </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="logout" /> 退出登录
            </a-menu-item>
          </a-menu>
          <span class="userBar">
            <a-avatar style="margin:0 5px;background:#87d068" icon="user" />
            <span style="margin-right:5px">{{ userName }}</span>
          </span>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '300px',
          overflow: 'auto'
        }"
      >
        <!--组件动态绑定-->
        <component v-bind:is="currentTabComponent"></component>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center;margin:10px 50px;">
        BackManage ©2019 Created by LJun
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>
<script>
import userManage from "@/components/UserManage.vue";

export default {
  data() {
    return {
      collapsed: false,
      userName: "",
      currentTabComponent: "userManage"
    };
  },
  mounted() {
    this.userName = sessionStorage.userName;
  },
  components: {
    userManage
  },
  methods: {
    //动态组件切换
    menuClick(e) {
      this.currentTabComponent = e.key;
    },
    handleMenuClick(e) {
      if (e.key == "1") {
        console.log("click" + e);
      } else if (e.key == "2") {
        //退出登录
        sessionStorage.setItem("isLogin", 0);
        sessionStorage.removeItem("userName");
        this.$router.push("/login");
      }
    }
  }
};
</script>
<style>
#components-layout {
  height: 100%;
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
