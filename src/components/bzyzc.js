import React, { useState } from 'react';
import './bzyzc.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCommentDots, faUserMd, faUpload } from '@fortawesome/free-solid-svg-icons';

function HelpAndSupportPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [issueType, setIssueType] = useState('病害识别问题');
  const [issueDescription, setIssueDescription] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 可以添加文件大小和类型验证
      setAttachedImage(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('提交支持请求:', { name, phone, issueType, issueDescription, attachedImage });
    alert('支持请求已提交！');
    // 在这里添加实际的提交逻辑，例如发送到后端API
    // 提交后可以清空表单
    setName('');
    setPhone('');
    setIssueType('病害识别问题');
    setIssueDescription('');
    setAttachedImage(null);
  };

  return (
    <div className="help-and-support-page">
      <h1>联系技术支持</h1>
      <div className="content-wrapper">
        <div className="support-form-container">
          <h2>提交支持请求</h2>
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">姓名</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">电话</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="issueType">问题类型</label>
              <select 
                id="issueType" 
                value={issueType} 
                onChange={(e) => setIssueType(e.target.value)}
              >
                <option value="病害识别问题">病害识别问题</option>
                <option value="设备故障">设备故障</option>
                <option value="账户问题">账户问题</option>
                <option value="其他">其他</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="issueDescription">问题描述</label>
              <textarea 
                id="issueDescription" 
                rows="6" 
                placeholder="请详细描述您遇到的问题，包括症状、发生时间、已采取的措施等..." 
                value={issueDescription} 
                onChange={(e) => setIssueDescription(e.target.value)} 
                required
              ></textarea>
            </div>

            <div className="form-group file-upload-group">
              <label>上传图片 (可选)</label>
              <div className="file-upload-area">
                <input 
                  type="file" 
                  id="file-upload" 
                  accept="image/jpeg,image/png" 
                  onChange={handleImageUpload} 
                  className="hidden-file-input"
                />
                <label htmlFor="file-upload" className="upload-button">
                  <FontAwesomeIcon icon={faUpload} />
                  点击上传或拖放图片
                </label>
                {attachedImage && <span className="uploaded-file-name">{attachedImage.name}</span>}
                <p className="upload-hint">支持JPG、PNG格式，最大5MB</p>
              </div>
            </div>

            <button type="submit" className="submit-request-button">提交请求</button>
          </form>
        </div>

        <div className="other-channels-container">
          <h2>其他支持渠道</h2>
          <div className="channel-item">
            <FontAwesomeIcon icon={faPhone} className="channel-icon" />
            <span>电话支持</span>
            <p className="channel-detail">400-888-9999</p>
            <p className="channel-hint">工作日 9:00-18:00</p>
          </div>

          <div className="channel-item">
            <FontAwesomeIcon icon={faEnvelope} className="channel-icon" />
            <span>邮件支持</span>
            <p className="channel-detail">support@teapestcontrol.com</p>
            <p className="channel-hint">24小时内回复</p>
          </div>

          <div className="channel-item">
            <FontAwesomeIcon icon={faCommentDots} className="channel-icon" />
            <span>微信咨询</span>
            <div className="wechat-qr-placeholder">
              {/* 微信二维码图片占位符 */}
              微信二维码
            </div>
            <p className="channel-hint">扫码关注获取帮助</p>
          </div>

          <div className="channel-item">
            <FontAwesomeIcon icon={faUserMd} className="channel-icon" />
            <span>专家会诊</span>
            <p className="channel-detail">针对复杂病虫害问题，可预约专家远程或现场会诊</p>
            <button className="expert-consult-button">预约专家</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupportPage;
