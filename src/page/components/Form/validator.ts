import { message } from "antd";

const defaultValidate = (value:any) => true;

class Validator {
  validate: Function = defaultValidate;
  message: string = "";
  num: number | undefined = 0;

  constructor(message?: string, validate?: Function, num?: number) {
    this.message = message || ""  // 校验消息 必须
    this.validate = validate || defaultValidate // 校验的方法 必须
    this.num = num
  }

  getMessage(){
    return this.message
  }

  setMessage(message:string){
    this.message = message
    return this
  }

  // 验证必填
  static require = (message: string) =>{
    const validate = (val: any) =>{
      if(typeof val === "undefined" || val === null){
        return false
      }

      val = `${val}`.trim()
      return val != ""
    }
    return new Validator(message,validate)
  }

  // 验证手机号
  static phone = (message:string)=>{
    const validate = (val:any)=>{
      if(typeof val === "undefined"){
        return false
      }
      val = `${val}`.trim()
      return /^1[3-9]\d{9}$/.test(val)
    }

    return new Validator(message,validate)
  }

  // 自定义校验规则
  static requirePattern = (message:string,pattern:any)=>{
    return new Validator(message || "正则校验不通过",function(v:any){
      if(typeof pattern === "string"){
        const reg = new RegExp(pattern,"")
        return reg.test(v)
      }
      return pattern.test(v)
    })
  }


}

export default Validator;
