import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from './Header'; // 导入 Header 组件
import TeaPerson from './TeaPerson'; // 导入 TeaPerson 组件
import './HomePage.css';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 新增状态来控制侧边栏的开合

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} /> {/* 传递 toggleSidebar 和 isSidebarOpen 给 Header */}
      <div className="homepage-container">
        <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}> {/* 动态添加类名 */}
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
        <main className={`main-content ${isSidebarOpen ? 'sidebar-open-overlay' : ''}`}> {/* 动态添加遮罩类名 */}
          <Outlet /> {/* 用于渲染子路由内容 */}
        </main>
      </div>
      <TeaPerson /> {/* 将 TeaPerson 组件放置在 HomePage 内部，固定在左下角 */} 
    </div>
  );
};

export default HomePage;
