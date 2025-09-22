import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    // 用户未登录，重定向到登录页面
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // 用户角色不符合要求，重定向到首页或显示无权限页面
    // 这里我们选择重定向到首页
    return <Navigate to="/homepage" replace />;
  }

  return children;
};

export default ProtectedRoute;
