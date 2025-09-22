import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header'; // 导入 Header 组件
import TeaPerson from './TeaPerson'; // 导入 TeaPerson 组件
import './HomePage.css';

const HomePage = () => {
  // 移除 isSidebarOpen 状态和 toggleSidebar 函数，因为侧边栏将始终可见
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 新增状态来判断是否为移动端

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app-layout">
      <Header /> {/* 移除 toggleSidebar 和 isSidebarOpen prop */}
      <div className="homepage-container">
        <aside className="sidebar"> {/* 移除动态类名 */}
          <nav>
            <ul>
              <li>
                <NavLink to="/homepage/blockchain">区块链</NavLink>
              </li>
              <li>
                <NavLink to="/homepage/tea-detection">茶叶病虫检测</NavLink>
              </li>
              <li>
                <NavLink to="/homepage/user-management">用户管理</NavLink>
              </li>
              <li>
                <NavLink to="/homepage/iot-dashboard">IoT 数据监控</NavLink>
              </li>
              <li>
                <NavLink to="/homepage/empty5">待空5</NavLink>
              </li>
              {/* <li>
                <NavLink to="/homepage/detection-dashboard">智能检测仪表板</NavLink>
              </li> */}
            </ul>
          </nav>
        </aside>
        <main className="main-content"> {/* 移除动态遮罩类名 */}
          <Outlet /> {/* 用于渲染子路由内容 */}
        </main>
      </div>
      {!isMobile && <TeaPerson />} {/* 根据 isMobile 状态条件渲染 TeaPerson 组件 */}
    </div>
  );
};

export default HomePage;
