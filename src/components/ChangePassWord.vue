<template>
  <div>
    <a-modal
      title="修改密码"
      :visible="isShow"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-row>
        <a-col :span="2">原始密码：</a-col>
        <a-col :span="22">
          <a-input
            v-decorator="[
              'oldPwd',
              { rules: [{ required: true, message: '请输入原始密码' }] }
            ]"
            placeholder="原始密码"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2">新密码：</a-col>
        <a-col :span="22">
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
            placeholder="新密码"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2">确认密码：</a-col>
        <a-col :span="22">
          <a-input
            v-decorator="[
              'confirmPwd',
              { rules: [{ required: true, message: '请再次输入新密码' }] }
            ]"
            placeholder="确认密码"
          />
        </a-col>
      </a-row>
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
      confirmLoading: false
    };
  },
  methods: {
    handleOk() {
      let self = this;
      this.confirmLoading = true;
      this.$axios
        .post("/User/ChangedPassWord", null, {
          params: {
            userName: self.user,
            oldPassWord: self.$md5(self.oldPwd),
            newPassWord: self.$md5(self.newPwd)
          }
        })
        .then(function(res) {
          if (res.data) {
            self.$message.success("修改成功");
            self.isShow = false;
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
    },
    handleCancel() {
      this.isShow = false;
    }
  }
};
</script>
