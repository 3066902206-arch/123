// iPhone Simulator - Complete JavaScript Implementation

// Global State Management
let appState = {
    userName: 'iPhone 用户',
    userAvatar: 'https://via.placeholder.com/150',
    wallpaper: '',
    apiConfig: {
        url: '',
        key: '',
        model: ''
    },
    secondaryApiConfig: {
        url: '',
        key: '',
        model: ''
    },
    customIcons: {},
    darkMode: false,
    fullScreen: false,
    fontOffset: 0,
    theme: 'default',
    customCss: '',
    language: 'zh-CN',
    contacts: [],
    worldbook: [],
    chatHistory: {},
    visitors: [],
    spacePosts: [],
    coupleSpacePosts: [],
    profileData: {
        name: 'iPhone 用户',
        id: '123456789',
        sign: '个性签名',
        avatar: 'https://via.placeholder.com/150',
        bg: '',
        polaroids: ['https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100', 'https://via.placeholder.com/100'],
        tags: ['标签1', '标签2'],
        visitorCount: 0
    },
    musicData: {
        title: '歌名',
        artist: '歌手',
        cover: 'https://via.placeholder.com/150'
    },
    cardData: {
        name: 'linnnn',
        sign: 'xxxxxxxx',
        avatar: 'https://via.placeholder.com/150',
        bg: ''
    },
    dmData: {
        title: '和xxx在一起',
        days: '100天',
        bg: ''
    },
    imageWidget: '',
    polaroidImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    slotA: { // QQ
        contacts: [],
        chatHistory: {}
    },
    slotB: { // OO
        contacts: [],
        chatHistory: {}
    },
    currentChatTarget: null,
    currentChatApp: 'qq',
    globalChatWallpaper: '',
    chatWallpapers: {},
    customQCss: '',
    customOOCss: '',
    personaPresets: [],
    currentPersona: {
        name: 'iPhone 用户',
        sign: 'Apple ID, iCloud, 媒体与购买项目',
        avatar: 'https://via.placeholder.com/150',
        desc: ''
    },
    spaceCover: '',
    presets: {
        api: [],
        appearance: [],
        theme: []
    }
};

let currentChatAppId = 'qq';
let currentPage = 0;
let isEditingPersona = false;

// Default Apps Configuration
const defaultApps = [
    // Page 1 Apps (first 6 non-dock apps)
    { id: 'qq', name: 'QQ', icon: '💬', color: '#12B7F5' },
    { id: 'oo', name: 'OO', icon: '🗨️', color: '#07C160' },
    { id: 'bottle', name: '漂流瓶', icon: '🍾', color: '#4CD964' },
    { id: 'taobao', name: '桃宝', icon: '🛍️', color: '#FF5000' },
    { id: 'safari', name: 'Safari', icon: '🧭', color: '#007AFF' },
    { id: 'photos', name: '照片', icon: '🖼️', color: '#007AFF' },
    
    // Page 2 Apps (next 5 apps)
    { id: 'presets', name: '预设', icon: '📋', color: '#5856D6' },
    { id: 'worldbook', name: '世界书', icon: '📚', color: '#FF9500' },
    { id: 'checkpost', name: '查岗', icon: '📍', color: '#FF3B30' },
    { id: 'pinpin', name: '拼拼', icon: '🧩', color: '#FF2D55' },
    { id: 'toutiao', name: '今日头条', icon: '📰', color: '#D4237A' },
    
    // Other Apps
    { id: 'camera', name: '相机', icon: '📷', color: '#8E8E93' },
    { id: 'music', name: '音乐', icon: '🎵', color: '#FF2D92' },
    { id: 'maps', name: '地图', icon: '🗺️', color: '#007AFF' },
    { id: 'weather', name: '天气', icon: '☀️', color: '#007AFF' },
    { id: 'clock', name: '时钟', icon: '⏰', color: '#000000' },
    { id: 'calculator', name: '计算器', icon: '🔢', color: '#000000' },
    { id: 'notes', name: '备忘录', icon: '📝', color: '#FF9500' },
    { id: 'reminders', name: '提醒事项', icon: '✅', color: '#FF3B30' },
    { id: 'calendar', name: '日历', icon: '📅', color: '#FF3B30' },
    { id: 'contacts', name: '通讯录', icon: '👤', color: '#8E8E93' },
    { id: 'mail', name: '邮件', icon: '✉️', color: '#007AFF' },
    { id: 'appstore', name: 'App Store', icon: '🛒', color: '#007AFF' },
    
    // Dock Apps
    { id: 'phone', name: '电话', icon: '📞', color: '#34C759' },
    { id: 'messages', name: '信息', icon: '💬', color: '#34C759' },
    { id: 'alipay', name: '支付宝', icon: '💴', color: '#1677FF' },
    { id: 'settings', name: '设置', icon: '⚙️', color: '#8E8E93' }
];

// Dock Apps (bottom 4 apps)
const dockApps = ['phone', 'messages', 'alipay', 'settings'];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadAppState();
    initializeApp();
    generateApps();
    updateClock();
    setInterval(updateClock, 1000);
    setupEventListeners();
    applyTheme();
    updateLanguage();
});

