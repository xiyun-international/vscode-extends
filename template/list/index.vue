<template>
  <xy-context :breadcrumb="[{ name: '商品管理', path: 'biz/list' }, { name: '商品列表' }]" title="商品列表">
    <search-form ref="search" @onSearch="onSearch"></search-form>
    <a-row>
      <a-table
        class="t-MT24"
        :rowKey="record => record.id"
        :columns="columns"
        :dataSource="listData"
        :pagination="true"
        :locale="{ emptyText: '暂无数据' }"
      >
        <template slot="action">
          <router-link to="/biz/detail">
            查看
          </router-link>
        </template>
      </a-table>
      <xy-pagination
          :current-page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.totalCount"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
      />
    </a-row>
  </xy-context>
</template>

<script>
import XyPagination from '@/components/pagination.vue';
import SearchForm from './form/search.vue';
import columns from './columns';

/**
 * 商品列表页路由
 * @route('biz/list')
 */
export default {
  name: 'listDemo',
  data() {
    return {
      columns,
      listData: [],
      pagination: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
      },
    };
  },
  components: {
    SearchForm,
    XyPagination
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 搜索
    onSearch() {
      this.pagination.page = 1;
      this.getList();
    },

    // 当前页变更
    handleCurrentChange(page) {
      this.pagination.page = page;
      this.getList();
    },

    // 当前页数变更
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.getList();
    },

    // 列表数据
    getList() {
      const formData = this.$refs.search.form.getFieldsValue();
      if (formData.time) {
        formData.time = formData.time.format('YYYY-MM-DD');
      }
      this.$post('/v1/biz/list', {
        ...formData,
        pageNum: this.pagination.page,
        pageSize: this.pagination.pageSize
      }).then(res => {
        this.listData = res.resultObject.listObject;
        this.pagination.totalCount = res.resultObject.totalItems;
      });
    },
  },
};
</script>

<style scoped></style>
