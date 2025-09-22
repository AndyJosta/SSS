import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    setError('');
    if (!username || !password) {
      setError('用户名和密码不能为空。');
      return false;
    }
    if (password.length < 6) {
      setError('密码长度不能少于6位。');
      return false;
    }
    if (isRegister && password !== confirmPassword) {
      setError('两次输入的密码不一致！');
      return false;
    }
    return true;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log('Login submitted', { username, password });
    // 模拟登录成功
    if (username === 'admin' && password === 'admin123') { // 示例管理员账户
      localStorage.setItem('userRole', 'admin');
      navigate('/homepage');
    } else if (username === 'user' && password === 'user123') { // 示例普通用户账户
      localStorage.setItem('userRole', 'user');
      navigate('/homepage');
    } else {
      setError('用户名或密码错误。');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log('Register submitted', { username, password });
    // 注册时默认创建普通用户，如果需要创建管理员，可以在这里添加逻辑判断
    localStorage.setItem('userRole', 'user'); // 注册成功后默认设置为普通用户
    alert('注册成功！请登录。');
    setIsRegister(false);
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? '注册' : '登录'}</h2>
      <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegister && (
          <div className="form-group">
            <label htmlFor="confirm-password">确认密码:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">
          {isRegister ? '注册' : '登录'}
        </button>
      </form>
      <button className="toggle-button" onClick={() => {
        setIsRegister(!isRegister);
        setError(''); // 清除错误信息
        setUsername('');
        setPassword('');
        setConfirmPassword('');
      }}>
        {isRegister ? '已有账户？去登录' : '没有账户？去注册'}
      </button>
    </div>
  );
};

export default Login;