// Load saved state from localStorage
function loadAppState() {
    const saved = localStorage.getItem('iphoneSimState');
    if (saved) {
        try {
            const savedState = JSON.parse(saved);
            appState = { ...appState, ...savedState };
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    }
}

// Save state to localStorage
function saveAppState() {
    try {
        localStorage.setItem('iphoneSimState', JSON.stringify(appState));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

// Initialize the app
function initializeApp() {
    // Apply saved settings
    if (appState.wallpaper) {
        document.querySelector('.screen').style.backgroundImage = `url(${appState.wallpaper})`;
    }
    
    if (appState.userAvatar) {
        document.getElementById('userAvatar').src = appState.userAvatar;
    }
    
    if (appState.userName) {
        document.getElementById('userNameInput').value = appState.userName;
    }
    
    // Apply dark mode
    if (appState.darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').checked = true;
    }
    
    // Apply full screen
    if (appState.fullScreen) {
        document.body.classList.add('fullscreen-mode');
        document.getElementById('fullScreenToggle').checked = true;
    }
    
    // Apply font offset
    document.documentElement.style.setProperty('--font-offset', appState.fontOffset + 'px');
    document.getElementById('fontSlider').value = appState.fontOffset;
    
    // Apply custom CSS
    if (appState.customCss) {
        applyCustomCss();
    }
    
    // Load profile data
    loadProfileData();
    
    // Load music data
    loadMusicData();
    
    // Load card data
    loadCardData();
    
    // Load other widgets
    loadWidgets();
}

// Generate app icons
function generateApps() {
    const rightAppsGrid = document.getElementById('rightAppsGrid');
    const page2AppsGroup1 = document.getElementById('page2AppsGroup1');
    const page2AppsGroup2 = document.getElementById('page2AppsGroup2');
    const dock = document.getElementById('dock');
    
    // Clear existing apps
    rightAppsGrid.innerHTML = '';
    page2AppsGroup1.innerHTML = '';
    page2AppsGroup2.innerHTML = '';
    dock.innerHTML = '';
    
    // Generate page 1 apps (right side, 6 apps)
    const page1Apps = defaultApps.filter(app => !dockApps.includes(app.id)).slice(0, 6);
    page1Apps.forEach(app => {
        const appElement = createAppElement(app);
        rightAppsGrid.appendChild(appElement);
    });
    
    // Generate page 2 apps
    const page2Apps = defaultApps.filter(app => !dockApps.includes(app.id)).slice(6);
    
    // First group (4 apps in 2x2 grid)
    const group1Apps = page2Apps.slice(0, 4);
    group1Apps.forEach(app => {
        const appElement = createAppElement(app);
        page2AppsGroup1.appendChild(appElement);
    });
    
    // Second group (1 app)
    if (page2Apps.length > 4) {
        const appElement = createAppElement(page2Apps[4]);
        page2AppsGroup2.appendChild(appElement);
    }
    
    // Generate dock apps
    dockApps.forEach(appId => {
        const app = defaultApps.find(a => a.id === appId);
        if (app) {
            const appElement = createAppElement(app);
            dock.appendChild(appElement);
        }
    });
}

// Create app element
function createAppElement(app) {
    const appItem = document.createElement('div');
    appItem.className = 'app-item';
    appItem.onclick = () => openApp(app.id);
    
    const appIcon = document.createElement('div');
    appIcon.className = 'app-icon';
    appIcon.style.backgroundColor = app.color;
    
    // Use custom icon if available
    if (appState.customIcons[app.id]) {
        appIcon.style.backgroundImage = `url(${appState.customIcons[app.id]})`;
        appIcon.style.backgroundSize = 'cover';
        appIcon.style.backgroundPosition = 'center';
        appIcon.innerHTML = '';
    } else {
        appIcon.innerHTML = app.icon;
    }
    
    const appName = document.createElement('div');
    appName.className = 'app-name';
    appName.textContent = app.name;
    
    appItem.appendChild(appIcon);
    appItem.appendChild(appName);
    
    return appItem;
}

// Open app
function openApp(appId) {
    switch (appId) {
        case 'settings':
            openSettings();
            break;
        case 'worldbook':
            openWorldbook();
            break;
        case 'qq':
            currentChatAppId = 'qq';
            openChatApp();
            break;
        case 'oo':
            currentChatAppId = 'oo';
            openChatApp();
            break;
        default:
            showModal(`${appId} 应用暂未实现`);
            break;
    }
}

// Navigation functions
function goHome() {
    document.querySelectorAll('.app-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('homeScreen').classList.add('active');
    
    // Reset any sub-views
    resetAllViews();
}

function resetAllViews() {
    // Reset settings views
    document.querySelectorAll('.settings-page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById('settingsMain').style.display = 'block';
    document.getElementById('settingsTitle').textContent = '设置';
    document.getElementById('settingsHomeBtn').style.display = 'block';
    document.getElementById('settingsBackBtn').style.display = 'none';
    
    // Reset chat views
    document.getElementById('chatListView').style.display = 'flex';
    document.getElementById('chatDetailView').style.display = 'none';
    document.getElementById('chatSettingsView').style.display = 'none';
    document.getElementById('addContactView').style.display = 'none';
    document.getElementById('spaceView').style.display = 'none';
    document.getElementById('coupleSpaceView').style.display = 'none';
    document.getElementById('postEditorView').style.display = 'none';
    document.getElementById('visitorsView').style.display = 'none';
    document.getElementById('contactsView').style.display = 'none';
    document.getElementById('personaManagerView').style.display = 'none';
    document.getElementById('profileCardView').style.display = 'none';
    
    // Reset worldbook views
    document.getElementById('wbListView').style.display = 'flex';
    document.getElementById('wbEditorView').style.display = 'none';
}

// Page navigation
function goToPage(pageIndex) {
    const pagesWrapper = document.getElementById('pagesWrapper');
    const pageWidth = pagesWrapper.clientWidth;
    pagesWrapper.scrollTo({
        left: pageIndex * pageWidth,
        behavior: 'smooth'
    });
    
    // Update page indicators
    document.querySelectorAll('.page-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === pageIndex);
    });
    
    currentPage = pageIndex;
}

// Settings App Functions
function openSettings() {
    document.getElementById('homeScreen').classList.remove('active');
    document.getElementById('settingsApp').classList.add('active');
    loadSettingsData();
}

function loadSettingsData() {
    // Load API config
    document.getElementById('apiAddress').value = appState.apiConfig.url || '';
    document.getElementById('apiKey').value = appState.apiConfig.key || '';
    document.getElementById('currentModelDisplay').textContent = appState.apiConfig.model || '未选择';
    
    // Load secondary API config
    document.getElementById('secondaryApiAddress').value = appState.secondaryApiConfig.url || '';
    document.getElementById('secondaryApiKey').value = appState.secondaryApiConfig.key || '';
    document.getElementById('secondaryCurrentModelDisplay').textContent = appState.secondaryApiConfig.model || '未选择';
    
    // Load appearance settings
    if (appState.wallpaper) {
        document.getElementById('wallpaperPreview').style.backgroundImage = `url(${appState.wallpaper})`;
        document.getElementById('wallpaperPreview').innerHTML = '';
    }
    
    // Load global chat wallpaper
    if (appState.globalChatWallpaper) {
        document.getElementById('globalChatWallpaperPreview').style.backgroundImage = `url(${appState.globalChatWallpaper})`;
        document.getElementById('globalChatWallpaperPreview').innerHTML = '';
    }
    
    // Generate app icons list
    generateAppIconsList();
    
    // Load custom CSS
    document.getElementById('customCssInput').value = appState.customCss || '';
    document.getElementById('customQQCssInput').value = appState.customQQCss || '';
    document.getElementById('customOOCssInput').value = appState.customOOCss || '';
    
    // Update language indicators
    updateLanguageIndicators();
    
    // Update theme indicators
    updateThemeIndicators();
}

function generateAppIconsList() {
    const appIconsList = document.getElementById('appIconsList');
    appIconsList.innerHTML = '';
    
    defaultApps.forEach(app => {
        const row = document.createElement('div');
        row.className = 'app-icon-row';
        row.onclick = () => changeAppIcon(app.id);
        
        const miniIcon = document.createElement('div');
        miniIcon.className = 'mini-icon';
        miniIcon.style.backgroundColor = app.color;
        
        if (appState.customIcons[app.id]) {
            miniIcon.style.backgroundImage = `url(${appState.customIcons[app.id]})`;
            miniIcon.style.backgroundSize = 'cover';
            miniIcon.innerHTML = '';
        } else {
            miniIcon.innerHTML = app.icon;
        }
        
        const text = document.createElement('span');
        text.className = 'item-text';
        text.textContent = app.name;
        
        const arrow = document.createElement('i');
        arrow.className = 'fas fa-chevron-right arrow';
        
        row.appendChild(miniIcon);
        row.appendChild(text);
        row.appendChild(arrow);
        appIconsList.appendChild(row);
    });
}

function changeAppIcon(appId) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.customIcons[appId] = e.target.result;
                saveAppState();
                generateApps();
                generateAppIconsList();
                showModal('图标已更新');
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// Settings page navigation
function openSettingsPage(pageId) {
    document.getElementById('settingsMain').style.display = 'none';
    document.getElementById(pageId + 'Page').style.display = 'block';
    document.getElementById('settingsHomeBtn').style.display = 'none';
    document.getElementById('settingsBackBtn').style.display = 'block';
    
    const titles = {
        'apiConfig': 'API 配置',
        'appearance': '外观设置',
        'chatAppearance': 'QQ/OO 美化',
        'language': '语言',
        'font': '字体',
        'theme': '主题'
    };
    
    document.getElementById('settingsTitle').textContent = titles[pageId] || '设置';
    
    // Setup back button
    document.getElementById('settingsBackBtn').onclick = function() {
        document.getElementById(pageId + 'Page').style.display = 'none';
        document.getElementById('settingsMain').style.display = 'block';
        document.getElementById('settingsTitle').textContent = '设置';
        document.getElementById('settingsHomeBtn').style.display = 'block';
        document.getElementById('settingsBackBtn').style.display = 'none';
    };
}

// API Configuration
async function fetchModels() {
    const url = document.getElementById('apiAddress').value.trim();
    const key = document.getElementById('apiKey').value.trim();
    
    if (!url || !key) {
        showModal('请先填写 API 地址和密钥');
        return;
    }
    
    try {
        let endpoint = url;
        if (!endpoint.endsWith('/models')) {
            endpoint = endpoint.replace(/\/+$/, '') + '/models';
        }
        
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${key}`
            }
        });
        
        if (!response.ok) {
            throw new Error('API 请求失败');
        }
        
        const data = await response.json();
        const models = data.data || [];
        
        const modelSelect = document.getElementById('modelSelect');
        modelSelect.innerHTML = '';
        
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.id;
            modelSelect.appendChild(option);
        });
        
        document.getElementById('modelSelectionGroup').style.display = 'block';
        showModal('模型列表加载成功');
        
    } catch (error) {
        console.error('Failed to fetch models:', error);
        showModal('获取模型列表失败，请检查 API 配置');
    }
}

async function fetchSecondaryModels() {
    const url = document.getElementById('secondaryApiAddress').value.trim();
    const key = document.getElementById('secondaryApiKey').value.trim();
    
    if (!url || !key) {
        showModal('请先填写副 API 地址和密钥');
        return;
    }
    
    try {
        let endpoint = url;
        if (!endpoint.endsWith('/models')) {
            endpoint = endpoint.replace(/\/+$/, '') + '/models';
        }
        
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': `Bearer ${key}`
            }
        });
        
        if (!response.ok) {
            throw new Error('API 请求失败');
        }
        
        const data = await response.json();
        const models = data.data || [];
        
        const modelSelect = document.getElementById('secondaryModelSelect');
        modelSelect.innerHTML = '';
        
        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.id;
            modelSelect.appendChild(option);
        });
        
        document.getElementById('secondaryModelSelectionGroup').style.display = 'block';
        showModal('副 API 模型列表加载成功');
        
    } catch (error) {
        console.error('Failed to fetch secondary models:', error);
        showModal('获取副 API 模型列表失败，请检查配置');
    }
}

function saveApiConfig() {
    const url = document.getElementById('apiAddress').value.trim();
    const key = document.getElementById('apiKey').value.trim();
    const model = document.getElementById('modelSelect').value;
    
    if (!url || !key || !model) {
        showModal('请完整填写所有配置项');
        return;
    }
    
    appState.apiConfig = { url, key, model };
    saveAppState();
    document.getElementById('currentModelDisplay').textContent = model;
    showModal('主 API 配置已保存');
}

function saveSecondaryApiConfig() {
    const url = document.getElementById('secondaryApiAddress').value.trim();
    const key = document.getElementById('secondaryApiKey').value.trim();
    const model = document.getElementById('secondaryModelSelect').value;
    
    if (!url || !key || !model) {
        showModal('请完整填写所有副 API 配置项');
        return;
    }
    
    appState.secondaryApiConfig = { url, key, model };
    saveAppState();
    document.getElementById('secondaryCurrentModelDisplay').textContent = model;
    showModal('副 API 配置已保存');
}

// Theme and Appearance Functions
function setTheme(themeName) {
    appState.theme = themeName;
    saveAppState();
    applyTheme();
    updateThemeIndicators();
    showModal(`已切换到${themeName === 'default' ? '默认' : '小兔'}主题`);
}

function applyTheme() {
    document.body.classList.remove('bunny-theme');
    
    if (appState.theme === 'bunny') {
        document.body.classList.add('bunny-theme');
        // Show bunny ears on widgets
        document.querySelectorAll('.days-matter-widget, .image-widget').forEach(widget => {
            widget.style.setProperty('--show-ears', 'block');
        });
    }
}

function updateThemeIndicators() {
    document.querySelectorAll('.check-icon[id^="theme-"]').forEach(icon => {
        icon.style.display = 'none';
    });
    
    const activeIcon = document.getElementById(`theme-${appState.theme}`);
    if (activeIcon) {
        activeIcon.style.display = 'inline';
    }
}

function applyCustomCss() {
    let existingStyle = document.getElementById('customStyle');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    if (appState.customCss) {
        const style = document.createElement('style');
        style.id = 'customStyle';
        style.textContent = appState.customCss;
        document.head.appendChild(style);
    }
    
    saveAppState();
    showModal('自定义主题已应用');
}

function resetCustomTheme() {
    appState.customCss = '';
    document.getElementById('customCssInput').value = '';
    
    const existingStyle = document.getElementById('customStyle');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    saveAppState();
    showModal('已恢复默认主题');
}

// Language Functions
function setLanguage(lang) {
    appState.language = lang;
    saveAppState();
    updateLanguageIndicators();
    updateLanguage();
    showModal('语言设置已更新');
}

function updateLanguageIndicators() {
    document.querySelectorAll('.check-icon[id^="lang-"]').forEach(icon => {
        icon.style.display = 'none';
    });
    
    const activeIcon = document.getElementById(`lang-${appState.language}`);
    if (activeIcon) {
        activeIcon.style.display = 'inline';
    }
}

function updateLanguage() {
    // This would implement actual language switching
    // For now, just update the display
    console.log('Language updated to:', appState.language);
}

// Font Functions
function setFontOffset(offset) {
    appState.fontOffset = offset;
    document.documentElement.style.setProperty('--font-offset', offset + 'px');
    document.getElementById('fontSlider').value = offset;
    saveAppState();
}

// Toggle Functions
function toggleDarkMode() {
    appState.darkMode = !appState.darkMode;
    document.body.classList.toggle('dark-mode', appState.darkMode);
    saveAppState();
}

function toggleFullScreen() {
    appState.fullScreen = !appState.fullScreen;
    document.body.classList.toggle('fullscreen-mode', appState.fullScreen);
    saveAppState();
}

// File Upload Functions
function setupFileInputs() {
    // Avatar upload
    document.getElementById('avatarInput').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.userAvatar = e.target.result;
                document.getElementById('userAvatar').src = e.target.result;
                saveAppState();
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Wallpaper upload
    document.getElementById('wallpaperInput').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.wallpaper = e.target.result;
                document.querySelector('.screen').style.backgroundImage = `url(${e.target.result})`;
                document.getElementById('wallpaperPreview').style.backgroundImage = `url(${e.target.result})`;
                document.getElementById('wallpaperPreview').innerHTML = '';
                saveAppState();
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Global chat wallpaper upload
    document.getElementById('globalChatWallpaperInput').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.globalChatWallpaper = e.target.result;
                document.getElementById('globalChatWallpaperPreview').style.backgroundImage = `url(${e.target.result})`;
                document.getElementById('globalChatWallpaperPreview').innerHTML = '';
                saveAppState();
                showModal('全局聊天壁纸已设置');
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Card background upload
    document.getElementById('cardBgInput').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.cardData.bg = e.target.result;
                document.getElementById('cardBgDisplay').style.backgroundImage = `url(${e.target.result})`;
                saveAppState();
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Card avatar upload
    document.getElementById('cardAvatarInput').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.cardData.avatar = e.target.result;
                document.getElementById('cardAvatarImg').src = e.target.result;
                saveAppState();
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Music cover upload
    document.getElementById('musicCoverInput').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.musicData.cover = e.target.result;
                document.getElementById('musicCoverDisplay').src = e.target.result;
                saveAppState();
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Image widget upload
    document.getElementById('imageWidgetInput').onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.imageWidget = e.target.result;
                document.getElementById('imageWidgetDisplay').style.backgroundImage = `url(${e.target.result})`;
                saveAppState();
            };
            reader.readAsDataURL(file);
        }
    };
}

// Chat App Functions
function openChatApp() {
    document.getElementById('homeScreen').classList.remove('active');
    document.getElementById('chatApp').classList.add('active');
    
    // Update title based on current app
    document.getElementById('chatAppTitle').textContent = currentChatAppId === 'qq' ? 'QQ' : 'OO';
    
    // Load contacts for current app
    loadChatContacts();
    
    // Show bottom navigation
    document.getElementById('bottomNavBar').style.display = 'flex';
    
    // Set default view to messages
    switchToMessages();
}

function loadChatContacts() {
    const slot = currentChatAppId === 'qq' ? appState.slotA : appState.slotB;
    const chatListContent = document.getElementById('chatListContent');
    
    chatListContent.innerHTML = '';
    
    if (!slot.contacts || slot.contacts.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-user-plus"></i>
            <div class="empty-state-text">暂无联系人</div>
            <div class="empty-state-subtext">点击右上角添加朋友</div>
        `;
        chatListContent.appendChild(emptyState);
        return;
    }
    
    slot.contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'settings-item';
        contactItem.onclick = () => openChat(contact);
        
        const avatar = document.createElement('img');
        avatar.src = contact.avatar || 'https://via.placeholder.com/150';
        avatar.style.width = '40px';
        avatar.style.height = '40px';
        avatar.style.borderRadius = '50%';
        avatar.style.marginRight = '12px';
        avatar.style.objectFit = 'cover';
        
        const info = document.createElement('div');
        info.style.flexGrow = '1';
        
        const name = document.createElement('div');
        name.textContent = contact.displayName || contact.name;
        name.style.fontWeight = '500';
        name.style.marginBottom = '2px';
        
        const lastMessage = document.createElement('div');
        lastMessage.textContent = contact.lastMessage || '暂无消息';
        lastMessage.style.fontSize = '12px';
        lastMessage.style.color = 'var(--sub-text-color)';
        
        info.appendChild(name);
        info.appendChild(lastMessage);
        
        const time = document.createElement('div');
        time.textContent = contact.lastTime || '';
        time.style.fontSize = '10px';
        time.style.color = 'var(--sub-text-color)';
        
        contactItem.appendChild(avatar);
        contactItem.appendChild(info);
        contactItem.appendChild(time);
        
        chatListContent.appendChild(contactItem);
    });
}

function openChat(contact) {
    appState.currentChatTarget = contact;
    document.getElementById('chatListView').style.display = 'none';
    document.getElementById('chatDetailView').style.display = 'flex';
    document.getElementById('bottomNavBar').style.display = 'none';
    
    document.getElementById('chatTargetName').textContent = contact.displayName || contact.name;
    
    // Load chat history
    loadChatHistory(contact);
    
    // Apply chat wallpaper
    applyChatWallpaper(contact);
}

function loadChatHistory(contact) {
    const slot = currentChatAppId === 'qq' ? appState.slotA : appState.slotB;
    const messagesArea = document.getElementById('chatMessagesArea');
    
    messagesArea.innerHTML = '';
    
    const chatKey = `${currentChatAppId}_${contact.name}`;
    const history = slot.chatHistory[chatKey] || [];
    
    history.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesArea.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-bubble ${message.sender === 'user' ? 'sent' : 'received'}`;
    messageDiv.textContent = message.content;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'chat-time';
    timeSpan.textContent = new Date(message.timestamp).toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    messageDiv.appendChild(timeSpan);
    
    return messageDiv;
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const content = input.value.trim();
    
    if (!content || !appState.currentChatTarget) return;
    
    const message = {
        sender: 'user',
        content: content,
        timestamp: Date.now()
    };
    
    // Add to chat history
    const slot = currentChatAppId === 'qq' ? appState.slotA : appState.slotB;
    const chatKey = `${currentChatAppId}_${appState.currentChatTarget.name}`;
    
    if (!slot.chatHistory[chatKey]) {
        slot.chatHistory[chatKey] = [];
    }
    
    slot.chatHistory[chatKey].push(message);
    
    // Update contact's last message
    const contact = slot.contacts.find(c => c.name === appState.currentChatTarget.name);
    if (contact) {
        contact.lastMessage = content;
        contact.lastTime = new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Add message to UI
    const messageElement = createMessageElement(message);
    document.getElementById('chatMessagesArea').appendChild(messageElement);
    
    // Clear input
    input.value = '';
    
    // Scroll to bottom
    const messagesArea = document.getElementById('chatMessagesArea');
    messagesArea.scrollTop = messagesArea.scrollHeight;
    
    saveAppState();
}

function closeChat() {
    document.getElementById('chatDetailView').style.display = 'none';
    document.getElementById('chatListView').style.display = 'flex';
    document.getElementById('bottomNavBar').style.display = 'flex';
    appState.currentChatTarget = null;
}

// Add Contact Functions
function openAddContact() {
    document.getElementById('addContactView').style.display = 'flex';
    
    // Load worldbook options
    const worldbookSelect = document.getElementById('contactWorldbookSelect');
    worldbookSelect.innerHTML = '<option value="">无关联</option>';
    
    appState.worldbook.forEach(wb => {
        const option = document.createElement('option');
        option.value = wb.id;
        option.textContent = wb.title;
        worldbookSelect.appendChild(option);
    });
}

function closeAddContact() {
    document.getElementById('addContactView').style.display = 'none';
    
    // Clear form
    document.getElementById('contactNameInput').value = '';
    document.getElementById('contactDisplayNameInput').value = '';
    document.getElementById('contactRemarkInput').value = '';
    document.getElementById('contactPromptInput').value = '';
    document.getElementById('contactWorldbookSelect').value = '';
    document.getElementById('contactAvatarPreview').src = 'https://via.placeholder.com/150';
}

function saveContact() {
    const name = document.getElementById('contactNameInput').value.trim();
    const displayName = document.getElementById('contactDisplayNameInput').value.trim();
    const remark = document.getElementById('contactRemarkInput').value.trim();
    const prompt = document.getElementById('contactPromptInput').value.trim();
    const worldbookId = document.getElementById('contactWorldbookSelect').value;
    const avatar = document.getElementById('contactAvatarPreview').src;
    
    if (!name) {
        showModal('请输入角色名字');
        return;
    }
    
    const contact = {
        name: name,
        displayName: displayName || name,
        remark: remark,
        prompt: prompt,
        worldbookId: worldbookId,
        avatar: avatar,
        lastMessage: '',
        lastTime: ''
    };
    
    const slot = currentChatAppId === 'qq' ? appState.slotA : appState.slotB;
    if (!slot.contacts) {
        slot.contacts = [];
    }
    
    slot.contacts.push(contact);
    saveAppState();
    
    closeAddContact();
    loadChatContacts();
    showModal('联系人已添加');
}

// Contact avatar upload
document.getElementById('contactAvatarInput').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('contactAvatarPreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

// Bottom Navigation Functions
function switchToMessages() {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.bottom-nav-btn[onclick="switchToMessages()"]').classList.add('active');
    
    document.getElementById('chatListView').style.display = 'flex';
    document.getElementById('contactsView').style.display = 'none';
    document.getElementById('profileCardView').style.display = 'none';
    
    loadChatContacts();
}

function switchToContacts() {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.bottom-nav-btn[onclick="switchToContacts()"]').classList.add('active');
    
    document.getElementById('chatListView').style.display = 'none';
    document.getElementById('contactsView').style.display = 'flex';
    document.getElementById('profileCardView').style.display = 'none';
    
    loadContactsList();
}

function switchToProfile() {
    document.querySelectorAll('.bottom-nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.bottom-nav-btn[onclick="switchToProfile()"]').classList.add('active');
    
    document.getElementById('chatListView').style.display = 'none';
    document.getElementById('contactsView').style.display = 'none';
    document.getElementById('profileCardView').style.display = 'flex';
    
    loadProfileCard();
}

function loadContactsList() {
    const slot = currentChatAppId === 'qq' ? appState.slotA : appState.slotB;
    const contactsContent = document.getElementById('contactsContent');
    
    contactsContent.innerHTML = '';
    
    if (!slot.contacts || slot.contacts.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-address-book"></i>
            <div class="empty-state-text">暂无联系人</div>
            <div class="empty-state-subtext">点击右上角添加朋友</div>
        `;
        contactsContent.appendChild(emptyState);
        return;
    }
    
    slot.contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.className = 'settings-item';
        contactItem.onclick = () => openChat(contact);
        
        const avatar = document.createElement('img');
        avatar.src = contact.avatar || 'https://via.placeholder.com/150';
        avatar.style.width = '40px';
        avatar.style.height = '40px';
        avatar.style.borderRadius = '50%';
        avatar.style.marginRight = '12px';
        avatar.style.objectFit = 'cover';
        
        const info = document.createElement('div');
        info.style.flexGrow = '1';
        
        const name = document.createElement('div');
        name.textContent = contact.displayName || contact.name;
        name.style.fontWeight = '500';
        name.style.marginBottom = '2px';
        
        const remark = document.createElement('div');
        remark.textContent = contact.remark || '无备注';
        remark.style.fontSize = '12px';
        remark.style.color = 'var(--sub-text-color)';
        
        info.appendChild(name);
        info.appendChild(remark);
        
        contactItem.appendChild(avatar);
        contactItem.appendChild(info);
        
        contactsContent.appendChild(contactItem);
    });
}

