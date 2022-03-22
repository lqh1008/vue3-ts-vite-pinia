import type { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 40px'
  },
  // colLayout: {
  //   span: 8
  // },
  formItems: [
    {
      type: 'input',
      label: 'id',
      placeholder: '请输入id',
      field: 'id'
    },
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'name'
    },
    {
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      field: 'password'
    },
    {
      type: 'select',
      label: '运动',
      placeholder: '请选择喜欢的运动',
      options: [
        {
          label: '篮球',
          value: 'basketball'
        },
        {
          label: '足球',
          value: 'football'
        }
      ],
      field: 'sport'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择创建的时间范围',
      otherOptions: {
        ['start-placeholder']: '',
        ['end-placeholder']: '',
        type: 'daterange'
      },
      field: 'date'
    }
  ]
}
