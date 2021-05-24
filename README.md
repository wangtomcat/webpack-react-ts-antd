
> webpack+react+ts+antd 搭建的一个项目。熟悉 webpack 的配置，不用 react 脚手架，搭建 react 项目，并使用 antd 组件，封装一套form表单。


## webpack搭建
  1. 当在配置编译.scss时，需要注意node-sass、sass-loader的版本；或者注意webpack的版本。
  2. resolve 配置时，需要注意 extensions 的解析顺序，它取决文件中引入模块的顺序；alias 配置了时，需要注意tsconfig.json 文件中 paths 的配置，否则模块引入时，预编译不会通过。

## 分支
    tomc/0.0.1 基础 单页面
    tomc/0.0.2 封装的form组件修改refs取值方式，页面中有通过遍历方式渲染组件，并使用ref对遍历的组件取值时，ref的写法
    tomc/0.0.3 多页面





