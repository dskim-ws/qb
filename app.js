// Application data
const appData = {
  overview: {
    trialDurationReduction: 50,
    costReduction: 65,
    accuracyImprovement: 25,
    speedImprovement: 150,
    energySavings: 70,
    totalPatients: 245,
    activeTrials: 8,
    completedTrials: 12
  },
  hardwarePerformance: [
    {hardware: "FPGA", molecularSim: 85, genomicsAnalysis: 95, realTimeMonitoring: 95, peEfficiency: 80, aav9Modeling: 75, energyEfficiency: 15, cost: 50000},
    {hardware: "GPU", molecularSim: 75, genomicsAnalysis: 90, realTimeMonitoring: 70, peEfficiency: 85, aav9Modeling: 60, energyEfficiency: 8, cost: 30000},
    {hardware: "TPU", molecularSim: 60, genomicsAnalysis: 80, realTimeMonitoring: 65, peEfficiency: 90, aav9Modeling: 55, energyEfficiency: 12, cost: 40000},
    {hardware: "Quantum", molecularSim: 95, genomicsAnalysis: 70, realTimeMonitoring: 40, peEfficiency: 85, aav9Modeling: 90, energyEfficiency: 2, cost: 1000000},
    {hardware: "Neuromorphic", molecularSim: 70, genomicsAnalysis: 65, realTimeMonitoring: 85, peEfficiency: 75, aav9Modeling: 70, energyEfficiency: 25, cost: 80000}
  ],
  atp1a3Mutations: [
    {mutation: "D801N", prevalence: 35, peEfficiency: 85, aav9Transduction: 48, survivalExtension: 2.5, severity: 9},
    {mutation: "E815K", prevalence: 25, peEfficiency: 73, aav9Transduction: 41, survivalExtension: 2.1, severity: 8},
    {mutation: "G758S", prevalence: 15, peEfficiency: 63, aav9Transduction: 35, survivalExtension: 1.8, severity: 7},
    {mutation: "I274N", prevalence: 12, peEfficiency: 58, aav9Transduction: 32, survivalExtension: 1.6, severity: 6},
    {mutation: "R756H", prevalence: 8, peEfficiency: 46, aav9Transduction: 28, survivalExtension: 1.4, severity: 6}
  ],
  clinicalTrials: [
    {phase: "환자 모집", traditional: 12, optimized: 6, progress: 85},
    {phase: "디지털 트윈 구축", traditional: 8, optimized: 3, progress: 92},
    {phase: "치료 시뮬레이션", traditional: 16, optimized: 4, progress: 78},
    {phase: "PE-AAV9 최적화", traditional: 20, optimized: 8, progress: 65},
    {phase: "실제 치료", traditional: 24, optimized: 12, progress: 45},
    {phase: "결과 분석", traditional: 12, optimized: 6, progress: 30}
  ],
  costAnalysis: {
    traditional: {hardware: 5000000, operational: 8000000, personnel: 12000000, facilities: 4000000},
    optimized: {hardware: 3200000, operational: 2800000, personnel: 7200000, facilities: 2400000},
    roi: 340,
    paybackPeriod: 18
  },
  realTimeSimulation: {
    currentProcessing: 15420,
    completedJobs: 89340,
    queuedJobs: 2180,
    activeNodes: 156,
    cpuUtilization: 78,
    memoryUsage: 82,
    networkThroughput: 2.8
  }
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global chart instances
let charts = {};

// Tab Navigation - Fixed implementation
function initializeTabNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  navTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Get the target tab
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      navTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding content
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // Initialize charts for the active tab if not already done
      setTimeout(() => {
        initializeTabCharts(targetTab);
      }, 100);
    });
  });
}

// Initialize charts based on active tab
function initializeTabCharts(tabName) {
  switch(tabName) {
    case 'overview':
      if (!charts.overviewChart) {
        initializeOverviewChart();
      }
      break;
    case 'hardware':
      if (!charts.hardwareChart) {
        initializeHardwareChart();
      }
      if (!charts.costEfficiencyChart) {
        initializeCostEfficiencyChart();
      }
      break;
    case 'mutations':
      if (!charts.mutationsChart) {
        initializeMutationsChart();
      }
      break;
    case 'trials':
      if (!charts.trialsChart) {
        initializeTrialsChart();
      }
      break;
    case 'cost':
      if (!charts.costChart) {
        initializeCostChart();
      }
      if (!charts.savingsChart) {
        initializeSavingsChart();
      }
      break;
    case 'simulation':
      if (!charts.simulationChart) {
        initializeSimulationChart();
      }
      break;
  }
  
  // Resize charts after initialization
  setTimeout(() => {
    Object.values(charts).forEach(chart => {
      if (chart && typeof chart.resize === 'function') {
        chart.resize();
      }
    });
  }, 150);
}

