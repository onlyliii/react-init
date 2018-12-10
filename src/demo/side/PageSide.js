/**
 * @ignore  ==============================================================
 * @fileoverview 页面的左边导航
 * @author  xiaojianli(872458899@qq.com)
 * @version 1.0.0
 * @date  2018/10/4
 * @ignore  ==============================================================
 */
import './sider.less';
import React from 'react';
import { Menu, Icon, Button, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const { SubMenu } = Menu;

export default class PageSide extends React.Component {
  state = {
    collapsed: false
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Sider
        width={220}
        className="page-left-nav"
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu mode="inline" defaultSelectedKeys={this.props.selectedKeys || ['1']} defaultOpenKeys={this.props.openKeys}>
          <Menu.Item key="1">
            <Icon type="video-camera" />
            <span><Link to="/">直播列表</Link></span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="upload" />
            <span><Link to="/upload">视频上传</Link></span>
          </Menu.Item>
          <SubMenu key="sub2" title={<span><Icon type="user" /><span>用户中心</span></span>}>
            <Menu.Item key="3">
              <Link to="/baseMsg">基本信息</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/updatePassword">修改密码</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
