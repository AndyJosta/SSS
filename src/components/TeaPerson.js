import React, { useState, useEffect, useCallback, useRef } from 'react';
import './TeaPerson.css';
import teaPersonImage from '../img/mx.png'; // 导入 mx.png 图片

const TeaPerson = () => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false); // 控制聊天框显示
  const [chatMessage, setChatMessage] = useState(''); // 用户输入消息
  const [aiResponse, setAiResponse] = useState('你好我叫霜霜！有什么可以帮助你的吗？'); // AI 响应
  const [isLoading, setIsLoading] = useState(false); // 加载状态

  // New states for chatbox resizing and maximizing
  const [chatboxSize, setChatboxSize] = useState({
    width: 280, // Initial width from CSS
    height: 400, // Initial max-height from CSS, will be actual height
  });
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevChatboxSize, setPrevChatboxSize] = useState(null);
  const [prevChatboxPosition, setPrevChatboxPosition] = useState(null);

  // New states for draggable functionality
  const [position, setPosition] = useState({
    x: 20, // Initial x position (e.g., bottom-left)
    y: window.innerHeight - 100 // Initial y position
  });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Offset for dragging

  // Refs to hold current position and offset to avoid stale closures in event handlers
  const positionRef = useRef(position);
  const offsetRef = useRef(offset);

  // Update refs whenever position or offset state changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  // Draggable event handlers using useCallback for stability
  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition(prevPosition => ({
        x: e.clientX - offsetRef.current.x, // Use ref here
        y: e.clientY - offsetRef.current.y  // Use ref here
      }));
    }
  }, [isDragging]); // Removed offset from dependencies, using ref instead

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []); // No dependencies, as it only sets a boolean to false

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
      return; // If the click is on an input or button, do not start dragging
    }
    e.preventDefault(); // Prevent default browser drag behavior
    e.stopPropagation(); // Stop event bubbling
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    // Clean up event listeners on unmount or when isDragging changes
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]); // Dependencies for useEffect


  const handleClick = (e) => {
    // Prevent click from triggering if it was part of a drag action
    if (isDragging) {
      return;
    }
    setIsWiggling(true);
    setTimeout(() => {
      setIsWiggling(false);
    }, 500); // 0.5秒后停止晃动
    setShowChatbox(prev => !prev); // 切换聊天框显示状态
    if (showChatbox) {
      setAiResponse('你好我叫霜霜！有什么可以帮助你的吗？'); // 重置默认消息
    }
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return; // 避免发送空消息

    const messageToSend = chatMessage;
    setChatMessage(''); // 清空输入框
    setIsLoading(true); // 开始加载
    setAiResponse('思考中...'); // 显示思考状态

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // 模拟AI思考时间，让对话更自然
      setTimeout(() => {
        setAiResponse(data.response || '抱歉，我暂时无法回答你的问题。');
        setIsLoading(false);
      }, 1000); // 模拟1秒思考时间
      
    } catch (error) {
      console.error('Error sending message to AI:', error);
      setAiResponse('连接失败，请检查后端服务是否运行。');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleMaximizeToggle = () => {
    setIsMaximized(prev => !prev);
    if (isMaximized) {
      // 还原时，恢复到之前的大小和位置
      if (prevChatboxSize && prevChatboxPosition) {
        setChatboxSize(prevChatboxSize);
        setPosition(prevChatboxPosition);
      }
    } else {
      // 最大化时，记录当前大小和位置
      setPrevChatboxSize(chatboxSize);
      setPrevChatboxPosition(position);
      // 最大化时，占据整个屏幕
      setChatboxSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <div 
      className={`tea-person-container ${isWiggling ? 'wiggle' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        // Ensure tea person z-index is lower than maximized chatbox
        zIndex: isMaximized ? 999 : 1000,
      }}
      onMouseDown={handleMouseDown}
      // onClick={handleClick} // 点击图片本身只负责晃动
    >
      <img 
        src={teaPersonImage}
        alt="可爱的茶叶小人"
        className="tea-person-image"
        onClick={handleClick} // 点击图片切换聊天框和晃动
      />

      {showChatbox && (
        <div className={`chat-box ${isMaximized ? 'maximized' : ''}`} style={{
          width: `${chatboxSize.width}px`,
          height: `${chatboxSize.height}px`,
          // For maximized state, these are overridden by CSS .maximized class
          // For non-maximized, ensure it positions relative to the tea person
          // bottom: isMaximized ? '0' : '100px', // Original bottom position relative to tea person
          // left: isMaximized ? '0' : '0px', // Original left position relative to tea person
        }}>
          <div className="chat-header">
            <span className="chat-title">茶叶小助手霜霜</span>
            <div className="chat-header-actions">
              <button className="maximize-chat-btn" onClick={(e) => {
                e.stopPropagation();
                handleMaximizeToggle();
              }}>
                {isMaximized ? '▭' : '□'}
              </button>
              <button className="close-chat-btn" onClick={(e) => { e.stopPropagation(); setShowChatbox(false); }}>X</button>
            </div>
          </div>
          <div className="chat-messages">
            {isLoading ? (
              <p>加载中...</p>
            ) : (
              <p>{aiResponse}</p>
            )}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="问我关于茶叶的问题..."
              disabled={isLoading}
            />
            <button onClick={handleSendMessage} disabled={isLoading}>
              发送
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeaPerson;
