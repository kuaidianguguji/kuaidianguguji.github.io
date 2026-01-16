/**
 * MANIPURA SIA - Website Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initVideoControls();
});

/**
 * 视频播放控制逻辑
 * 解决点击无法播放的问题
 */
function initVideoControls() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        // 1. 点击视频本体切换播放/暂停
        video.addEventListener('click', function(e) {
            // 防止点击事件冒泡到父元素
            e.stopPropagation(); 
            
            if (this.paused) {
                // 播放时，可以暂停其他视频
                pauseAllVideos();
                this.play().catch(error => {
                    console.log("Play interrupted by browser policy: ", error);
                });
            } else {
                this.pause();
            }
        });

        // 2. 确保在进入全屏时不会出现布局混乱
        video.addEventListener('dblclick', function() {
            if (this.requestFullscreen) {
                this.requestFullscreen();
            }
        });
    });
}

function pauseAllVideos() {
    document.querySelectorAll('video').forEach(v => v.pause());
}

/**
 * 复制联系信息
 */
function copyContact() {
    const email = "9999999@qq.com";
    const phone = "99999999";
    const combinedInfo = `Email: ${email}\nPhone: ${phone}`;

    // 现代 API 复制
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(combinedInfo).then(() => {
            showToast("Contact info copied to clipboard!");
        });
    } else {
        // 兼容备用方案
        const textArea = document.createElement("textarea");
        textArea.value = combinedInfo;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast("Contact info copied!");
    }
}

/**
 * 显示提示浮窗
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    
    // 简单的渐入效果
    toast.animate([
        { opacity: 0, transform: 'translateX(-50%) translateY(20px)' },
        { opacity: 1, transform: 'translateX(-50%) translateY(0)' }
    ], { duration: 300, fill: 'forwards' });

    // 3秒后自动消失
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}