<template>
  <div>
    <el-form :model="form" label-width="80px" ref="userForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="关键字" prop="searchKey">
            <el-input
              v-model="form.searchKey"
              :maxlength="60"
              placeholder="请输入会员名称/编号/手机号/证件号码"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="会员分类" prop="type">
            <common-select
              v-model="form.type"
              placeholder="请选择会员分类"
              :data="[{ value: '全部', key: '' }]"
              api="/v1/member/type/sourceData"
              :mapping="{
                label: 'value',
                value: 'key',
              }"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="form.name"
              :maxlength="60"
              placeholder="姓名"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="t-FAR">
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="default" @click="onReset">重置</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {},
    };
  },

  methods: {
    // 执行搜索
    onSearch() {
      this.$emit('onSearch');
    },

    // 重置表单
    onReset() {
      this.$refs.userForm.resetFields();
    },
  },
};
</script>
<style scoped>

</style>
