import React, { useState, useEffect } from 'react';
import './YhglPage.css'; // 更新 CSS 导入路径

const UserManagementPage = () => {
  // 增加 mock 用户数据，使其至少有 24 条记录以模拟分页
  const [users, setUsers] = useState([
    {
      id: 1,
      username: '张三',
      email: 'zhangsan@example.com',
      phone: '138****5678',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'admin',
      registrationDate: '2023-05-12 09:34',
      // isOnline: true, // 移除 isOnline 属性
    },
    {
      id: 2,
      username: '李四',
      email: 'lisi@example.com',
      phone: '139****4321',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'user',
      registrationDate: '2023-06-25 14:22',
      // isOnline: false,
    },
    {
      id: 3,
      username: '王五',
      email: 'wangwu@example.com',
      phone: '137****8901',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: 'user',
      registrationDate: '2023-07-08 11:05',
      // isOnline: true,
    },
    {
      id: 4,
      username: '赵六',
      email: 'zhaoliu@example.com',
      phone: '136****2345',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      role: 'user',
      registrationDate: '2023-08-15 16:47',
      // isOnline: false,
    },
    {
      id: 5,
      username: '孙七',
      email: 'sunqi@example.com',
      phone: '135****6789',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      role: 'user',
      registrationDate: '2023-09-02 10:18',
      // isOnline: true,
    },
    // 更多模拟用户数据以达到24条
    {
      id: 6,
      username: '周八',
      email: 'zhouba@example.com',
      phone: '131****1111',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      role: 'user',
      registrationDate: '2023-09-10 11:00',
      // isOnline: true,
    },
    {
      id: 7,
      username: '吴九',
      email: 'wujiu@example.com',
      phone: '132****2222',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      role: 'admin',
      registrationDate: '2023-09-15 13:30',
      // isOnline: false,
    },
    {
      id: 8,
      username: '郑十',
      email: 'zhengshi@example.com',
      phone: '133****3333',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      role: 'user',
      registrationDate: '2023-09-20 09:15',
      // isOnline: true,
    },
    {
      id: 9,
      username: '王小',
      email: 'wangxiao@example.com',
      phone: '134****4444',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      role: 'user',
      registrationDate: '2023-09-25 16:00',
      // isOnline: true,
    },
    {
      id: 10,
      username: '张大',
      email: 'zhangda@example.com',
      phone: '135****5555',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      role: 'user',
      registrationDate: '2023-09-30 10:45',
      // isOnline: false,
    },
  ]);

  // 移除模拟的 fetchUsers 函数
  // const fetchUsers = () => {
  //   const updatedUsers = users.map(user => ({
  //     ...user,
  //     isOnline: Math.random() > 0.5,
  //   }));
  //   setUsers(updatedUsers);
  // };

  // useEffect 用于设置定时轮询
  useEffect(() => {
    // fetchUsers(); // 首次加载时获取一次数据
    // const interval = setInterval(fetchUsers, 30000); // 每 30 秒轮询一次

    // TODO: 在这里集成真实的用户在线状态 API 或 WebSocket 连接
    // 例如: 
    // const socket = new WebSocket('ws://your-backend-url/ws/online-status');
    // socket.onmessage = (event) => {
    //   const onlineUsers = JSON.parse(event.data);
    //   setUsers(prevUsers => prevUsers.map(user => ({
    //     ...user,
    //     isOnline: onlineUsers.includes(user.id), // 假设后端返回在线用户ID列表
    //   })));
    // };
    // return () => socket.close();

    // 对于目前的模拟数据，默认所有用户离线，直到真实数据接入
    setUsers(prevUsers => prevUsers.map(user => ({ ...user, isOnline: false })));

    // 清理函数：组件卸载时清除定时器 (如果使用了定时器)
    // return () => clearInterval(interval);
  }, []); // 空依赖数组表示只在组件挂载和卸载时运行

  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // 每页显示5个用户

  // 计算当前显示的用户
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // 计算总页数
  const totalPages = Math.ceil(users.length / usersPerPage);

  // 改变页码
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user'); // 默认新用户角色为普通用户
  const [errorMessage, setErrorMessage] = useState('');

  // 新增状态用于管理查看用户弹窗
  const [showViewModal, setShowViewModal] = useState(false);
  const [userToView, setUserToView] = useState(null);

  // 新增状态用于管理编辑用户弹窗
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedAvatar, setEditedAvatar] = useState('');

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!newUsername || !newPassword) {
      setErrorMessage('用户名和密码不能为空。');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('密码长度不能少于6位。');
      return;
    }
    if (users.some(user => user.username === newUsername)) {
      setErrorMessage('用户名已存在。');
      return;
    }

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      username: newUsername,
      email: '', // 新增用户时邮箱和电话可为空或自行填写
      phone: '',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg', // 新用户默认头像
      role: newRole,
      registrationDate: new Date().toLocaleString(), // 自动生成注册时间
      status: 'active',
      isOnline: false, // 新增用户默认离线
    };
    setUsers([...users, newUser]);
    setNewUsername('');
    setNewPassword('');
    setNewRole('user');
    alert('新用户添加成功！');
  };

  // 模拟编辑功能
  const handleEditUser = (id) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setUserToEdit(user);
      setEditedUsername(user.username);
      setEditedEmail(user.email);
      setEditedPhone(user.phone);
      setEditedAvatar(user.avatar);
      setShowEditModal(true);
    }
  };

  // 关闭编辑弹窗
  const closeEditModal = () => {
    setShowEditModal(false);
    setUserToEdit(null);
    setEditedUsername('');
    setEditedEmail('');
    setEditedPhone('');
    setEditedAvatar('');
  };

  // 保存编辑
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!userToEdit) return;

    const updatedUser = {
      ...userToEdit,
      username: editedUsername,
      email: editedEmail,
      phone: editedPhone,
      avatar: editedAvatar,
    };

    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    closeEditModal();
    alert('用户更新成功！');
  };

  // 模拟查看功能
  const handleViewUser = (id) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setUserToView(user);
      setShowViewModal(true);
    }
  };

  // 关闭查看弹窗
  const closeViewModal = () => {
    setShowViewModal(false);
    setUserToView(null);
  };

  // 模拟更多操作
  const handleMoreActions = (id) => {
    alert(`更多操作 for 用户 ${id}`);
  };

  const scrollToAddUserSection = () => {
    const addUserSection = document.querySelector('.add-user-form-section');
    if (addUserSection) {
      addUserSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="user-management-page">
      <div className="user-management-header">
        <div className="title-group">
          <span className="icon">👤</span> {/* 用户管理图标 */} 
          <h1>用户管理</h1>
        </div>
        <p>管理系统中的所有用户账户，包括查看、编辑、删除和分配角色</p>
      </div>

      <div className="filter-bar">
        <input type="text" placeholder="搜索用户名、邮箱或手机号..." className="search-input" />
        <select className="filter-select">
          <option>所有角色</option>
          <option>管理员</option>
          <option>普通用户</option>
          {/* 移除编辑角色选项 */} 
        </select>
        <select className="filter-select">
          {/* 移除状态筛选器 */} 
        </select>
        <button onClick={scrollToAddUserSection} className="add-user-button">+ 添加用户</button>
      </div>

      <div className="user-list-section">
        {/* 桌面端表格 */} 
        <table className="user-table desktop-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>用户信息</th>
              <th>角色</th>
              <th>注册时间</th>
              {/* 移除状态列 */} 
              <th>在线状态</th> {/* 新增在线状态列 */} 
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="user-info-cell">
                    <img src={user.avatar} alt="Avatar" className="avatar" />
                    <div className="user-info-details">
                      <span className="name">{user.username}</span>
                      <span className="contact">{user.email}<br />{user.phone}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-tag ${user.role}`}>
                    {user.role === 'admin' ? '管理员' : '普通用户'}
                  </span>
                </td>
                <td>{user.registrationDate}</td>
                {/* 移除状态显示 */} 
                <td>
                  <div className="online-status-cell">
                    <span className={`online-dot ${user.isOnline ? 'online' : 'offline'}`}></span>
                    {user.isOnline ? '在线' : '离线'}
                  </div>
                </td>
                <td>
                  <div className="action-icons">
                    <span onClick={() => handleViewUser(user.id)}>👁️</span> {/* 查看 */} 
                    <span onClick={() => handleEditUser(user.id)}>✏️</span> {/* 编辑 */} 
                    <span onClick={() => handleDeleteUser(user.id)} style={user.username === 'admin' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>🗑️</span> {/* 删除 */} 
                    <span onClick={() => handleMoreActions(user.id)}>&#8942;</span> {/* 更多 - 三个点 */} 
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 手机端卡片列表 */} 
        <div className="user-card-list mobile-list">
          {currentUsers.map(user => (
            <div key={user.id} className="user-card">
              <div className="card-header">
                <div className="user-info-cell">
                  <img src={user.avatar} alt="Avatar" className="avatar" />
                  <div className="user-info-details">
                    <span className="name">{user.username}</span>
                    <span className="contact">{user.email}</span>
                  </div>
                </div>
                <div className="online-status-cell">
                  <span className={`online-dot ${user.isOnline ? 'online' : 'offline'}`}></span>
                  {user.isOnline ? '在线' : '离线'}
                </div>
              </div>
              <div className="card-body">
                <p><strong>手机:</strong> {user.phone}</p>
                <p><strong>角色:</strong> <span className={`role-tag ${user.role}`}>
                  {user.role === 'admin' ? '管理员' : '普通用户'}
                </span></p>
                <p><strong>注册时间:</strong> {user.registrationDate}</p>
              </div>
              <div className="card-actions">
                <button onClick={() => handleViewUser(user.id)} className="action-button">查看</button>
                <button onClick={() => handleEditUser(user.id)} className="action-button">编辑</button>
                <button onClick={() => handleDeleteUser(user.id)} className="action-button delete-button" style={user.username === 'admin' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>删除</button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-container">
          <span className="page-info">显示 {indexOfFirstUser + 1} 到 {Math.min(indexOfLastUser, users.length)} 条，共 {users.length} 条记录</span>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="page-button">&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="page-button">&gt;</button>
        </div>
      </div>

      {/* 将添加新用户表单保留，并使用新的样式类 */} 
      <div ref={(el) => {
        if (el) {
          // 暂时不做任何操作，仅用于保留 ref
        }
      }} className="add-user-form-section">
        <h2>添加新用户</h2>
        <form onSubmit={handleAddUser}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-group">
            <label htmlFor="new-username">用户名:</label>
            <input
              type="text"
              id="new-username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">密码:</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-role">角色:</label>
            <select id="new-role" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="user">普通用户</option>
              <option value="admin">管理员</option>
            </select> {/* 移除编辑角色选项 */} 
          </div>
          <button type="submit">添加用户</button>
        </form>
      </div>

      {/* 查看用户弹窗 */} 
      {showViewModal && userToView && (
        <div className="modal-overlay">
          <div className="modal-content view-modal">
            <h2>用户信息</h2>
            <div className="user-detail-item">
              <img src={userToView.avatar} alt="Avatar" className="modal-avatar" />
            </div>
            <div className="user-detail-item">
              <strong>用户名:</strong> {userToView.username}
            </div>
            <div className="user-detail-item">
              <strong>邮箱:</strong> {userToView.email}
            </div>
            <div className="user-detail-item">
              <strong>手机号:</strong> {userToView.phone}
            </div>
            <div className="user-detail-item">
              <strong>角色:</strong> {
                userToView.role === 'admin' ? '管理员' : '普通用户'
              }
            </div>
            <div className="user-detail-item">
              <strong>注册时间:</strong> {userToView.registrationDate}
            </div>
            {/* 移除状态显示 */} 
            <button onClick={closeViewModal} className="modal-close-button">关闭</button>
          </div>
        </div>
      )}

      {/* 编辑用户弹窗 */} 
      {showEditModal && userToEdit && (
        <div className="modal-overlay">
          <div className="modal-content edit-modal">
            <h2>编辑用户</h2>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label htmlFor="edit-avatar">头像 URL:</label>
                <input
                  type="text"
                  id="edit-avatar"
                  value={editedAvatar}
                  onChange={(e) => setEditedAvatar(e.target.value)}
                />
                {editedAvatar && <img src={editedAvatar} alt="Avatar Preview" className="edit-avatar-preview" />}
              </div>
              <div className="form-group">
                <label htmlFor="edit-username">用户名:</label>
                <input
                  type="text"
                  id="edit-username"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-email">邮箱:</label>
                <input
                  type="text"
                  id="edit-email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-phone">手机号:</label>
                <input
                  type="text"
                  id="edit-phone"
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="modal-save-button">保存</button>
                <button type="button" onClick={closeEditModal} className="modal-cancel-button">取消</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagementPage;
