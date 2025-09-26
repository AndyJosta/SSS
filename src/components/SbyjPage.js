
import React, { useState } from 'react';
import './SbyjPage.css'; // 更新 CSS 导入路径

function DeviceAlertPage() {
  const [deviceAlerts, setDeviceAlerts] = useState([
    {
      id: 1,
      deviceName: '温度传感器-001',
      alertType: '高温异常',
      timestamp: '2025-09-24 10:30:00',
      status: '未处理',
    },
    {
      id: 2,
      deviceName: '湿度传感器-002',
      alertType: '湿度过低',
      timestamp: '2025-09-24 09:45:12',
      status: '已处理',
    },
    {
      id: 3,
      deviceName: '光照传感器-003',
      alertType: '光照不足',
      timestamp: '2025-09-24 08:00:00',
      status: '未处理',
    },
    {
      id: 4,
      deviceName: 'pH传感器-004',
      alertType: 'pH值异常',
      timestamp: '2025-09-24 07:15:30',
      status: '已处理',
    },
  ]);

  const getAlertTypeIcon = (alertType) => {
    switch (alertType) {
      case '高温异常':
        return '🌡️';
      case '湿度过低':
        return '💧';
      case '光照不足':
        return '☀️';
      case 'pH值异常':
        return '🧪';
      default:
        return '⚠️';
    }
  };

  const handleResolveAlert = (id) => {
    setDeviceAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: '已处理' } : alert
      )
    );
  };

  return (
    <div className="device-alert-page">
      <h1>设备预警页面</h1>
      <div className="alert-list">
        {deviceAlerts.length > 0 ? (
          deviceAlerts.map((alert) => (
            <div key={alert.id} className={`alert-item ${alert.status === '未处理' ? 'unresolved' : 'resolved'}`}>
              <div className="alert-info">
                <span className="device-name">{alert.deviceName}</span>
                <span className="alert-type">
                  {getAlertTypeIcon(alert.alertType)} {alert.alertType}
                </span>
                <span className="timestamp">{alert.timestamp}</span>
              </div>
              <div className="alert-status">
                <span>状态: {alert.status}</span>
                {alert.status === '未处理' && (
                  <button 
                    className="resolve-button"
                    onClick={() => handleResolveAlert(alert.id)}
                  >
                    标记为已处理
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-alerts">暂无设备预警信息。</p>
        )}
      </div>
    </div>
  );
}

export default DeviceAlertPage;