// Worldbook Functions
function openWorldbook() {
    document.getElementById('homeScreen').classList.remove('active');
    document.getElementById('worldbookApp').classList.add('active');
    loadWorldbookList();
}

function loadWorldbookList() {
    const wbListContent = document.getElementById('wbListContent');
    
    if (!appState.worldbook || appState.worldbook.length === 0) {
        wbListContent.innerHTML = '<div class="settings-header-text" style="text-align: center; margin-top: 50px;">暂无条目，点击右上角添加</div>';
        return;
    }
    
    wbListContent.innerHTML = '';
    
    appState.worldbook.forEach(wb => {
        const wbItem = document.createElement('div');
        wbItem.className = 'settings-item';
        wbItem.onclick = () => editWbEntry(wb);
        
        const info = document.createElement('div');
        info.style.flexGrow = '1';
        
        const title = document.createElement('div');
        title.textContent = wb.title;
        title.style.fontWeight = '500';
        title.style.marginBottom = '2px';
        
        const type = document.createElement('div');
        type.textContent = wb.type === 'global' ? '全局' : `专属: ${wb.target}`;
        type.style.fontSize = '12px';
        type.style.color = 'var(--sub-text-color)';
        
        info.appendChild(title);
        info.appendChild(type);
        
        const arrow = document.createElement('i');
        arrow.className = 'fas fa-chevron-right arrow';
        
        wbItem.appendChild(info);
        wbItem.appendChild(arrow);
        
        wbListContent.appendChild(wbItem);
    });
}

