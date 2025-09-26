import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import QklPage from './components/QklPage';
import CyjcPage from './components/CyjcPage'; // 重命名 TeaDetectionPage
import YhglPage from './components/YhglPage'; // 重命名 UserManagementPage
import IotPage from './components/IotPage'; // 重命名 IotDashboardPage
import SbyjPage from './components/SbyjPage'; // 导入 DeviceAlertPage
import ProtectedRoute from './components/ProtectedRoute'; // 导入 ProtectedRoute
import SystemSettingsPage from './components/SystemSettingsPage'; // 导入 SystemSettingsPage
import Bzyzc from './components/bzyzc'; // 导入 Bzyzc
import MyTeaProjectPage from './components/MyTeaProjectPage'; // 导入 MyTeaProjectPage
import IotIntegrationPage from './components/IotIntegrationPage'; // 导入 IotIntegrationPage
import SjfxPage from './components/SjfxPage'; // 重命名 DataAnalysisPage
import AimxkPage from './components/AimxkPage'; // 重命名 AiModelLibraryPage
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
            <Route index element={<Navigate to="qkl" />} />
            <Route
              path="qkl"
              element={<QklPage />}
            />
            <Route path="cyjc" element={<CyjcPage />} />
            <Route
              path="yhgl"
              element={
                <ProtectedRoute requiredRole="admin">
                  <YhglPage />
                </ProtectedRoute>
              }
            />
            <Route path="iot" element={<IotPage />} /> {/* IoT 大屏路由 */}
            <Route path="sbyj" element={<SbyjPage />} /> {/* 设备预警路由 */}
            <Route path="sjfx" element={<SjfxPage />} />
            <Route path="settings" element={<SystemSettingsPage />} /> {/* 系统设置路由 */}
            <Route path="documentation" element={<AimxkPage />} />
            <Route path="support" element={<Bzyzc />} /> {/* 帮助与支持路由 */}
            <Route path="repo/my-tea-project" element={<MyTeaProjectPage />} />
            <Route path="repo/iot-integration" element={<IotIntegrationPage />} />
            <Route path="repo/ai-models" element={<AimxkPage />} /> {/* 更新为 AiModelLibraryPage */}
            {/* <Route path="detection-dashboard" element={<DetectionDashboardPage />} />  新增的检测仪表板路由 */}
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
