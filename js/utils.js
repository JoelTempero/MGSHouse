// =====================
// UTILITY FUNCTIONS
// =====================

// Format date
export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-NZ', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
}

// Format time
export function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Format relative time
export function formatTimeAgo(timestamp) {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
}

// Show toast notification
export function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Download CSV
export function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Print report
export function printReport(content) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head><title>MGS House Competition Report</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
            ${content}
            <script>window.print();</script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Get ordinal suffix
export function getOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Get badge tier
export function getBadgeTier(count, tiers) {
    return tiers.find(tier => count >= tier.min && count <= tier.max);
}

// Days until date
export function daysUntil(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Parse MM-DD format
    const [month, day] = dateStr.split('-').map(Number);
    let targetDate = new Date(today.getFullYear(), month - 1, day);
    
    // If date has passed this year, use next year
    if (targetDate < today) {
        targetDate = new Date(today.getFullYear() + 1, month - 1, day);
    }
    
    const diff = targetDate - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Debounce function
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Deep clone object
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Generate unique ID
export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Escape HTML
export function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Check if date is today
export function isToday(date) {
    const today = new Date();
    const d = new Date(date);
    return d.getDate() === today.getDate() &&
           d.getMonth() === today.getMonth() &&
           d.getFullYear() === today.getFullYear();
}

// Check if date is upcoming (within next 30 days)
export function isUpcoming(dateStr) {
    return daysUntil(dateStr) <= 30;
}