// Overview Chart
function initializeOverviewChart() {
  const ctx = document.getElementById('overviewChart');
  if (!ctx) return;
  
  charts.overviewChart = new Chart(ctx.getContext('2d'), {
    type: 'radar',
    data: {
      labels: ['분자 시뮬레이션', '유전체 분석', '실시간 모니터링', 'PE 효율성', 'AAV9 모델링'],
      datasets: [
        {
          label: 'FPGA',
          data: [85, 95, 95, 80, 75],
          backgroundColor: 'rgba(31, 184, 205, 0.2)',
          borderColor: chartColors[0],
          borderWidth: 2
        },
        {
          label: 'Quantum',
          data: [95, 70, 40, 85, 90],
          backgroundColor: 'rgba(255, 193, 133, 0.2)',
          borderColor: chartColors[1],
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9fafb'
          }
        }
      },
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af',
            backdropColor: 'transparent'
          }
        }
      }
    }
  });
}

// Hardware Performance Chart
function initializeHardwareChart() {
  const ctx = document.getElementById('hardwareChart');
  if (!ctx) return;
  
  charts.hardwareChart = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['분자 시뮬레이션', '유전체 분석', '실시간 모니터링', 'PE 효율성', 'AAV9 모델링'],
      datasets: appData.hardwarePerformance.map((hw, index) => ({
        label: hw.hardware,
        data: [hw.molecularSim, hw.genomicsAnalysis, hw.realTimeMonitoring, hw.peEfficiency, hw.aav9Modeling],
        backgroundColor: chartColors[index],
        borderRadius: 4
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9fafb'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Cost Efficiency Chart
function initializeCostEfficiencyChart() {
  const ctx = document.getElementById('costEfficiencyChart');
  if (!ctx) return;
  
  charts.costEfficiencyChart = new Chart(ctx.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: appData.hardwarePerformance.map(hw => hw.hardware),
      datasets: [{
        data: appData.hardwarePerformance.map(hw => hw.cost / 10000),
        backgroundColor: chartColors.slice(0, 5),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#f9fafb',
            usePointStyle: true,
            padding: 15
          }
        }
      }
    }
  });
}

// Mutations Chart
function initializeMutationsChart() {
  const ctx = document.getElementById('mutationsChart');
  if (!ctx) return;
  
  charts.mutationsChart = new Chart(ctx.getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: appData.atp1a3Mutations.map((mutation, index) => ({
        label: mutation.mutation,
        data: [{
          x: mutation.peEfficiency,
          y: mutation.survivalExtension,
          r: mutation.prevalence / 2
        }],
        backgroundColor: chartColors[index],
        borderColor: chartColors[index]
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9fafb',
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const mutation = appData.atp1a3Mutations[context.datasetIndex];
              return [
                `${mutation.mutation}`,
                `PE 효율성: ${mutation.peEfficiency}%`,
                `생존 연장: ${mutation.survivalExtension}년`,
                `유병률: ${mutation.prevalence}%`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'PE 효율성 (%)',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: '생존 연장 (년)',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Clinical Trials Chart
function initializeTrialsChart() {
  const ctx = document.getElementById('trialsChart');
  if (!ctx) return;
  
  charts.trialsChart = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: appData.clinicalTrials.map(trial => trial.phase),
      datasets: [
        {
          label: '기존 방법 (주)',
          data: appData.clinicalTrials.map(trial => trial.traditional),
          backgroundColor: chartColors[2],
          borderRadius: 4
        },
        {
          label: '최적화 방법 (주)',
          data: appData.clinicalTrials.map(trial => trial.optimized),
          backgroundColor: chartColors[0],
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9fafb'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: '소요 시간 (주)',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Cost Analysis Chart
function initializeCostChart() {
  const ctx = document.getElementById('costChart');
  if (!ctx) return;
  
  const traditionalData = Object.values(appData.costAnalysis.traditional);
  const optimizedData = Object.values(appData.costAnalysis.optimized);
  
  charts.costChart = new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: ['하드웨어', '운영비', '인건비', '시설비'],
      datasets: [
        {
          label: '기존 방법 (백만원)',
          data: traditionalData.map(val => val / 1000000),
          backgroundColor: chartColors[2],
          borderRadius: 4
        },
        {
          label: '최적화 방법 (백만원)',
          data: optimizedData.map(val => val / 1000000),
          backgroundColor: chartColors[0],
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9fafb'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: '비용 (백만원)',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Savings Chart
function initializeSavingsChart() {
  const ctx = document.getElementById('savingsChart');
  if (!ctx) return;
  
  const years = [2024, 2025, 2026, 2027, 2028];
  const cumulativeSavings = [0, 1560, 3640, 6240, 9360];
  
  charts.savingsChart = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: '누적 절약액 (백만원)',
        data: cumulativeSavings,
        borderColor: chartColors[0],
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors[0],
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9fafb'
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: '연도',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: '누적 절약액 (백만원)',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Simulation Chart
function initializeSimulationChart() {
  const ctx = document.getElementById('simulationChart');
  if (!ctx) return;
  
  const timeLabels = Array.from({length: 20}, (_, i) => {
    const time = new Date();
    time.setMinutes(time.getMinutes() - (19 - i));
    return time.toLocaleTimeString('ko-KR', {hour: '2-digit', minute: '2-digit'});
  });
  
  const processingData = Array.from({length: 20}, () => Math.floor(Math.random() * 5000) + 10000);
  const completionData = Array.from({length: 20}, () => Math.floor(Math.random() * 2000) + 1000);
  
  charts.simulationChart = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: '처리 중인 작업',
          data: processingData,
          borderColor: chartColors[1],
          backgroundColor: 'rgba(255, 193, 133, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: '완료된 작업',
          data: completionData,
          borderColor: chartColors[0],
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#f9fafb'
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: '시간',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: '작업 수',
            color: '#f9fafb'
          },
          ticks: {
            color: '#9ca3af'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }
    }
  });
}

// Real-time updates
function startRealTimeUpdates() {
  // Update simulation data every 5 seconds
  setInterval(updateSimulationData, 5000);
  
  // Update resource monitors every 3 seconds
  setInterval(updateResourceMonitors, 3000);
  
  // Animate counters on page load
  animateCounters();
}

function updateSimulationData() {
  const simulationData = appData.realTimeSimulation;
  
  // Update processing numbers with small random variations
  const currentProcessingEl = document.getElementById('currentProcessing');
  const completedJobsEl = document.getElementById('completedJobs');
  const queuedJobsEl = document.getElementById('queuedJobs');
  
  if (currentProcessingEl) {
    simulationData.currentProcessing += Math.floor(Math.random() * 200) - 100;
    currentProcessingEl.textContent = simulationData.currentProcessing.toLocaleString();
  }
  
  if (completedJobsEl) {
    simulationData.completedJobs += Math.floor(Math.random() * 50) + 10;
    completedJobsEl.textContent = simulationData.completedJobs.toLocaleString();
  }
  
  if (queuedJobsEl) {
    simulationData.queuedJobs += Math.floor(Math.random() * 100) - 50;
    if (simulationData.queuedJobs < 0) simulationData.queuedJobs = Math.abs(simulationData.queuedJobs);
    queuedJobsEl.textContent = simulationData.queuedJobs.toLocaleString();
  }
  
  // Update simulation chart with new data point
  if (charts.simulationChart) {
    const newTime = new Date().toLocaleTimeString('ko-KR', {hour: '2-digit', minute: '2-digit'});
    const newProcessing = Math.floor(Math.random() * 5000) + 10000;
    const newCompleted = Math.floor(Math.random() * 2000) + 1000;
    
    charts.simulationChart.data.labels.push(newTime);
    charts.simulationChart.data.labels.shift();
    
    charts.simulationChart.data.datasets[0].data.push(newProcessing);
    charts.simulationChart.data.datasets[0].data.shift();
    
    charts.simulationChart.data.datasets[1].data.push(newCompleted);
    charts.simulationChart.data.datasets[1].data.shift();
    
    charts.simulationChart.update('none');
  }
}

function updateResourceMonitors() {
  const simulationData = appData.realTimeSimulation;
  
  // Update CPU usage
  simulationData.cpuUtilization += Math.floor(Math.random() * 20) - 10;
  simulationData.cpuUtilization = Math.max(20, Math.min(95, simulationData.cpuUtilization));
  
  const cpuEl = document.getElementById('cpuUsage');
  if (cpuEl) {
    cpuEl.style.width = simulationData.cpuUtilization + '%';
    cpuEl.parentNode.nextElementSibling.textContent = simulationData.cpuUtilization + '%';
  }
  
  // Update Memory usage
  simulationData.memoryUsage += Math.floor(Math.random() * 15) - 7;
  simulationData.memoryUsage = Math.max(30, Math.min(90, simulationData.memoryUsage));
  
  const memoryEl = document.getElementById('memoryUsage');
  if (memoryEl) {
    memoryEl.style.width = simulationData.memoryUsage + '%';
    memoryEl.parentNode.nextElementSibling.textContent = simulationData.memoryUsage + '%';
  }
  
  // Update Network throughput
  simulationData.networkThroughput += (Math.random() * 1) - 0.5;
  simulationData.networkThroughput = Math.max(0.5, Math.min(5.0, simulationData.networkThroughput));
  
  const networkEl = document.getElementById('networkThroughput');
  if (networkEl) {
    const percentage = (simulationData.networkThroughput / 5.0) * 100;
    networkEl.style.width = percentage + '%';
    networkEl.parentNode.nextElementSibling.textContent = simulationData.networkThroughput.toFixed(1) + ' GB/s';
  }
}

function animateCounters() {
  const counters = [
    { element: document.getElementById('activeTrials'), target: appData.overview.activeTrials },
    { element: document.getElementById('totalPatients'), target: appData.overview.totalPatients },
    { element: document.getElementById('completedTrials'), target: appData.overview.completedTrials }
  ];
  
  counters.forEach(counter => {
    if (counter.element) {
      animateValue(counter.element, 0, counter.target, 2000);
    }
  });
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tab navigation first
  initializeTabNavigation();
  
  // Initialize charts for the default (overview) tab
  initializeTabCharts('overview');
  
  // Start real-time updates
  startRealTimeUpdates();
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
    });
  });
});