<template>
  <div>
    <a-modal
      title="修改密码"
      :visible="isShow"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="确定"
      cancelText="取消"
    >
      <a-form :form="form">
        <a-form-item
          label="原密码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'oldPwd',
              { rules: [{ required: true, message: '请输入原密码' }] }
            ]"
            placeholder="原密码"
          />
        </a-form-item>
        <a-form-item
          label="新密码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'newPwd',
              {
                rules: [
                  { required: true, message: '请输入新密码' },
                  { min: 6, message: '密码最少6位' },
                  { max: 12, message: '密码最长12位' }
                ]
              }
            ]"
            type="password"
            placeholder="新密码"
          />
        </a-form-item>
        <a-form-item
          label="确认密码"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'confirmPwd',
              {
                rules: [
                  { required: true, message: '请再次输入新密码' },
                  { validator: checkWord } //自定义校验
                ]
              }
            ]"
            type="password"
            placeholder="确认密码"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: {
    user: String
  },
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      isShow: false,
      confirmLoading: false,
      form: this.$form.createForm(this, { name: "changePswd" })
    };
  },
  methods: {
    handleOk() {
      let self = this;
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        if (err) {
          self.confirmLoading = false;
          return;
        }
        self.$axios
          .post("/User/ChangePassWord", null, {
            params: {
              userName: self.user,
              oldPassWord: self.$md5(values.oldPwd),
              newPassWord: self.$md5(values.newPwd)
            }
          })
          .then(function(res) {
            if (res.data) {
              self.$message.success("修改成功");
              self.isShow = false;
              self.form.resetFields();
              self.confirmLoading = false;
            } else {
              self.$message.error("原密码错误，请重新输入");
              self.confirmLoading = false;
            }
          })
          .catch(function(err) {
            console.log(err);
            self.confirmLoading = false;
            self.$message.error("服务端发生错误");
          });
      });
    },
    handleCancel() {
      this.isShow = false;
      this.form.resetFields();
    },
    //自定义校验（检查两次密码是否输入正确）
    checkWord(rule, value, callback) {
      var pwdStr = this.form.getFieldsValue().newPwd; //获取第一次输入的密码
      var conPwdStr = this.form.getFieldsValue().confirmPwd; //获取第一次输入的密码
      if (pwdStr != conPwdStr) {
        callback(new Error("两次输入密码不相同"));
      } else {
        callback();
      }
    }
  }
};
</script>
