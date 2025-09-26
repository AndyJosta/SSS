import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import RegistrationModal from './RegistrationModal';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const navigate = useNavigate();

  const validateLoginForm = () => {
    setError('');
    if (!username || !password) {
      setError('用户名和密码不能为空。');
      return false;
    }
    if (password.length < 6) {
      setError('密码长度不能少于6位。');
      return false;
    }
    return true;
  };

  const validatePhoneLoginForm = () => {
    setError('');
    if (!phoneNumber) {
      setError('手机号不能为空。');
      return false;
    }
    if (!verificationCode) {
      setError('验证码不能为空。');
      return false;
    }
    // 可以在这里添加手机号和验证码的格式验证
    return true;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLoginForm()) {
      return;
    }
    console.log('Login submitted', { username, password });
    // 模拟登录成功
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      navigate('/homepage');
    } else if (username === 'user' && password === 'user123') {
      localStorage.setItem('userRole', 'user');
      navigate('/homepage');
    } else {
      setError('用户名或密码错误。');
    }
  };

  const handlePhoneLoginSubmit = (e) => {
    e.preventDefault();
    if (!validatePhoneLoginForm()) {
      return;
    }
    console.log('Phone Login submitted', { phoneNumber, verificationCode });
    // 模拟手机号登录成功
    if (phoneNumber === '12345678900' && verificationCode === '123456') { // 示例手机号和验证码
      localStorage.setItem('userRole', 'user');
      navigate('/homepage');
    } else {
      setError('手机号或验证码错误。');
    }
  };

  const handleRegistrationSubmit = ({ username: regUsername, email: regEmail, password: regPassword }) => {
    setRegistrationError('');
    if (!regUsername || !regEmail || !regPassword) {
      setRegistrationError('所有字段不能为空。');
      return false;
    }
    if (regPassword.length < 6) {
      setRegistrationError('密码长度不能少于6位。');
      return false;
    }
    console.log('Registration submitted', { regUsername, regEmail, regPassword });
    // 模拟注册成功
    localStorage.setItem('userRole', 'user');
    alert('注册成功！请登录。');
    setIsRegistrationModalOpen(false);
    setRegistrationError('');
    return true;
  };

  const handleSendVerificationCode = async () => {
    if (!phoneNumber) {
      setError('请输入手机号。');
      return;
    }
    setIsSendingCode(true);
    console.log('Sending verification code to', phoneNumber);
    // 模拟发送验证码的API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`验证码已发送到 ${phoneNumber}，请查收！`);
    setIsSendingCode(false);
  };

  return (
    <div className="login-page-container">
      <Form
        username={username}
        password={password}
        error={error}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onLoginSubmit={handleLoginSubmit}
        onToggleRegister={() => setIsRegistrationModalOpen(true)}
        
        phoneNumber={phoneNumber}
        verificationCode={verificationCode}
        onPhoneNumberChange={setPhoneNumber}
        onVerificationCodeChange={setVerificationCode}
        onSendVerificationCode={handleSendVerificationCode}
        onPhoneLoginSubmit={handlePhoneLoginSubmit}
      />

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegisterSubmit={handleRegistrationSubmit}
        error={registrationError}
      />
    </div>
  );
};

export default Login;
