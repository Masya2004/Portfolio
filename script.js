// ===== Языковой переключатель (RU/EN) =====
let currentLang = 'ru';
let currentProjects = [];
let ruSiteTexts = null;

function t(key) {
    const dict = (UI_STRINGS && UI_STRINGS[currentLang]) || UI_STRINGS.ru;
    return dict[key] !== undefined ? dict[key] : (UI_STRINGS.ru[key] || key);
}

function pluralRu(n, one, few, many) {
    if (n % 10 === 1 && n % 100 !== 11) return one;
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few;
    return many;
}

function fileCountText(n) {
    if (currentLang === 'en') return n + ' ' + (n === 1 ? t('file') : t('files'));
    return n + ' ' + pluralRu(n, t('file'), t('files'), t('filesMany'));
}

function getProjectText(project) {
    if (currentLang === 'en' && PROJECT_TEXTS_EN && PROJECT_TEXTS_EN[project.id]) {
        return {
            title: PROJECT_TEXTS_EN[project.id].title || project.title,
            description: PROJECT_TEXTS_EN[project.id].description !== undefined ? PROJECT_TEXTS_EN[project.id].description : project.description
        };
    }
    return { title: project.title, description: project.description };
}

function getFileCaption(project, file) {
    if (file.caption && currentLang === 'en' && PROJECT_TEXTS_EN && PROJECT_TEXTS_EN[project.id] && PROJECT_TEXTS_EN[project.id].captions && PROJECT_TEXTS_EN[project.id].captions[file.filename]) {
        return PROJECT_TEXTS_EN[project.id].captions[file.filename];
    }
    return file.caption;
}

function getProjectBasePath(project) {
    return project.basePath || `works/project${project.id}`;
}

function getFileUrl(project, filename) {
    return `${getProjectBasePath(project)}/${filename}`;
}

function getSiteTextsForLang() {
    if (currentLang === 'en') return SITE_TEXTS_EN || null;
    return ruSiteTexts || null;
}

function applyUIStrings() {
    const hint = document.getElementById('lightboxHint');
    if (hint) hint.textContent = t('lightboxHint');

    const zoomOut = document.getElementById('lightboxZoomOut');
    const zoomIn = document.getElementById('lightboxZoomIn');
    const zoomReset = document.getElementById('lightboxZoomReset');
    if (zoomOut) zoomOut.title = t('zoomOut');
    if (zoomIn) zoomIn.title = t('zoomIn');
    if (zoomReset) zoomReset.title = t('resetZoom');

    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    if (modalTitle && !modalTitle.textContent) modalTitle.textContent = t('modalTitle');
    if (modalDesc && !modalDesc.textContent) modalDesc.textContent = t('modalDesc');

    const educationTitle = document.getElementById('educationTitle');
    const educationSubtitle = document.getElementById('educationSubtitle');
    if (educationTitle) educationTitle.textContent = t('educationTitle');
    if (educationSubtitle) educationSubtitle.textContent = t('educationSubtitle');

    document.querySelectorAll('.layout-btn').forEach(btn => {
        const cols = btn.getAttribute('data-columns');
        const titles = { '4': t('cols4'), '2': t('cols2'), '1': t('cols1') };
        if (titles[cols]) btn.title = titles[cols];
    });
}

function setLanguage(lang, save) {
    if (lang !== 'ru' && lang !== 'en') lang = 'ru';
    currentLang = lang;
    if (save !== false) localStorage.setItem('siteLang', lang);
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'ru');

    const btn = document.getElementById('langSwitch');
    if (btn) {
        btn.textContent = lang === 'en' ? 'RU' : 'EN';
        btn.title = lang === 'en' ? t('switchToRu') : t('switchToEn');
    }

    applySiteTexts(getSiteTextsForLang());
    applyUIStrings();
    rerenderGallery();
    renderEducation();
}

function setupLanguageSwitch() {
    const btn = document.getElementById('langSwitch');
    if (!btn) return;
    btn.addEventListener('click', function() {
        setLanguage(currentLang === 'en' ? 'ru' : 'en');
    });
    setLanguage(currentLang, false);
}

// ===== Переключатель темы (светлая/тёмная) =====
let currentTheme = 'light';

const SUN_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

const MOON_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