function openWbEditor(wb = null) {
    document.getElementById('wbListView').style.display = 'none';
    document.getElementById('wbEditorView').style.display = 'flex';
    
    if (wb) {
        // Edit mode
        document.getElementById('wbTitleInput').value = wb.title;
        document.getElementById('wbTypeInput').value = wb.type;
        document.getElementById('wbContentInput').value = wb.content;
        document.getElementById('wbDeleteGroup').style.display = 'block';
        
        if (wb.type === 'personal') {
            document.getElementById('wbTargetGroup').style.display = 'block';
            document.getElementById('wbTargetSelect').value = wb.target;
        }
        
        // Store current editing wb
        window.currentEditingWb = wb;
    } else {
        // New mode
        document.getElementById('wbTitleInput').value = '';
        document.getElementById('wbTypeInput').value = 'global';
        document.getElementById('wbContentInput').value = '';
        document.getElementById('wbDeleteGroup').style.display = 'none';
        document.getElementById('wbTargetGroup').style.display = 'none';
        
        window.currentEditingWb = null;
    }
    
    // Load target options
    loadWbTargetOptions();
}

function loadWbTargetOptions() {
    const targetSelect = document.getElementById('wbTargetSelect');
    targetSelect.innerHTML = '';
    
    // Add contacts from both slots
    const allContacts = [...(appState.slotA.contacts || []), ...(appState.slotB.contacts || [])];
    
    allContacts.forEach(contact => {
        const option = document.createElement('option');
        option.value = contact.name;
        option.textContent = contact.name;
        targetSelect.appendChild(option);
    });
}

