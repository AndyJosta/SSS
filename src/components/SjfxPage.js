import React from 'react';
import './SjfxPage.css'; // 更新 CSS 导入路径
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faChartLine, faTable, faFileAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

function DataAnalysisPage() {
  const analysisReports = [
    {
      id: 1,
      title: '茶叶产量趋势分析',
      type: '图表报告',
      date: '2024-09-01',
      description: '分析过去一年茶叶产量的季节性趋势和总体增长。',
    },
    {
      id: 2,
      title: '病虫害影响与防治效果评估',
      type: '数据报告',
      date: '2024-08-15',
      description: '评估不同病虫害对茶叶品质和产量的影响，以及各项防治措施的实际效果。',
    },
    {
      id: 3,
      title: '环境参数与茶叶生长关联分析',
      type: '图表报告',
      date: '2024-07-20',
      description: '探究温度、湿度、光照等环境参数与茶叶生长速度及品质的关键关联。',
    },
  ];

  return (
    <div className="data-analysis-page">
      <h1>数据分析</h1>

      <div className="grid-container">
        {/* 概览图表部分 */}
        <div className="card-container chart-overview">
          <h2><FontAwesomeIcon icon={faChartPie} /> 概览图表</h2>
          <p>这里将展示关键数据的可视化图表，例如：</p>
          <ul>
            <li><FontAwesomeIcon icon={faChartLine} /> 温度变化趋势图</li>
            <li><FontAwesomeIcon icon={faChartPie} /> 病虫害类型分布图</li>
            <li><FontAwesomeIcon icon={faTable} /> 茶叶产量与环境因子相关性矩阵</li>
          </ul>
          <button className="primary-button">查看实时仪表盘</button>
        </div>

        {/* 报告列表部分 */}
        <div className="card-container reports-list">
          <h2><FontAwesomeIcon icon={faFileAlt} /> 分析报告</h2>
          {analysisReports.length > 0 ? (
            analysisReports.map(report => (
              <div key={report.id} className="report-item">
                <h3>{report.title}</h3>
                <p><strong>类型:</strong> {report.type}</p>
                <p><strong>日期:</strong> {report.date}</p>
                <p>{report.description}</p>
                <button className="secondary-button">查看报告</button>
              </div>
            ))
          ) : (
            <p className="no-reports">暂无分析报告。</p>
          )}
          <button className="primary-button add-report-button"><FontAwesomeIcon icon={faPlus} /> 生成新报告</button>
        </div>
      </div>
    </div>
  );
}

export default DataAnalysisPage;
