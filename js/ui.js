// UI Utilities for Loading, Toasts, and Error Handling

export const UI = {
    // Show loading state
    showLoading(elementId, message = 'جاري التحميل...') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="flex items-center justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
                    <span class="mr-3 text-gray-400 text-sm">${message}</span>
                </div>
            `;
        }
    },

    // Hide loading state
    hideLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '';
        }
    },

    // Show toast notification
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-brand-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';
        const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        toast.className = `fixed bottom-4 left-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-in slide-in-from-bottom duration-300`;
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span class="font-bold text-sm">${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('animate-out', 'slide-out-to-bottom');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    // Show error state
    showError(elementId, message = 'حدث خطأ أثناء التحميل') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        <i class="fa-solid fa-exclamation-triangle"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-1">حدث خطأ</h3>
                    <p class="text-sm text-gray-400">${message}</p>
                </div>
            `;
        }
    },

    // Show empty state
    showEmpty(elementId, message = 'لا توجد بيانات') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `
                <div class="text-center py-8">
                    <div class="w-16 h-16 bg-dark-hover text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        <i class="fa-solid fa-inbox"></i>
                    </div>
                    <h3 class="text-lg font-bold text-white mb-1">${message}</h3>
                </div>
            `;
        }
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Format time
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'م' : 'ص';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }
};