function editWbEntry(wb) {
    openWbEditor(wb);
}

function closeWbEditor() {
    document.getElementById('wbEditorView').style.display = 'none';
    document.getElementById('wbListView').style.display = 'flex';
    window.currentEditingWb = null;
}

function saveWbEntry() {
    const title = document.getElementById('wbTitleInput').value.trim();
    const type = document.getElementById('wbTypeInput').value;
    const content = document.getElementById('wbContentInput').value.trim();
    const target = document.getElementById('wbTargetSelect').value;
    
    if (!title || !content) {
        showModal('请填写标题和内容');
        return;
    }
    
    if (type === 'personal' && !target) {
        showModal('请选择绑定角色');
        return;
    }
    
    const wbEntry = {
        id: window.currentEditingWb ? window.currentEditingWb.id : Date.now().toString(),
        title: title,
        type: type,
        target: type === 'personal' ? target : null,
        content: content,
        createdAt: window.currentEditingWb ? window.currentEditingWb.createdAt : Date.now(),
        updatedAt: Date.now()
    };
    
    if (!appState.worldbook) {
        appState.worldbook = [];
    }
    
    if (window.currentEditingWb) {
        // Update existing
        const index = appState.worldbook.findIndex(wb => wb.id === window.currentEditingWb.id);
        if (index !== -1) {
            appState.worldbook[index] = wbEntry;
        }
    } else {
        // Add new
        appState.worldbook.push(wbEntry);
    }
    
    saveAppState();
    closeWbEditor();
    loadWorldbookList();
    showModal('条目已保存');
}

