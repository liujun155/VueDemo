<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.login.uuid"
    :dataSource="userList"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="name" slot-scope="name">
      {{ name.first }} {{ name.last }}
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "性别",
    dataIndex: "sex",
    filters: [
      { text: "男", value: "1" },
      { text: "女", value: "0" }
    ],
    width: "10%"
  },
  {
    title: "用户名",
    dataIndex: "userName"
  },
  {
    title: "身份证",
    dataIndex: "idCardNum",
    width: "20%"
  },
  {
    title: "手机号",
    dataIndex: "phone"
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
          const pagination = { ...self.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = res.data.length;
          this.loading = false;
          this.userList = res.data;
          this.pagination = pagination;
        })
        .catch(function(error) {
          console.log(error);
          self.loading = false;
        });
    }
  }
};
</script>
