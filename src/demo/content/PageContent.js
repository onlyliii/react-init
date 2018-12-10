/**
 * @ignore  ==============================================================
 * @fileoverview 页面的主内容
 * @author  xiaojianli(872458899@qq.com)
 * @version 1.0.0
 * @date  2018/10/4
 * @ignore  ==============================================================
 */
import './pageContent.less';
import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import LiveList from './live/LiveList';
import VideoUpload from './upload/VideoUpload';
import BaseMsg from './user/BaseMsg';
import UpdatePassword from './user/UpdatePassword';

const { Content } = Layout;

const PageContent = () => (
  <Content className="page-content">
    <Route exact path="/" component={LiveList} />
    <Route path="/upload" component={VideoUpload} />
    <Route path="/baseMsg" component={BaseMsg} />
    <Route path="/updatePassword" component={UpdatePassword} />
  </Content>
);

export default PageContent;
