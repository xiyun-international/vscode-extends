<template>
  <div>
    <el-dialog width="50%" title="添加会员" :visible.sync="visible">
      <el-form label-width="120px" :model="form" :rules="rules" ref="form" class="adjust-form">
        <el-form-item label="会员姓名" prop="name">
          <el-input
            v-model="form.name"
            :maxlength="32"
            placeholder="请输入32个字以内的会员姓名"
          ></el-input>
        </el-form-item>

        <el-form-item label="证件类型" prop="cardType">
          <el-radio-group v-model="form.cardType">
            <el-radio :label="1">身份证</el-radio>
            <el-radio :label="2">港澳台证</el-radio>
            <el-radio :label="3">外籍护照</el-radio>
          </el-radio-group>
        </el-form-item>

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
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button v-loading="isLoading" type="primary" @click="onEnsure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import rules from './rules';

export default {
  data() {
    return {
      visible: false,
      isLoading: false,
      form: {},
      rules: rules(this, 'create'),
    };
  },
  methods: {
    /**
     * 设置所属组织id
     * @param {string} id - 组织架构 id
     */
    onSelectUserOrg(id) {
      this.form.orgId = id;
    },

    // 创建会员
    onEnsure() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true;
          this.post('/v1/member/createMember', this.form)
            .then(() => {
              this.$message({
                type: 'success',
                message: '添加会员成功',
              });
              this.isLoading = false;
              this.$emit('onSuccess', true);
              this.close();
            })
            .catch(() => {
              this.isLoading = false;
            });
        }
      });
    },

    // 关闭对话框
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.adjust-form {
  margin-left: -20px;
}
.el-checkbox {
  width: 100px;
  margin-left: 0;
  margin-right: 15px;
}
.el-checkbox + .el-checkbox {
  margin-left: 0;
  margin-right: 15px;
}
.el-date-editor {
  width: 57%;
  margin-left: 10px;
}
.date-picker-adjust {
  width: 100%;
  margin-left: unset;
}
</style>
