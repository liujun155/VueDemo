<template>
  <a-spin :spinning="isLoading">
    <div class="hello">
      <h2>{{ msg }}</h2>
      <a-input
        style="width:10%;min-width:200px;margin-top:15px"
        v-model="reqTkl"
        placeholder="请输入淘口令"
      ></a-input>
      <br />
      <a-button style="margin-top:15px" type="primary" v-on:click="analyKey">转换</a-button>
      <br />
      <a-input
        style="width:10%;min-width:200px;margin-top:15px"
        placeholder="转换结果"
        v-model="urlJson"
      ></a-input>
      <div v-for="item in users" :key="item.name">
        <span>{{ item.name }}</span>
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
      isLoading: false,
      reqTkl: "",
      urlJson: ""
    };
  },
  methods: {
    // getUsers() {
    //   let _self = this;
    //   _self.isLoading = true;
    //   this.$axios
    //     .post("/User/GetAllUsers")
    //     .then(function(response) {
    //       _self.isLoading = false;
    //       console.log(response.data);
    //       _self.users = response.data;
    //     })
    //     .catch(function(error) {
    //       _self.isLoading = false;
    //       console.log(error);
    //     });
    // }
    analyKey() {
      let _self = this;
      if (_self.reqTkl == null || _self.reqTkl == "") {
        alert("请输入淘口令");
        return;
      }
      _self.urlJson = "";
      //解析口令API
      var url = "/tkl/tkljm?apikey=TzpvjplQYb&tkl=" + _self.reqTkl;
      this.$axios
        .post(url)
        .then(function(response) {
          console.log(response.data);
          // _self.urlJson = response.data.url;
          if (response.data != null && response.data.url != "") {
            var title = "瑜瑜欢乐购";
            var picUrl = response.data.picUrl;
            var createUrl =
              "/tkl/Tbktbtaokouling?apikey=TzpvjplQYb&tkltype=0&url=" +
              response.data.url +
              "&text=" +
              title +
              "&pic=" +
              picUrl;
            _self.$axios
              .post(createUrl)
              .then(function(response2) {
                console.log(222);
                console.log(response2.data);
                _self.urlJson = response2.data.tkl;
              })
              .catch(function(error2) {
                console.log(error2);
              });
          }
        })
        .catch(function(error) {
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
