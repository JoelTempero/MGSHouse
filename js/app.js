// =====================
// MGS HOUSE COMPETITION - MAIN APP
// =====================

import { HOUSES, BADGE_DEFINITIONS, BADGE_CATEGORIES, BADGE_TIERS, EXPLORERS, TIMELINE, ANNIVERSARIES, POINTS_CONFIG } from './data.js';
import { formatDate, formatTime, formatTimeAgo, showToast, daysUntil, isUpcoming, getBadgeTier, downloadCSV, printReport, escapeHtml } from './utils.js';

// Note: Firebase is loaded via CDN in index.html
// In production, replace with your Firebase config

// =====================
// APP STATE
// =====================
const state = {
    houses: null,
    events: [],
    badges: [],
    feed: [],
    auditLog: [],
    scheduledPosts: [],
    adminRoles: [],
    badgeHunts: [],
    records: [],
    currentPage: 'dashboard',
    isAdmin: false,
    currentUser: null,
    isLoading: true,
    useDemoData: true // Set to false when Firebase is configured
};

// =====================
// DEMO DATA (Used when Firebase isn't configured)
// =====================
const DEMO_DATA = {
    houses: {
        shackleton: { points: 1245, badgesEarned: 23, eventsWon: 5, streak: 2, spiritPoints: 180, weeklyActivity: { points: 120, badges: 3 } },
        wilson: { points: 1180, badgesEarned: 21, eventsWon: 4, streak: 0, spiritPoints: 165, weeklyActivity: { points: 95, badges: 2 } },
        bowen: { points: 1320, badgesEarned: 25, eventsWon: 6, streak: 3, spiritPoints: 195, weeklyActivity: { points: 145, badges: 4 } },
        scott: { points: 1105, badgesEarned: 19, eventsWon: 3, streak: 0, spiritPoints: 150, weeklyActivity: { points: 85, badges: 2 } }
    },
    events: [
        { id: '1', name: 'Swimming Carnival', date: '2025-02-15', time: '09:00', description: 'Annual swimming competition', points: 50, results: { '1st': 'bowen', '2nd': 'shackleton', '3rd': 'wilson', '4th': 'scott' } },
        { id: '2', name: 'Athletics Day', date: '2025-03-20', time: '08:30', description: 'Track and field events', points: 50, results: null },
        { id: '3', name: 'House Singing', date: '2025-04-10', time: '13:00', description: 'Choral competition', points: 50, results: null },
        { id: '4', name: 'Quiz Night', date: '2025-02-01', time: '18:00', description: 'Academic quiz competition', points: 30, results: { '1st': 'shackleton', '2nd': 'wilson', '3rd': 'scott', '4th': 'bowen' } }
    ],
    badges: [
        { badgeId: 'community-cleanup', category: 'explorer', earnedBy: { bowen: 1, shackleton: 2, wilson: 3, scott: 4 } },
        { badgeId: 'science-fair', category: 'scholar', earnedBy: { scott: 1, wilson: 2, shackleton: 3 } },
        { badgeId: 'drama-star', category: 'performer', earnedBy: { wilson: 1, bowen: 2 } },
        { badgeId: 'athletics-day', category: 'champion', earnedBy: { bowen: 1, shackleton: 2, wilson: 3, scott: 4 } },
        { badgeId: 'chapel-leader', category: 'disciple', earnedBy: { shackleton: 1 } }
    ],
    feed: [
        { id: '1', type: 'result', house: 'bowen', content: '🏆 Bowen House wins the Swimming Carnival!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
        { id: '2', type: 'badge', house: 'scott', content: '🔬 Scott House earns Science Fair Victor badge (1st place)', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
        { id: '3', type: 'shoutout', house: 'wilson', content: '⭐ Amazing effort from Wilson House in the community service project!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
        { id: '4', type: 'announcement', house: null, content: '📢 Athletics Day entries are now open! Sign up by March 1st.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) }
    ],
    records: [
        { title: 'Most Points (Year)', value: '2,847', holder: 'scott', year: 2019 },
        { title: 'Most Badges (Year)', value: '67', holder: 'shackleton', year: 2022 },
        { title: 'Longest Win Streak', value: '8 events', holder: 'bowen', year: 2021 }
    ]
};

// =====================
// INITIALIZATION
// =====================
async function init() {
    console.log('🏔️ MGS House Competition initializing...');
    
    // Setup event listeners
    setupNavigation();
    setupThemeToggle();
    setupAdminLogin();
    
    // Load data
    await loadData();
    
    // Render initial page
    renderPage('dashboard');
    
    // Hide loading state
    document.getElementById('loadingState').classList.add('hidden');
    
    console.log('✅ App initialized');
}

async function loadData() {
    if (state.useDemoData) {
        // Use demo data
        state.houses = { ...DEMO_DATA.houses };
        state.events = [...DEMO_DATA.events];
        state.badges = [...DEMO_DATA.badges];
        state.feed = [...DEMO_DATA.feed];
        state.records = [...DEMO_DATA.records];
        state.isLoading = false;
        return;
    }
    
    // TODO: Load from Firebase when configured
    // const { getHouses, getEvents, getBadgeAwards, getFeed } = await import('./firebase-config.js');
    // state.houses = await getHouses();
    // state.events = await getEvents();
    // etc.
}

// =====================
// NAVIGATION
// =====================
function setupNavigation() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const page = tab.dataset.page;
            
            // Update active tab
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Render page
            renderPage(page);
        });
    });
    
    // Secret admin access via logo clicks
    let logoClicks = 0;
    document.getElementById('logo').addEventListener('click', () => {
        logoClicks++;
        if (logoClicks >= 5) {
            logoClicks = 0;
            if (!state.isAdmin) {
                document.getElementById('loginModal').classList.add('active');
            } else {
                renderPage('admin');
            }
        }
    });
}

