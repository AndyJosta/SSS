import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 导入 FontAwesomeIcon
import {
  faLeaf, // 叶子图标
  faTachometerAlt, // 仪表盘图标
  faUsers, // 用户图标
  faCube, // 区块链图标
  faChartLine, // 数据分析图标
  faBell, // 警报图标
  faCog, // 设置图标
  faBook, // 文档图标
  faQuestionCircle, // 帮助图标
  faProjectDiagram, // 项目图表图标
  faMicrochip, // 微芯片图标 (IoT)
  faBrain, // 大脑图标 (AI 模型)
  faSearch, // 搜索图标
  faChevronLeft // 左箭头图标 (用于收起侧边栏)
} from '@fortawesome/free-solid-svg-icons'; // 导入 Font Awesome 实心图标
import Header from './Header'; // 导入 Header 组件
import TeaPerson from './TeaPerson'; // 导入 TeaPerson 组件
import './HomePage.css';
import logLogo from '../img/log.png'; // 导入 log.png 作为 Logo
// import githubLogo from '../img/github-mark-white.png'; // 导入 GitHub Logo (已注释掉，因为文件不存在)

const HomePage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // 默认展开侧边栏
  const [logoError, setLogoError] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(prevState => !prevState);
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  // 模拟 GitHub 风格的侧边栏内容结构，但内容是您的应用功能
  const sidebarSections = [
    {
      type: 'links',
      title: '', // 顶部无标题部分
      items: [
        { to: "/homepage/iot-dashboard", icon: faTachometerAlt, text: "环境监控" }, 
        { to: "/homepage/user-management", icon: faUsers, text: "用户管理" }, 
        { to: "/homepage/tea-detection", icon: faLeaf, text: "茶叶病虫检测" }, 
        { to: "/homepage/blockchain", icon: faCube, text: "区块链" },
        { to: "/homepage/data-analysis", icon: faChartLine, text: "数据分析" }, 
        { to: "/homepage/device-alerts", icon: faBell, text: "设备预警" }, 
        { to: "/homepage/settings", icon: faCog, text: "系统设置" }, 
      ]
    },
    {
      type: 'separator'
    },
    {
      type: 'links',
      title: '资源',
      items: [
        { to: "/homepage/documentation", icon: faBook, text: "文档" }, 
        { to: "/homepage/support", icon: faQuestionCircle, text: "帮助与支持" }, 
      ]
    },
    {
      type: 'separator'
    },
    {
      type: 'repositories',
      title: '我的项目',
      searchPlaceholder: '搜索我的项目...',
      items: [
        { to: "/homepage/repo/my-tea-project", icon: faProjectDiagram, text: "我的茶叶项目" },
        { to: "/homepage/repo/iot-integration", icon: faMicrochip, text: "IoT 集成" },
        { to: "/homepage/repo/ai-models", icon: faBrain, text: "AI 模型库" },
      ]
    }
  ];

  return (
    <div className="app-layout">
      <Header toggleSidebar={toggleSidebar} isSidebarExpanded={isSidebarExpanded} /> 
      <div className="homepage-container">
        <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}> 
          <div className="sidebar-header">
            {/* 使用 log.png 作为 Logo */}
            {logoError ? (
              <FontAwesomeIcon icon={faLeaf} className="sidebar-logo-fallback-icon" />
            ) : (
              <img src={logLogo} alt="茶叶管理系统 Logo" className="app-logo" onError={handleLogoError} />
            )}
            {/* 移除关闭按钮，因为现在是展开/折叠模式 */}
            {/* <button className="close-sidebar-btn">×</button> */}
          </div>
          <nav>
            {sidebarSections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                {section.type === 'separator' && <hr className="sidebar-separator" />}
                {section.type === 'links' && ( <>
                  {section.title && <h3 className="sidebar-section-title">{section.title}</h3>}
                  <ul>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <NavLink to={item.to} end={item.to === "/home"}>
                          <FontAwesomeIcon icon={item.icon} /> 
                          <span className="sidebar-link-text">{item.text}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>)}
                {section.type === 'repositories' && ( <>
                  {section.title && <h3 className="sidebar-section-title">{section.title}</h3>}
                  <div className="sidebar-repo-search">
                    <FontAwesomeIcon icon={faSearch} />
                    <input type="text" placeholder={section.searchPlaceholder} className="sidebar-search-input" />
                  </div>
                  <ul className="sidebar-repo-list">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <NavLink to={item.to}>
                          <FontAwesomeIcon icon={item.icon} /> 
                          <span className="sidebar-link-text">{item.text}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>)}
              </React.Fragment>
            ))}
          </nav>
          <div className="sidebar-footer">
            <p>&copy; 2025 茶叶管理系统</p> {/* 修改版权信息为您的应用名称 */}
            <div className="footer-links">
              <a href="" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer">关于我们</a>
              <a href="" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer">服务条款</a>
              <a href="" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer">隐私政策</a>
              <a href="" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer">联系我们</a>
            </div>
          </div>
          {/* 新增的收起侧边栏按钮 */} 
          {isSidebarExpanded && (
            <button className="collapse-sidebar-button" onClick={toggleSidebar}> 
              <FontAwesomeIcon icon={faChevronLeft} /> 
            </button>
          )} 
        </aside>
        <main className={`main-content ${isSidebarExpanded ? 'expanded-content' : 'collapsed-content'}`}> 
          <Outlet />
        </main>
      </div>
      <TeaPerson /> 
    </div>
  );
};

export default HomePage;
