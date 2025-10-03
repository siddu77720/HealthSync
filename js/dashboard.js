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
function setupEventListeners() {
    // Navigation between dashboard pages
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
        });
    });
    
    // Add health data button
    const addDataBtn = document.getElementById('add-data-btn');
    if (addDataBtn) {
        addDataBtn.addEventListener('click', showAddDataModal);
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Data sharing controls
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', handleDataSharing);
    });
}

function switchPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Update page title
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        const titles = {
            'overview': 'Health Overview',
            'health-data': 'My Health Data',
            'providers': 'Healthcare Providers',
            'sharing': 'Data Sharing',
            'settings': 'Settings'
        };
        pageTitle.textContent = titles[pageId] || 'Dashboard';
    }
}

function showAddDataModal() {
    // Create and show modal for adding health data
    const modalHTML = `
        <div id="addDataModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Health Data</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="addHealthDataForm">
                        <div class="form-group">
                            <label for="data-type">Data Type</label>
                            <select id="data-type" name="dataType" required>
                                <option value="">Select type</option>
                                <option value="blood-pressure">Blood Pressure</option>
                                <option value="heart-rate">Heart Rate</option>
                                <option value="weight">Weight</option>
                                <option value="glucose">Blood Glucose</option>
                                <option value="medication">Medication</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="data-value">Value</label>
                            <input type="text" id="data-value" name="dataValue" required placeholder="Enter value">
                        </div>
                        <div class="form-group">
                            <label for="data-notes">Notes (Optional)</label>
                            <textarea id="data-notes" name="notes" placeholder="Add any notes..."></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline cancel-btn">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Setup modal event listeners
    const modal = document.getElementById('addDataModal');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const form = modal.querySelector('#addHealthDataForm');
    
    closeBtn.addEventListener('click', () => modal.remove());
    cancelBtn.addEventListener('click', () => modal.remove());
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addHealthData(new FormData(this));
        modal.remove();
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addHealthData(formData) {
    const dataType = formData.get('dataType');
    const dataValue = formData.get('dataValue');
    const notes = formData.get('notes');
    
    // Simulate API call to add data
    setTimeout(() => {
        showNotification(`${dataType.replace('-', ' ')} data added successfully!`, 'success');
        
        // Refresh the health data display
        loadHealthData();
    }, 1000);
}

function handleLogout() {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('healthSyncUser');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

function handleDataSharing(e) {
    const button = e.target;
    const providerId = button.getAttribute('data-provider');
    
    if (button.classList.contains('shared')) {
        // Stop sharing
        if (confirm(`Stop sharing data with ${providerId}?`)) {
            button.classList.remove('shared');
            button.textContent = 'Share Data';
            showNotification(`Stopped sharing with ${providerId}`, 'success');
        }
    } else {
        // Start sharing
        button.classList.add('shared');
        button.textContent = 'Sharing ✓';
        showNotification(`Now sharing data with ${providerId}`, 'success');
    }
}

// Data export functionality
function exportHealthData() {
    const userData = JSON.parse(localStorage.getItem('healthSyncUser'));
    const healthData = getSimulatedHealthData();
    
    const exportData = {
        user: userData,
        healthData: healthData,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `healthsync-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Health data exported successfully!', 'success');
}

// Search functionality for health data
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterHealthData(searchTerm);
        });
    }
}

function filterHealthData(searchTerm) {
    const healthItems = document.querySelectorAll('.health-data-item');
    
    healthItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', setupSearch);