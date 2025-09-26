import React, { useState, useRef } from 'react';
import './CyjcPage.css'; // 更新 CSS 导入路径
import Loader from './Loader'; // 导入 Loader 组件

const TeaDetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false); // 新增状态来管理拖拽样式
  const detectionResultsRef = useRef(null); // 为检测结果区域创建ref

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResult(null); // 清除之前的检测结果
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResult(null);
    } else {
      alert('请拖入图片文件！');
    }
  };

  const handleDetect = async () => {
    if (!selectedImage) {
      alert('请先选择一张图片进行检测！');
      return;
    }

    setLoading(true);
    setProgress(0);
    setDetectionResult(null); // 清除之前的检测结果

    const formData = new FormData();
    formData.append('image', selectedImage);

    // 模拟检测进度
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress <= 100) {
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 200);

    // 模拟网络请求和AI检测
    try {
      // const response = await fetch('/api/detect', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();

      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟API调用延迟

      const mockResults = {
        disease: '茶小绿叶蝉',
        confidence: '99.2%',
        suggestions: [
          '及时修剪病虫枝，减少病虫源。',
          '使用生物农药进行防治，如印楝素。',
          '加强茶园管理，保持通风透光。',
          '定期检查，早期发现，早期治疗。',
          '合理施肥，增强茶树抗病能力。',
        ],
      };
      setDetectionResult(mockResults);
      // 检测完成后滚动到结果区域
      if (detectionResultsRef.current) {
        console.log('Scrolling to detection results...', detectionResultsRef.current);
        detectionResultsRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log('detectionResultsRef.current is null, cannot scroll.');
      }
    } catch (error) {
      console.error('检测失败:', error);
      setDetectionResult({ disease: '检测失败', confidence: '-', suggestions: ['请检查网络或重试。'] });
    } finally {
      setLoading(false);
      clearInterval(interval);
      setProgress(100); // 确保最后进度显示100%
    }
  };

  return (
    <div className="detection-dashboard-page">
      <div className="main-content-wrapper">
        <div className="solution-card">
          <div className="tag">智能农业解决方案</div>
          <h2>精准检测茶叶病虫害<br />区块链保障数据可信</h2>
          <p>
            基于YOLOv11深度学习模型,实现茶叶病虫害的快速识别与分类,检测准确率高达98%以上。所有检测结果通过区块链技术存证,确保数据不可篡改、可追溯,为茶叶质量管控提供可靠依据。
          </p>
          <div className="features-grid">
            <div className="feature-item">
              <span className="icon">⚡</span>
              <p>快速检测</p>
              <span>3秒内出结果</span>
            </div>
            <div className="feature-item">
              <span className="icon">✅</span>
              <p>高准确率</p>
              <span>&gt;98%识别率</span>
            </div>
            <div className="feature-item">
              <span className="icon">🔒</span>
              <p>区块链存证</p>
              <span>数据不可篡改</span>
            </div>
          </div>

          {loading && (
            <div className="loading-indicator">
              <p>检测中... {progress}%</p>
              <div className="loader-wrapper"> {/* 添加一个包裹容器 */}
                <Loader />
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}>
                  {progress}%
                </div>
              </div>
            </div>
          )}

          {detectionResult && !loading && (
            <div className="detection-results" ref={detectionResultsRef}>
              <h2>检测结果</h2>
              <p>检测到的病虫害: <strong>{detectionResult.disease}</strong></p>
              <p>识别置信度: <strong>{detectionResult.confidence}</strong></p>
              <h3>防治建议:</h3>
              <ul>
                {detectionResult.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          <button className="start-detection-button" onClick={handleDetect} disabled={loading}>
            开始检测
          </button>

          <div
            className={`upload-section ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>拖拽图片到此处上传</p>
            {!selectedImage && !previewUrl ? (
              <div className="initial-prompt">
                <p>请拖拽图片到下方区域或点击选择图片</p>
                <p>支持 JPG, PNG, JPEG 等格式</p>
              </div>
            ) : (
              <div className="image-preview">
                <h2>图片预览</h2>
                {previewUrl && <img src={previewUrl} alt="预览" onClick={() => window.open(previewUrl, '_blank')} />}
              </div>
            )}
            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
            <div className="upload-buttons">
              <label htmlFor="file-upload" className="custom-file-upload">
                上传图片
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              <span className="selected-file-name">{selectedImage ? selectedImage.name : '未选择文件'}</span>
            </div>
            {/* <button onClick={handleDetect} disabled={loading}>
              点击检测
            </button> */}
          </div>
          {/* <div className="image-info">
            检测示例:茶小绿叶蝉<br />识别置信度:99.2%
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeaDetectionPage;