// =====================
// THEME
// =====================
function setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.textContent = '☀️';
    }
    
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        toggle.textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
}

// =====================
// ADMIN LOGIN
// =====================
function setupAdminLogin() {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        
        // Demo login - in production use Firebase Auth
        if (password === 'mgsadmin2025') {
            state.isAdmin = true;
            state.currentUser = { email, name: 'Admin' };
            document.getElementById('loginModal').classList.remove('active');
            renderPage('admin');
            showToast('Welcome, Admin! 🔐', 'success');
        } else {
            document.getElementById('loginError').textContent = 'Invalid password';
        }
    });
}

window.closeLoginModal = function() {
    document.getElementById('loginModal').classList.remove('active');
};

// =====================
// PAGE RENDERING
// =====================
function renderPage(pageName) {
    state.currentPage = pageName;
    const container = document.getElementById('pagesContainer');
    
    switch(pageName) {
        case 'dashboard':
            container.innerHTML = renderDashboard();
            break;
        case 'events':
            container.innerHTML = renderEventsPage();
            break;
        case 'results':
            container.innerHTML = renderResultsPage();
            break;
        case 'awards':
            container.innerHTML = renderAwardsPage();
            break;
        case 'houses':
            container.innerHTML = renderHousesPage();
            break;
        case 'heritage':
            container.innerHTML = renderHeritagePage();
            setupExplorerToggles();
            break;
        case 'leaderboard':
            container.innerHTML = renderLeaderboardPage();
            break;
        case 'admin':
            if (!state.isAdmin) {
                container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔐</div><p>Admin access required</p></div>';
            } else {
                container.innerHTML = renderAdminPage();
                setupAdminTabs();
            }
            break;
        default:
            container.innerHTML = '<div class="empty-state"><p>Page not found</p></div>';
    }
}

