<template>
  <div>
    <el-dialog width="50%" title="会员详情" :visible.sync="visible" :before-close="onClose">
      <el-form label-width="120px" :model="form">
        <el-form-item label="会员姓名">
          {{ form.name }}
        </el-form-item>

        <el-form-item label="证件类型">
          {{ form.cardType | filterCardType}}
        </el-form-item>

        <el-form-item label="会员分类"> 
          {{ form.type }}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      visible: false,
      formId: '',
      form: {},
    };
  },
  filters: {
    filterCardType(data){
      let type;
      switch (data) {
        case '1':
          type = '身份证';
          break;
        case '2':
          type = '港澳台证';
          break;
        case '3':
          type = '外籍护照';
          break;
        default: 
          break;
      }
      return type;
    },
  },
  mounted() {
    this.formId = this.id;
    this.getInfo();
  },
  methods: {
    // 获取详情信息
    getInfo(){
      this.isLoading = true;
      this.post('/v1/member/info', { id: this.formId }).then(res => {
        this.form = res.bizContent.data;
      });
    },

    // 关闭对话框
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
