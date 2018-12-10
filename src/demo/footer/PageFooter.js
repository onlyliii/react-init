/**
 * @ignore  ==============================================================
 * @fileoverview 页尾
 * @author  xiaojianli(872458899@qq.com)
 * @version 1.0.0
 * @date  2018/10/4
 * @ignore  ==============================================================
 */
import './footer.less';
import React from 'react';
import { Layout } from 'antd';


const { Footer } = Layout;

const PageFooter = () => <Footer className="page-footer"><p>Copyright © 2007-2018 上海聚力传媒技术有限公司 All Rights Reserved</p><p>沪ICP备09010723号－25</p></Footer>;

export default PageFooter;
