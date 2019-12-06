// import { validIdCard, validMobile } from '@xiyun/utils';

// export default (that = {}, scenraio) => ({
export default () => ({
  name: [
    { required: true, message: '请输入32个字以内的会员姓名', trigger: 'blur' },
    {
      min: 2,
      max: 32,
      message: '长度在 2 到 32 个字符',
      trigger: 'blur',
    },
  ],
  sno: [
    {
      required: true,
      validator(rule, value, callback) {
        if (/^[a-zA-Z0-9]{2,32}$/.test(value)) {
          callback();
        } else {
          callback(new Error('会员编号只能填写数字、字母'));
        }
      },
      trigger: 'blur',
    },
  ],
});
