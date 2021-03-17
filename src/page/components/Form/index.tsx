import React from 'react'
import { Form } from 'antd'
import FormInput from './input'

interface FormModelItem {
  type: string;
  name?: string;
  layout?: Array<number>;
  label?:string;
  vertical?: boolean;
  [key:string]: any;
}

interface IProps {
  applyFormItem?: Array<any>;
  vertical?: boolean;
  inline?: boolean;
  model?: FormModelItem[],
  className?: string;
  style?: {[key:string]:any};
  columns?: string | number;
  responsive?: boolean;
  layout?: FormLayout; // 布局
}

type IType = "input" | "number" | "password" | "textarea"
type FormLayout = 'horizontal' | 'inline' | 'vertical';

export default class MiniForm extends React.Component<IProps>{
  public getData(): | {[key:string]:any} | false {
    let newForm = {}
    let validate = true
    for(const _ref in this.refs){
      const component: any = this.refs[_ref]
      if(component.getData){
        const data = component.getData()
        if(data === false){
          validate = false
        }else{
          newForm = Object.assign(newForm,data)
        }
      }
    }
    return validate === false ? false : newForm
  }

  render(){
    const {
      model = [],
      applyFormItem,
      vertical,
      inline,
      className,
      children,
      style = {},
      columns,
      responsive = true,
      layout = "horizontal",
    } = this.props
    const classList = ["mini_form_area",className]

    // 可以不需要
    // if(vertical){
    //   classList.push("vertical")
    // }
    // if(columns){
    //   classList.push("columns")
    //   style.columns = columns
    // }

    const typeSwitcher = {
      "input":(item:any,key:any)=> <FormInput data={item} key={key} ref={key} />,
      "number":(item:any,key:any)=> <FormInput data={item} key={key} ref={key} />,
      "password":(item:any,key:any)=> <FormInput data={item} key={key} ref={key} />,
      "textarea":(item:any,key:any)=> <FormInput data={item} key={key} ref={key} />,
    }

    return  <Form
      className={classList.join(' ')}
      style={style}
      layout={layout}
    >
      {
        model.map((item,index)=>{
          const key = item.type + item.name + index;
          const form = typeSwitcher[item.type as IType]
          return form ? form(item,key) : null
        })
      }
      {children}
    </Form>
  }

}