<template>
  <div class="loginDiv">
    <h2 style="font-weight: bold;">注册用户</h2>
    <a-form
      id="form_register"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-row>
          <a-col :span="6">用户名：</a-col>
          <a-col :span="18">
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    { required: true, message: '请输入用户名' },
                    { min: 2, message: '用户名最少2位' }
                  ]
                }
              ]"
              placeholder="用户名"
            ></a-input>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="6">真实姓名：</a-col>
          <a-col :span="18">
            <a-input
              v-decorator="[
                'realName',
                {
                  rules: [{ required: true, message: '请输入真实姓名' }]
                }
              ]"
              placeholder="真实姓名"
            >
            </a-input
          ></a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="6">密码：</a-col>
          <a-col :span="18">
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
            </a-input
          ></a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="11">
            <a-button class="login-form-button" @click="returnLogin">
              返回
            </a-button>
          </a-col>
          <a-col :span="2"></a-col>
          <a-col :span="11">
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              :loading="regLoad"
              >注册
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "register",
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_reg" });
  },
  data() {
    return {
      regLoad: false,
      truePswd: ""
    };
  },
  methods: {
    handleSubmit(e) {
      let self = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var editEnt = {
            Name: values.realName,
            UserName: values.userName,
            PassWord: self.$md5(values.password),
            Sex: 1,
            IdCardNum: "",
            Phone: ""
          };
          self.regLoad = true;
          this.$axios
            .post("/User/IsExist", editEnt)
            .then(function(res) {
              if (!res.data) {
                //第二个参数写成null是指只需要拼接url的情况，如果需要传其他数据，直接写成要传的对象即可
                self.$axios
                  .post("/User/AddUser", editEnt)
                  .then(function(response) {
                    self.regLoad = false;
                    if (response.data) {
                      self.$message.success("注册成功");
                      self.$emit("fromRegister");
                    } else {
                      self.$message.error("注册失败");
                    }
                  })
                  .catch(function(error) {
                    console.log(error);
                    self.regLoad = false;
                    self.$message.error("服务端发生错误");
                  });
              } else {
                self.$message.error("用户名已存在，请重新输入");
                self.regLoad = false;
              }
            })
            .catch(function(err) {
              console.log(err);
              self.regLoad = false;
              self.$message.error("服务端发生错误");
            });
          console.log("Received values of form: ", values);
        }
      });
    },
    returnLogin() {
      this.$emit("fromRegister");
    }
  }
};
</script>

<style>
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

#form_register {
  max-width: 350px;
  margin: auto;
}

.login-form-left {
  float: left;
}

#form_register .login-form-forgot {
  float: right;
}

#form_register .login-form-button {
  width: 100%;
}
</style>
