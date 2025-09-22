import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import BlockchainPage from './components/BlockchainPage';
import TeaDetectionPage from './components/TeaDetectionPage';
import UserManagementPage from './components/UserManagementPage'; // 重命名 EmptyPage3
import IotDashboardPage from './components/IotDashboardPage'; // 重命名 EmptyPage4
import EmptyPage5 from './components/EmptyPage5';
import ProtectedRoute from './components/ProtectedRoute'; // 导入 ProtectedRoute
// import DetectionDashboardPage from './components/DetectionDashboardPage'; // 导入 DetectionDashboardPage
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="blockchain" />} />
            <Route
              path="blockchain"
              element={<BlockchainPage />}
            />
            <Route path="tea-detection" element={<TeaDetectionPage />} />
            <Route
              path="user-management"
              element={
                <ProtectedRoute requiredRole="admin">
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
            <Route path="iot-dashboard" element={<IotDashboardPage />} /> {/* IoT 大屏路由 */}
            <Route path="empty5" element={<EmptyPage5 />} />
            {/* <Route path="detection-dashboard" element={<DetectionDashboardPage />} /> {/* 新增的检测仪表板路由 */} */}
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