function applyTheme(theme) {
    currentTheme = theme;
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    const btn = document.getElementById('themeSwitch');
    if (btn) {
        if (theme === 'dark') {
            btn.innerHTML = SUN_ICON;
            btn.title = t('switchToLight');
        } else {
            btn.innerHTML = MOON_ICON;
            btn.title = t('switchToDark');
        }
    }
}

function setupThemeSwitch() {
    const btn = document.getElementById('themeSwitch');
    if (!btn) return;
    const saved = localStorage.getItem('siteTheme');
    applyTheme(saved === 'dark' ? 'dark' : 'light');
    btn.addEventListener('click', function() {
        const next = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('siteTheme', next);
        applyTheme(next);
    });
}

function rerenderGallery() {
    if (currentProjects && currentProjects.length > 0) {
        renderGallery(currentProjects);
    } else {
        loadProjects();
    }
}

// ===== Раздел «Образование» (дипломы) =====
let diplomaData = null;

function getDiplomaData() {
    if (diplomaData && (diplomaData.ru || diplomaData.en)) return diplomaData;
    if (EDUCATION_DIPLOMAS) return EDUCATION_DIPLOMAS;
    return { ru: [], en: [] };
}

// Каждый диплом превращается в "проектоподобный" объект (как карточка проекта):
// есть title, subtitle и массив files — несколько изображений одного диплома.
function getEducationProjects() {
    const data = getDiplomaData();
    const diplomas = data[currentLang] || data.ru || [];
    return diplomas.map((dip, index) => ({
        id: 'education-' + index,
        basePath: 'works/education',
        title: dip.title || '',
        description: dip.subtitle || '',
        main_image: (dip.files && dip.files[0]) ? dip.files[0].filename : '',
        files: (dip.files || []).map(f => ({
            filename: f.filename,
            type: 'image',
            caption: f.caption || ''
        }))
    }));
}

async function loadDiplomas() {
    try {
        // Статическая версия: дипломы уже встроены в страницу
        if (window.__diplomas) {
            diplomaData = window.__diplomas;
            renderEducation();
            return;
        }
        // Динамическая версия: грузим через API
        const response = await fetch('/api/diplomas');
        const data = await response.json();
        if (data && (data.ru || data.en)) {
            diplomaData = data;
        }
        renderEducation();
    } catch (error) {
        diplomaData = null;
        renderEducation();
    }
}

function renderEducation() {
    const gallery = document.getElementById('educationGallery');
    if (!gallery) return;

    gallery.innerHTML = '';

    const projects = getEducationProjects();

    if (projects.length === 0) {
        gallery.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #9aa0a8;">' + escapeHtml(t('noDiplomas')) + '</p>';
        return;
    }

    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.cursor = 'pointer';

        const imageSrc = project.main_image
            ? getFileUrl(project, project.main_image)
            : '';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = project.title;
        img.style.display = 'block';
        img.onerror = function() {
            this.style.display = 'none';
        };
        item.appendChild(img);

        const info = document.createElement('div');
        info.className = 'item-info';
        info.innerHTML =
            '<h3>' + escapeHtml(project.title) + '</h3>' +
            '<p>' + escapeHtml(project.description) + '</p>' +
            (project.files.length > 1 ? '<small style="color: #06b6d4; font-size: 0.8rem;">' + fileCountText(project.files.length) + '</small>' : '');
        item.appendChild(info);

        item.addEventListener('click', function() {
            openModal(project);
        });

        gallery.appendChild(item);
    });

    // Ensure diploma items are visible immediately (fix for FOUT/animation delay)
    const diplomaItems = gallery.querySelectorAll('.gallery-item');
    diplomaItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });

    initGalleryAnimations();

    // Ensure diploma items remain visible after animations initialize
    const diplomaItems2 = gallery.querySelectorAll('.gallery-item');
    diplomaItems2.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}

