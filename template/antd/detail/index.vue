<template>
  <xy-context :breadcrumb="[
      { name: '用户管理' },
      { name: '用户列表', path: '/biz/userList' },
      { name: '用户详情' },
    ]" title="用户详情"
  >
    <xy-title>用户信息</xy-title>
    <a-form :form="form">
      <a-row>
        <a-col v-bind="formItemCol">
          <a-form-item v-bind="Layout.formItemLayout" label="编号：" props="apply_name">
            {{ form }}
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemCol">
          <a-form-item v-bind="Layout.formItemLayout" label="时间：">
            {{ form }}
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemCol">
          <a-form-item v-bind="Layout.formItemLayout" label="状态">
            {{ form }}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <xy-title>收货信息</xy-title>
    <a-form :form="form">
      <a-row>
        <a-col v-bind="formItemCol">
          <a-form-item v-bind="Layout.formItemLayout" label="申请人：" props="apply_name">
            {{ form }}
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemCol">
          <a-form-item v-bind="Layout.formItemLayout" label="商户名称：">
            {{ form }}
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemCol">
          <a-form-item v-bind="Layout.formItemLayout" label="项目名称：">
            {{ form }}
          </a-form-item>
        </a-col>
        <a-col v-bind="formItemCol">
          <a-form-item v-bind="Layout.formItemLayout" label="备注：">
            {{ form }}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </xy-context>
</template>

<script>
/**
 * 详情页路由
 * @route('biz/detail')
 */

import * as Layout from '@/utils/form';

export default {
  name: 'DetailDemo',
  data() {
    return {
      form: {},
      formItemCol: {
        span: 8,
      },
      Layout,
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$post('/v1/biz/detail').then(() => {
        this.$message({
          type: 'success',
        });
      });
    },
  },
};
</script>
