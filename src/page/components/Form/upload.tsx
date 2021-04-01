import React from 'react'
import api from '../../config/api'
import FormBase, { IProps } from './base'
import FormLayout from './formLayout'
import Validator from './validator'

interface IConfig {
  name: string; //表单名 数据的key
  value: any[]; // 表单值 数据的value
  type?: string; // 表单类型
  label?: string;
  message?: string; // 错误信息
  layout?: Array<number>; // 布局
  description?: string; // 字段的描述
  validator?: Validator; // 校验规则
  disabled?: boolean; // 是否禁用
  limit?: number; // 限制
  trigger?: React.ReactNode; // 触发按钮
  beforeUpload?: Function;
  onChange?: Function;
}

export default class FromUpload extends FormBase {
  constructor(props: IProps) {
    super(props)
    const data: IConfig = props.data || {}
    const val = data.value || []

    const { value, fileList } = formatPropsValue(val)
    this.state = Object.assign(this.state, {
      fileList,
      value,
      defaultValue: value,
      name: "",
      loading: false
    })
  }

  static getDerivedStateFromProps(nextProps: any, state: any) {
    const { data } = nextProps
    const newState = state
    const { value, fileList } = formatPropsValue(data.value)
    if (JSON.stringify(state.defaultValue) != JSON.stringify(value)) {
      newState.fileList = fileList
      newState.value = value
      newState.defaultValue = value
    }

    if (state.defaultMessage != data.message) {
      newState.message = data.message
      newState.defaultMessage = data.message
    }
    return newState

  }

  onChange(info: Array<any> = []) {
    const { data } = this.props
    const { formatter = defaultFormatter } = data

    const value: any[] = []
    for (let i = 0; i < info.length; i++) {
      const file: any = info[i]
      if (file.state === "done") {
        const val = formatter(file.response)
        info[i].downloadURL = val
        info[i].imgURL = val
        info[i].url = val
        value.push(val)
      }
    }

    this.validate(value)
    this.setState({
      fileList: info,
      value
    })
  }


  getData() {
    const { data = {} } = this.props
    const { limit } = data
    const { value } = this.state
    const status = this.validate(value)
    const firstValue = value && value[0]
    const val = limit === 1 ? firstValue : value

    if (status) {
      return { [data.name || data.paramKey]: val || value[value.length - 1] }
    }
    return false
  }


  render() {
    return <FormLayout>

    </FormLayout>
  }
}

// 获取默认的fileList
function formatPropsValue(value: any) {
  if (value === undefined || value === null) {
    return { value: [], fileList: [] }
  }
  if (!Array.isArray(value)) {
    const { file, url } = creatOneFile(value)
    return { value: [url], fileList: [file] }
  }
  const valueList: any[] = []
  const fileList: any[] = []
  value.forEach(item => {
    const { file, url } = creatOneFile(item)
    valueList.push(url)
    fileList.push(file)
  })

  return { value: valueList, fileList }
}

// 创建一个文件的数据格式
function creatOneFile(content: any) {
  let url = ""
  let name = ""
  if (typeof content === "string") {
    url = content
    name = content
  } else if (content && content.url && content.name) {
    url = content.url
    name = content.name
  }

  const file = {
    uid: `${Math.floor(Math.random() * 1000)}`,
    name,
    state: "done",
    url,
    downloadURL: url,
    imgURL: url,
    size: 0,
    response: {
      downloadUrl: url,
      imgUrl: url
    }
  }

  return { url, file }
}

// 接口默认返回的数据格式，当接口返回的格式不一样时，需要修改这里
function defaultFormatter(response: any) {
  return response && response.model
}