// =====================
// DASHBOARD
// =====================
function renderDashboard() {
    const housesArray = getHousesArray();
    const leader = housesArray[0];
    
    return `
        <div class="page active">
            <div class="dashboard-layout">
                <div class="dashboard-main">
                    <!-- House of the Week -->
                    <div class="hotw-card">
                        <div class="hotw-header">
                            <span class="hotw-crown">👑</span>
                            <span class="hotw-title">House of the Week</span>
                        </div>
                        <div class="hotw-house">${HOUSES[leader.key].icon} ${HOUSES[leader.key].name}</div>
                        <div class="hotw-reason">Leading with ${leader.weeklyActivity?.points || 0} points this week!</div>
                    </div>
                    
                    <!-- Standings -->
                    <div class="section-header">
                        <h2 class="section-title">Current Standings</h2>
                    </div>
                    <div class="standings-grid">
                        ${housesArray.map((house, index) => `
                            <div class="house-card ${house.key}">
                                <span class="rank-badge rank-${index + 1}">${index + 1}</span>
                                <div class="house-card-header">
                                    <span class="house-icon">${HOUSES[house.key].icon}</span>
                                    <div>
                                        <div class="house-name">${HOUSES[house.key].name}</div>
                                        <div class="house-explorer">${HOUSES[house.key].explorer}</div>
                                    </div>
                                </div>
                                <div class="house-points">${house.points.toLocaleString()}</div>
                                ${house.streak >= 2 ? `<span class="streak-badge">🔥 ${house.streak} streak</span>` : ''}
                                <div class="house-stats">
                                    <div class="house-stat">
                                        <div class="house-stat-value">${house.badgesEarned}</div>
                                        <div class="house-stat-label">Badges</div>
                                    </div>
                                    <div class="house-stat">
                                        <div class="house-stat-value">${house.eventsWon}</div>
                                        <div class="house-stat-label">Wins</div>
                                    </div>
                                    <div class="house-stat">
                                        <div class="house-stat-value">${house.spiritPoints}</div>
                                        <div class="house-stat-label">Spirit</div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Upcoming Events -->
                    <div class="section-header">
                        <h2 class="section-title">Upcoming Events</h2>
                    </div>
                    <div class="events-grid">
                        ${state.events.filter(e => !e.results).slice(0, 3).map(event => `
                            <div class="event-card">
                                <div class="event-date-box">
                                    <div class="event-date-day">${new Date(event.date).getDate()}</div>
                                    <div class="event-date-month">${new Date(event.date).toLocaleString('en', { month: 'short' })}</div>
                                </div>
                                <div class="event-info">
                                    <div class="event-name">${event.name}</div>
                                    <div class="event-meta">${formatTime(event.time)} • ${event.description}</div>
                                </div>
                                <div class="event-points">${event.points} pts</div>
                            </div>
                        `).join('') || '<div class="empty-state"><p>No upcoming events</p></div>'}
                    </div>
                </div>
                
                <!-- Sidebar -->
                <div class="dashboard-sidebar">
                    <!-- Feed -->
                    <div class="sidebar-card">
                        <h4>📢 House Feed</h4>
                        <div class="feed-container">
                            ${state.feed.slice(0, 5).map(item => `
                                <div class="feed-item">
                                    <div class="feed-header">
                                        <div class="feed-icon ${item.house || ''}">${item.type === 'result' ? '🏆' : item.type === 'badge' ? '🎖️' : item.type === 'shoutout' ? '⭐' : '📢'}</div>
                                        <div class="feed-meta">
                                            <div class="feed-type">${item.house ? HOUSES[item.house]?.name : 'Announcement'}</div>
                                            <div class="feed-time">${formatTimeAgo(item.timestamp)}</div>
                                        </div>
                                    </div>
                                    <div class="feed-content">${item.content}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- Spirit Points -->
                    <div class="sidebar-card">
                        <h4>💪 Spirit Points</h4>
                        ${Object.entries(state.houses).map(([key, house]) => `
                            <div class="spirit-bar">
                                <span class="spirit-house-icon">${HOUSES[key].icon}</span>
                                <div class="spirit-bar-track">
                                    <div class="spirit-bar-fill ${key}" style="width: ${(house.spiritPoints / 200) * 100}%"></div>
                                </div>
                                <span class="spirit-value">${house.spiritPoints}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Heritage Spotlight -->
                    <div class="sidebar-card">
                        <h4>🏔️ Heritage Spotlight</h4>
                        ${renderHeritageSpotlight()}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHeritageSpotlight() {
    const explorers = Object.values(EXPLORERS);
    const todayIndex = new Date().getDate() % explorers.length;
    const explorer = explorers[todayIndex];
    
    // Find next anniversary
    const sortedAnniversaries = ANNIVERSARIES
        .map(a => ({ ...a, days: daysUntil(a.date) }))
        .sort((a, b) => a.days - b.days);
    const nextAnniversary = sortedAnniversaries[0];
    
    return `
        <div style="margin-bottom: 1rem;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${explorer.icon}</div>
            <div style="font-weight: 600; margin-bottom: 0.25rem;">${explorer.name}</div>
            <div style="font-size: 0.85rem; font-style: italic; color: var(--text-muted);">${explorer.quote}</div>
        </div>
        <div style="padding: 0.75rem; background: var(--bg-elevated); border-radius: 10px;">
            <div style="font-size: 0.8rem; color: var(--text-muted);">Next Anniversary</div>
            <div style="font-weight: 600;">${nextAnniversary.title}</div>
            <div style="font-size: 0.85rem; color: var(--accent-ice);">${nextAnniversary.days} days away</div>
        </div>
    `;
}

// =====================
// EVENTS PAGE
// =====================
function renderEventsPage() {
    const upcomingEvents = state.events.filter(e => !e.results);
    
    return `
        <div class="page active">
            <div class="section-header">
                <h2 class="section-title">Upcoming Events</h2>
            </div>
            <div class="events-grid">
                ${upcomingEvents.map(event => `
                    <div class="event-card">
                        <div class="event-date-box">
                            <div class="event-date-day">${new Date(event.date).getDate()}</div>
                            <div class="event-date-month">${new Date(event.date).toLocaleString('en', { month: 'short' })}</div>
                        </div>
                        <div class="event-info">
                            <div class="event-name">${event.name}</div>
                            <div class="event-meta">${formatDate(event.date)} at ${formatTime(event.time)}</div>
                            <div class="event-meta">${event.description}</div>
                        </div>
                        <div class="event-points">${event.points} pts</div>
                    </div>
                `).join('') || '<div class="empty-state"><div class="empty-state-icon">📅</div><p>No upcoming events</p></div>'}
            </div>
        </div>
    `;
}

// =====================
// RESULTS PAGE
// =====================
function renderResultsPage() {
    const completedEvents = state.events.filter(e => e.results);
    
    return `
        <div class="page active">
            <div class="section-header">
                <h2 class="section-title">Event Results</h2>
            </div>
            <div class="grid-2">
                ${completedEvents.map(event => `
                    <div class="result-card">
                        <div class="result-header">
                            <div class="result-name">${event.name}</div>
                            <div class="result-date">${formatDate(event.date)}</div>
                        </div>
                        <div class="result-placements">
                            ${['1st', '2nd', '3rd', '4th'].map(place => {
                                const house = event.results[place];
                                return `
                                    <div class="placement ${place === '1st' ? 'first' : ''}">
                                        <div class="placement-position">${place}</div>
                                        <div class="placement-house">${house ? HOUSES[house].icon : '—'}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('') || '<div class="empty-state"><div class="empty-state-icon">🏆</div><p>No completed events yet</p></div>'}
            </div>
        </div>
    `;
}

// =====================
// AWARDS PAGE
// =====================
function renderAwardsPage() {
    return `
        <div class="page active">
            <div class="section-header">
                <h2 class="section-title">Badge Awards</h2>
            </div>
            
            <div class="filter-group">
                <button class="filter-btn active" data-filter="all">All</button>
                ${Object.entries(BADGE_CATEGORIES).map(([key, cat]) => `
                    <button class="filter-btn" data-filter="${key}">${cat.icon} ${cat.name}</button>
                `).join('')}
            </div>
            
            <div class="badges-grid" id="badgesGrid">
                ${renderBadges('all')}
            </div>
        </div>
    `;
}

function renderBadges(filter) {
    // Get all badges with their definitions and awards
    const allBadges = [];
    
    Object.entries(BADGE_DEFINITIONS).forEach(([category, badges]) => {
        if (filter !== 'all' && filter !== category) return;
        
        badges.forEach(badge => {
            const award = state.badges.find(b => b.badgeId === badge.id);
            allBadges.push({
                ...badge,
                category,
                earnedBy: award?.earnedBy || {}
            });
        });
    });
    
    // Show earned badges first
    const sortedBadges = allBadges.sort((a, b) => {
        const aEarned = Object.keys(a.earnedBy).length;
        const bEarned = Object.keys(b.earnedBy).length;
        return bEarned - aEarned;
    });
    
    return sortedBadges.slice(0, 20).map(badge => {
        const isEarned = Object.keys(badge.earnedBy).length > 0;
        const isLegendary = badge.legendary;
        
        return `
            <div class="badge-card ${isLegendary ? 'legendary' : ''}" style="${!isEarned ? 'opacity: 0.5;' : ''}">
                <div class="badge-emoji">${badge.emoji}</div>
                <div class="badge-info">
                    <div class="badge-name">${isLegendary ? '👑 ' : ''}${badge.name}</div>
                    <div class="badge-category">${BADGE_CATEGORIES[badge.category].name}</div>
                    <div class="badge-earned">
                        ${isEarned ? 
                            Object.entries(badge.earnedBy)
                                .sort((a, b) => a[1] - b[1])
                                .map(([house, place]) => `<span class="badge-place" title="${HOUSES[house].name} - ${place}${['st','nd','rd','th'][place-1] || 'th'}">${HOUSES[house].icon}</span>`)
                                .join('') 
                            : '<span style="color: var(--text-muted); font-size: 0.8rem;">Not yet earned</span>'
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// =====================
// HOUSES PAGE
// =====================
function renderHousesPage() {
    return `
        <div class="page active">
            <div class="section-header">
                <h2 class="section-title">House Profiles</h2>
            </div>
            <div class="grid-2">
                ${Object.entries(state.houses).map(([key, house]) => {
                    const tier = getBadgeTier(house.badgesEarned, BADGE_TIERS);
                    const badges = state.badges.filter(b => b.earnedBy[key]);
                    
                    return `
                        <div class="house-profile">
                            <div class="house-profile-header ${key}">
                                <div class="house-profile-icon">${HOUSES[key].icon}</div>
                                <div class="house-profile-name">${HOUSES[key].name}</div>
                                <div style="margin-top: 0.5rem; opacity: 0.9;">${HOUSES[key].motto}</div>
                            </div>
                            <div class="house-profile-body">
                                <div style="display: flex; gap: 2rem; margin-bottom: 1rem;">
                                    <div>
                                        <div style="font-size: 2rem; font-weight: 700; color: var(--${key}-light);">${house.points.toLocaleString()}</div>
                                        <div style="font-size: 0.85rem; color: var(--text-muted);">Points</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 2rem; font-weight: 700;">${house.badgesEarned}</div>
                                        <div style="font-size: 0.85rem; color: var(--text-muted);">Badges</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 1.5rem;">${tier.icon}</div>
                                        <div style="font-size: 0.85rem; color: var(--text-muted);">${tier.name} Tier</div>
                                    </div>
                                </div>
                                
                                <h5 style="margin-bottom: 0.5rem;">🏆 Trophy Cabinet</h5>
                                <div class="trophy-cabinet">
                                    ${badges.slice(0, 12).map(b => {
                                        const def = Object.values(BADGE_DEFINITIONS).flat().find(d => d.id === b.badgeId);
                                        return def ? `<span class="trophy-item" title="${def.name}">${def.emoji}</span>` : '';
                                    }).join('') || '<span style="color: var(--text-muted);">No badges yet</span>'}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// =====================
// HERITAGE PAGE
// =====================
function renderHeritagePage() {
    return `
        <div class="page active">
            <div class="section-header">
                <h2 class="section-title">Our Antarctic Heritage</h2>
                <p class="section-subtitle">The explorers who inspire our houses</p>
            </div>
            
            <!-- Explorers -->
            ${Object.entries(EXPLORERS).map(([key, explorer]) => `
                <div class="explorer-card">
                    <div class="explorer-header ${key}" onclick="toggleExplorer(this)">
                        <span class="explorer-icon">${explorer.icon}</span>
                        <div>
                            <div class="explorer-name">${explorer.name}</div>
                            <div class="explorer-dates">${explorer.dates}</div>
                        </div>
                        <span class="explorer-toggle">▼</span>
                    </div>
                    <div class="explorer-content">
                        <div class="explorer-body">
                            <div class="explorer-quote">${explorer.quote}</div>
                            <p style="margin-bottom: 1rem;">${explorer.bio}</p>
                            <h5 style="margin-bottom: 0.75rem;">Expeditions</h5>
                            ${explorer.expeditions.map(exp => `
                                <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                                    <span class="badge badge-primary">${exp.year}</span>
                                    <div>
                                        <strong>${exp.name}</strong>
                                        <div style="font-size: 0.85rem; color: var(--text-muted);">${exp.description}</div>
                                    </div>
                                </div>
                            `).join('')}
                            <h5 style="margin: 1rem 0 0.5rem;">House Values</h5>
                            <div style="display: flex; gap: 0.5rem;">
                                ${HOUSES[key].values.map(v => `<span class="badge badge-success">${v}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
            
            <!-- Timeline -->
            <div class="section-header" style="margin-top: 3rem;">
                <h2 class="section-title">Historical Timeline</h2>
            </div>
            <div class="timeline">
                ${TIMELINE.map(item => `
                    <div class="timeline-item ${item.highlight ? 'highlight' : ''}">
                        <div class="timeline-year">${item.year}</div>
                        <div class="timeline-title">${item.title}</div>
                        <div class="timeline-description">${item.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Anniversaries -->
            <div class="section-header" style="margin-top: 3rem;">
                <h2 class="section-title">Upcoming Anniversaries</h2>
            </div>
            <div class="grid-3">
                ${ANNIVERSARIES
                    .map(a => ({ ...a, days: daysUntil(a.date) }))
                    .sort((a, b) => a.days - b.days)
                    .slice(0, 6)
                    .map(ann => `
                        <div class="card" style="${ann.days <= 30 ? 'border-color: var(--accent-ice);' : ''}">
                            <div class="card-body">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <div style="font-weight: 700;">${ann.title}</div>
                                        <div style="font-size: 0.85rem; color: var(--text-muted);">${ann.description}</div>
                                    </div>
                                    <span class="badge ${ann.days <= 30 ? 'badge-primary' : ''}">${ann.days}d</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
            </div>
        </div>
    `;
}

function setupExplorerToggles() {
    // Function is now inline via onclick
}

window.toggleExplorer = function(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.explorer-toggle');
    content.classList.toggle('expanded');
    toggle.style.transform = content.classList.contains('expanded') ? 'rotate(180deg)' : '';
};

// =====================
// LEADERBOARD PAGE
// =====================
function renderLeaderboardPage() {
    const housesArray = getHousesArray();
    
    return `
        <div class="page active">
            <div class="section-header">
                <h2 class="section-title">Full Leaderboard</h2>
            </div>
            
            <div class="card">
                <table class="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>House</th>
                            <th>Points</th>
                            <th>Badges</th>
                            <th>Events Won</th>
                            <th>Streak</th>
                            <th>Spirit</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${housesArray.map((house, index) => `
                            <tr>
                                <td><span class="leaderboard-rank">${index + 1}</span></td>
                                <td>
                                    <div class="leaderboard-house">
                                        <span class="leaderboard-house-icon">${HOUSES[house.key].icon}</span>
                                        <span>${HOUSES[house.key].name}</span>
                                    </div>
                                </td>
                                <td><strong>${house.points.toLocaleString()}</strong></td>
                                <td>${house.badgesEarned}</td>
                                <td>${house.eventsWon}</td>
                                <td>${house.streak > 0 ? `🔥 ${house.streak}` : '—'}</td>
                                <td>${house.spiritPoints}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Records -->
            <div class="section-header" style="margin-top: 2rem;">
                <h2 class="section-title">All-Time Records</h2>
            </div>
            <div class="grid-3">
                ${state.records.map(record => `
                    <div class="card">
                        <div class="card-body">
                            <div style="font-size: 0.85rem; color: var(--text-muted);">${record.title}</div>
                            <div style="font-size: 1.5rem; font-weight: 700; margin: 0.25rem 0;">${record.value}</div>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span>${HOUSES[record.holder].icon}</span>
                                <span>${HOUSES[record.holder].name}</span>
                                <span style="color: var(--text-muted);">(${record.year})</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// =====================
// ADMIN PAGE
// =====================
function renderAdminPage() {
    return `
        <div class="page active admin-page">
            <div class="admin-header">
                <h2>🔐 Admin Dashboard</h2>
                <span class="admin-indicator">Logged in as Admin</span>
            </div>
            
            <div class="admin-tabs">
                <button class="admin-tab active" data-section="events">Manage Events</button>
                <button class="admin-tab" data-section="results">Update Results</button>
                <button class="admin-tab" data-section="badges">Award Badges</button>
                <button class="admin-tab" data-section="feed">Feed & Spirit</button>
                <button class="admin-tab" data-section="points">Adjust Points</button>
                <button class="admin-tab" data-section="analytics">📊 Analytics</button>
                <button class="admin-tab" data-section="settings">⚙️ Settings</button>
            </div>
            
            <!-- Events Section -->
            <div class="admin-section active" id="admin-events">
                <div class="admin-card">
                    <h4>Create New Event</h4>
                    <form id="eventForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Event Name</label>
                                <input type="text" id="eventName" placeholder="e.g., Athletics Day" required>
                            </div>
                            <div class="form-group">
                                <label>Points Value</label>
                                <input type="number" id="eventPoints" value="50" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Date</label>
                                <input type="date" id="eventDate" required>
                            </div>
                            <div class="form-group">
                                <label>Time</label>
                                <input type="time" id="eventTime" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea id="eventDescription" placeholder="Brief description..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Create Event</button>
                    </form>
                </div>
                
                <div class="admin-card">
                    <h4>Upcoming Events</h4>
                    <div class="admin-events-list">
                        ${state.events.filter(e => !e.results).map(event => `
                            <div class="admin-event-item">
                                <div class="admin-event-info">
                                    <h5>${event.name}</h5>
                                    <p>${formatDate(event.date)} at ${formatTime(event.time)}</p>
                                </div>
                                <div class="admin-event-actions">
                                    <button class="btn btn-secondary btn-sm" onclick="editEvent('${event.id}')">Edit</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteEvent('${event.id}')">Delete</button>
                                </div>
                            </div>
                        `).join('') || '<p style="color: var(--text-muted);">No upcoming events</p>'}
                    </div>
                </div>
            </div>
            
            <!-- Results Section -->
            <div class="admin-section" id="admin-results">
                <div class="admin-card">
                    <h4>Record Event Results</h4>
                    <form id="resultsForm">
                        <div class="form-group">
                            <label>Select Event</label>
                            <select id="resultEvent" required>
                                <option value="">Choose an event...</option>
                                ${state.events.filter(e => !e.results).map(e => `<option value="${e.id}">${e.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-row">
                            ${['1st', '2nd', '3rd', '4th'].map(place => `
                                <div class="form-group">
                                    <label>${place} Place</label>
                                    <select id="result${place}" required>
                                        ${Object.entries(HOUSES).map(([key, house]) => `<option value="${key}">${house.icon} ${house.name}</option>`).join('')}
                                    </select>
                                </div>
                            `).join('')}
                        </div>
                        <button type="submit" class="btn btn-primary">Save Results</button>
                    </form>
                </div>
            </div>
            
            <!-- Badges Section -->
            <div class="admin-section" id="admin-badges">
                <div class="admin-card">
                    <h4>Award Badge</h4>
                    <form id="badgeForm">
                        <div class="form-group">
                            <label>Badge Category</label>
                            <select id="badgeCategory" onchange="updateBadgeSelect()">
                                ${Object.entries(BADGE_CATEGORIES).map(([key, cat]) => `<option value="${key}">${cat.icon} ${cat.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Badge</label>
                            <select id="badgeSelect" required></select>
                        </div>
                        <div class="form-row">
                            ${['1st', '2nd', '3rd', '4th'].map(place => `
                                <div class="form-group">
                                    <label>${place} Place</label>
                                    <select id="badge${place}">
                                        <option value="">None</option>
                                        ${Object.entries(HOUSES).map(([key, house]) => `<option value="${key}">${house.icon} ${house.name}</option>`).join('')}
                                    </select>
                                </div>
                            `).join('')}
                        </div>
                        <button type="submit" class="btn btn-primary">Award Badge</button>
                    </form>
                </div>
            </div>
            
            <!-- Feed Section -->
            <div class="admin-section" id="admin-feed">
                <div class="admin-card">
                    <h4>Post to Feed</h4>
                    <form id="feedForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Post Type</label>
                                <select id="feedType">
                                    <option value="announcement">📢 Announcement</option>
                                    <option value="shoutout">⭐ Shoutout</option>
                                    <option value="reminder">⏰ Reminder</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>House (optional)</label>
                                <select id="feedHouse">
                                    <option value="">All Houses</option>
                                    ${Object.entries(HOUSES).map(([key, house]) => `<option value="${key}">${house.icon} ${house.name}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Content</label>
                            <textarea id="feedContent" placeholder="What's happening?" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Post to Feed</button>
                    </form>
                </div>
            </div>
            
            <!-- Points Section -->
            <div class="admin-section" id="admin-points">
                <div class="admin-card">
                    <h4>Adjust Points</h4>
                    <p style="color: var(--text-muted); margin-bottom: 1rem;">Use for special awards, corrections, or bonus points.</p>
                    <div class="points-grid">
                        ${Object.entries(HOUSES).map(([key, house]) => `
                            <div class="points-card ${key}">
                                <h5>${house.icon} ${house.name}</h5>
                                <div class="points-input-group">
                                    <button class="points-btn" onclick="adjustPoints('${key}', -10)">-</button>
                                    <input type="number" id="${key}-points" value="0">
                                    <button class="points-btn" onclick="adjustPoints('${key}', 10)">+</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" style="margin-top: 1rem;" onclick="applyPointsAdjustment()">Apply Adjustments</button>
                </div>
            </div>
            
            <!-- Analytics Section -->
            <div class="admin-section" id="admin-analytics">
                <div class="analytics-overview">
                    <div class="analytics-card">
                        <div class="analytics-icon">📈</div>
                        <div class="analytics-value">${Object.values(state.houses).reduce((sum, h) => sum + h.points, 0).toLocaleString()}</div>
                        <div class="analytics-label">Total Points</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-icon">🎖️</div>
                        <div class="analytics-value">${Object.values(state.houses).reduce((sum, h) => sum + h.badgesEarned, 0)}</div>
                        <div class="analytics-label">Badges Awarded</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-icon">🏆</div>
                        <div class="analytics-value">${state.events.filter(e => e.results).length}</div>
                        <div class="analytics-label">Events Completed</div>
                    </div>
                    <div class="analytics-card">
                        <div class="analytics-icon">💬</div>
                        <div class="analytics-value">${state.feed.length}</div>
                        <div class="analytics-label">Feed Posts</div>
                    </div>
                </div>
                <div class="admin-card">
                    <h4>Export Reports</h4>
                    <div class="export-options">
                        <div class="export-option">
                            <div class="export-icon">📊</div>
                            <div class="export-info">
                                <h5>Current Standings</h5>
                                <p>House points, rankings, and badges</p>
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="exportStandings()">Export CSV</button>
                        </div>
                        <div class="export-option">
                            <div class="export-icon">🏆</div>
                            <div class="export-info">
                                <h5>Event Results</h5>
                                <p>All completed events</p>
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="exportEvents()">Export CSV</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Settings Section -->
            <div class="admin-section" id="admin-settings">
                <div class="admin-card danger-zone">
                    <h4>⚠️ Danger Zone</h4>
                    <div class="setting-item">
                        <div class="setting-info">
                            <h5>Reset Competition</h5>
                            <p>Clear all points, badges, and results for new year</p>
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="confirmReset()">Reset All</button>
                    </div>
                    <div class="setting-item">
                        <div class="setting-info">
                            <h5>Logout</h5>
                            <p>End admin session</p>
                        </div>
                        <button class="btn btn-secondary btn-sm" onclick="logoutAdmin()">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function setupAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`admin-${tab.dataset.section}`).classList.add('active');
        });
    });
    
    // Setup forms
    setupAdminForms();
    updateBadgeSelect();
}

function setupAdminForms() {
    // Event form
    document.getElementById('eventForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const event = {
            id: Date.now().toString(),
            name: document.getElementById('eventName').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            description: document.getElementById('eventDescription').value,
            points: parseInt(document.getElementById('eventPoints').value),
            results: null
        };
        state.events.push(event);
        renderPage('admin');
        showToast('Event created!', 'success');
    });
    
    // Results form
    document.getElementById('resultsForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventId = document.getElementById('resultEvent').value;
        const event = state.events.find(ev => ev.id === eventId);
        if (event) {
            event.results = {
                '1st': document.getElementById('result1st').value,
                '2nd': document.getElementById('result2nd').value,
                '3rd': document.getElementById('result3rd').value,
                '4th': document.getElementById('result4th').value
            };
            // Update points
            state.houses[event.results['1st']].points += event.points;
            state.houses[event.results['2nd']].points += Math.floor(event.points * 0.6);
            state.houses[event.results['3rd']].points += Math.floor(event.points * 0.4);
            state.houses[event.results['4th']].points += Math.floor(event.points * 0.2);
            state.houses[event.results['1st']].eventsWon++;
            
            renderPage('admin');
            showToast('Results saved!', 'success');
        }
    });
    
    // Badge form
    document.getElementById('badgeForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const category = document.getElementById('badgeCategory').value;
        const badgeId = document.getElementById('badgeSelect').value;
        
        const earnedBy = {};
        ['1st', '2nd', '3rd', '4th'].forEach((place, i) => {
            const house = document.getElementById(`badge${place}`).value;
            if (house) {
                earnedBy[house] = i + 1;
                state.houses[house].badgesEarned++;
            }
        });
        
        state.badges.push({ badgeId, category, earnedBy });
        renderPage('admin');
        showToast('Badge awarded!', 'success');
    });
    
    // Feed form
    document.getElementById('feedForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const post = {
            id: Date.now().toString(),
            type: document.getElementById('feedType').value,
            house: document.getElementById('feedHouse').value || null,
            content: document.getElementById('feedContent').value,
            timestamp: new Date()
        };
        state.feed.unshift(post);
        document.getElementById('feedContent').value = '';
        renderPage('admin');
        showToast('Posted to feed!', 'success');
    });
}

window.updateBadgeSelect = function() {
    const category = document.getElementById('badgeCategory')?.value;
    const select = document.getElementById('badgeSelect');
    if (!category || !select) return;
    
    const badges = BADGE_DEFINITIONS[category] || [];
    select.innerHTML = badges.map(b => `<option value="${b.id}">${b.emoji} ${b.name}${b.legendary ? ' 👑' : ''}</option>`).join('');
};

window.adjustPoints = function(house, amount) {
    const input = document.getElementById(`${house}-points`);
    if (input) {
        input.value = parseInt(input.value || 0) + amount;
    }
};

window.applyPointsAdjustment = function() {
    Object.keys(HOUSES).forEach(house => {
        const input = document.getElementById(`${house}-points`);
        const adj = parseInt(input?.value || 0);
        if (adj !== 0) {
            state.houses[house].points += adj;
            input.value = 0;
        }
    });
    renderPage('admin');
    showToast('Points adjusted!', 'success');
};

window.deleteEvent = function(id) {
    if (confirm('Delete this event?')) {
        state.events = state.events.filter(e => e.id !== id);
        renderPage('admin');
        showToast('Event deleted', 'info');
    }
};

window.exportStandings = function() {
    let csv = 'Rank,House,Points,Badges,Events Won,Streak\n';
    getHousesArray().forEach((h, i) => {
        csv += `${i+1},${HOUSES[h.key].name},${h.points},${h.badgesEarned},${h.eventsWon},${h.streak}\n`;
    });
    downloadCSV(csv, 'house_standings.csv');
    showToast('Downloaded!', 'success');
};

window.exportEvents = function() {
    let csv = 'Event,Date,1st,2nd,3rd,4th\n';
    state.events.filter(e => e.results).forEach(e => {
        csv += `"${e.name}",${e.date},${HOUSES[e.results['1st']].name},${HOUSES[e.results['2nd']].name},${HOUSES[e.results['3rd']].name},${HOUSES[e.results['4th']].name}\n`;
    });
    downloadCSV(csv, 'event_results.csv');
    showToast('Downloaded!', 'success');
};

window.confirmReset = function() {
    if (confirm('⚠️ This will reset ALL data. Are you sure?')) {
        if (confirm('FINAL WARNING: This cannot be undone!')) {
            Object.keys(state.houses).forEach(k => {
                state.houses[k] = { points: 0, badgesEarned: 0, eventsWon: 0, streak: 0, spiritPoints: 0, weeklyActivity: { points: 0, badges: 0 } };
            });
            state.events = [];
            state.badges = [];
            state.feed = [];
            renderPage('admin');
            showToast('Competition reset', 'success');
        }
    }
};

window.logoutAdmin = function() {
    state.isAdmin = false;
    state.currentUser = null;
    renderPage('dashboard');
    showToast('Logged out', 'info');
};

// =====================
// HELPERS
// =====================
function getHousesArray() {
    return Object.entries(state.houses)
        .map(([key, data]) => ({ key, ...data }))
        .sort((a, b) => b.points - a.points);
}

// =====================
// START APP
// =====================
document.addEventListener('DOMContentLoaded', init);
