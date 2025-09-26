import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Form = ({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onLoginSubmit,
  onToggleRegister,
  phoneNumber,
  verificationCode,
  onPhoneNumberChange,
  onVerificationCodeChange,
  onSendVerificationCode,
  onPhoneLoginSubmit,
}) => {
  const [showPhoneLogin, setShowPhoneLogin] = useState(false);

  const handleTogglePhoneLogin = () => {
    setShowPhoneLogin((prev) => !prev);
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={showPhoneLogin ? onPhoneLoginSubmit : onLoginSubmit}>
        <h1>登录</h1> {/* 标题改回中文“登录” */}

        {!showPhoneLogin ? (
          <>
            <div className="flex-column">
              <label>用户名</label></div>
            <div className="inputForm">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                placeholder="请输入用户名"
                className="input"
                type="text"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
              />
            </div>
            <div className="flex-column">
              <label>密码</label></div>
            <div className="inputForm">
              <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="-64 0 512 512" height={20}><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" /><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" /></svg>
              <input
                placeholder="请输入密码"
                className="input"
                type="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
              />
            </div>
            <div className="flex-row">
              <div>
                <input type="radio" />
                <label>记住我</label>
              </div>
              <span className="span">忘记密码?</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex-column">
              <label>手机号</label></div>
            <div className="inputForm">
              <FontAwesomeIcon icon={faPhone} />
              <input
                placeholder="请输入手机号"
                className="input"
                type="text"
                value={phoneNumber}
                onChange={(e) => onPhoneNumberChange(e.target.value)}
              />
            </div>
            <div className="flex-column">
              <label>验证码</label></div>
            <div className="inputForm">
              <input
                placeholder="请输入验证码"
                className="input"
                type="text"
                value={verificationCode}
                onChange={(e) => onVerificationCodeChange(e.target.value)}
              />
              <button type="button" className="send-code-button" onClick={onSendVerificationCode}>验证</button>
            </div>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
        <button className="button-submit" type="submit">{showPhoneLogin ? '手机号登录' : '登录'}</button>
        <p className="p">
          没有账户？
          <span className="span" onClick={onToggleRegister}>去注册</span>
        </p>
        <p className="p line">或使用</p>
        <div className="flex-row">
          <button className="btn google" type="button" onClick={handleTogglePhoneLogin}>
            <FontAwesomeIcon icon={faPhone} />
            {showPhoneLogin ? '账户密码登录' : '手机号登录'}
          </button><button className="btn apple" onClick={() => alert('暂未开放')}> {/* 点击时弹出提示 */}
            <svg xmlSpace="preserve" style={{enableBackground: 'new 0 0 22.773 22.773'}} viewBox="0 0 22.773 22.773" y="0px" x="0px" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" width={20} height={20} version="1.1"> <g> <g> <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" /> <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" /> </g></g></svg>
            Apple 
          </button></div></form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: 'SF Pro Display', 'SF Pro Text', 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }

  h1 {
    text-align: center;
    color: #1a1a1a;
    font-size: 34px;
    font-weight: 800;
    margin-bottom: 30px;
  }

  ::placeholder {
    font-family: 'SF Pro Text', 'SF Pro Display', 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    color: #999; /* 占位符颜色 */
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #1a1a1a;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 3px;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    background-color: #e6f0ff; /* 浅蓝色背景 */
    transition: border-color 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: #1a1a1a; /* 输入文本颜色 */
    background-color: transparent; /* 使输入框背景透明，显示父元素的浅蓝色 */
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #ecedec; /* 保持不变，移除蓝色焦点 */
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    margin-top: 5px; /* 缩小顶部边距 */
    margin-bottom: 5px; /* 缩小底部边距 */
  }

  .flex-row > div > label {
    font-size: 15px;
    color: #1a1a1a;
    font-weight: 400;
  }

  .span {
    font-size: 15px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .error-message {
    color: red;
    font-size: 14px;
    text-align: center;
    margin-top: 8px;
    margin-bottom: -5px;
  }

  .button-submit {
    margin: 20px 0 10px 0; /* 缩小上下边距 */
    background-color: #1a1a1a;
    border: none;
    color: white;
    font-size: 17px;
    font-weight: 600;
    border-radius: 10px;
    height: 58px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .button-submit:hover {
    background-color: #333333;
  }

  .p {
    text-align: center;
    color: #1a1a1a;
    font-size: 15px;
    margin: 5px 0;
  }

  .p.line {
    position: relative;
    width: 100%;
    text-align: center;
    margin: 15px 0; /* 缩小上下边距 */
  }

  .p.line::before,
  .p.line::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 35%;
    height: 1px;
    background: #ccc;
  }

  .p.line::before {
    left: 0;
  }

  .p.line::after {
    right: 0;
  }

  .btn {
    margin-top: 8px; /* 缩小顶部边距 */
    width: 100%;
    height: 58px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    gap: 10px;
    border: 1px solid #e0e0e0;
    background-color: white;
    color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #b0b0b0;
  }

  .send-code-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 8px 15px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    margin-left: 10px;
    height: 100%;
  }

  .send-code-button:hover {
    background-color: #0056b3;
  }
`;

export default Form;
