type IFormType = 'input' | 'password' | 'select' | 'datepicker'

interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any
  otherOptions?: any
}

interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
}

export type { IFormItem, IForm }
