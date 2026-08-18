/* 
 * Translations for the site.
 * 'ru' (Russian) is the default language; 'en' (English) is provided below.
 */

// UI strings (buttons, hints, placeholders, etc.)
const UI_STRINGS = {
  ru: {
    noImages: 'Нет изображений',
    addFilesHint: 'Добавьте файлы через админ-панель',
    serverUnavailable: 'Сервер недоступен',
    runServerHint: 'Запустите server.py для локальной работы',
    file: 'файл',
    files: 'файла',
    filesMany: 'файлов',
    video: '🎬 Видео',
    openPdf: '📄 Открыть PDF',
    openPpt: '📊 Открыть презентацию',
    noFiles: 'Нет файлов для отображения',
    openPdfTab: '📄 Открыть PDF в новой вкладке',
    openPptTab: '📊 Открыть презентацию в новой вкладке',
    lightboxHint: 'Колесо — масштаб · Зажать — перемещение · Двойной клик — приблизить',
    zoomOut: 'Отдалить',
    zoomIn: 'Приблизить',
    resetZoom: 'Сбросить масштаб',
    cols4: '4 ряда',
    cols2: '2 ряда',
    cols1: '1 ряд',
    modalTitle: 'Название проекта',
    modalDesc: 'Описание проекта',
    switchToEn: 'English',
    switchToRu: 'Русский',
    switchToDark: 'Тёмная тема',
    switchToLight: 'Светлая тема',
    educationTitle: 'Образование',
    educationSubtitle: 'Дипломы и профессиональная переподготовка',
    noDiplomas: 'Дипломы будут добавлены позже'
  },
  en: {
    noImages: 'No images',
    addFilesHint: 'Add files via the admin panel',
    serverUnavailable: 'Server unavailable',
    runServerHint: 'Run server.py for local work',
    file: 'file',
    files: 'files',
    filesMany: 'files',
    video: '🎬 Video',
    openPdf: '📄 Open PDF',
    openPpt: '📊 Open presentation',
    noFiles: 'No files to display',
    openPdfTab: '📄 Open PDF in a new tab',
    openPptTab: '📊 Open presentation in a new tab',
    lightboxHint: 'Wheel — zoom · Drag — pan · Double click — zoom in',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    resetZoom: 'Reset zoom',
    cols4: '4 columns',
    cols2: '2 columns',
    cols1: '1 column',
    modalTitle: 'Project title',
    modalDesc: 'Project description',
    switchToEn: 'English',
    switchToRu: 'Русский',
    switchToDark: 'Dark theme',
    switchToLight: 'Light theme',
    educationTitle: 'Education',
    educationSubtitle: 'Diplomas and professional retraining',
    noDiplomas: 'Diplomas will be added later'
  }
};

// English versions of the static site texts (mirrors site_texts.json)
const SITE_TEXTS_EN = {
  "about": {
    "title": "About Me",
    "paragraphs": [
      "I'm a digital designer with experience creating 3D visualizations, games and interactive spaces. I specialize in 3D modeling, VR/AR development and digital product design for various purposes.",
      "My skills include:"
    ],
    "skills": [
      "3D modeling and texturing",
      "VR/AR application development",
      "UX/UI design",
      "VR device optimization",
      "3D object manipulation",
      "Concept design",
      "Prototyping",
      "Design project development and implementation",
      "Game design",
      "Digital and interactive product design",
      "Visual concept development",
      "Design solution visualization",
      "Design documentation preparation",
      "Ergonomics",
      "User interaction design for virtual environments",
      "VR game interaction concept design"
    ]
  },
  "contact": {
    "title": "Contact Me",
    "links": [
      {
        "label": "Mail: ArturManikov46@gmail.com",
        "href": ""
      },
      {
        "label": "Telegram",
        "href": "https://t.me/MasyaMasyunevich"
      },
      {
        "label": "ArtStation",
        "href": "https://www.artstation.com/masya2004"
      },
      {
        "label": "VK",
        "href": "https://vk.ru/arturmanikov"
      }
    ]
  },
  "footer": "© 2026 Digital Designer Portfolio",
  "hero": {
    "title": "Digital Designer",
    "subtitle": "3D visualization, games, VR/AR and digital design",
    "cta": "View works"
  },
  "logo": "DIGITAL.DESIGNER",
  "nav": [
    {
      "label": "Home",
      "href": "#home"
    },
    {
      "label": "Portfolio",
      "href": "#portfolio"
    },
    {
      "label": "About Me",
      "href": "#about"
    },
    {
      "label": "Contacts",
      "href": "#contact"
    }
  ],
  "portfolio": {
    "title": "My Works",
    "subtitle": "Digital and visual art: drawing, 3D visualization, interactive environments and VR/AR projects."
  }
};

