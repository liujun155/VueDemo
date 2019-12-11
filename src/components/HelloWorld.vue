<template>
  <a-spin :spinning="isLoading">
    <div class="hello">
      <h2>{{ msg }}</h2>
      <a-button style="margin-top:15px" type="primary" v-on:click="getUsers">
        获取人员
      </a-button>
      <br />
      <div style="background: red;">
        <p v-for="user in users" v-bind:key="user.Id">
          姓名：{{ user.Name }} 身份证：{{ user.IdCardNum }}
        </p>
      </div>
    </div>
  </a-spin>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      users: [],
      isLoading: false
    };
  },
  methods: {
    getUsers() {
      let _self = this;
      _self.isLoading = true;
      this.$axios
        .post("/User/GetAllUsers")
        .then(function(response) {
          _self.isLoading = false;
          console.log(response.data);
          _self.users = response.data;
        })
        .catch(function(error) {
          _self.isLoading = false;
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
