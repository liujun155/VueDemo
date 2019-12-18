<template>
  <div>
    <a-row style="margin-bottom:10px;line-height:30px">
      <a-col :span="2">姓名:</a-col>
      <a-col :span="4">
        <a-input></a-input>
      </a-col>
      <a-col :span="2" style="margin-left:20px">
        <a-button type="primary" @click="searchUsers">搜索</a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :rowKey="(record, index) => index"
      :dataSource="userList"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- <template slot="name" slot-scope="name">
      {{ name.first }} {{ name.last }}
    </template> -->
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "Name",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "Name" }
  },
  {
    title: "性别",
    dataIndex: "Sex",
    filters: [
      { text: "男", value: "1" },
      { text: "女", value: "0" }
    ],
    width: "10%"
  },
  {
    title: "用户名",
    dataIndex: "UserName"
  },
  {
    title: "身份证",
    dataIndex: "IdCardNum",
    width: "20%"
  },
  {
    title: "手机号",
    dataIndex: "Phone"
  }
];

export default {
  mounted() {
    this.searchUsers();
  },
  data() {
    return {
      userList: [],
      pagination: {},
      loading: false,
      columns
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.searchUsers({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    searchUsers(params = {}) {
      let self = this;
      console.log("params:", params);
      this.loading = true;
      this.$axios
        .post("/User/GetAllUsers")
        .then(function(res) {
          console.log(res.data);
          const pagination = { ...self.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = res.data.length;
          self.loading = false;
          self.userList = res.data;
          self.pagination = pagination;
        })
        .catch(function(error) {
          console.log(error);
          self.loading = false;
        });
    }
  }
};
</script>