// English translations of project titles, descriptions and file captions (keyed by project id)
const PROJECT_TEXTS_EN = {
  1: {
    title: "Artworks",
    description: "Visual development for VR/AR: character, location and prop concepts, illustrations and color schemes for virtual environments, sketch designs of interiors and exteriors for interactive scenes.",
    captions: {
      "532674d0-fc89-4e8f-9402-d2f7b48533d9.png": "House concept",
      "f561fd19-621f-4b44-9ce1-d2e202646aaa.png": "Adobe Illustrator study. Abstraction"
    }
  },
  2: {
    title: "VR Game MVP",
    description: "MVP of a VR game in the adventure puzzle genre with exploration elements."
  },
  3: {
    title: "Horror Location Development in 3ds Max",
    description: "Creating a dark 3D location for a horror project: environment modeling, detailing, scene composition and crafting an unsettling red-and-black atmosphere."
  },
  4: {
    title: "Human Body Retopology",
    description: "Retopology of the human body while preserving muscle details and facial features."
  },
  5: {
    title: "Children's Playground Design in 3D Max",
    description: "Children's playground project with a layout plan and detailed 3D visualization. Placement of play elements, territory landscaping and overall space organization were developed. The 3D scene was made in Blender and transferred to 3ds Max."
  },
  6: {
    title: "Fictional Cyberpunk City District",
    description: "Modeling and scene development were done in Blender, final render in D5 Render. The work focuses on atmospheric lighting, environment detailing and creating a futuristic urban atmosphere."
  },
  7: {
    title: "Workspace Design",
    description: "Workspace design and visualization with a focus on functionality, ergonomics and modern design. The model and environment were made in Blender, final visualization in D5 Render."
  },
  8: {
    title: "School Classroom Design",
    description: "Design projects for school classrooms within the federal project “Dream School”. Creating a modern educational environment considering functionality, comfort and the needs of students."
  },
  9: {
    title: "Strategy Game",
    description: "“Chess-Strike” is a tactical strategy combining classic chess with combat mechanics. Special forces vs. terrorists on a dynamic board with unique piece abilities, teleports and traps. The goal is to destroy the enemy or complete a special mission."
  },
  10: {
    title: "The Lost Fortress",
    description: "A small atmospheric location with an ancient stone citadel surrounded by water and a system of arched bridges. Abandoned architecture, overgrown walls and soft evening light create the feeling of a long-forgotten place."
  },
  11: {
    title: "Garden by the Sea",
    description: "A small Mediterranean location with an ancient stone pavilion surrounded by dense vegetation and citrus trees. In the center of the composition is a small pond that creates the feeling of a calm, secluded garden."
  },
  12: {
    title: "Tech Fest 2026 Visual Identity",
    description: "Visual identity concept for a fictional technology festival. A unified brand identity and a series of promotional materials were developed: posters, banners, digital formats, merchandise and promo-zone design. Based on futuristic styling, technology theme and a unified visual system."
  },
  13: {
    title: "Educational Project — “The Lost Fortress”",
    description: "https://masya2004.github.io/SiteKurs/\nhttps://masya2004.github.io/PresentationKursss/\nEducational 3D project on creating an architectural scene in Blender. Work done from scratch: modeling the fortress, bridges and environment, creating PBR materials, setting up water, lighting and camera. The result is an atmospheric final render and a complete educational material demonstrating the entire scene creation process — from basic modeling to the finished image."
  },
  14: {
    title: "Interactive Simulation — Hooke's Law",
    description: "https://masya2004.github.io/Hookes-Law/\nInteractive educational project dedicated to Hooke's law. The user can visually explore the relationship between spring force and deformation and observe parameter changes in real time. The project is designed as a visual tool for simple and clear study of physical laws."
  },
  15: {
    title: "Plinko Probability — Interactive Probability Simulation",
    description: "https://masya2004.github.io/Plinko-Probality/\nInteractive visualization of probability distribution based on Plinko mechanics. Using HTML, CSS and JavaScript, the movement of balls through a system of obstacles is implemented, followed by the formation of a statistical distribution of results."
  },
  16: {
    title: "VK App — UI/UX Design Study Project",
    description: "Educational project aimed at mastering Figma and the basic principles of interface design. During the work, an app prototype in VK style was developed using components, grids, screens and interactive transitions."
  },
  17: {
    title: "Urban Territory Improvement — Public Square",
    description: "Landscaping project for the “Scarlet Sails” residential area. Based on condition analysis and resident feedback, a concept for a new public space with recreational and functional zones was developed. The project includes a master plan, landscaping, children's and sports playgrounds, a fountain square and a gazebo zone, as well as the styling and 3D models of small architectural forms."
  },
  18: {
    title: "3D Character — Fox",
    description: "Project on creating and working with a 3D character. A stylized fox character was created with detailed appearance, clothing and model details. Character animation was also performed, applying acquired skills in rigging, posing and movement."
  },
  19: {
    title: "AR Image Recognition Game — “Castle Defense”",
    description: "A mobile AR game using image recognition as a marker. After pointing the camera, a virtual castle with a pea shooter appears, and the player must hit incoming zombies with it. The project combines augmented reality with arcade gameplay elements and interaction with virtual objects."
  },
  20: {
    title: "Horror Cinematic in Resident Evil Style",
    description: "A short cinematic in Unreal Engine created as an experiment in survival horror aesthetics. The scene is inspired by the Resident Evil atmosphere: dark environment, tense lighting, laboratory theme and gradually building unease. Camera staging, composition, lighting and visual effects were developed in the project."
  },
  21: {
    title: "Country House Design in Haimat Style",
    description: "Architectural project of a country house done in Archicad. Three-floor layouts, furniture arrangement, facades and a roof plan were developed. Special attention was paid to shaping the house's architectural look in the characteristic Haimat style and developing the functional structure of the building."
  },
  23: {
    title: "Virtual Anatomy Practice",
    description: "Educational VR project presented as an interactive anatomy trainer. A textured 3D frog model was created, a step-by-step dissection sequence and corresponding animations were developed. The user can progressively study the organism's internal structure by interacting with anatomical elements in a virtual environment."
  },
  24: {
    title: "Cinematic in Unreal Engine",
    description: "Educational project on creating environment and cinematic in Unreal Engine. Terrain creation and setup, placement of 3D props from third-party libraries, lighting setup and Light Probe scenes with Bloom and other visual effects were done. Camera staging and animation were also performed independently to create a short comedic cinematic with dynamic object interaction."
  },
  25: {
    title: "Fantasy Fountain — 3D Fantasy Scene",
    description: "Educational 3D project on creating an atmospheric fantasy scene. At the center of the composition is a dragon integrated into a system of decorative fountains and surrounded by a stylized tree. Attention was paid to modeling, materials, water, environment, lighting and overall scene composition."
  },
  26: {
    title: "Cyberpunk Drive — Mobile Game with Gyroscope Control",
    description: "Educational project on developing a mobile game with gyroscope control. The player drives a car through a cyberpunk city, moving against traffic and avoiding collisions. Points are awarded for distance traveled, and collecting coins adds interest to beating new records. The project combines mobile controls, game logic and a scoring system."
  },
  27: {
    title: "Future School Zone Concept",
    description: "Concept of a multifunctional future-school zone focused on collaborative learning, communication and rest. The space is organized using various seating formats and mobile furniture that allow adapting it to different educational scenarios."
  },
  28: {
    title: "AR Surface Recognition Game — “New Year Location”",
    description: "Mobile AR game using surface recognition. Once a floor is detected in real space, an interactive New Year location appears integrated into the environment. The project demonstrates working with augmented reality, placing 3D objects and user interaction with the virtual scene."
  }
};

