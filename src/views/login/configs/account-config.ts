const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传的内容',
      trigger: 'blur'
    },
    {
      pattern: /^[A-z0-9]{5,10}/,
      message: '用户名必须是5～10个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传的内容',
      trigger: 'blur'
    },
    {
      pattern: /^[0-9]{3,}/,
      message: '密码必须是3位以上的数字',
      trigger: 'blur'
    }
  ]
}

export { rules }