function deleteWbEntry() {
    if (!window.currentEditingWb) return;
    
    if (confirm('确定要删除这个条目吗？')) {
        appState.worldbook = appState.worldbook.filter(wb => wb.id !== window.currentEditingWb.id);
        saveAppState();
        closeWbEditor();
        loadWorldbookList();
        showModal('条目已删除');
    }
}

// Handle worldbook type change
document.getElementById('wbTypeInput').onchange = function() {
    const targetGroup = document.getElementById('wbTargetGroup');
    if (this.value === 'personal') {
        targetGroup.style.display = 'block';
        loadWbTargetOptions();
    } else {
        targetGroup.style.display = 'none';
    }
};

// Utility Functions
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

function showModal(message) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('customModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('customModal').style.display = 'none';
}

// Data Management Functions
function optimizeStorage() {
    const btn = document.getElementById('optimizeBtn');
    const originalText = btn.textContent;
    
    btn.textContent = '优化中...';
    btn.style.color = '#8e8e93';
    
    setTimeout(() => {
        // Simulate optimization
        const sizeBefore = JSON.stringify(appState).length;
        
        // Clean up old data
        if (appState.slotA.chatHistory) {
            Object.keys(appState.slotA.chatHistory).forEach(key => {
                if (appState.slotA.chatHistory[key].length > 100) {
                    appState.slotA.chatHistory[key] = appState.slotA.chatHistory[key].slice(-50);
                }
            });
        }
        
        if (appState.slotB.chatHistory) {
            Object.keys(appState.slotB.chatHistory).forEach(key => {
                if (appState.slotB.chatHistory[key].length > 100) {
                    appState.slotB.chatHistory[key] = appState.slotB.chatHistory[key].slice(-50);
                }
            });
        }
        
        const sizeAfter = JSON.stringify(appState).length;
        const saved = sizeBefore - sizeAfter;
        
        saveAppState();
        
        btn.textContent = originalText;
        btn.style.color = 'var(--blue)';
        
        showModal(`优化完成！节省了 ${Math.max(0, saved)} 字节空间`);
    }, 2000);
}

function exportData() {
    try {
        const dataStr = JSON.stringify(appState, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `iphone_sim_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showModal('数据导出成功');
    } catch (error) {
        showModal('导出失败：' + error.message);
    }
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    appState = { ...appState, ...importedData };
                    saveAppState();
                    location.reload(); // Reload to apply all changes
                } catch (error) {
                    showModal('导入失败：文件格式错误');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function resetAllData() {
    if (confirm('确定要恢复出厂设置吗？这将清除所有数据！')) {
        localStorage.removeItem('iphoneSimState');
        location.reload();
    }
}

// Profile and Widget Functions
function loadProfileData() {
    if (appState.profileData.bg) {
        document.getElementById('profileCardBg').style.backgroundImage = `url(${appState.profileData.bg})`;
    }
    
    if (appState.profileData.avatar) {
        document.getElementById('profileCardAvatarImg').src = appState.profileData.avatar;
    }
    
    document.getElementById('profileCardName').textContent = appState.profileData.name;
    document.getElementById('profileCardId').textContent = `QQ号: ${appState.profileData.id}`;
    document.getElementById('profileCardSign').textContent = appState.profileData.sign;
    document.getElementById('visitorCount').textContent = appState.profileData.visitorCount;
    
    // Load polaroids
    appState.profileData.polaroids.forEach((src, index) => {
        const img = document.getElementById(`profilePolaroid${index + 1}Img`);
        if (img) {
            img.src = src;
        }
    });
}

function loadMusicData() {
    document.getElementById('musicTitleDisplay').textContent = appState.musicData.title;
    document.getElementById('musicArtistDisplay').textContent = appState.musicData.artist;
    document.getElementById('musicCoverDisplay').src = appState.musicData.cover;
}

function loadCardData() {
    document.getElementById('cardName').textContent = appState.cardData.name;
    document.getElementById('cardSign').textContent = appState.cardData.sign;
    document.getElementById('cardAvatarImg').src = appState.cardData.avatar;
    
    if (appState.cardData.bg) {
        document.getElementById('cardBgDisplay').style.backgroundImage = `url(${appState.cardData.bg})`;
    }
}

function loadWidgets() {
    if (appState.imageWidget) {
        document.getElementById('imageWidgetDisplay').style.backgroundImage = `url(${appState.imageWidget})`;
    }
    
    if (appState.dmData.bg) {
        document.querySelector('.dm-content').style.backgroundImage = `url(${appState.dmData.bg})`;
    }
    
    document.querySelector('.dm-title').textContent = appState.dmData.title;
    document.querySelector('.dm-days').textContent = appState.dmData.days;
}

// Chat wallpaper functions
function applyChatWallpaper(contact) {
    const messagesArea = document.getElementById('chatMessagesArea');
    const chatKey = `${currentChatAppId}_${contact.name}`;
    
    // Check for specific chat wallpaper first
    if (appState.chatWallpapers[chatKey]) {
        messagesArea.style.backgroundImage = `url(${appState.chatWallpapers[chatKey]})`;
    } else if (appState.globalChatWallpaper) {
        // Use global chat wallpaper
        messagesArea.style.backgroundImage = `url(${appState.globalChatWallpaper})`;
    } else {
        messagesArea.style.backgroundImage = '';
    }
}

function resetGlobalChatWallpaper() {
    appState.globalChatWallpaper = '';
    document.getElementById('globalChatWallpaperPreview').style.backgroundImage = '';
    document.getElementById('globalChatWallpaperPreview').innerHTML = '点击更换全局聊天背景';
    saveAppState();
    showModal('全局聊天壁纸已清除');
}

// Chat CSS functions
function saveChatCss(type) {
    const cssInput = type === 'qq' ? document.getElementById('customQCssInput') : document.getElementById('customOOCssInput');
    const css = cssInput.value;
    
    if (type === 'qq') {
        appState.customQQCss = css;
    } else {
        appState.customOOCss = css;
    }
    
    applyChatCss();
    saveAppState();
    showModal(`${type.toUpperCase()} 气泡样式已保存`);
}

function resetChatCss(type) {
    if (type === 'qq') {
        appState.customQQCss = '';
        document.getElementById('customQQCssInput').value = '';
    } else {
        appState.customOOCss = '';
        document.getElementById('customOOCssInput').value = '';
    }
    
    applyChatCss();
    saveAppState();
    showModal(`${type.toUpperCase()} 气泡样式已重置`);
}

function applyChatCss() {
    // Remove existing chat styles
    const existingQQStyle = document.getElementById('customQQChatStyle');
    const existingOOStyle = document.getElementById('customOOChatStyle');
    
    if (existingQQStyle) existingQQStyle.remove();
    if (existingOOStyle) existingOOStyle.remove();
    
    // Apply QQ styles
    if (appState.customQQCss) {
        const qqStyle = document.createElement('style');
        qqStyle.id = 'customQQChatStyle';
        qqStyle.textContent = `#chatApp[data-app="qq"] { ${appState.customQQCss} }`;
        document.head.appendChild(qqStyle);
    }
    
    // Apply OO styles
    if (appState.customOOCss) {
        const ooStyle = document.createElement('style');
        ooStyle.id = 'customOOChatStyle';
        ooStyle.textContent = `#chatApp[data-app="oo"] { ${appState.customOOCss} }`;
        document.head.appendChild(ooStyle);
    }
}

// AI Reply function (placeholder)
async function triggerAIReply() {
    if (!appState.currentChatTarget) return;
    
    const apiConfig = currentChatAppId === 'qq' ? appState.apiConfig : appState.secondaryApiConfig;
    
    if (!apiConfig.url || !apiConfig.key || !apiConfig.model) {
        showModal('请先配置 API');
        return;
    }
    
    try {
        // This would implement actual AI chat functionality
        showModal('AI 回复功能需要完整的 API 实现');
    } catch (error) {
        showModal('AI 回复失败：' + error.message);
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // API configuration buttons
    document.getElementById('fetchModelsBtn').onclick = fetchModels;
    document.getElementById('fetchSecondaryModelsBtn').onclick = fetchSecondaryModels;
    document.getElementById('saveApiBtn').onclick = saveApiConfig;
    document.getElementById('saveSecondaryApiBtn').onclick = saveSecondaryApiConfig;
    
    // Toggle switches
    document.getElementById('darkModeToggle').onchange = toggleDarkMode;
    document.getElementById('fullScreenToggle').onchange = toggleFullScreen;
    
    // Font slider
    document.getElementById('fontSlider').oninput = function() {
        setFontOffset(parseInt(this.value));
    };
    
    // Custom CSS buttons
    document.getElementById('customCssInput').oninput = function() {
        appState.customCss = this.value;
    };
    
    // User name input
    document.getElementById('userNameInput').oninput = function() {
        appState.userName = this.value;
        saveAppState();
    };
    
    // Chat input
    document.getElementById('chatInput').onkeypress = function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    };
    
    // Setup file inputs
    setupFileInputs();
    
    // Pages wrapper scroll handling
    const pagesWrapper = document.getElementById('pagesWrapper');
    if (pagesWrapper) {
        pagesWrapper.onscroll = function() {
            const pageWidth = this.clientWidth;
            const scrollLeft = this.scrollLeft;
            const newPage = Math.round(scrollLeft / pageWidth);
            
            if (newPage !== currentPage) {
                currentPage = newPage;
                document.querySelectorAll('.page-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentPage);
                });
            }
        };
    }
}

