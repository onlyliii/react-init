/**
 * @ignore  ==============================================================
 * @fileoverview demo页面
 * @author  xiaojianli(872458899@qq.com)
 * @version 1.0.0
 * @date  2018/10/4
 * @ignore  ==============================================================
 */
import './demo.less';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import PageFooter from './footer/PageFooter';
import PageHeader from './header/PageHeader';
import PageSider from './side/PageSide';
import PageContent from './content/PageContent';

export default class Demo extends Component {
  keyValues = {
    '/':{ value:['1'] },
    '/upload':{ value:['2'] },
    '/baseMsg':{ value:['3'], open:['sub2'] },
    '/updatePassword':{ value:['4'], open:['sub2'] }
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { hash } = window.location;
    let selectedKeys;
    let openKeys;
    if (hash.length > 1) {
      const hashVale = hash.substr(1);
      selectedKeys = this.keyValues[hashVale].value;
      openKeys = this.keyValues[hashVale].open;
    }

    return (
      <Layout>
        <PageHeader />
        <Router>
          <Layout>
            <PageSider selectedKeys={selectedKeys} openKeys={openKeys} />
            <PageContent />
          </Layout>
        </Router>
        <PageFooter />
      </Layout>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('root'));
