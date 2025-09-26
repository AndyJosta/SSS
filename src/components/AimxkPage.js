import React, { useState } from 'react';
import './AimxkPage.css'; // 更新 CSS 导入路径
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch, faChartBar, faCheckCircle, faBug, faLocationDot, faArrowUp
} from '@fortawesome/free-solid-svg-icons';

// 导入模拟图片
import teaLeafModelImg from '../img/bj1.png';
import earlyWarningModelImg from '../img/bj2.png';

const AiModelLibraryPage = () => {
  const [models, setModels] = useState([
    {
      id: 1,
      type: 'pest',
      category: '虫害模型',
      image: teaLeafModelImg,
      name: '茶小绿叶蝉识别模型',
      accuracy: '97.2%',
      description: '专门识别茶小绿叶蝉及其危害症状，支持不同生长阶段的叶片识别，适用于各类茶园环境。',
      tags: ['实时识别', '移动端适配', '高鲁棒性'],
    },
    {
      id: 2,
      type: 'disease',
      category: '病害模型',
      image: 'https://images.unsplash.com/photo-1579606277717-d5d301b1a4a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // 直接使用 URL 字符串
      name: '茶炭疽病识别模型',
      accuracy: '95.8%',
      description: '精准识别茶炭疽病的早期和中期症状，能够区分与其他叶部病害的差异，辅助及时防治。',
      tags: ['早期识别', '多阶段识别', '云服务'],
    },
    {
      id: 3,
      type: 'early-warning',
      category: '早期预警',
      image: earlyWarningModelImg,
      name: '茶园病虫害早期预警模型',
      accuracy: '92.5%',
      description: '结合气象数据和茶园环境参数，预测病虫害发生风险，提前7-14天发出预警，为防治争取时间。',
      tags: ['风险预测', '多因子分析', '决策支持'],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'pest', 'disease', 'early-warning'

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          model.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || model.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="ai-model-library-container">
      <div className="hero-section">
        <h1>AI赋能茶叶病虫害防治</h1>
        <p>
          我们的AI模型库整合了计算机视觉、机器学习和农业专家知识，能够快速准确识别各类茶叶病虫害，为茶园
          管理提供科学决策支持，降低损失，提高产量和品质。
        </p>
      </div>

      <div className="stats-cards-section">
        <div className="stat-card">
          <div className="stat-icon"><FontAwesomeIcon icon={faChartBar} /></div>
          <div className="stat-content">
            <div className="stat-value">28</div>
            <div className="stat-label">模型总数</div>
            <div className="stat-change"><FontAwesomeIcon icon={faArrowUp} /> 12% 较上月</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FontAwesomeIcon icon={faCheckCircle} /></div>
          <div className="stat-content">
            <div className="stat-value">96.8%</div>
            <div className="stat-label">识别准确率</div>
            <div className="stat-change"><FontAwesomeIcon icon={faArrowUp} /> 2.3% 较上季度</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FontAwesomeIcon icon={faBug} /></div>
          <div className="stat-content">
            <div className="stat-value">45</div>
            <div className="stat-label">病虫害种类</div>
            <div className="stat-change"><FontAwesomeIcon icon={faArrowUp} /> 8 新增种类</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><FontAwesomeIcon icon={faLocationDot} /></div>
          <div className="stat-content">
            <div className="stat-value">136</div>
            <div className="stat-label">应用案例</div>
            <div className="stat-change"><FontAwesomeIcon icon={faArrowUp} /> 24 本月新增</div>
          </div>
        </div>
      </div>

      <h2 className="section-title">模型列表</h2>

      <div className="controls-section-bottom">
        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="搜索模型..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-buttons">
          <button 
            className={`filter-button ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            全部
          </button>
          <button 
            className={`filter-button ${filterType === 'pest' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pest')}
          >
            虫害模型
          </button>
          <button 
            className={`filter-button ${filterType === 'disease' ? 'active' : ''}`}
            onClick={() => handleFilterChange('disease')}
          >
            病害模型
          </button>
          <button 
            className={`filter-button ${filterType === 'early-warning' ? 'active' : ''}`}
            onClick={() => handleFilterChange('early-warning')}
          >
            早期预警
          </button>
        </div>
      </div>

      <div className="model-list-grid">
        {filteredModels.length > 0 ? (
          filteredModels.map(model => (
            <div key={model.id} className="model-card">
              <div className={`model-tag ${model.type}-tag`}>{model.category}</div>
              <img src={model.image} alt={model.name} className="model-image" />
              <div className="model-content">
                <h3 className="model-title">{model.name}</h3>
                <p className="model-accuracy">准确率{model.accuracy}</p>
                <p className="model-description">{model.description}</p>
                <div className="model-tags">
                  {model.tags.map((tag, index) => (
                    <span key={index} className="model-feature-tag">{tag}</span>
                  ))}
                </div>
                <button className="view-details-button">查看详情</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-models">没有找到匹配的模型。</p>
        )}
      </div>
    </div>
  );
};

export default AiModelLibraryPage;
