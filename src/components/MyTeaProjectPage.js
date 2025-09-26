import React, { useState } from 'react';
import './MyTeaProjectPage.css';

function MyTeaProjectPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: '龙井茶品质提升项目',
      status: '进行中',
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      description: '通过优化种植技术和加工工艺，提升龙井茶的香气和口感。'
    },
    {
      id: 2,
      name: '普洱茶病虫害防治研究',
      status: '已完成',
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      description: '研究普洱茶常见病虫害的发生规律与生态防治方法。'
    },
    {
      id: 3,
      name: '红茶新品种引进与试验',
      status: '待启动',
      startDate: '2025-06-01',
      endDate: '2026-06-01',
      description: '从国外引进优质红茶品种，进行本地适应性种植试验。'
    },
  ]);

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectStatus, setNewProjectStatus] = useState('待启动');
  const [newProjectStartDate, setNewProjectStartDate] = useState('');
  const [newProjectEndDate, setNewProjectEndDate] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [editingProject, setEditingProject] = useState(null); // 用于存储当前正在编辑的项目

  const handleAddProject = (event) => {
    event.preventDefault();
    if (!newProjectName || !newProjectStartDate || !newProjectEndDate || !newProjectDescription) {
      alert('请填写所有必填项目信息。');
      return;
    }

    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      name: newProjectName,
      status: newProjectStatus,
      startDate: newProjectStartDate,
      endDate: newProjectEndDate,
      description: newProjectDescription,
    };
    setProjects([...projects, newProject]);
    setNewProjectName('');
    setNewProjectStatus('待启动');
    setNewProjectStartDate('');
    setNewProjectEndDate('');
    setNewProjectDescription('');
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProjectName(project.name);
    setNewProjectStatus(project.status);
    setNewProjectStartDate(project.startDate);
    setNewProjectEndDate(project.endDate);
    setNewProjectDescription(project.description);
  };

  const handleUpdateProject = (event) => {
    event.preventDefault();
    if (!newProjectName || !newProjectStartDate || !newProjectEndDate || !newProjectDescription) {
      alert('请填写所有必填项目信息。');
      return;
    }

    setProjects(projects.map(p => 
      p.id === editingProject.id 
        ? { ...p, 
            name: newProjectName, 
            status: newProjectStatus, 
            startDate: newProjectStartDate, 
            endDate: newProjectEndDate, 
            description: newProjectDescription 
          }
        : p
    ));
    setEditingProject(null);
    setNewProjectName('');
    setNewProjectStatus('待启动');
    setNewProjectStartDate('');
    setNewProjectEndDate('');
    setNewProjectDescription('');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('确定要删除此项目吗？')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setNewProjectName('');
    setNewProjectStatus('待启动');
    setNewProjectStartDate('');
    setNewProjectEndDate('');
    setNewProjectDescription('');
  };

  const handleViewDetails = (project) => {
    console.log('项目详情:', project);
    alert(`项目名称: ${project.name}\n状态: ${project.status}\n描述: ${project.description}`);
    // 实际应用中可以打开一个模态框显示详情
  };

  return (
    <div className="my-tea-project-page">
      <h1>我的茶叶项目</h1>

      <div className="project-form-container">
        <h2>{editingProject ? '编辑项目' : '添加新项目'}</h2>
        <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} className="project-form">
          <div className="form-group">
            <label htmlFor="projectName">项目名称</label>
            <input
              type="text"
              id="projectName"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectStatus">状态</label>
              <select
                id="projectStatus"
                value={newProjectStatus}
                onChange={(e) => setNewProjectStatus(e.target.value)}
              >
                <option value="待启动">待启动</option>
                <option value="进行中">进行中</option>
                <option value="已完成">已完成</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">开始日期</label>
              <input
                type="date"
                id="startDate"
                value={newProjectStartDate}
                onChange={(e) => setNewProjectStartDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endDate">结束日期</label>
              <input
                type="date"
                id="endDate"
                value={newProjectEndDate}
                onChange={(e) => setNewProjectEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="projectDescription">项目描述</label>
            <textarea
              id="projectDescription"
              rows="4"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="primary-button">
              {editingProject ? '保存更改' : '添加项目'}
            </button>
            {editingProject && (
              <button type="button" onClick={handleCancelEdit} className="secondary-button">
                取消编辑
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 className="project-list-title">所有项目</h2>
      <div className="project-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p><strong>状态:</strong> <span className={`project-status ${project.status.toLowerCase()}`}>{project.status}</span></p>
              <p><strong>开始日期:</strong> {project.startDate}</p>
              <p><strong>结束日期:</strong> {project.endDate}</p>
              <p className="project-description-short">{project.description.substring(0, 100)}{project.description.length > 100 ? '...' : ''}</p>
              <div className="project-card-actions">
                <button className="view-details-button" onClick={() => handleViewDetails(project)}>查看详情</button>
                <button className="edit-button" onClick={() => handleEditProject(project)}>编辑</button>
                <button className="delete-button" onClick={() => handleDeleteProject(project.id)}>删除</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects">暂无茶叶项目信息。</p>
        )}
      </div>
    </div>
  );
}

export default MyTeaProjectPage;