// Space Functions (placeholder implementations)
function openSpace() {
    document.getElementById('spaceView').style.display = 'flex';
    document.getElementById('chatListView').style.display = 'none';
    document.getElementById('contactsView').style.display = 'none';
    document.getElementById('profileCardView').style.display = 'none';
    document.getElementById('bottomNavBar').style.display = 'none';
    loadSpaceContent();
}

function closeSpace() {
    document.getElementById('spaceView').style.display = 'none';
    document.getElementById('chatListView').style.display = 'flex';
    document.getElementById('bottomNavBar').style.display = 'flex';
}

function loadSpaceContent() {
    // Load space posts and content
    const spaceContent = document.getElementById('spaceContent');
    spaceContent.innerHTML = '';
    
    if (!appState.spacePosts || appState.spacePosts.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-heart"></i>
            <div class="empty-state-text">还没有动态</div>
            <div class="empty-state-subtext">点击右上角发表第一条动态</div>
        `;
        spaceContent.appendChild(emptyState);
        return;
    }
    
    // Load space posts
    appState.spacePosts.forEach(post => {
        const postElement = createSpacePostElement(post);
        spaceContent.appendChild(postElement);
    });
}

function createSpacePostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'space-post';
    
    postDiv.innerHTML = `
        <div class="space-post-header">
            <img src="${post.avatar || appState.userAvatar}" class="space-post-avatar" alt="Avatar">
            <div class="space-post-info">
                <div class="space-post-name">${post.author || appState.userName}</div>
                <div class="space-post-time">${new Date(post.timestamp).toLocaleString('zh-CN')}</div>
            </div>
        </div>
        <div class="space-post-content">${post.content}</div>
        ${post.image ? `<img src="${post.image}" class="space-post-image" alt="Post image">` : ''}
        <div class="space-post-actions">
            <div class="space-post-action">
                <i class="fas fa-heart"></i>
                <span>赞</span>
            </div>
            <div class="space-post-action">
                <i class="fas fa-comment"></i>
                <span>评论</span>
            </div>
            <div class="space-post-action">
                <i class="fas fa-share"></i>
                <span>转发</span>
            </div>
        </div>
    `;
    
    return postDiv;
}

function openPostEditor() {
    document.getElementById('postEditorView').style.display = 'flex';
}

function closePostEditor() {
    document.getElementById('postEditorView').style.display = 'none';
    
    // Clear form
    document.getElementById('postContentInput').value = '';
    document.getElementById('postImagePreview').style.display = 'none';
}

function savePost() {
    const content = document.getElementById('postContentInput').value.trim();
    const imageDisplay = document.getElementById('postImageDisplay');
    const image = imageDisplay.src !== window.location.href ? imageDisplay.src : null;
    
    if (!content) {
        showModal('请输入动态内容');
        return;
    }
    
    const post = {
        id: Date.now().toString(),
        content: content,
        image: image,
        author: appState.userName,
        avatar: appState.userAvatar,
        timestamp: Date.now(),
        likes: 0,
        comments: []
    };
    
    if (!appState.spacePosts) {
        appState.spacePosts = [];
    }
    
    appState.spacePosts.unshift(post);
    saveAppState();
    
    closePostEditor();
    loadSpaceContent();
    showModal('动态发表成功');
}

// Post image upload
document.getElementById('postImageInput').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('postImageDisplay').src = e.target.result;
            document.getElementById('postImagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
};

// Profile Card Functions
function loadProfileCard() {
    // Load profile card data
    if (appState.profileData.bg) {
        document.getElementById('profileCardBg').style.backgroundImage = `url(${appState.profileData.bg})`;
    }
    
    document.getElementById('profileCardAvatarImg').src = appState.profileData.avatar;
    document.getElementById('profileCardName').textContent = appState.profileData.name;
    document.getElementById('profileCardId').textContent = `QQ号: ${appState.profileData.id}`;
    document.getElementById('profileCardSign').textContent = appState.profileData.sign;
    document.getElementById('visitorCount').textContent = appState.profileData.visitorCount;
    
    // Load recent post
    if (appState.spacePosts && appState.spacePosts.length > 0) {
        const recentPost = appState.spacePosts[0];
        document.getElementById('profileRecentPostText').textContent = recentPost.content;
        if (recentPost.image) {
            document.getElementById('profileRecentPostImg').src = recentPost.image;
            document.getElementById('profileRecentPostImg').style.display = 'block';
        }
    }
}

function closeProfileCard() {
    document.getElementById('profileCardView').style.display = 'none';
    document.getElementById('chatListView').style.display = 'flex';
    document.getElementById('bottomNavBar').style.display = 'flex';
}

// Visitors Functions
function openVisitors() {
    document.getElementById('visitorsView').style.display = 'flex';
    loadVisitors();
}

function closeVisitors() {
    document.getElementById('visitorsView').style.display = 'none';
}

function loadVisitors() {
    const visitorsList = document.getElementById('visitorsList');
    visitorsList.innerHTML = '';
    
    if (!appState.visitors || appState.visitors.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <i class="fas fa-eye"></i>
            <div class="empty-state-text">暂无访客</div>
            <div class="empty-state-subtext">还没有人来访问过</div>
        `;
        visitorsList.appendChild(emptyState);
        return;
    }
    
    appState.visitors.forEach(visitor => {
        const visitorItem = document.createElement('div');
        visitorItem.className = 'visitor-item';
        
        visitorItem.innerHTML = `
            <img src="${visitor.avatar}" class="visitor-avatar" alt="Avatar">
            <div class="visitor-info">
                <div class="visitor-name">${visitor.name}</div>
                <div class="visitor-type">${visitor.content}</div>
            </div>
            <div class="visitor-time">${new Date(visitor.time).toLocaleString('zh-CN')}</div>
        `;
        
        visitorsList.appendChild(visitorItem);
    });
}