// Загрузка проектов из API и отображение на сайте
document.addEventListener('DOMContentLoaded', async function() {
    await loadSoftwareIcons();
    loadProjects();
    loadSiteTexts();
    loadDiplomas();
    setupLayoutSwitch();
    setupLanguageSwitch();
    setupThemeSwitch();
    renderEducation();

    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Modal event listeners
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.software-stack')) {
            closeSoftwareStacks(null);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        const lightboxOpen = document.getElementById('lightbox').classList.contains('open');
        if (event.key === 'Escape' && modal.style.display === 'block' && !lightboxOpen) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Lightbox event listeners
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightboxPrev').addEventListener('click', function() {
        changeLightboxItem(-1);
    });
    document.getElementById('lightboxNext').addEventListener('click', function() {
        changeLightboxItem(1);
    });
    
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightboxContent');
    
    lightbox.addEventListener('click', function(event) {
        if (lightboxSuppressClick) {
            lightboxSuppressClick = false;
            return;
        }
        if (event.target === lightbox || event.target === lightboxContent) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (!lightbox.classList.contains('open')) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') changeLightboxItem(-1);
        if (event.key === 'ArrowRight') changeLightboxItem(1);
    });
    
    // Zoom controls
    document.getElementById('lightboxZoomIn').addEventListener('click', function() {
        zoomLightboxBy(0.25);
    });
    document.getElementById('lightboxZoomOut').addEventListener('click', function() {
        zoomLightboxBy(-0.25);
    });
    document.getElementById('lightboxZoomReset').addEventListener('click', function() {
        zoomLightbox(1);
    });
    
    // Wheel zoom (towards cursor)
    lightboxContent.addEventListener('wheel', function(event) {
        if (!lightboxCurrentImage) return;
        event.preventDefault();
        const delta = event.deltaY < 0 ? 0.25 : -0.25;
        zoomLightboxBy(delta, event.clientX, event.clientY);
    }, { passive: false });
    
    // Mouse drag to pan
    lightboxContent.addEventListener('mousedown', function(event) {
        if (!lightboxCurrentImage || lightboxZoom <= 1) return;
        lightboxSuppressClick = false;
        lightboxDragging = true;
        lightboxDragStartX = event.clientX;
        lightboxDragStartY = event.clientY;
        lightboxStartPanX = lightboxPanX;
        lightboxStartPanY = lightboxPanY;
        lightboxContent.style.cursor = 'grabbing';
        event.preventDefault();
    });
    
    window.addEventListener('mousemove', function(event) {
        if (!lightboxDragging) return;
        const dx = event.clientX - lightboxDragStartX;
        const dy = event.clientY - lightboxDragStartY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            lightboxSuppressClick = true;
        }
        lightboxPanX = lightboxStartPanX + dx;
        lightboxPanY = lightboxStartPanY + dy;
        clampLightboxPan();
        applyLightboxTransform();
    });
    
    window.addEventListener('mouseup', function() {
        if (lightboxDragging) {
            lightboxDragging = false;
            lightboxContent.style.cursor = lightboxZoom > 1 ? 'grab' : 'default';
        }
    });
    
    // Double-click to zoom
    lightboxContent.addEventListener('dblclick', function() {
        if (!lightboxCurrentImage) return;
        if (lightboxZoom > 1) {
            zoomLightbox(1);
        } else {
            zoomLightbox(2.5);
        }
    });
    
    // Touch pan and pinch zoom
    let touchStartDist = 0;
    let touchStartZoom = 1;
    
    lightboxContent.addEventListener('touchstart', function(event) {
        if (!lightboxCurrentImage) return;
        if (event.touches.length === 1) {
            lightboxDragging = true;
            lightboxDragStartX = event.touches[0].clientX;
            lightboxDragStartY = event.touches[0].clientY;
            lightboxStartPanX = lightboxPanX;
            lightboxStartPanY = lightboxPanY;
        } else if (event.touches.length === 2) {
            lightboxDragging = false;
            touchStartDist = getTouchDistance(event);
            touchStartZoom = lightboxZoom;
        }
    }, { passive: true });
    
    lightboxContent.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (event.touches.length === 1 && lightboxDragging) {
            const dx = event.touches[0].clientX - lightboxDragStartX;
            const dy = event.touches[0].clientY - lightboxDragStartY;
            lightboxPanX = lightboxStartPanX + dx;
            lightboxPanY = lightboxStartPanY + dy;
            clampLightboxPan();
            applyLightboxTransform();
        } else if (event.touches.length === 2 && touchStartDist > 0) {
            const dist = getTouchDistance(event);
            const newZoom = Math.min(8, Math.max(1, touchStartZoom * (dist / touchStartDist)));
            zoomLightbox(newZoom);
        }
    }, { passive: false });
    
    lightboxContent.addEventListener('touchend', function() {
        lightboxDragging = false;
        touchStartDist = 0;
    });
});

