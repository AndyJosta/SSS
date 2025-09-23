import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 导入 FontAwesomeIcon
import { faLeaf, faBars, faSearch, faBell } from '@fortawesome/free-solid-svg-icons'; // 导入叶子、汉堡、搜索和铃铛图标
import logLogo from '../img/log.png'; // 导入 log.png 作为 Logo

const Header = ({ toggleSidebar, isSidebarExpanded }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole'); 
  const [logoError, setLogoError] = useState(false);
  const [searchText, setSearchText] = useState(''); // 搜索文本状态
  const [notificationCount, ] = useState(2); // 通知数量状态，默认为2

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="logo-group">
        {/* 汉堡包菜单按钮 */}
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} /> {/* 始终显示汉堡包图标 */}
        </button>
        {/* 使用 log.png 作为 Logo */}
        {logoError ? (
          <FontAwesomeIcon icon={faLeaf} className="app-header-logo-fallback-icon" />
        ) : (
          <img src={logLogo} alt="Logo" className="app-header-logo" onError={handleLogoError} />
        )}
        <h1 className="app-title">茶叶管理系统</h1>
      </div>

      {/* 新增的搜索栏 */}
      <div className="header-search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="搜索病虫害..."
          className="header-search-input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <nav className="main-nav">
        {/* 新增的通知图标 */}
        <div className="notification-icon-container">
          <FontAwesomeIcon icon={faBell} className="notification-icon" />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>

        <div className="header-right"> 
          <span className="username">欢迎，{userRole === 'admin' ? '管理员' : '用户'}</span>
          <button onClick={handleLogout} className="logout-button">退出登录</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
 