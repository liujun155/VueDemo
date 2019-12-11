<template>
  <div class="login">
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
              rules: [{ required: true, message: '请输入用户名!' }]
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
              rules: [{ required: true, message: '请输入密码!' }]
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
        <a-button type="primary" html-type="submit" class="login-form-button">
          登录
        </a-button>
        <a href="" class="login-form-left">
          注册
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "login",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
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
