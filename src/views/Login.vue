<template>
  <div class="login">
    <div class="loginDiv" v-if="isLogin">
      <h2 style="font-weight: bold;">个人管理系统</h2>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入用户名' }]
              }
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请输入密码' },
                  { min: 6, message: '密码最少6位' },
                  { max: 12, message: '密码最长12位' }
                ]
              }
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            class="login-form-left"
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]"
          >
            记住密码
          </a-checkbox>
          <a class="login-form-forgot" href="">
            忘记密码
          </a>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            :loading="loginLoad"
          >
            登录
          </a-button>
          <a class="login-form-left" @click="regBtn">
            注册
          </a>
        </a-form-item>
      </a-form>
    </div>
    <Register v-else @fromRegister="showLogin"></Register>
  </div>
</template>

<script>
import Register from "@/components/RegisterUser.vue";

export default {
  name: "login",
  components: {
    Register
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  mounted: function() {
    this.getCookie();
  },
  data() {
    return {
      loginLoad: false,
      truePswd: "",
      isLogin: true
    };
  },
  methods: {
    handleSubmit(e) {
      let self = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          self.loginLoad = true;
          var pswd = "";
          if (values.password == "******") {
            pswd = self.truePswd;
          } else {
            pswd = this.$md5(values.password);
          }
          //第二个参数写成null是指只需要拼接url的情况，如果需要传其他数据，直接写成要传的对象即可
          this.$axios
            .post("/User/Login", null, {
              params: {
                userName: values.userName,
                passWord: pswd
              }
            })
            .then(function(response) {
              self.loginLoad = false;
              if (response.data) {
                //记住密码
                if (values.remember) {
                  self.setCookie(values.userName, pswd, 90);
                } else {
                  self.clearCookie();
                }
                self.$message.success("登录成功");
                sessionStorage.setItem("isLogin", 1); // 指定登录状态
                sessionStorage.setItem("userName", values.userName); //设置当前登录用户名
                self.$router.push("/menuview");
              } else {
                self.$message.error("登录失败：用户名或密码错误");
              }
            })
            .catch(function(error) {
              console.log(error);
              self.loginLoad = false;
              self.$message.error("服务端发生错误");
            });
          console.log("Received values of form: ", values);
        }
      });
    },
    regBtn() {
      let self = this;
      self.isLogin = false;
    },
    showLogin() {
      let self = this;
      self.isLogin = true;
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      console.log(document.cookie);
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.form.setFieldsValue({
              userName: arr2[1] //前面的值为表单中的值
            });
          } else if (arr2[0] == "userPwd") {
            this.truePswd = arr2[1];
            this.form.setFieldsValue({
              password: "******" //前面的值为表单中的值
            });
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>
<style>
.login {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: url("../assets/loginBack.png");
}

.loginDiv {
  width: 450px;
  height: 330px;
  padding-top: 22px;
  background: #fff;
  margin: 150px auto;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: #ccc 0px 0px 10px;
  -moz-box-shadow: #ccc 0px 0px 10px;
  box-shadow: #ccc 0px 0px 10px;
}

#components-form-demo-normal-login {
  max-width: 300px;
  margin: auto;
}

.login-form-left {
  float: left;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
