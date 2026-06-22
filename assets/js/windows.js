let highestZIndex = 100;

function openWindow(winId, title, iconPath) {
    const win = document.getElementById(winId);
    if (!win) return;
    
    if (win.style.display === 'none' || win.style.display === '') {
        win.style.display = 'block';
        
        // Offset a bit if opening at 0,0
        if (!win.style.top || win.style.top === '0px') {
            win.style.top = (50 + Math.random() * 50) + 'px';
            win.style.left = (120 + Math.random() * 50) + 'px';
        }
        
        addTaskbarButton(winId, title, iconPath);
    }
    bringToFront(win);
}

function closeWindow(winId) {
    const win = document.getElementById(winId);
    if (win) win.style.display = 'none';
    
    const btn = document.getElementById('taskbar-btn-' + winId);
    if (btn) btn.remove();
}

function bringToFront(win) {
    highestZIndex++;
    win.style.zIndex = highestZIndex;
    
    document.querySelectorAll('.taskbar-window-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('taskbar-btn-' + win.id);
    if (btn) btn.classList.add('active');
}

function addTaskbarButton(winId, title, iconPath) {
    const container = document.getElementById('taskbar-items');
    if (!container) return;
    
    let btn = document.getElementById('taskbar-btn-' + winId);
    if (!btn) {
        btn = document.createElement('a');
        btn.id = 'taskbar-btn-' + winId;
        btn.href = '#';
        btn.className = 'btn start-button active ml-1 taskbar-window-btn';
        btn.style.fontWeight = 'bold';
        btn.style.padding = '2px 8px';
        btn.innerHTML = `<img src="${iconPath}" class="icon-16 mr-1">${title}`;
        
        btn.onclick = function(e) {
            e.preventDefault();
            const win = document.getElementById(winId);
            if (win.style.display === 'none') {
                win.style.display = 'block';
                bringToFront(win);
            } else {
                if (win.style.zIndex == highestZIndex) {
                    win.style.display = 'none';
                    btn.classList.remove('active');
                } else {
                    bringToFront(win);
                }
            }
        };
        container.appendChild(btn);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Make windows draggable
    const headers = document.querySelectorAll('.window .card-header');
    
    headers.forEach(header => {
        const win = header.closest('.window');
        
        win.addEventListener('mousedown', () => bringToFront(win));
        
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        header.addEventListener('mousedown', (e) => {
            if (e.target.tagName.toLowerCase() === 'button') return; 
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = win.offsetLeft;
            initialY = win.offsetTop;
            bringToFront(win);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            win.style.left = (initialX + dx) + 'px';
            win.style.top = (initialY + dy) + 'px';
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
});