function refreshVisitors() {
    // Generate some random visitors for demo
    const demoVisitors = [
        { name: '小明', avatar: 'https://via.placeholder.com/150?text=小明', content: '踩了一脚', time: Date.now() - 300000 },
        { name: '小红', avatar: 'https://via.placeholder.com/150?text=小红', content: '来看看你', time: Date.now() - 600000 },
        { name: '小李', avatar: 'https://via.placeholder.com/150?text=小李', content: '偷看', time: Date.now() - 900000 }
    ];
    
    appState.visitors = demoVisitors;
    appState.profileData.visitorCount = demoVisitors.length;
    saveAppState();
    loadVisitors();
    showModal('访客列表已刷新');
}

// Additional placeholder functions for missing features
function openChatSettings() {
    document.getElementById('chatSettingsView').style.display = 'flex';
    document.getElementById('chatDetailView').style.display = 'none';
}

function closeChatSettings() {
    document.getElementById('chatSettingsView').style.display = 'none';
    document.getElementById('chatDetailView').style.display = 'flex';
}

function openEditPersona() {
    showModal('人设编辑功能开发中');
}

function clearChatHistory() {
    if (!appState.currentChatTarget) return;
    
    if (confirm('确定要删除聊天记录吗？')) {
        const slot = currentChatAppId === 'qq' ? appState.slotA : appState.slotB;
        const chatKey = `${currentChatAppId}_${appState.currentChatTarget.name}`;
        
        if (slot.chatHistory[chatKey]) {
            delete slot.chatHistory[chatKey];
            saveAppState();
            loadChatHistory(appState.currentChatTarget);
            showModal('聊天记录已删除');
        }
    }
}

function openFriendsManager() {
    showModal('朋友档案管理功能开发中');
}

function openCoupleSpace() {
    showModal('情侣空间功能开发中');
}

function openCouplePostEditor() {
    showModal('情侣空间发表功能开发中');
}

function closeCoupleSpace() {
    document.getElementById('coupleSpaceView').style.display = 'none';
    document.getElementById('spaceView').style.display = 'flex';
}

// Chat wallpaper upload
document.getElementById('chatWallpaperInput').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (appState.currentChatTarget) {
                const chatKey = `${currentChatAppId}_${appState.currentChatTarget.name}`;
                appState.chatWallpapers[chatKey] = e.target.result;
                document.getElementById('chatWallpaperPreview').style.backgroundImage = `url(${e.target.result})`;
                document.getElementById('chatWallpaperPreview').innerHTML = '';
                applyChatWallpaper(appState.currentChatTarget);
                saveAppState();
                showModal('聊天背景已设置');
            }
        };
        reader.readAsDataURL(file);
    }
};

// Space cover upload
document.getElementById('spaceCoverInput').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appState.spaceCover = e.target.result;
            document.getElementById('spaceCover').style.backgroundImage = `url(${e.target.result})`;
            saveAppState();
        };
        reader.readAsDataURL(file);
    }
};

// Profile card uploads
document.getElementById('profileCardBgInput').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appState.profileData.bg = e.target.result;
            document.getElementById('profileCardBg').style.backgroundImage = `url(${e.target.result})`;
            saveAppState();
        };
        reader.readAsDataURL(file);
    }
};

document.getElementById('profileCardAvatarInput').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appState.profileData.avatar = e.target.result;
            document.getElementById('profileCardAvatarImg').src = e.target.result;
            saveAppState();
        };
        reader.readAsDataURL(file);
    }
};

// Profile polaroid uploads
for (let i = 1; i <= 4; i++) {
    document.getElementById(`profilePolaroid${i}Input`).onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                appState.profileData.polaroids[i - 1] = e.target.result;
                document.getElementById(`profilePolaroid${i}Img`).src = e.target.result;
                saveAppState();
            };
            reader.readAsDataURL(file);
        }
    };
}

// Persona avatar upload
document.getElementById('personaAvatarInput').onchange = function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appState.currentPersona.avatar = e.target.result;
            document.getElementById('personaManagerAvatar').src = e.target.result;
            saveAppState();
        };
        reader.readAsDataURL(file);
    }
};

// Initialize the visitors API function that was in the original file
window.generateVisitorsAPI = async function() {
    const url = appState.apiConfig.url;
    const key = appState.apiConfig.key;
    const model = appState.apiConfig.model;

    if (!url || !key) throw new Error('No API Config');

    const slot = (currentChatAppId === 'qq') ? appState.slotA : appState.slotB;
    const contactNames = slot.contacts ? slot.contacts.map(c => c.name).join(', ') : '';

    const prompt = `You are a backend for a social app. Generate a JSON array of 5-8 recent visitors for the user "${appState.userName}".
    Existing contacts: ${contactNames}.
    REQUIREMENTS:
    1. You MUST include at least 2-3 visitors from the "Existing contacts" list provided above. This is mandatory.
    2. The rest can be strangers with generated names.
    3. Return ONLY a JSON array of objects with this structure:
    {
        "name": "Exact name from contact list or generated name",
        "type": "contact" (if from existing contacts) or "stranger",
        "content": "Short visit action in Chinese (e.g. '踩了一脚', '来看看你', '偷看', '路过')",
        "minutes_ago": integer (random between 1 and 1440)
    }
    Do not include any markdown formatting or code blocks. Just the raw JSON string.`;

    let endpoint = url;
    if (!endpoint.endsWith('/chat/completions')) {
        endpoint = endpoint.replace(/\/+$/, '') + '/chat/completions';
    }

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: 'You are a JSON generator.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7
        })
    });

    if (!response.ok) throw new Error('API Error');

    const data = await response.json();
    let content = data.choices[0].message.content.trim();
    if (content.startsWith('```json')) {
        content = content.replace(/^```json/, '').replace(/```$/, '');
    } else if (content.startsWith('```')) {
        content = content.replace(/^```/, '').replace(/```$/, '');
    }

    const visitorsData = JSON.parse(content);
    
    appState.visitors = visitorsData.map(v => {
        let avatar = `https://via.placeholder.com/150?text=${v.name[0]}`;
        
        if ((v.type === 'contact' || slot.contacts.some(c => c.name === v.name)) && slot.contacts) {
            const contact = slot.contacts.find(c => c.name === v.name);
            if (contact) {
                avatar = contact.avatar;
                v.type = 'contact';
            }
        }

        return {
            name: v.name,
            avatar: avatar,
            time: Date.now() - (v.minutes_ago * 60000),
            type: v.type,
            content: v.content
        };
    });
    
    appState.visitors.sort((a, b) => b.time - a.time);
};
