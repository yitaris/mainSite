import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  git,
  Akpa,
  MSS,
  dijimental,
  carrent,
  yusufKaya,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Hakkımda",
  },
  {
    id: "work",
    title: "Projelerim",
  },
  {
    id: "contact",
    title: "İletişim",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: css,
  },
  {
    title: "React Native Developer",
    icon: reactjs,
  },
  {
    title: "Backend Developer",
    icon: nodejs,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Staj",
    company_name: "AKPA ALÜMİNYUM FABRİKASI",
    icon: Akpa,
    iconBg: "#ff3131",
    date: "Şubat 2023 - Temmuz 2023",
    points: [
      "Mekatronik bölümünde staj yaparak, teorik bilgileri pratiğe dökme fırsatı buldum ve endüstriyel uygulamaların gerekliliklerini anladım.",
      "Fabrika otomasyon süreçlerinde PLC (Programmable Logic Controller) ve CNC (Computer Numerical Control) makineleri hakkında kapsamlı bilgiler edindim, bu sistemlerin nasıl çalıştığını ve programlandığını öğrendim.",
      "Elektrik-elektronik devreleri tasarlama ve analiz etme yetenekleri geliştirdim; ayrıca malzeme bilgisi konusunda, farklı malzemelerin özelliklerini ve kullanımlarını öğrendim.",
      "Alüminyum bileziklerin üretim süreçlerini baştan sona inceledim, bu süreçte üretim teknikleri, kalite kontrol ve güvenlik standartları hakkında bilgi sahibi oldum."
    ],
  },
  {
    title: "Dijimental Reklam Ajansı",
    company_name: "Dijimental",
    icon: MSS,
    iconBg: "#fff",
    date: "Eylül 2023 - Kasım 2023",
    points: [
      "Javascript, HTML, CSS ve WordPress konusunda kendimi geliştirdim.",
      "Web sitesi tasarımları, SEO hizmetleri, e-ticaret siteleri ve sosyal medya yönetimi konularında tecrübe kazandım.",
      "Farklı projelerde API entegrasyonları, kullanıcı arayüzü geliştirme ve performans optimizasyonu üzerine çalışmalar yaptım.",
      "Kod incelemelerine katılarak, diğer geliştiricilere yapıcı geri bildirimler sağladım ve takım çalışmasına katkıda bulundum."
    ],    
  },
  {
    title: "Mobile App Dev",
    company_name: "MSS Mükemmel Savunma Sanayi",
    icon: dijimental,
    iconBg: "#fff",
    date: "Ekim 2023 - Temmuz 2024",
    points: [
      "Python, React Native Expo, React Web ve JavaScript dillerinde kapsamlı tecrübelerimi geliştirdim; bu sayede modern web ve mobil uygulama geliştirme konularında güçlü bir temel oluşturmuş oldum.",
      "Firebase ve Python kullanarak uzaktan çalıştırılabilir React mobil uygulamaları geliştirdim ve bu uygulamaları fabrika süreçlerine entegre edilerek uyumlu bir şekilde aktarımını sağladım.",
      "Mobil uygulama ile kablosuz bağlantı kurarak uzaktan çalıştırılabilir devreler tasarladım; bu projede hem donanım hem de yazılım alanında pratik deneyim kazandım.",
      "Backend geliştirme konusundaki tecrübelerimi artırarak, çeşitli entegrasyon süreçlerinde daha fazla bilgi ve beceri kazandım; bu sayede API tasarımı ve veri yönetimi konularında derinlemesine bilgi sahibi oldum."
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Front-end dev, React, HTML, CSS, BootStrap Developer",
    name: "Oğuz can Duru",
    designation: "FREELANCER",
    company: "",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHytiQ3AUgRQw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725286886239?e=1733961600&v=beta&t=Ld16SLFH_zAIdG7VGR-iJl0_70W9lAr4fOkmo9rmB28",
  },
  {
    testimonial:
      "Blender 3D-2D Sahne tasarımı, Animasyon, Karakter Tasarımı.",
    name: "Yusuf Kaya",
    designation: "FREELANCER",
    company: "",
    image: yusufKaya,
  },
  {
    testimonial:
      "Syntra Media'da Kurucu Ortak | Yeni Nesil Pazarlama Çözümlerinde Yenilikçilik",
    name: "Emir Ayaz",
    designation: "CEO",
    company: "Syntra Media",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGwK9miwxynrg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1678120832121?e=1733961600&v=beta&t=3nJQaJfQCvpEmvz31IPecNpZJP5viuV5k9PCz6mA26Q",
  },
];

const projects = [
  {
    name: "Fitness Mobile App",
    description:
      "Fitness Koçu, Kullanıcı Girişi, Bilgi Denetimi.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Firebase",
        color: "green-text-gradient",
      },
      {
        name: "zustand",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/yitariss",
  },
  {
    name: "Yakınında Ne Var?",
    description:
      "Uygulama Google Maps ve Apple Maps kullanarak etrafınızdaki mekanları gösterip tanıtıyor.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "clerk",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Portfolio",
    description:
      "Responsive BootStrap Portfolio, minimal tasarım ve kolay okunur.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "bootstrap",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
