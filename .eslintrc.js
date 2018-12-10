// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    amd: true,
    commonjs: true
  },
  globals: {
    document: true,
    window: true
  },
  settings: {},
  extends: [
    "airbnb", // 使用Airbnb风格的代码规范
  ],
  plugins: ["react", "import"],
  // 自定义规则
  rules: {
    "no-useless-constructor":0, //禁用不必要的构造函数
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 禁止使用debugger
    "generator-star-spacing": 0, // 生成器函数*的前后空格
    "no-console": 0, // 禁止使用console
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}], // 不能有声明后未被使用的变量或参数
    "object-curly-newline": 0, // 在大括号内强制执行一致的换行符
    "spaced-comment": 0, // 需要或不允许开始注释的空格
    "linebreak-style":0,  // 换行格式的验证
    "arrow-body-style": 0, //要求箭头函数体使用大括号
    "key-spacing":0, //该规则强制对象属性的冒号左右的空格的一致性。它可以单独验证每一个属性，或它可以确保对象中的属性在垂直方向上对齐。
    "comma-dangle":["error", "never"],

    "react/prop-types": 0, // 防止React组件定义中缺少propTypes验证
    "react/prefer-stateless-function": 0, // 强制将无状态React组件写为纯函数
    "react/forbid-prop-types": 0, // 禁止某些propTypes
    "react/jsx-filename-extension": 0, // 限制可能包含JSX的文件扩展名
    "react/jsx-one-expression-per-line": 0, // JSX中每行限制一个表达式
    "react/no-access-state-in-setstate":0,
    "react/destructuring-assignment":0,

    "import/extensions": [2, { js: "never", json: "never", svg: "always" }], // 确保在导入路径中使用一致的文件扩展名
    "import/no-extraneous-dependencies": 0, // 禁止使用无关的包
    "import/no-unresolved": 0 // 确保导入指向可以解析的文件/模块
  }
};
