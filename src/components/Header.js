import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faBars, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import logLogo from '../img/log.png';

const searchableRoutes = [
  { name: '区块链页面', path: '/homepage/qkl' },
  { name: '茶叶检测页面', path: '/homepage/cyjc' },
  { name: '用户管理页面', path: '/homepage/yhgl' },
  { name: 'IoT 大屏页面', path: '/homepage/iot' },
  { name: '设备预警页面', path: '/homepage/sbyj' },
  { name: '数据分析页面', path: '/homepage/sjfx' },
  { name: '系统设置页面', path: '/homepage/settings' },
  { name: 'AI 模型库页面', path: '/homepage/aimxk' },
  { name: '帮助与支持页面', path: '/homepage/support' },
  { name: '我的茶叶项目页面', path: '/homepage/repo/my-tea-project' },
  { name: 'IoT 集成页面', path: '/homepage/repo/iot-integration' },
];

const Header = ({ toggleSidebar, isSidebarExpanded }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [logoError, setLogoError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]); // 新增搜索结果状态
  const [notificationCount,] = useState(2);

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  // 处理搜索逻辑
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text.length > 0) {
      const filteredResults = searchableRoutes.filter(route =>
        route.name.includes(text) || route.path.includes(text)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  // 处理搜索结果点击
  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchText(''); // 清空搜索框
    setSearchResults([]); // 清空搜索结果
  };

  return (
    <header className="app-header">
      <div className="logo-group">
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {logoError ? (
          <FontAwesomeIcon icon={faLeaf} className="app-header-logo-fallback-icon" />
        ) : (
          <img src={logLogo} alt="Logo" className="app-header-logo" onError={handleLogoError} />
        )}
        <h1 className="app-title">茶叶管理系统</h1>
      </div>

      <div className="header-search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="搜索功能..."
          className="header-search-input"
          value={searchText}
          onChange={handleSearch} // 调用新的搜索处理函数
        />
        {searchText.length > 0 && searchResults.length > 0 && (
          <ul className="search-results-dropdown">
            {searchResults.map((result) => (
              <li key={result.path} onClick={() => handleSearchResultClick(result.path)}>
                {result.name}
              </li>
            ))}
          </ul>
        )}
        {searchText.length > 0 && searchResults.length === 0 && (
          <ul className="search-results-dropdown">
            <li className="no-results">无匹配结果</li>
          </ul>
        )}
      </div>

      <nav className="main-nav">
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
 