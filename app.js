const EURO_TO_RON = 5.0;
const TARGET_EUR = 300000;
const TARGET_RON = 1500000;

let projects = [];
let charts = {};

// Inițializare
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    initCharts();
    updateDashboard();
    
    document.getElementById('addProjectForm').addEventListener('submit', addProject);
});

function loadProjects() {
    const saved = localStorage.getItem('blurr_projects_2026');
    if (saved) {
        projects = JSON.parse(saved);
    }
}

function saveProjects() {
    localStorage.setItem('blurr_projects_2026', JSON.stringify(projects));
}

function addProject(e) {
    e.preventDefault();
    
    const name = document.getElementById('projectName').value;
    const valueEUR = parseFloat(document.getElementById('projectValue').value);
    const division = document.getElementById('projectDivision').value;
    
    const project = {
        id: Date.now(),
        name: name,
        valueEUR: valueEUR,
        valueRON: valueEUR * EURO_TO_RON,
        division: division,
        date: new Date().toISOString()
    };
    
    projects.push(project);
    saveProjects();
    updateDashboard();
    
    // Reset form
    document.getElementById('addProjectForm').reset();
    
    // Scroll to projects list
    document.getElementById('projectsList').scrollIntoView({ behavior: 'smooth' });
}

function deleteProject(id) {
    if (confirm('Sigur vrei să ștergi acest proiect?')) {
        projects = projects.filter(p => p.id !== id);
        saveProjects();
        updateDashboard();
    }
}

function updateDashboard() {
    updateStats();
    updateProjectsList();
    updateCharts();
}

function updateStats() {
    const totalRON = projects.reduce((sum, p) => sum + p.valueRON, 0);
    const totalEUR = projects.reduce((sum, p) => sum + p.valueEUR, 0);
    const gapRON = TARGET_RON - totalRON;
    const gapEUR = TARGET_EUR - totalEUR;
    const progressPct = (totalRON / TARGET_RON * 100).toFixed(1);
    
    // Stats by division
    const byDivision = {
        'AVL Installs': { value: 0, count: 0 },
        'Arhitectural': { value: 0, count: 0 },
        'Events': { value: 0, count: 0 },
        'Contract Harvest': { value: 0, count: 0 }
    };
    
    projects.forEach(p => {
        byDivision[p.division].value += p.valueRON;
        byDivision[p.division].count += 1;
    });
    
    // Update main stats
    document.getElementById('totalRealizat').textContent = formatRON(totalRON);
    document.getElementById('totalRealizatEUR').textContent = formatEUR(totalEUR);
    document.getElementById('gap').textContent = formatRON(Math.max(0, gapRON));
    document.getElementById('gapEUR').textContent = formatEUR(Math.max(0, gapEUR));
    document.getElementById('progress').textContent = progressPct + '%';
    document.getElementById('nrProiecte').textContent = projects.length + ' proiecte';
    document.getElementById('progressBar').style.width = Math.min(100, progressPct) + '%';
    document.getElementById('progressBar').textContent = progressPct + '%';
    
    // Update division stats
    document.getElementById('avlValue').textContent = formatRON(byDivision['AVL Installs'].value);
    document.getElementById('avlCount').textContent = byDivision['AVL Installs'].count + ' proiecte';
    document.getElementById('arhValue').textContent = formatRON(byDivision['Arhitectural'].value);
    document.getElementById('arhCount').textContent = byDivision['Arhitectural'].count + ' proiecte';
    document.getElementById('contractValue').textContent = formatRON(byDivision['Contract Harvest'].value);
    document.getElementById('contractCount').textContent = byDivision['Contract Harvest'].count + ' proiecte';
    document.getElementById('eventsValue').textContent = formatRON(byDivision['Events'].value);
    document.getElementById('eventsCount').textContent = byDivision['Events'].count + ' proiecte';
}

