import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole'); // 清除用户角色
    navigate('/login'); // 重定向到登录页面
  };

  return (
    <header className="app-header">
      <div className="app-title">
        <h1>茶叶病虫害检测与溯源系统</h1>
      </div>
      <nav className="main-nav">
        <button onClick={handleLogout} className="logout-button">退出登录</button>
      </nav>
    </header>
  );
};

export default Header;
 