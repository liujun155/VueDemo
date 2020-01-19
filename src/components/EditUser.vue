<template>
  <div>
    <a-modal
      title="修改用户信息"
      :visible="isShow"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="确定"
      cancelText="取消"
    >
      <a-form :form="form">
        <a-form-item
          label="用户名"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input readOnly v-decorator="['userName']" />
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
            placeholder="请输入姓名"
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
            placeholder="请选择性别"
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
            placeholder="请输入身份证号"
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            v-decorator="['phone', { rules: [{ validator: checkPhone }] }]"
            placeholder="请输入手机号"
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
      editEnt: {}, //当前编辑用户实体
      isShow: false, //是否显示
      confirmLoading: false, //确认按钮的loading是否显示
      form: this.$form.createForm(this, { name: "changePswd" }) //创建表单
    };
  },
  watch: {
    isShow(val) {
      if (val) {
        //渲染后调用
        this.$nextTick(() => {
          this.setEditEnt();
        });
      }
    }
  },
  methods: {
    setEditEnt() {
      if (this.editEnt != null && this.editEnt.id != "") {
        this.form.setFieldsValue({
          userName: this.editEnt.UserName,
          name: this.editEnt.Name,
          sex: this.editEnt.Sex.toString(),
          idCardNum: this.editEnt.IdCardNum,
          phone: this.editEnt.Phone
        });
      }
    },
    handleOk() {
      let self = this;
      this.confirmLoading = true;
      this.form.validateFields((err, values) => {
        if (err) {
          self.confirmLoading = false;
          return;
        }
        self.editEnt.Name = values.name;
        self.editEnt.Sex = values.sex;
        self.editEnt.IdCardNum = values.idCardNum;
        self.editEnt.Phone = values.phone;
        console.log(self.editEnt);
        self.$axios
          .post("/User/UpdateUser", self.editEnt)
          .then(function(res) {
            if (res.data) {
              self.$message.success("修改成功");
              self.isShow = false;
              self.confirmLoading = false;
            } else {
              self.$message.error("修改失败");
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
    },
    //自定义校验（检查手机号是否输入正确）
    checkPhone(rule, value, callback) {
      if (value != null && value != "") {
        var reg = /^1[3456789]\d{9}$/;
        if (!reg.test(value)) callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    }
  }
};
</script>