function getTouchDistance(event) {
    const t = event.touches;
    return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
}

async function loadProjects() {
    // Для статической версии данные уже встроены в HTML
    // Эта функция будет переопределена в index.html
    try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        currentProjects = data.projects || [];
        renderGallery(currentProjects);
    } catch (error) {
        console.log('API недоступен, используем встроенные данные');
        // Если API недоступен, используем встроенные данные из HTML
        if (typeof portfolioData !== 'undefined') {
            currentProjects = portfolioData.projects || [];
            renderGallery(currentProjects);
        } else {
            renderPlaceholderGallery();
        }
    }
}

function closeSoftwareStacks(except) {
    document.querySelectorAll('.software-stack.expanded').forEach(stack => {
        if (stack !== except) stack.classList.remove('expanded');
    });
}

function renderGallery(projects) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.cursor = 'pointer';
        const projectText = getProjectText(project);
        
        // Используем главное изображение или первое из файлов
        const imageSrc = project.main_image 
            ? getFileUrl(project, project.main_image)
            : (project.files.length > 0 
                ? getFileUrl(project, project.files[0].filename)
                : '');
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = projectText.title;
        img.style.display = 'none';
        
        img.onload = function() {
            this.style.display = 'block';
        };
        
        img.onerror = function() {
            this.style.display = 'none';
            const placeholder = item.querySelector('.image-placeholder');
            if (placeholder) placeholder.style.display = 'flex';
        };

        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.display = 'none';
        placeholder.innerHTML = `
            <span>${escapeHtml(t('noImages'))}</span>
            <small>${escapeHtml(t('addFilesHint'))}</small>
        `;

        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        itemInfo.innerHTML = `
            <h3>${escapeHtml(projectText.title)}</h3>
            <p>${escapeHtml(projectText.description)}</p>
            <small style="color: #06b6d4; font-size: 0.8rem;">${fileCountText(project.files.length)}</small>
        `;

        // Добавляем клик для открытия модального окна
        item.addEventListener('click', () => openModal(project));

        // Иконки программ в левом верхнем углу (стопка, раскрывается при наведении)
        if (project.software && project.software.length > 0) {
            const swStack = document.createElement('div');
            swStack.className = 'software-stack';
            swStack.innerHTML = project.software.map(key => softwareIconHTML(key)).join('');
            // Первая иконка всегда наверху стопки
            swStack.querySelectorAll('.software-icon').forEach((icon, i) => {
                icon.style.zIndex = 100 - i;
            });
            swStack.addEventListener('click', function(e) {
                e.stopPropagation();
                closeSoftwareStacks(this);
                this.classList.toggle('expanded');
            });
            item.appendChild(swStack);
        }

        item.appendChild(img);
        item.appendChild(placeholder);
        item.appendChild(itemInfo);
        gallery.appendChild(item);
    });

    // Применяем эффекты появления
    initGalleryAnimations();
}

// ===== Переключатель формата карточек (3/2/1 ряд) =====
let currentLayoutColumns = 3;

function setupLayoutSwitch() {
    const gallery = document.getElementById('gallery');
    const switchEl = document.getElementById('layoutSwitch');
    if (!switchEl || !gallery) return;

    const saved = localStorage.getItem('portfolioLayout');
    if (saved) currentLayoutColumns = parseInt(saved, 10) || 4;

    applyLayout(currentLayoutColumns);

    switchEl.querySelectorAll('.layout-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentLayoutColumns = parseInt(this.dataset.columns, 10);
            localStorage.setItem('portfolioLayout', currentLayoutColumns);
            applyLayout(currentLayoutColumns);
        });
    });
}

function applyLayout(columns) {
    const gallery = document.getElementById('gallery');
    const switchEl = document.getElementById('layoutSwitch');
    if (gallery) gallery.classList.remove('cols-1', 'cols-2', 'cols-3', 'cols-4');
    if (gallery) gallery.classList.add('cols-' + columns);

    if (switchEl) {
        switchEl.querySelectorAll('.layout-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.columns, 10) === columns);
        });
    }
}

function renderPlaceholderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = `
        <div class="gallery-item">
            <div class="image-placeholder">
                <span>${escapeHtml(t('serverUnavailable'))}</span>
                <small>${escapeHtml(t('runServerHint'))}</small>
            </div>
        </div>
    `;
}

function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.closest('#educationGallery')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    galleryItems.forEach(item => {
        if (item.closest('#educationGallery')) return;
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    galleryItems.forEach(item => {
        if (item.closest('#educationGallery')) return;
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Modal functionality
function openModal(project) {
    const modal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalGallery = document.getElementById('modalGallery');
    
    const projectText = getProjectText(project);
    modalTitle.textContent = projectText.title;
    modalDescription.textContent = projectText.description;
    
    // Render all files in modal
    modalGallery.innerHTML = '';
    
    if (project.files && project.files.length > 0) {
        project.files.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'modal-file-item';
            
            if (file.type === 'video') {
                const video = document.createElement('video');
                video.src = getFileUrl(project, file.filename);
                video.muted = true;
                video.preload = 'metadata';
                video.playsInline = true;
                fileItem.appendChild(video);

                const indicator = document.createElement('div');
                indicator.className = 'video-indicator';
                indicator.textContent = t('video');
                fileItem.appendChild(indicator);
            } else if (file.type === 'pdf') {
                const pdfLink = document.createElement('a');
                pdfLink.href = getFileUrl(project, file.filename);
                pdfLink.target = '_blank';
                pdfLink.className = 'pdf-link';
                pdfLink.innerHTML = escapeHtml(t('openPdf'));
                fileItem.appendChild(pdfLink);

                const indicator = document.createElement('div');
                indicator.className = 'video-indicator';
                indicator.textContent = 'PDF';
                fileItem.appendChild(indicator);
            } else if (file.type === 'ppt') {
                const pptLink = document.createElement('a');
                pptLink.href = getFileUrl(project, file.filename);
                pptLink.target = '_blank';
                pptLink.className = 'pdf-link';
                pptLink.innerHTML = escapeHtml(t('openPpt'));
                fileItem.appendChild(pptLink);

                const indicator = document.createElement('div');
                indicator.className = 'video-indicator';
                indicator.textContent = 'PPT';
                fileItem.appendChild(indicator);
            } else {
                const img = document.createElement('img');
                img.src = getFileUrl(project, file.filename);
                img.alt = projectText.title;
                img.loading = 'lazy';
                fileItem.appendChild(img);
            }
            
            const captionText = getFileCaption(project, file);
            if (captionText) {
                const caption = document.createElement('div');
                caption.className = 'modal-file-caption';
                caption.textContent = captionText;
                fileItem.appendChild(caption);
            }
            
            fileItem.addEventListener('click', () => openLightbox(project, index));
            modalGallery.appendChild(fileItem);
        });
    } else {
        modalGallery.innerHTML = '<p style="text-align: center; color: #9aa0a8; grid-column: 1/-1;">' + escapeHtml(t('noFiles')) + '</p>';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Lightbox (просмотр файла на весь экран)
let lightboxProject = null;
let lightboxIndex = 0;
let lightboxZoom = 1;
let lightboxPanX = 0;
let lightboxPanY = 0;
let lightboxCurrentImage = null;
let lightboxDragging = false;
let lightboxSuppressClick = false;
let lightboxDragStartX = 0;
let lightboxDragStartY = 0;
let lightboxStartPanX = 0;
let lightboxStartPanY = 0;

function openLightbox(project, index) {
    lightboxProject = project;
    lightboxIndex = index;
    document.getElementById('lightbox').classList.add('open');
    renderLightboxItem();
    document.body.style.overflow = 'hidden';
}

function renderLightboxItem() {
    const container = document.getElementById('lightboxContent');
    const counter = document.getElementById('lightboxCounter');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const project = lightboxProject;
    
    container.innerHTML = '';
    
    const file = project.files[lightboxIndex];
    const url = getFileUrl(project, file.filename);
    
    if (file.type === 'video') {
        lightboxCurrentImage = null;
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        container.appendChild(video);
    } else if (file.type === 'pdf') {
        lightboxCurrentImage = null;
        const pdfLink = document.createElement('a');
        pdfLink.href = url;
        pdfLink.target = '_blank';
        pdfLink.className = 'pdf-link';
        pdfLink.innerHTML = escapeHtml(t('openPdfTab'));
        pdfLink.style.display = 'flex';
        pdfLink.style.alignItems = 'center';
        pdfLink.style.justifyContent = 'center';
        pdfLink.style.height = '100%';
        pdfLink.style.fontSize = '1.5rem';
        pdfLink.style.color = '#06b6d4';
        pdfLink.style.textDecoration = 'none';
        container.appendChild(pdfLink);
    } else if (file.type === 'ppt') {
        lightboxCurrentImage = null;
        const pptLink = document.createElement('a');
        pptLink.href = url;
        pptLink.target = '_blank';
        pptLink.className = 'pdf-link';
        pptLink.innerHTML = escapeHtml(t('openPptTab'));
        pptLink.style.display = 'flex';
        pptLink.style.alignItems = 'center';
        pptLink.style.justifyContent = 'center';
        pptLink.style.height = '100%';
        pptLink.style.fontSize = '1.5rem';
        pptLink.style.color = '#2dd36f';
        pptLink.style.textDecoration = 'none';
        container.appendChild(pptLink);
    } else {
        const img = document.createElement('img');
        img.src = url;
        img.alt = getProjectText(project).title;
        img.draggable = false;
        lightboxCurrentImage = img;
        container.appendChild(img);
    }
    
    const captionText = getFileCaption(project, file);
    if (captionText) {
        const captionEl = document.createElement('div');
        captionEl.className = 'lightbox-caption';
        captionEl.textContent = captionText;
        container.appendChild(captionEl);
    }
    
    resetLightboxZoom();
    updateLightboxCursor();
    
    counter.textContent = `${lightboxIndex + 1} / ${project.files.length}`;
    
    const showNav = project.files.length > 1;
    prevBtn.style.display = showNav ? 'block' : 'none';
    nextBtn.style.display = showNav ? 'block' : 'none';
}

function resetLightboxZoom() {
    lightboxZoom = 1;
    lightboxPanX = 0;
    lightboxPanY = 0;
    updateLightboxZoomLabel();
    applyLightboxTransform();
}

function applyLightboxTransform() {
    const img = lightboxCurrentImage;
    if (!img) return;
    img.style.transform = `translate(-50%, -50%) translate(${lightboxPanX}px, ${lightboxPanY}px) scale(${lightboxZoom})`;
}

function updateLightboxCursor() {
    const content = document.getElementById('lightboxContent');
    content.style.cursor = lightboxCurrentImage && lightboxZoom > 1 ? 'grab' : 'default';
}

function updateLightboxZoomLabel() {
    document.getElementById('lightboxZoomLevel').textContent = Math.round(lightboxZoom * 100) + '%';
}

function clampLightboxPan() {
    const img = lightboxCurrentImage;
    if (!img) return;
    const content = document.getElementById('lightboxContent');
    const maxW = content.clientWidth * 0.92;
    const maxH = content.clientHeight * 0.88;
    let w = img.naturalWidth || 1;
    let h = img.naturalHeight || 1;
    const fit = Math.min(maxW / w, maxH / h);
    if (fit < 1) {
        w *= fit;
        h *= fit;
    }
    const sw = w * lightboxZoom;
    const sh = h * lightboxZoom;
    const cw = content.clientWidth;
    const ch = content.clientHeight;
    const maxX = Math.max(0, (sw - cw) / 2);
    const maxY = Math.max(0, (sh - ch) / 2);
    lightboxPanX = Math.max(-maxX, Math.min(maxX, lightboxPanX));
    lightboxPanY = Math.max(-maxY, Math.min(maxY, lightboxPanY));
}

function zoomLightbox(newZoom, centerX, centerY) {
    const content = document.getElementById('lightboxContent');
    const rect = content.getBoundingClientRect();
    const mx = centerX !== undefined ? centerX - rect.left - rect.width / 2 : 0;
    const my = centerY !== undefined ? centerY - rect.top - rect.height / 2 : 0;
    const factor = newZoom / lightboxZoom;
    lightboxPanX = mx - (mx - lightboxPanX) * factor;
    lightboxPanY = my - (my - lightboxPanY) * factor;
    lightboxZoom = newZoom;
    clampLightboxPan();
    updateLightboxZoomLabel();
    updateLightboxCursor();
    applyLightboxTransform();
}

function zoomLightboxBy(delta, centerX, centerY) {
    const newZoom = Math.min(8, Math.max(1, lightboxZoom + delta));
    if (newZoom === lightboxZoom) return;
    zoomLightbox(newZoom, centerX, centerY);
}

function changeLightboxItem(direction) {
    const project = lightboxProject;
    if (!project || project.files.length === 0) return;
    lightboxIndex = (lightboxIndex + direction + project.files.length) % project.files.length;
    renderLightboxItem();
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.getElementById('lightboxContent').innerHTML = '';
    lightboxCurrentImage = null;
    document.body.style.overflow = 'auto';
}

// Загрузка и применение текстов сайта из site_texts.json
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function applySiteTexts(texts) {
    if (!texts) return;

    // Логотип
    if (texts.logo) {
        const el = document.getElementById('textLogo');
        if (el) el.textContent = texts.logo;
    }

    // Навигация
    if (texts.nav && Array.isArray(texts.nav) && texts.nav.length > 0) {
        const el = document.getElementById('navLinks');
        if (el) {
            el.innerHTML = texts.nav.map(item =>
                `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`
            ).join('');
        }
    }

    // Главный экран
    if (texts.hero) {
        if (texts.hero.title) {
            const el = document.getElementById('heroTitle');
            if (el) el.textContent = texts.hero.title;
        }
        if (texts.hero.subtitle) {
            const el = document.getElementById('heroSubtitle');
            if (el) el.textContent = texts.hero.subtitle;
        }
        if (texts.hero.cta) {
            const el = document.getElementById('heroCta');
            if (el) el.textContent = texts.hero.cta;
        }
    }

    // Портфолио
    if (texts.portfolio) {
        if (texts.portfolio.title) {
            const el = document.getElementById('portfolioTitle');
            if (el) el.textContent = texts.portfolio.title;
        }
        if (texts.portfolio.subtitle) {
            const el = document.getElementById('portfolioSubtitle');
            if (el) el.textContent = texts.portfolio.subtitle;
        }
    }

    // Обо мне
    if (texts.about) {
        if (texts.about.title) {
            const el = document.getElementById('aboutTitle');
            if (el) el.textContent = texts.about.title;
        }
        if (texts.about.paragraphs && Array.isArray(texts.about.paragraphs)) {
            const el = document.getElementById('aboutParagraphs');
            if (el && texts.about.paragraphs.length > 0) {
                el.innerHTML = texts.about.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
            }
        }
        if (texts.about.skills && Array.isArray(texts.about.skills)) {
            const el = document.getElementById('aboutSkills');
            if (el && texts.about.skills.length > 0) {
                el.innerHTML = texts.about.skills.map(s => `<li>${escapeHtml(s)}</li>`).join('');
            }
        }
    }

    // Контакты
    if (texts.contact) {
        if (texts.contact.title) {
            const el = document.getElementById('contactTitle');
            if (el) el.textContent = texts.contact.title;
        }
        if (texts.contact.intro) {
            const el = document.getElementById('contactIntro');
            if (el) el.textContent = texts.contact.intro;
        }
        if (texts.contact.links && Array.isArray(texts.contact.links) && texts.contact.links.length > 0) {
            const el = document.getElementById('contactLinks');
            if (el) {
                el.innerHTML = texts.contact.links.map(link =>
                    `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
                ).join('');
            }
        }
    }

    // Подвал
    if (texts.footer) {
        const el = document.getElementById('footerText');
        if (el) el.textContent = texts.footer;
    }
}

async function loadSiteTexts() {
    try {
        // Статическая версия: тексты уже встроены в страницу
        if (window.__siteTexts) {
            ruSiteTexts = window.__siteTexts;
            applySiteTexts(getSiteTextsForLang());
            return;
        }
        // Динамическая версия: грузим через API
        const response = await fetch('/api/site-texts');
        const texts = await response.json();
        ruSiteTexts = texts;
        applySiteTexts(getSiteTextsForLang());
    } catch (error) {
        // Оставляем тексты по умолчанию из HTML
    }
}

