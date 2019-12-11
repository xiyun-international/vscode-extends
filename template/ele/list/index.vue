<template>
  <div>
    <xy-title>会员管理</xy-title>

    <!-- 搜索 -->
    <xy-wrapper>
      <search ref="search" @onSearch="onSearch" />
    </xy-wrapper>

    <!-- 功能按钮 -->
    <div class="t-MT24">
      <el-button @click="onCreate" type="primary">添加会员</el-button>
      <el-button @click="onExport" type="primary">导出</el-button>
    </div>

    <xy-wrapper class="t-MT24">
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        :empty-text="emptyText"
        border
        tooltip-effect="dark"
      >
        <el-table-column prop="sno" label="会员编号" min-width="80" />
        <el-table-column prop="name" label="会员姓名" min-width="80" />
        <el-table-column prop="orgStr" label="组织架构" min-width="80" />
        <el-table-column label="操作" min-width="140" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row.memberId)">编辑</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="onDetail(scope.row.memberId)">查看详情</el-button>
            <span>|</span>
            <el-button type="text" size="small" @click="onDelete(scope.row.memberId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="t-MT30 t-tr">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="paginate.currentPage"
          @size-change="handleSizeChange"
          :page-sizes="[20, 100, 200, 500]"
          :page-size="paginate.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginate.total"
         />
      </div>
    </xy-wrapper>
  </div>
</template>

<script>
import { download } from '@/tools/file';

import Search from './search.vue';
import Create from './dialogs/create.vue';
import Edit from './dialogs/edit.vue';
import Detail from './dialogs/detail.vue';

/**
 * 会员中心-会员管理
 * @route('biz/list')
 */
export default {
  components: {
    Search,
  },
  data() {
    return {
      // 表格数据
      tableData: [],
      emptyText: '数据正在加载中...',
      // 分页
      paginate: {
        currentPage: 1,
        pageSize: 20,
        total: 1,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    /**
     * 请求列表数据
     * @param {number} currentPage - 当前页
     * @param {number} pageSize - 页数
     */
    getList() {
      this.post('/v1/member/list', {
        ...this.$refs.search.form,
        currentPage: this.paginate.currentPage,
        pageSize: this.paginate.pageSize,
      }).then(res => {
        this.tableData = res.bizContent.resultList;
        this.paginate.total = res.bizContent.totalCount;
        this.emptyText = this.tableData.length === 0 ? '暂无数据' : '';
      });
    },

    // 创建
    onCreate() {
      this.$dialog(Create, {
        events: {
          onSuccess() {
            this.getList();
          },
        },
      });
    },

    // 编辑
    onEdit(id) {
      this.$dialog(Edit, {
        props: { id },
        events: {
          onSuccess() {
            this.getList();
          },
        },
      });
    },

    // 详情
    onDetail(id) {
      this.$dialog(Detail, {
        props: { id },
      });
    },

    // 删除
    onDelete(memberId) {
      this.$msgbox({
        title: '',
        message: '您确定删除此会员吗？',
        confirmButtonText: '确定',
        showCancelButton: true,
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
          this.post('/v1/member/updateStatus', {
            status: 2,
            memberId,
          }).then(res => {
            this.$message({ 
              type: 'success', 
              message: res.message,
            });
            this.getList();
          });
      }).catch(() => {});
    },

    // 导出
    onExport() {
      window.open(download('/v1/member/export', this.form), '_blank');
    },

    // 搜索
    onSearch() {
      this.paginate.currentPage = 1;
      this.getList();
    },

    /**
     * 翻页
     * @param {number} currentPage - 当前页
     */
    handleCurrentChange(currentPage) {
      this.paginate.currentPage = currentPage;
      this.getList();
    },

    /**
     * 更改页数
     * @param {number} pageSize - 页数
     */
    handleSizeChange(pageSize) {
      this.paginate.currentPage = 1;
      this.paginate.pageSize = pageSize;
      this.getList();
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