function updateProjectsList() {
    const container = document.getElementById('projectsList');
    
    if (projects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📂</div>
                <p>Nu există proiecte adăugate încă.</p>
                <p style="margin-top: 10px; color: #999;">Adaugă primul proiect folosind formularul de mai sus.</p>
            </div>
        `;
        return;
    }
    
    // Sort by value DESC
    const sorted = [...projects].sort((a, b) => b.valueRON - a.valueRON);
    
    container.innerHTML = sorted.map(p => `
        <div class="project-item">
            <div class="project-info">
                <div class="project-name">${p.name}</div>
                <div class="project-details">${p.division}</div>
            </div>
            <div class="project-value">${formatEUR(p.valueEUR)}</div>
            <button class="btn-delete" onclick="deleteProject(${p.id})">🗑️ Șterge</button>
        </div>
    `).join('');
}

function initCharts() {
    Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    Chart.defaults.color = '#cccccc';
    
    // Chart: Target vs Realizat
    charts.target = new Chart(document.getElementById('chartTarget'), {
        type: 'bar',
        data: {
            labels: ['Target 2026', 'Realizat', 'GAP'],
            datasets: [{
                data: [TARGET_RON, 0, TARGET_RON],
                backgroundColor: ['rgb(78, 205, 196)', '#FFD700', 'rgb(255, 107, 107)'],
                borderWidth: 0,
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#2a2a2a',
                    titleColor: '#FFD700',
                    bodyColor: '#ffffff',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    callbacks: {
                        label: (context) => formatRON(context.parsed.y)
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#3a3a3a' },
                    ticks: {
                        color: '#cccccc',
                        callback: (value) => formatRON(value)
                    }
                },
                x: {
                    grid: { color: '#3a3a3a' },
                    ticks: { color: '#cccccc', font: { size: 14, weight: 'bold' } }
                }
            }
        }
    });
    
    // Chart: Divizii
    charts.divizii = new Chart(document.getElementById('chartDivizii'), {
        type: 'doughnut',
        data: {
            labels: ['AVL Installs', 'Arhitectural', 'Events', 'Contract Harvest'],
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: ['#FFD700', '#FFA500', '#FF8C00', '#FF6B35'],
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
                        color: '#cccccc',
                        font: { size: 14, weight: 'bold' },
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#2a2a2a',
                    titleColor: '#FFD700',
                    bodyColor: '#ffffff',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    callbacks: {
                        label: (context) => {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                            return `${context.label}: ${formatRON(context.parsed)} (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
    
    // Chart: Evoluție
    charts.evolutie = new Chart(document.getElementById('chartEvolutie'), {
        type: 'bar',
        data: {
            labels: ['AVL Installs', 'Arhitectural', 'Events', 'Contract Harvest'],
            datasets: [{
                label: 'Valoare (RON)',
                data: [0, 0, 0, 0],
                backgroundColor: ['#FFD700', '#FFA500', '#FF8C00', '#FF6B35'],
                borderWidth: 0,
                borderRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#2a2a2a',
                    titleColor: '#FFD700',
                    bodyColor: '#ffffff',
                    borderColor: '#FFD700',
                    borderWidth: 1,
                    callbacks: {
                        label: (context) => formatRON(context.parsed.y)
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#3a3a3a' },
                    ticks: {
                        color: '#cccccc',
                        callback: (value) => formatRON(value)
                    }
                },
                x: {
                    grid: { color: '#3a3a3a' },
                    ticks: { color: '#cccccc' }
                }
            }
        }
    });
}

function updateCharts() {
    const totalRON = projects.reduce((sum, p) => sum + p.valueRON, 0);
    const gapRON = Math.max(0, TARGET_RON - totalRON);
    
    // Update Target chart
    charts.target.data.datasets[0].data = [TARGET_RON, totalRON, gapRON];
    charts.target.update();
    
    // Update by division
    const byDivision = {
        'AVL Installs': 0,
        'Arhitectural': 0,
        'Events': 0,
        'Contract Harvest': 0
    };
    
    projects.forEach(p => {
        byDivision[p.division] += p.valueRON;
    });
    
    charts.divizii.data.datasets[0].data = [
        byDivision['AVL Installs'],
        byDivision['Arhitectural'],
        byDivision['Events'],
        byDivision['Contract Harvest']
    ];
    charts.divizii.update();
    
    charts.evolutie.data.datasets[0].data = [
        byDivision['AVL Installs'],
        byDivision['Arhitectural'],
        byDivision['Events'],
        byDivision['Contract Harvest']
    ];
    charts.evolutie.update();
}

function formatRON(value) {
    return new Intl.NumberFormat('ro-RO', {
        style: 'currency',
        currency: 'RON',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function formatEUR(value) {
    return new Intl.NumberFormat('ro-RO', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