// Дипломы (сканы) для раздела «Образование»
// Каждый диплом может содержать несколько изображений (files).
const EDUCATION_DIPLOMAS = {
  ru: [
    {
      title: 'Диплом бакалавра',
      subtitle: 'ВятГУ',
      files: [
        {
          filename: '8bbaffe5-02a9-42b6-8e56-982fd3ce09f0.jpeg',
          caption: 'Диплом бакалавра'
        },
        {
          filename: '1a87a915-09ec-442b-a7ac-14febf0fb104.jpeg',
          caption: ''
        },
        {
          filename: '284c3045-828c-447e-8092-35d426fd1529.jpeg',
          caption: ''
        },
        {
          filename: 'a295c767-5556-4d57-ae42-fcc3e19a3fd8.jpeg',
          caption: ''
        },
        {
          filename: '0b9c8240-1afc-4c86-9020-1e6f1609d1cc.jpeg',
          caption: ''
        },
        {
          filename: '4a4fba65-d219-4410-bb37-f38a95f36444.jpeg',
          caption: ''
        }
      ]
    },
    {
      title: 'Диплом о профессиональной переподготовке',
      subtitle: 'Дизайн VR · ВятГУ',
      files: [
        {
          filename: 'df7b6d08-306e-4f4b-bc04-95a870d301ce.jpeg',
          caption: ''
        },
        {
          filename: '495ebb0e-558b-4c8c-ac36-19826a1d2a25.jpeg',
          caption: ''
        },
        {
          filename: 'ab07217b-6089-476c-b1fd-ab60ac413f9d.jpeg',
          caption: ''
        },
        {
          filename: 'fc1f1443-07e8-443f-b5bd-0c0af3d65859.jpeg',
          caption: ''
        }
      ]
    }
  ],
  en: [
    {
      title: "Bachelor's Degree Diploma",
      subtitle: 'Vyatka State University',
      files: [
        {
          filename: '8bbaffe5-02a9-42b6-8e56-982fd3ce09f0.jpeg',
          caption: "Bachelor's Degree Diploma"
        },
        {
          filename: '1a87a915-09ec-442b-a7ac-14febf0fb104.jpeg',
          caption: ''
        },
        {
          filename: '284c3045-828c-447e-8092-35d426fd1529.jpeg',
          caption: ''
        },
        {
          filename: 'a295c767-5556-4d57-ae42-fcc3e19a3fd8.jpeg',
          caption: ''
        },
        {
          filename: '0b9c8240-1afc-4c86-9020-1e6f1609d1cc.jpeg',
          caption: ''
        },
        {
          filename: '4a4fba65-d219-4410-bb37-f38a95f36444.jpeg',
          caption: ''
        }
      ]
    },
    {
      title: 'Professional Retraining Diploma',
      subtitle: 'VR Design · VyatSU',
      files: [
        {
          filename: 'df7b6d08-306e-4f4b-bc04-95a870d301ce.jpeg',
          caption: ''
        },
        {
          filename: '495ebb0e-558b-4c8c-ac36-19826a1d2a25.jpeg',
          caption: ''
        },
        {
          filename: 'ab07217b-6089-476c-b1fd-ab60ac413f9d.jpeg',
          caption: ''
        },
        {
          filename: 'fc1f1443-07e8-443f-b5bd-0c0af3d65859.jpeg',
          caption: ''
        }
      ]
    }
  ]
};
