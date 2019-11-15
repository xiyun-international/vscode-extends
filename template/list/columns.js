/**
 *  列表表头
 */
const columns = [
  {
    title: '单号',
    dataIndex: 'code',
    width: '30%',
  },
  {
    title: '时间',
    dataIndex: 'date',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

export default columns;
