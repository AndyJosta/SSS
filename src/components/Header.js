import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

// 移除 toggleSidebar 和 isSidebarOpen props，因为侧边栏将始终可见
const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); 

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo-group">
        <span className="logo-icon">🍃</span>
        <h1 className="app-title">茶叶管理系统</h1>
      </div>

      <nav className="main-nav">
        {/* 移除汉堡包菜单按钮 */} 
        {/* <button className="hamburger-menu" onClick={toggleSidebar}>
          {isSidebarOpen ? '✕' : '☰'}
        </button> */}
        <div className="header-right"> 
          <span className="username">欢迎，{userRole === 'admin' ? '管理员' : '用户'}</span>
          <button onClick={handleLogout} className="logout-button">退出登录</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
 