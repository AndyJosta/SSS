import React, { useState } from 'react';
import styled from 'styled-components';

const RegistrationModal = ({
  isOpen,
  onClose,
  onRegisterSubmit,
  error,
}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit({ username, email, password });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>注册</h2> {/* 汉化标题 */}
          {error && <p className="error-message">{error}</p>}
          <div className="flex-column">
            <label htmlFor="reg-username">用户名</label>
            <input
              id="reg-username"
              className="input"
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex-column">
            <label htmlFor="reg-email">邮箱</label>
            <input
              id="reg-email"
              className="input"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex-column">
            <label htmlFor="reg-password">密码</label>
            <input
              id="reg-password"
              className="input"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="button-submit" type="submit">注册</button> {/* 汉化按钮 */}
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #f0f2f5;
  padding: 30px;
  border-radius: 15px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  font-family: 'SF Pro Display', 'SF Pro Text', 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

  h2 {
    text-align: center;
    color: #1a1a1a;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .registration-form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .flex-column {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      color: #1a1a1a;
      font-weight: 600;
      font-size: 15px;
    }

    .input {
      padding: 12px;
      border: 1.5px solid #ecedec;
      border-radius: 8px;
      font-size: 15px;
      width: 100%;
      box-sizing: border-box;
      &:focus {
        outline: none;
        border-color: #c0c0c0;
      }
    }

    .button-submit {
      margin-top: 25px;
      background-color: #1a1a1a;
      color: white;
      border: none;
      border-radius: 10px;
      height: 50px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #333333;
      }
    }

    .error-message {
      color: red;
      font-size: 14px;
      text-align: center;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #1a1a1a;

  &:hover {
    color: #555;
  }
`;

export default RegistrationModal;
