import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

// 接收 toggleSidebar 和 isSidebarOpen 作为 props
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); // 修正 userRole 的位置

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
        {/* 汉堡包菜单按钮，只在小屏幕显示 */} 
        <button className="hamburger-menu" onClick={toggleSidebar}>
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        <div className="header-right"> {/* 调整 header-right 的位置 */}
          <span className="username">欢迎，{userRole === 'admin' ? '管理员' : '用户'}</span>
          <button onClick={handleLogout} className="logout-button">退出登录</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
 