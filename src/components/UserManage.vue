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
      :locale="language"
      @change="handleTableChange"
      bordered
    >
      <!-- <template slot="name" slot-scope="name">
      {{ name.first }} {{ name.last }}
    </template> -->
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="editUser(record)">
          编辑{{ record.name }}
        </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="是否删除？"
          @confirm="() => onDelete(record.Id)"
          okText="确定"
          cancelText="取消"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
    <editForm ref="edit"></editForm>
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
    align: "center",
    customRender(sex) {
      return sex == 1 ? "男" : "女";
    }
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
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

import editForm from "@/components/EditUser.vue";
export default {
  mounted() {
    this.searchUsers();
  },
  components: {
    editForm
  },
  data() {
    return {
      searchName: "",
      userList: [],
      pagination: {},
      loading: false,
      columns,
      language: { filterConfirm: "确定", filterReset: "重置" }
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
          self.$message.error("服务端发生错误");
        });
    },
    editUser(user) {
      this.$refs.edit.isShow = true;
      this.$refs.edit.editEnt = user;
    },
    onDelete(uid) {
      let self = this;
      this.$axios
        .post("/User/DeleteUser", null, {
          params: { id: uid }
        })
        .then(function(res) {
          if (res.data) {
            self.$message.success("删除成功");
            self.searchUsers();
          }
        })
        .catch(function(err) {
          console.log(err);
          self.$message.error("服务端发生错误");
        });
    }
  }
};
</script>
