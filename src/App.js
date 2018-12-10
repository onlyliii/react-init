import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import BaseRouter from '@/components/baseRouter';
import './App.css';

moment.locale('zh-cn');

class App extends Component {
  componentDidMount() {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(process.env.NODE_ENV);
      }, 2000);
    });
    p.then((data) => {
      console.log('process.env.NODE_ENV');
      console.log(data);
    });
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className="App">
          <BaseRouter />
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
