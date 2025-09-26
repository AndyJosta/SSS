import React from 'react';
import './SystemSettingsPage.css';

function SystemSettingsPage() {
  const [userName, setUserName] = React.useState('管理员');
  const [email, setEmail] = React.useState('admin@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [theme, setTheme] = React.useState('light');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSaveSettings = () => {
    // 在这里处理保存设置的逻辑
    console.log('设置已保存！', {
      userName, email, notificationsEnabled, theme, password
    });
    alert('设置已保存！');
  };

  return (
    <div className="system-settings-page">
      <h1>系统设置</h1>

      <div className="settings-section">
        <h2>账户设置</h2>
        <div className="setting-item">
          <label>用户名:</label>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
        </div>
        <div className="setting-item">
          <label>邮箱:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
      </div>

      <div className="settings-section">
        <h2>安全设置</h2>
        <div className="setting-item">
          <label>新密码:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="setting-item">
          <label>确认密码:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
      </div>

      <div className="settings-section">
        <h2>通知设置</h2>
        <div className="setting-item switch-item">
          <label>启用通知:</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notificationsEnabled} 
              onChange={(e) => setNotificationsEnabled(e.target.checked)} 
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h2>外观设置</h2>
        <div className="setting-item">
          <label>主题:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
        </div>
      </div>

      <button className="save-settings-button" onClick={handleSaveSettings}>
        保存设置
      </button>
    </div>
  );
}

export default SystemSettingsPage;
