import React, { useState } from 'react';
import './IotIntegrationPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrochip, faChartBar, faCogs, faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

function IotIntegrationPage() {
  const [devices, setDevices] = useState([
    { id: 1, name: '温度传感器-001', type: '温度', status: '在线', lastData: '25.3°C', registered: '2024-01-01' },
    { id: 2, name: '湿度传感器-002', type: '湿度', status: '离线', lastData: '65%', registered: '2024-02-10' },
    { id: 3, name: '光照传感器-003', type: '光照', status: '在线', lastData: '800 Lux', registered: '2024-03-05' },
  ]);

  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceType, setNewDeviceType] = useState('');

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (newDeviceName && newDeviceType) {
      const newDevice = {
        id: devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1,
        name: newDeviceName,
        type: newDeviceType,
        status: '在线',
        lastData: 'N/A',
        registered: new Date().toISOString().slice(0, 10),
      };
      setDevices([...devices, newDevice]);
      setNewDeviceName('');
      setNewDeviceType('');
    } else {
      alert('请填写设备名称和类型。');
    }
  };

  const handleDeleteDevice = (id) => {
    if (window.confirm('确定要删除此设备吗？')) {
      setDevices(devices.filter(device => device.id !== id));
    }
  };

  return (
    <div className="iot-integration-page">
      <h1>茶叶病虫防治 IoT 集成</h1>

      <div className="grid-container">
        {/* 设备管理部分 */}
        <div className="card-container device-management">
          <h2><FontAwesomeIcon icon={faMicrochip} /> 设备管理</h2>
          <div className="device-list-container">
            {devices.length > 0 ? (
              devices.map(device => (
                <div key={device.id} className="device-item">
                  <p><strong>名称:</strong> {device.name}</p>
                  <p><strong>类型:</strong> {device.type}</p>
                  <p><strong>状态:</strong> <span className={`device-status ${device.status.toLowerCase()}`}>{device.status}</span></p>
                  <p><strong>最新数据:</strong> {device.lastData}</p>
                  <div className="device-actions">
                    <button className="secondary-button"><FontAwesomeIcon icon={faEdit} /> 编辑</button>
                    <button className="danger-button" onClick={() => handleDeleteDevice(device.id)}><FontAwesomeIcon icon={faTrash} /> 删除</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-devices">暂无设备。</p>
            )}
          </div>

          <h3>添加新设备</h3>
          <form onSubmit={handleAddDevice} className="add-device-form">
            <div className="form-group">
              <label htmlFor="deviceName">设备名称</label>
              <input
                type="text"
                id="deviceName"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                placeholder="例如: 土壤湿度传感器"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="deviceType">设备类型</label>
              <input
                type="text"
                id="deviceType"
                value={newDeviceType}
                onChange={(e) => setNewDeviceType(e.target.value)}
                placeholder="例如: 湿度"
                required
              />
            </div>
            <button type="submit" className="primary-button">
              <FontAwesomeIcon icon={faPlus} /> 添加设备
            </button>
          </form>
        </div>

        {/* 数据概览部分 */}
        <div className="card-container data-overview">
          <h2><FontAwesomeIcon icon={faChartBar} /> 数据概览</h2>
          <p>实时环境数据：</p>
          <ul>
            <li>平均温度: 26°C</li>
            <li>平均湿度: 70%</li>
            <li>平均光照: 750 Lux</li>
            <li>设备在线率: {((devices.filter(d => d.status === '在线').length / devices.length) * 100).toFixed(0)}%</li>
          </ul>
          <button className="secondary-button">查看详细数据报告</button>
        </div>

        {/* 集成指南部分 */}
        <div className="card-container integration-guide">
          <h2><FontAwesomeIcon icon={faCogs} /> 集成指南</h2>
          <p>按照以下步骤将您的 IoT 设备集成到平台：</p>
          <ol>
            <li>注册您的设备并获取 API 密钥。</li>
            <li>配置设备将数据发送到平台提供的端点。</li>
            <li>在设备管理中查看设备状态和数据。</li>
            <li>设置预警规则以接收异常通知。</li>
          </ol>
          <a href="#" className="github-link">阅读完整文档</a>
        </div>
      </div>
    </div>
  );
}

export default IotIntegrationPage;
