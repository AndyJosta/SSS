import React from 'react';
import './QklPage.css'; // 更新 CSS 导入路径

const QklPage = () => { // 更新组件名称
  return (
    <div className="blockchain-container">
      <h1>区块链技术在茶叶溯源中的应用</h1>
      <p className="intro-text">
        区块链技术以其去中心化、不可篡改、可追溯的特性，为茶叶的生产、加工、流通和销售提供了全新的解决方案，有效解决了传统茶叶供应链中信息不透明、信任度低等问题。
      </p>

      <div className="section">
        <h2>什么是区块链？</h2>
        <p>
          区块链（Blockchain）是一种分布式数据库技术，它通过密码学方法将数据块（Block）串联起来，形成一个不可篡改的链条。每个数据块都包含了一定时间内的交易信息，并且与前一个数据块通过哈希值连接。这种结构保证了数据的安全性和透明性。
        </p>
        <img src="https://images.unsplash.com/photo-1629862354890-a35949d26859?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="区块链概念" className="concept-image" />
      </div>

      <div className="section">
        <h2>区块链在茶叶溯源中的优势</h2>
        <ul>
          <li>
            <strong>全程可追溯:</strong> 从茶园种植、采摘、加工、包装、运输到消费者手中的每一个环节，所有信息都被记录在区块链上，消费者可以通过扫描二维码等方式，查询茶叶的完整“生命周期”。
          </li>
          <li>
            <strong>信息不可篡改:</strong> 区块链的分布式账本特性确保了一旦信息被记录，就无法被篡改，有效杜绝了假冒伪劣产品的出现。
          </li>
          <li>
            <strong>提升消费者信任:</strong> 透明、可信的溯源信息，能够极大地增强消费者对茶叶品牌的信任度，提升品牌价值。
          </li>
          <li>
            <strong>优化供应链管理:</strong> 生产者和销售者可以实时掌握茶叶的流向和状态，提高供应链的效率和响应速度。
          </li>
        </ul>
        <img src="https://images.unsplash.com/photo-1621243805935-4ff7137b057b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="茶叶溯源区块链" className="traceability-image" />
      </div>

      <div className="section">
        <h2>核心技术要素</h2>
        <p>
          在茶叶溯源区块链中，主要涉及以下技术要素：物联网（IoT）设备用于数据采集（如温度、湿度、地理位置）、智能合约（Smart Contract）用于自动化执行交易规则、以及去中心化应用（DApp）作为用户界面。
        </p>
        <img src="https://images.unsplash.com/photo-1678860714470-4966d54d1d9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="区块链技术要素" className="tech-elements-image" />
      </div>

      <p className="footer-text">
        通过引入区块链技术，我们致力于构建一个更加透明、安全、高效的茶叶生态系统，让每一片茶叶都有迹可循，让消费者喝得更放心。
      </p>
    </div>
  );
};

export default QklPage;
