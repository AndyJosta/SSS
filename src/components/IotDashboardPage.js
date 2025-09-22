import React, { useState, useEffect, useRef, useCallback } from 'react';
import './IotDashboardPage.css';

const IotDashboardPage = () => {
  // const [currentTime, setCurrentTime] = useState(''); // 移除未使用的 currentTime 状态
  const [currentPeriod, setCurrentPeriod] = useState('week'); // Default to '本周'
  const [dashboardData, setDashboardData] = useState({
    teaGardenCount: 12,
    teaGardenCountChange: 2.3,
    deviceCount: 248,
    deviceOnlineRate: 98.7,
    alertCount: 3,
    alertNew: 1,
    avgYield: 128.5,
    deviceStatus: { online: 245, offline: 2, warning: 3 },
    environmentData: {
      day: { labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'], temperature: [23.0, 24.5, 25.0, 24.8, 23.5, 22.0], humidity: [70, 72, 75, 73, 71, 68], light: [50, 65, 80, 75, 60, 45] },
      week: { labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], temperature: [22.5, 23.1, 22.8, 23.5, 24.2, 25.1, 24.8], humidity: [76, 74, 75, 72, 70, 68, 69], light: [65, 70, 75, 80, 85, 82, 78] },
      month: { labels: ['第1周', '第2周', '第3周', '第4周'], temperature: [23.5, 24.0, 23.8, 24.5], humidity: [72, 70, 71, 69], light: [70, 75, 72, 68] },
    },
    growthCycleData: { labels: ['龙井', '碧螺春', '铁观音', '普洱', '红茶'], currentStage: [3, 4, 2, 5, 3], totalStage: [5, 6, 5, 8, 6] },
    alerts: [
      { id: 1, type: '温度过高预警', time: '10分钟前', description: '铁观音茶园 #3 温度达到28.3°C，超过阈值26°C', handled: false },
      { id: 2, type: '湿度偏低预警', time: '35分钟前', description: '龙井茶园 #1 湿度降至62%，低于阈值70%', handled: false },
      { id: 3, type: '设备离线预警', time: '2小时前', description: '红茶茶园 #5 所有设备失去连接', handled: false },
    ],
    devices: [
      { id: 'T001', name: '温湿度传感器 #T001', status: 'online', details: { temperature: '23.5°C', humidity: '75%' }, location: '龙井茶园 #1' },
      { id: 'S024', name: '土壤传感器 #S024', status: 'online', details: { phValue: '6.8', fertility: '良好' }, location: '碧螺春茶园 #2' },
      { id: 'L015', name: '光照传感器 #L015', status: 'warning', details: { light: '85000 lux', uv: '中等' }, location: '铁观音茶园 #3' },
      { id: 'W008', name: '灌溉控制器 #W008', status: 'offline', details: { status: '--', flow: '--' }, location: '红茶茶园 #5' },
      { id: 'C003', name: '摄像头 #C003', status: 'online', details: { resolution: '1080p', status: '录制中' }, location: '普洱茶园 #4' },
    ]
  });

  // Refs for chart canvas elements
  const deviceStatusChartRef = useRef(null);
  const environmentChartRef = useRef(null);
  const growthCycleChartRef = useRef(null);

  // 将图表实例存储在 useRef 中，而不是 let 变量
  const deviceStatusChartInstanceRef = useRef(null);
  const environmentChartInstanceRef = useRef(null);
  const growthCycleChartInstanceRef = useRef(null);

  const updateCharts = useCallback((period) => { // 使用 useCallback 包裹 updateCharts
    if (typeof window.Chart === 'undefined') return;

    const envData = dashboardData.environmentData[period];

    // Destroy existing chart instances before re-initializing
    if (deviceStatusChartInstanceRef.current) deviceStatusChartInstanceRef.current.destroy();
    if (environmentChartInstanceRef.current) environmentChartInstanceRef.current.destroy();
    if (growthCycleChartInstanceRef.current) growthCycleChartInstanceRef.current.destroy();

    // 设备状态分布图表
    const deviceStatusCtx = deviceStatusChartRef.current.getContext('2d');
    deviceStatusChartInstanceRef.current = new window.Chart(deviceStatusCtx, { // 更新 useRef
      type: 'doughnut',
      data: {
        labels: ['在线', '离线', '预警'],
        datasets: [{
          data: [dashboardData.deviceStatus.online, dashboardData.deviceStatus.offline, dashboardData.deviceStatus.warning],
          backgroundColor: [
            '#4CAF50',  // 绿色 - 在线
            '#F44336',  // 红色 - 离线
            '#FF9800'   // 橙色 - 预警
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'rgba(241, 248, 233, 0.7)',
              padding: 10,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          },
          cutout: '70%'
        }
      }
    });

    // 环境参数监控图表
    const environmentCtx = environmentChartRef.current.getContext('2d');
    environmentChartInstanceRef.current = new window.Chart(environmentCtx, { // 更新 useRef
      type: 'line',
      data: {
        labels: envData.labels,
        datasets: [
          {
            label: '温度 (°C)',
            data: envData.temperature,
            borderColor: '#FFB74D',
            backgroundColor: 'rgba(255, 183, 77, 0.1)',
            tension: 0.4,
            fill: false,
            yAxisID: 'y'
          },
          {
            label: '湿度 (%)',
            data: envData.humidity,
            borderColor: '#4FC3F7',
            backgroundColor: 'rgba(79, 195, 247, 0.1)',
            tension: 0.4,
            fill: false,
            yAxisID: 'y1'
          },
          {
            label: '光照 (klux)',
            data: envData.light,
            borderColor: '#81C784',
            backgroundColor: 'rgba(129, 199, 132, 0.1)',
            tension: 0.4,
            fill: false,
            yAxisID: 'y2'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'rgba(241, 248, 233, 0.7)',
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            titleColor: '#F1F8E9',
            bodyColor: '#F1F8E9',
            borderColor: 'rgba(129, 199, 132, 0.3)',
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            boxPadding: 5
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(241, 248, 233, 0.6)'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: '温度 (°C)',
              color: 'rgba(255, 183, 77, 0.8)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(241, 248, 233, 0.6)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: '湿度 (%)',
              color: 'rgba(79, 195, 247, 0.8)'
            },
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: 'rgba(241, 248, 233, 0.6)'
            }
          },
          y2: {
            type: 'linear',
            display: false,
            position: 'right',
            min: 0,
            max: 100
          }
        },
        elements: {
          point: {
            radius: 2,
            hoverRadius: 5
          }
        }
      }
    });

    // 茶叶生长周期图表
    const growthCycleCtx = growthCycleChartRef.current.getContext('2d');
    growthCycleChartInstanceRef.current = new window.Chart(growthCycleCtx, { // 更新 useRef
      type: 'bar',
      data: {
        labels: dashboardData.growthCycleData.labels,
        datasets: [
          {
            label: '当前生长阶段',
            data: dashboardData.growthCycleData.currentStage,
            backgroundColor: [
              'rgba(129, 199, 132, 0.7)',
              'rgba(129, 199, 132, 0.7)',
              'rgba(129, 199, 132, 0.7)',
              'rgba(129, 199, 132, 0.7)',
              'rgba(129, 199, 132, 0.7)'
            ],
            barPercentage: 0.6,
          },
          {
            label: '成熟所需阶段',
            data: dashboardData.growthCycleData.totalStage,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(241, 248, 233, 0.3)',
            borderWidth: 1,
            barPercentage: 0.6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'rgba(241, 248, 233, 0.7)',
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            titleColor: '#F1F8E9',
            bodyColor: '#F1F8E9'
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: 'rgba(241, 248, 233, 0.6)'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(241, 248, 233, 0.6)',
              precision: 0
            }
          }
        }
      }
    });
  }, [dashboardData]); // updateCharts 的依赖项

  // 移除未使用的 updateEnvironmentChartData 函数
  // const updateEnvironmentChartData = (period) => {
  //   const envData = dashboardData.environmentData[period];
  //   if (environmentChartInstance) {
  //     environmentChartInstance.data.labels = envData.labels;
  //     environmentChartInstance.data.datasets[0].data = envData.temperature;
  //     environmentChartInstance.data.datasets[1].data = envData.humidity;
  //     environmentChartInstance.data.datasets[2].data = envData.light;
  //     environmentChartInstance.update();
  //   }
  // };

  useEffect(() => {
    // 移除更新当前时间逻辑
    // function updateTime() {
    //   const now = new Date();
    //   const options = {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     hour12: false
    //   };
    //   setCurrentTime(now.toLocaleString('zh-CN', options));
    // }
    // updateTime();
    // const timeInterval = setInterval(updateTime, 1000);


    // Initialize and update charts
    updateCharts(currentPeriod);

    // Simulate real-time data update for environment chart
    const chartDataInterval = setInterval(() => {
      setDashboardData(prevData => {
        const newEnvData = { ...prevData.environmentData };
        const currentEnvData = newEnvData[currentPeriod];

        // Simulate temperature change with smoother steps
        currentEnvData.temperature = currentEnvData.temperature.map(
          value => {
            const step = (Math.random() - 0.5) * 0.2; // Smaller step for smoother changes
            return parseFloat(Math.max(18, Math.min(30, parseFloat(value) + step)).toFixed(1));
          }
        );
        // Simulate humidity change with smoother steps
        currentEnvData.humidity = currentEnvData.humidity.map(
          value => {
            const step = (Math.random() - 0.5) * 1; // Smaller step
            return Math.floor(Math.max(50, Math.min(90, value + step)));
          }
        );
        // Simulate light change with smoother steps
        currentEnvData.light = currentEnvData.light.map(
          value => {
            const step = (Math.random() - 0.5) * 3; // Smaller step
            return Math.floor(Math.max(40, Math.min(100, value + step)));
          }
        );

        // Simulate device status change (e.g., every 5 updates)
        let newDevices = [...prevData.devices];
        let newDeviceStatus = { ...prevData.deviceStatus };

        if (Math.random() < 0.2) { // 20% chance to change a device status
          const randomIndex = Math.floor(Math.random() * newDevices.length);
          const deviceToUpdate = { ...newDevices[randomIndex] };
          const oldStatus = deviceToUpdate.status;

          const statusOptions = ['online', 'offline', 'warning'];
          let newStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

          if (newStatus === oldStatus) {
            // Ensure status actually changes for better simulation
            newStatus = statusOptions[(statusOptions.indexOf(oldStatus) + 1) % statusOptions.length];
          }

          newDeviceStatus[oldStatus]--; // Decrement old status count
          newDeviceStatus[newStatus]++; // Increment new status count
          deviceToUpdate.status = newStatus;
          newDevices[randomIndex] = deviceToUpdate;
          
          // Update specific device details based on new status
          if (newStatus === 'offline') {
            deviceToUpdate.details = { status: '--', flow: '--' };
          } else if (newStatus === 'warning') {
            // Example warning detail
            if (deviceToUpdate.id === 'L015') deviceToUpdate.details.uv = '过高';
          } else if (newStatus === 'online') {
            // Reset to typical online details
            if (deviceToUpdate.id === 'T001') deviceToUpdate.details = { temperature: '23.5°C', humidity: '75%' };
            if (deviceToUpdate.id === 'S024') deviceToUpdate.details = { phValue: '6.8', fertility: '良好' };
            if (deviceToUpdate.id === 'L015') deviceToUpdate.details = { light: '85000 lux', uv: '中等' };
            if (deviceToUpdate.id === 'W008') deviceToUpdate.details = { status: '正常', flow: '10.5 L/min' };
            if (deviceToUpdate.id === 'C003') deviceToUpdate.details = { resolution: '1080p', status: '录制中' };
          }
        }

        // Simulate new alerts (e.g., every 3 updates)
        let newAlerts = [...prevData.alerts];
        let newAlertCount = prevData.alertCount;
        let newAlertNew = prevData.alertNew;

        if (Math.random() < 0.15) { // 15% chance to generate a new alert
          newAlertCount++;
          newAlertNew++;
          const alertTypes = [
            '温度异常', '湿度异常', '光照异常', '设备离线', '土壤PH异常'
          ];
          const randomAlertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
          const newAlert = {
            id: newAlerts.length + 1,
            type: randomAlertType,
            time: '刚刚',
            description: `模拟：${randomAlertType}发生在茶园 #${Math.floor(Math.random() * 5) + 1}。`,
            handled: false,
          };
          newAlerts.unshift(newAlert); // Add to the beginning
          if (newAlerts.length > 5) { // Keep a reasonable number of alerts
            newAlerts.pop();
          }
        }

        // Simulate minor fluctuations in other dashboard data
        let newTeaGardenCount = prevData.teaGardenCount;
        let newTeaGardenCountChange = prevData.teaGardenCountChange;
        if (Math.random() < 0.1) { // 10% chance to change tea garden count slightly
            const change = (Math.random() - 0.5) * 0.5; // +/- 0.5
            newTeaGardenCount = Math.max(10, Math.round(newTeaGardenCount + change));
            newTeaGardenCountChange = parseFloat((Math.random() * 4 - 2).toFixed(1)); // +/- 2.0
        }

        let newDeviceCount = prevData.deviceCount;
        let newDeviceOnlineRate = prevData.deviceOnlineRate;
        if (Math.random() < 0.05) { // 5% chance to change device count slightly
            const change = (Math.random() - 0.5) * 2; // +/- 2
            newDeviceCount = Math.max(200, Math.round(newDeviceCount + change));
            newDeviceOnlineRate = parseFloat((Math.random() * 5 + 95).toFixed(1)); // 95.0 - 100.0
        }

        let newAvgYield = prevData.avgYield;
        if (Math.random() < 0.1) { // 10% chance to change avg yield slightly
            const change = (Math.random() - 0.5) * 1; // +/- 1.0
            newAvgYield = parseFloat(Math.max(120, Math.min(135, newAvgYield + change)).toFixed(1));
        }

        return { 
          ...prevData,
          teaGardenCount: newTeaGardenCount,
          teaGardenCountChange: newTeaGardenCountChange,
          deviceCount: newDeviceCount,
          deviceOnlineRate: newDeviceOnlineRate,
          environmentData: newEnvData,
          devices: newDevices,
          deviceStatus: newDeviceStatus,
          alerts: newAlerts,
          alertCount: newAlertCount,
          alertNew: newAlertNew,
          avgYield: newAvgYield
        };
      });

      // Force Chart.js update after state change
      if (environmentChartInstanceRef.current) { // 使用 useRef 更新
        environmentChartInstanceRef.current.update();
      }

    }, 30000); // Update every 30 seconds

    // Attach event listeners for period buttons
    const periodButtons = document.querySelectorAll('[data-period]');
    const handlePeriodClick = (event) => {
      const period = event.currentTarget.getAttribute('data-period');
      setCurrentPeriod(period); // Update the state

      // Update button active state
      periodButtons.forEach(btn => {
        if (btn.getAttribute('data-period') === period) {
          btn.classList.remove('bg-primary/20', 'hover:bg-primary/40');
          btn.classList.add('bg-primary/40', 'text-light');
        } else {
          btn.classList.remove('bg-primary/40', 'text-light');
          btn.classList.add('bg-primary/20', 'hover:bg-primary/40');
        }
      });
    };

    periodButtons.forEach(button => {
      button.addEventListener('click', handlePeriodClick);
    });

    // Initial active state for buttons
    periodButtons.forEach(btn => {
      if (btn.getAttribute('data-period') === currentPeriod) {
        btn.classList.remove('bg-primary/20', 'hover:bg-primary/40');
        btn.classList.add('bg-primary/40', 'text-light');
      } else {
        btn.classList.remove('bg-primary/40', 'text-light');
        btn.classList.add('bg-primary/20', 'hover:bg-primary/40');
      }
    });

    return () => {
      // clearInterval(timeInterval); // 移除时间间隔清理
      clearInterval(chartDataInterval);
      periodButtons.forEach(button => {
        button.removeEventListener('click', handlePeriodClick);
      });
      if (deviceStatusChartInstanceRef.current) deviceStatusChartInstanceRef.current.destroy(); // 更新 useRef
      if (environmentChartInstanceRef.current) environmentChartInstanceRef.current.destroy(); // 更新 useRef
      if (growthCycleChartInstanceRef.current) growthCycleChartInstanceRef.current.destroy(); // 更新 useRef
    };
  }, [currentPeriod, dashboardData, updateCharts]); // 添加 updateCharts 作为依赖项

  return (
    <div className="font-sans text-light min-h-screen p-4 grid grid-cols-12 gap-4 md:p-6 md:gap-6">
      {/* 顶部导航栏 (已删除，因为HomePage已包含Header) */}
      {/* <header className="bg-primary/10 backdrop-blur-sm border-b border-primary/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <i className="fa fa-leaf text-2xl text-secondary"></i>
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-shadow">茶叶物联网监控中心</h1>
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-light/80 hover:text-secondary transition-colors duration-300 flex items-center">
              <i className="fa fa-dashboard mr-2"></i> 总览
            </button>
            <button className="text-light/60 hover:text-secondary transition-colors duration-300 flex items-center">
              <i className="fa fa-history mr-2"></i> 历史数据
            </button>
            <button className="text-light/60 hover:text-secondary transition-colors duration-300 flex items-center">
              <i className="fa fa-cog mr-2"></i> 系统设置
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span id="current-time" className="text-light/80">{currentTime}</span>
            </div>
            <div className="relative">
              <button className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center hover:bg-primary/50 transition-colors duration-300">
                <i className="fa fa-user"></i>
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* 主内容区 */}
      {/* <main className="p-4 md:p-6 grid grid-cols-12 gap-4 md:gap-6"> */}
        {/* 左侧区域 - 统计卡片 */}
        <section className="col-span-12 space-y-4 md:col-span-3">
          {/* 茶园数量 */}
          <div className="stat-card gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-light/80 font-medium text-base">茶园数量</h3>
              <i className="fa fa-map-marker text-secondary"></i>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold" id="tea-garden-count">{dashboardData.teaGardenCount}</span>
              <span className="text-secondary ml-2 mb-1"><i className="fa fa-arrow-up"></i> {dashboardData.teaGardenCountChange}%</span>
            </div>
            <div className="mt-2 text-xs text-light/60">较上月增长</div>
          </div>

          {/* 设备总数 */}
          <div className="stat-card gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-light/80 font-medium text-base">设备总数</h3>
              <i className="fa fa-microchip text-secondary"></i>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold" id="device-count">{dashboardData.deviceCount}</span>
              <span className="text-secondary ml-2 mb-1"><i className="fa fa-check"></i> 100%</span>
            </div>
            <div className="mt-2 text-xs text-light/60">在线率 {dashboardData.deviceOnlineRate}%</div>
          </div>

          {/* 预警数量 */}
          <div className="stat-card gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-light/80 font-medium text-base">预警数量</h3>
              <i className="fa fa-exclamation-triangle text-accent"></i>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold text-accent" id="alert-count">{dashboardData.alertCount}</span>
              <span className="text-warning ml-2 mb-1"><i className="fa fa-arrow-up"></i> {dashboardData.alertNew}</span>
            </div>
            <div className="mt-2 text-xs text-light/60">较昨日新增</div>
          </div>

          {/* 平均产量 */}
          <div className="stat-card gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-light/80 font-medium text-base">平均产量</h3>
              <i className="fa fa-bar-chart text-secondary"></i>
            </div>
            <div className="flex items-end">
              <span className="text-3xl font-bold" id="avg-yield">{dashboardData.avgYield}</span>
              <span className="ml-2 mb-1">kg/亩</span>
            </div>
            <div className="mt-2 text-xs text-light/60">本年度平均</div>
          </div>

          {/* 设备状态分布 */}
          <div className="gradient-border bg-dark/40 p-4 rounded-lg">
            <h3 className="text-base font-medium mb-4 md:text-lg">设备状态分布</h3> {/* 调整标题字体大小 */}
            <div className="chart-container h-48"> {/* 调整小屏幕高度 */}
              <canvas id="device-status-chart" ref={deviceStatusChartRef}></canvas>
            </div>
          </div>
        </section>

        {/* 中间区域 - 主图表和地图 */}
        <section className="col-span-12 space-y-4 md:col-span-6">
          {/* 环境参数实时监控 */}
          <div className="gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold md:text-xl">环境参数实时监控</h2> {/* 调整标题字体大小 */}
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-xs rounded transition-colors ${currentPeriod === 'day' ? 'bg-primary/40 text-light' : 'bg-primary/20 hover:bg-primary/40'}`}
                  onClick={() => setCurrentPeriod('day')}
                  data-period="day"
                >今日</button>
                <button
                  className={`px-3 py-1 text-xs rounded transition-colors ${currentPeriod === 'week' ? 'bg-primary/40 text-light' : 'bg-primary/20 hover:bg-primary/40'}`}
                  onClick={() => setCurrentPeriod('week')}
                  data-period="week"
                >本周</button>
                <button
                  className={`px-3 py-1 text-xs rounded transition-colors ${currentPeriod === 'month' ? 'bg-primary/40 text-light' : 'bg-primary/20 hover:bg-primary/40'}`}
                  onClick={() => setCurrentPeriod('month')}
                  data-period="month"
                >本月</button>
              </div>
            </div>
            <div className="chart-container h-64">
              <canvas id="environment-chart" ref={environmentChartRef}></canvas>
            </div>
          </div>

          {/* 茶园分布地图 */}
          <div className="gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold md:text-xl">茶园分布地图</h2>
              <button className="text-secondary hover:text-light transition-colors">
                <i className="fa fa-expand"></i>
              </button>
            </div>
            <div className="relative h-64 bg-[#1A2A1C] rounded-lg overflow-hidden"> {/* 调整小屏幕高度 */}
              {/* 简化的地图背景 */}
              <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/id/10/800/600')] bg-cover bg-center"></div>

              {/* 地图标记点 */}
              <div className="map-marker absolute top-[30%] left-[25%] group">
                <div className="status-indicator status-online"></div>
                <div className="absolute -top-20 -left-20 bg-dark/90 p-2 rounded shadow-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-bold text-secondary">龙井茶园 #1</div>
                  <div className="text-xs text-light/70">温度: 23.5°C | 湿度: 75%</div>
                  <div className="text-xs text-light/70">设备: 24台 (全部在线)</div>
                </div>
              </div>

              <div className="map-marker absolute top-[45%] left-[60%] group">
                <div className="status-indicator status-online"></div>
                <div className="absolute -top-20 -left-20 bg-dark/90 p-2 rounded shadow-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-bold text-secondary">碧螺春茶园 #2</div>
                  <div className="text-xs text-light/70">温度: 22.8°C | 湿度: 72%</div>
                  <div className="text-xs text-light/70">设备: 18台 (全部在线)</div>
                </div>
              </div>

              <div className="map-marker absolute top-[65%] left-[35%] group">
                <div className="status-indicator status-warning"></div>
                <div className="absolute -top-20 -left-20 bg-dark/90 p-2 rounded shadow-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-bold text-accent">铁观音茶园 #3</div>
                  <div className="text-xs text-light/70">温度: 28.3°C | 湿度: 60%</div>
                  <div className="text-xs text-warning">设备: 22台 (1台离线)</div>
                </div>
              </div>

              <div className="map-marker absolute top-[25%] left-[75%] group">
                <div className="status-indicator status-online"></div>
                <div className="absolute -top-20 -left-20 bg-dark/90 p-2 rounded shadow-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-bold text-secondary">普洱茶园 #4</div>
                  <div className="text-xs text-light/70">温度: 25.1°C | 湿度: 68%</div>
                  <div className="text-xs text-light/70">设备: 30台 (全部在线)</div>
                </div>
              </div>

              <div className="map-marker absolute top-[55%] left-[80%] group">
                <div className="status-indicator status-offline"></div>
                <div className="absolute -top-20 -left-20 bg-dark/90 p-2 rounded shadow-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="font-bold text-warning">红茶茶园 #5</div>
                  <div className="text-xs text-light/70">温度: --°C | 湿度: --%</div>
                  <div className="text-xs text-warning">设备: 16台 (全部离线)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 茶叶生长周期监控 */}
          <div className="gradient-border bg-dark/40 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4 md:text-xl">茶叶生长周期监控</h2> {/* 调整标题字体大小 */}
            <div className="chart-container h-48"> {/* 调整小屏幕高度 */}
              <canvas id="growth-cycle-chart" ref={growthCycleChartRef}></canvas>
            </div>
          </div>
        </section>

        {/* 右侧区域 - 设备列表和预警信息 */}
        <section className="col-span-12 space-y-4 md:col-span-3">
          {/* 实时预警信息 */}
          <div className="gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold md:text-xl">实时预警</h2> {/* 调整标题字体大小 */}
              <span className="px-2 py-1 text-xs bg-warning/20 text-warning rounded-full animate-pulse-slow">{dashboardData.alerts.filter(alert => !alert.handled).length} 条未处理</span>
            </div>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 md:max-h-64"> {/* 调整小屏幕最大高度 */}
              {dashboardData.alerts.map(alert => (
                <div key={alert.id} className="bg-warning/10 border border-warning/20 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-accent text-base">{alert.type}</h4>
                    <span className="text-xs text-light/60">{alert.time}</span>
                  </div>
                  <p className="text-sm text-light/80 mt-1">{alert.description}</p>
                  <div className="mt-2 flex justify-end">
                    {!alert.handled && <button className="text-xs px-2 py-1 bg-primary/20 hover:bg-primary/40 rounded transition-colors">处理</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 设备列表 */}
          <div className="gradient-border bg-dark/40 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold md:text-xl">设备状态</h2> {/* 调整标题字体大小 */}
              <button className="text-secondary hover:text-light transition-colors">
                <i className="fa fa-refresh"></i>
              </button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 md:max-h-[400px]"> {/* 调整小屏幕最大高度 */}
              {dashboardData.devices.map(device => (
                <div key={device.id} className="bg-dark/60 p-3 rounded-lg hover:bg-dark/80 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`status-indicator status-${device.status}`}></div>
                      <span className="font-medium text-base">{device.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${device.status === 'online' ? 'bg-secondary/20 text-secondary' : device.status === 'warning' ? 'bg-accent/20 text-accent' : 'bg-warning/20 text-warning'}`}>
                      {device.status === 'online' ? '正常' : device.status === 'warning' ? '预警' : '离线'}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {device.details.temperature && <div>温度: {device.details.temperature}</div>}
                    {device.details.humidity && <div>湿度: {device.details.humidity}</div>}
                    {device.details.phValue && <div>PH值: {device.details.phValue}</div>}
                    {device.details.fertility && <div>肥力: {device.details.fertility}</div>}
                    {device.details.light && <div>光照: {device.details.light}</div>}
                    {device.details.uv && <div>紫外线: {device.details.uv}</div>}
                    {device.details.status && <div>状态: {device.details.status}</div>}
                    {device.details.flow && <div>流量: {device.details.flow}</div>}
                    {device.details.resolution && <div>分辨率: {device.details.resolution}</div>}
                  </div>
                  <div className="mt-1 text-xs text-light/60">{device.location}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 text-sm border border-primary/30 hover:bg-primary/10 rounded transition-colors">
              查看所有设备
            </button>
          </div>
        </section>
    </div>
  );
};

export default IotDashboardPage;
