// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadUserData();
    setupDashboardInteractions();
});

function initializeDashboard() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('healthSyncUser'));
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update user info in dashboard
    updateUserInfo(userData);
    
    // Load health data
    loadHealthData();
    
    // Initialize charts
    initializeCharts();
    
    // Setup event listeners
    setupEventListeners();
}

function updateUserInfo(userData) {
    // Update user name in header
    const userNameElements = document.querySelectorAll('#user-name, #header-user-name');
    userNameElements.forEach(element => {
        if (element) element.textContent = userData.name || 'User';
    });
    
    // Update user email
    const userEmailElement = document.getElementById('header-user-email');
    if (userEmailElement) userEmailElement.textContent = userData.email || 'user@example.com';
    
    // Update user initial
    const userInitialElement = document.getElementById('user-initial');
    if (userInitialElement && userData.name) {
        userInitialElement.textContent = userData.name.charAt(0).toUpperCase();
    }
}

function loadHealthData() {
    // Simulate loading health data from API
    const healthData = getSimulatedHealthData();
    
    // Update dashboard stats
    updateDashboardStats(healthData);
    
    // Update recent activity
    updateRecentActivity(healthData.recentActivity);
    
    // Update data sources
    updateDataSources(healthData.connectedSources);
}

function getSimulatedHealthData() {
    return {
        totalRecords: 156,
        dataSources: 4,
        sharedProviders: 3,
        lastUpdate: '2 hours ago',
        healthMetrics: {
            bloodPressure: '120/80',
            heartRate: '72 bpm',
            weight: '68 kg',
            glucose: '95 mg/dL'
        },
        recentActivity: [
            { type: 'Lab Result', description: 'Blood Test Results', time: '2 hours ago', source: 'City Hospital' },
            { type: 'Medication', description: 'Prescription Updated', time: '5 hours ago', source: 'Dr. Smith' },
            { type: 'Vital', description: 'Heart Rate Recorded', time: '1 day ago', source: 'Apple Watch' },
            { type: 'Appointment', description: 'Annual Checkup', time: '2 days ago', source: 'Health Clinic' },
            { type: 'Lab Result', description: 'Cholesterol Levels', time: '3 days ago', source: 'LabCorp' }
        ],
        connectedSources: [
            { name: 'City General Hospital', status: 'Connected', lastSync: '2 hours ago' },
            { name: 'Apple Health', status: 'Connected', lastSync: '1 hour ago' },
            { name: 'Fitbit', status: 'Connected', lastSync: '5 hours ago' },
            { name: 'Local Pharmacy', status: 'Pending', lastSync: 'Never' }
        ]
    };
}

function updateDashboardStats(data) {
    // Update stat cards
    const totalRecordsElement = document.getElementById('total-records');
    const dataSourcesElement = document.getElementById('data-sources');
    const sharedProvidersElement = document.getElementById('shared-providers');
    const lastUpdateElement = document.getElementById('last-update');
    
    if (totalRecordsElement) totalRecordsElement.textContent = data.totalRecords.toLocaleString();
    if (dataSourcesElement) dataSourcesElement.textContent = data.dataSources;
    if (sharedProvidersElement) sharedProvidersElement.textContent = data.sharedProviders;
    if (lastUpdateElement) lastUpdateElement.textContent = data.lastUpdate;
    
    // Update health metrics
    updateHealthMetrics(data.healthMetrics);
}

function updateHealthMetrics(metrics) {
    const metricsContainer = document.getElementById('health-metrics');
    if (!metricsContainer) return;
    
    let metricsHTML = '';
    for (const [key, value] of Object.entries(metrics)) {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        metricsHTML += `
            <div class="metric-card">
                <div class="metric-value">${value}</div>
                <div class="metric-label">${label}</div>
                <div class="metric-trend positive">↓ 2%</div>
            </div>
        `;
    }
    
    metricsContainer.innerHTML = metricsHTML;
}

function updateRecentActivity(activities) {
    const activityList = document.getElementById('recent-data-list');
    if (!activityList) return;
    
    let activityHTML = '';
    activities.forEach(activity => {
        activityHTML += `
            <div class="activity-item">
                <div class="activity-icon">${getActivityIcon(activity.type)}</div>
                <div class="activity-content">
                    <div class="activity-title">${activity.description}</div>
                    <div class="activity-meta">
                        <span class="activity-source">${activity.source}</span>
                        <span class="activity-time">${activity.time}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    activityList.innerHTML = activityHTML;
}

function getActivityIcon(type) {
    const icons = {
        'Lab Result': '🧪',
        'Medication': '💊',
        'Vital': '❤️',
        'Appointment': '📅',
        'Procedure': '🏥'
    };
    return icons[type] || '📄';
}

function updateDataSources(sources) {
    const sourcesList = document.getElementById('sources-list');
    if (!sourcesList) return;
    
    let sourcesHTML = '';
    sources.forEach(source => {
        sourcesHTML += `
            <div class="source-item ${source.status.toLowerCase()}">
                <div class="source-info">
                    <div class="source-name">${source.name}</div>
                    <div class="source-status">${source.status}</div>
                </div>
                <div class="source-meta">
                    <div class="source-last-sync">Last sync: ${source.lastSync}</div>
                </div>
            </div>
        `;
    });
    
    sourcesList.innerHTML = sourcesHTML;
}

function initializeCharts() {
    // Simulate chart initialization
    // In a real implementation, this would use Chart.js or similar
    console.log('Initializing health data charts...');
    
    // Simulate chart data
    const bloodPressureData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        systolic: [122, 120, 118, 121, 119, 120, 118],
        diastolic: [82, 80, 78, 81, 79, 80, 78]
    };
    
    // This would be replaced with actual chart rendering
    simulateChartRendering('blood-pressure-chart', bloodPressureData);
}

function simulateChartRendering(chartId, data) {
    // Placeholder for chart rendering
    const chartElement = document.getElementById(chartId);
    if (chartElement) {
        chartElement.innerHTML = `
            <div class="chart-placeholder">
                <div class="chart-title">Blood Pressure Trend</div>
                <div class="chart-data">
                    <div class="chart-line systolic">
                        ${data.labels.map((label, i) => 
                            `<div class="chart-point" style="left: ${i * (100/6)}%; bottom: ${(data.systolic[i] - 110) * 5}%"></div>`
                        ).join('')}
                    </div>
                    <div class="chart-line diastolic">
                        ${data.labels.map((label, i) => 
                            `<div class="chart-point" style="left: ${i * (100/6)}%; bottom: ${(data.diastolic[i] - 70) * 5}%"></div>`
                        ).join('')}
                    </div>
                </div>
                <div class="chart-labels">
                    ${data.labels.map(label => `<span>${label}</span>`).join('')}
                </div>
            </div>
        `;
    }
}