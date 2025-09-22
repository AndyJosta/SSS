import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logLogo from '../img/log.png'; // 导入 log.png 作为 Logo

const Header = ({ toggleSidebar, isSidebarExpanded }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); 

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo-group">
        {/* 汉堡包菜单按钮 */}
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <i className={isSidebarExpanded ? "fas fa-times" : "fas fa-bars"}></i> {/* 根据展开状态切换图标 */}
        </button>
        {/* 使用 log.png 作为 Logo */}
        <img src={logLogo} alt="茶叶管理系统 Logo" className="app-header-logo" />
        <h1 className="app-title">茶叶管理系统</h1>
      </div>

      <nav className="main-nav">
        <div className="header-right"> 
          <span className="username">欢迎，{userRole === 'admin' ? '管理员' : '用户'}</span>
          <button onClick={handleLogout} className="logout-button">退出登录</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
 