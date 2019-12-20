<template>
  <div>
    <a-row style="margin-bottom:10px;line-height:30px">
      <a-col :span="2" style="width:60px">姓名:</a-col>
      <a-col :span="4" style="width:150px">
        <a-input v-model="searchName"></a-input>
      </a-col>
      <a-col :span="2" style="margin-left:20px">
        <a-button type="primary" @click="searchUsers">搜索</a-button>
      </a-col>
    </a-row>
    <a-table
      :columns="columns"
      :rowKey="record => record.Id"
      :dataSource="userList"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      bordered
    >
      <!-- <template slot="name" slot-scope="name">
      {{ name.first }} {{ name.last }}
    </template> -->
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">编辑{{ record.name }}</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="是否删除？"
          @confirm="confirm"
          okText="确定"
          cancelText="取消"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "Name",
    sorter: (a, b) => a.Name.localeCompare(b.Name, "zh"),
    width: "20%"
  },
  {
    title: "性别",
    dataIndex: "Sex",
    filters: [
      { text: "男", value: "1" },
      { text: "女", value: "0" }
    ],
    onFilter: (value, record) => record.Sex == value,
    width: "10%",
    align: "center"
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
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  mounted() {
    this.searchUsers();
  },
  data() {
    return {
      searchName: "",
      userList: [],
      pagination: {},
      loading: false,
      columns
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
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
    searchUsers() {
      let self = this;
      this.loading = true;
      this.$axios
        .post("/User/GetUsers", null, {
          params: {
            name: self.searchName
          }
        })
        .then(function(res) {
          console.log(res.data);
          console.log(self.columns);
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
    },
    confirm() {
      this.$message.success("删除成功");
    }
  }
};
</script>
