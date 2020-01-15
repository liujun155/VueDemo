<template>
  <div>
    <a-modal
      title="修改用户信息"
      :visible="isShow"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item
          label="用户名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: '请输入用户名' }] }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="姓名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入姓名' }]
              }
            ]"
            placeholder="姓名"
          />
        </a-form-item>
        <a-form-item
          label="性别"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-select
            v-decorator="[
              'sex',
              {
                rules: [{ required: true, message: '请选择性别' }]
              }
            ]"
            placeholder="性别"
          >
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="0">女</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="身份证号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'idCardNum',
              {
                rules: [{ required: true, message: '请输入身份证号' }]
              }
            ]"
            placeholder="身份证"
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [{ required: true, message: '请输入手机号' }]
              }
            ]"
            placeholder="手机号"
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
        if (err) return;
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
          });
      });
    },
    handleCancel() {
      this.isShow = false;
      this.form.resetFields();
    },
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
