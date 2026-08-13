// Реестр программ: стандартный набор + пользовательские программы (с иконками)
const SOFTWARE_ICONS_DEFAULT = {
    'blender':      { name: 'Blender',            label: 'Bl', color: '#f5792a' },
    'unreal':       { name: 'Unreal Engine',      label: 'UE', color: '#1a1a1a', stroke: '#999' },
    'unity':        { name: 'Unity',              label: 'Un', color: '#222222', stroke: '#eee' },
    '3dsmax':       { name: '3ds Max',            label: '3d', color: '#37a5cc' },
    'zbrush':       { name: 'ZBrush',             label: 'Zb', color: '#e6533a' },
    'photoshop':    { name: 'Photoshop',          label: 'Ps', color: '#31a8ff' },
    'substance':    { name: 'Substance Painter',  label: 'SP', color: '#7a8c9b' },
    'maya':         { name: 'Autodesk Maya',      label: 'Ma', color: '#149c9c' },
    'cinema4d':     { name: 'Cinema 4D',          label: 'C4', color: '#333333', stroke: '#888' },
    'aftereffects': { name: 'After Effects',      label: 'Ae', color: '#9999ff' },
    'illustrator':  { name: 'Illustrator',        label: 'Ai', color: '#ff9a00' },
    'premiere':     { name: 'Premiere Pro',       label: 'Pr', color: '#9999ff' },
    'houdini':      { name: 'Houdini',            label: 'Ho', color: '#ff5100' },
    'keyshot':      { name: 'KeyShot',            label: 'KS', color: '#2b2b2b', stroke: '#ccc' },
    'davinci':      { name: 'DaVinci Resolve',    label: 'DR', color: '#1b1b1b', stroke: '#888' },
    'marvelous':    { name: 'Marvelous Designer', label: 'MD', color: '#5b7fa6' }
};

// Эффективный реестр (после применения пользовательских правок)
let SOFTWARE_ICONS = {};
// Пользовательские правки из software_data.json
let SOFTWARE_CUSTOM = { programs: {}, deleted: [] };

function rebuildSoftwareIcons() {
    SOFTWARE_ICONS = {};
    Object.entries(SOFTWARE_ICONS_DEFAULT).forEach(([key, val]) => {
        SOFTWARE_ICONS[key] = Object.assign({}, val);
    });
    Object.entries(SOFTWARE_CUSTOM.programs || {}).forEach(([key, val]) => {
        const base = SOFTWARE_ICONS[key] || { name: key };
        SOFTWARE_ICONS[key] = Object.assign({}, base);
        if (val.name) SOFTWARE_ICONS[key].name = val.name;
        if (val.icon) {
            SOFTWARE_ICONS[key].icon = val.icon;
        } else {
            delete SOFTWARE_ICONS[key].icon;
        }
    });
    (SOFTWARE_CUSTOM.deleted || []).forEach(key => {
        delete SOFTWARE_ICONS[key];
    });
}

function applySoftwareData(data) {
    if (!data) return;
    SOFTWARE_CUSTOM = {
        programs: data.programs || {},
        deleted: data.deleted || []
    };
    rebuildSoftwareIcons();
}

async function loadSoftwareIcons() {
    if (window.__softwareIcons) {
        applySoftwareData(window.__softwareIcons);
        return;
    }
    try {
        const response = await fetch('/api/software');
        applySoftwareData(await response.json());
    } catch (error) {
        rebuildSoftwareIcons();
    }
}

// HTML иконки. Если у программы есть своя иконка (файл в icons/) — используем её,
// иначе цветной квадрат с подписью.
function softwareIconHTML(key) {
    const icon = SOFTWARE_ICONS[key] || { name: key };
    if (icon.icon) {
        return `<img class="software-icon" src="icons/${icon.icon}" alt="${icon.name}" title="${icon.name}">`;
    }
    const border = icon.stroke ? `; border:1px solid ${icon.stroke}` : '';
    return `<span class="software-icon" title="${icon.name}" style="background:${icon.color || '#555555'}${border}">${icon.label || String(key).slice(0, 2).toUpperCase()}</span>`;
}
