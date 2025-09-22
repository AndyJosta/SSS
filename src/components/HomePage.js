import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header'; // 导入 Header 组件
import TeaPerson from './TeaPerson'; // 导入 TeaPerson 组件
import './HomePage.css';
import logLogo from '../img/log.png'; // 导入 log.png 作为 Logo
// import githubLogo from '../img/github-mark-white.png'; // 导入 GitHub Logo (已注释掉，因为文件不存在)

const HomePage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // 默认展开侧边栏

  const toggleSidebar = () => {
    setIsSidebarExpanded(prevState => !prevState);
  };

  // 模拟 GitHub 风格的侧边栏内容结构，但内容是您的应用功能
  const sidebarSections = [
    {
      type: 'links',
      title: '', // 顶部无标题部分
      items: [
        { to: "/iot-dashboard", icon: "fas fa-tachometer-alt", text: "环境监控" }, 
        { to: "/user-management", icon: "fas fa-users", text: "用户管理" }, 
        { to: "/tea-detection", icon: "fas fa-leaf", text: "茶叶病虫检测" }, 
        { to: "/blockchain", icon: "fas fa-cube", text: "区块链" },
        { to: "/data-analysis", icon: "fas fa-chart-line", text: "数据分析" }, 
        { to: "/device-alerts", icon: "fas fa-bell", text: "设备预警" }, 
        { to: "/settings", icon: "fas fa-cog", text: "系统设置" }, 
      ]
    },
    {
      type: 'separator'
    },
    {
      type: 'links',
      title: '资源',
      items: [
        { to: "/documentation", icon: "fas fa-book", text: "文档" }, 
        { to: "/support", icon: "fas fa-question-circle", text: "帮助与支持" }, 
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
        { to: "/repo/my-tea-project", icon: "fas fa-project-diagram", text: "我的茶叶项目" },
        { to: "/repo/iot-integration", icon: "fas fa-microchip", text: "IoT 集成" },
        { to: "/repo/ai-models", icon: "fas fa-brain", text: "AI 模型库" },
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
            <img src={logLogo} alt="茶叶管理系统 Logo" className="app-logo" />
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
                          <i className={item.icon}></i> 
                          <span className="sidebar-link-text">{item.text}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>)}
                {section.type === 'repositories' && ( <>
                  {section.title && <h3 className="sidebar-section-title">{section.title}</h3>}
                  <div className="sidebar-repo-search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder={section.searchPlaceholder} className="sidebar-search-input" />
                  </div>
                  <ul className="sidebar-repo-list">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <NavLink to={item.to}>
                          <i className={item.icon}></i> 
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
              <a href="#" target="_blank" rel="noopener noreferrer">关于我们</a>
              <a href="#" target="_blank" rel="noopener noreferrer">服务条款</a>
              <a href="#" target="_blank" rel="noopener noreferrer">隐私政策</a>
              <a href="#" target="_blank" rel="noopener noreferrer">联系我们</a>
            </div>
          </div>
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
