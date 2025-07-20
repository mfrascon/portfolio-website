import { FaHome, FaUser, FaFolderOpen, FaEnvelopeOpen } from 'react-icons/fa';

import skillsImg1 from './assets/css-logo.svg';
import skillsImg2 from './assets/html-logo.svg';
import skillsImg3 from './assets/javascript-logo.svg';
import skillsImg4 from './assets/next-js-logo.svg';
import skillsImg5 from './assets/react-logo.svg';
import skillsImg6 from './assets/tailwindcss-logo.svg';
import skillsImg7 from './assets/typescript-logo.svg';
import skillsImg8 from './assets/vite-logo.svg';
import skillsImg9 from './assets/wix-logo.svg';
import skillsImg10 from './assets/supabase-logo.png';
import skillsImg11 from './assets/api-logo.svg';
import skillsImg12 from './assets/express-js-logo.svg';
import skillsImg13 from './assets/git-logo.svg';
import skillsImg14 from './assets/postgresql-logo.svg';
import skillsImg15 from './assets/terminal-logo.svg';
import skillsImg16 from './assets/seo-icon.svg';
import skillsImg17 from './assets/google-analytics-logo.svg';

import projectImg1 from './assets/project-1.png';
import projectImg2 from './assets/project-2.png';
import projectImg3 from './assets/project-3.png';
import projectImg4 from './assets/project-4.png';
import projectImg5 from './assets/project-5.png';

export const links = [
    {
        name: 'Home',
        icon: <FaHome className='nav-icon' />,
        path: '/',
    },

    // {
    //     name: 'About',
    //     icon: <FaUser className='nav-icon' />,
    //     path: '/about',
    // },

    {
        name: 'Portfolio',
        icon: <FaFolderOpen className='nav-icon' />,
        path: '/portfolio',
    },

    {
        name: 'Contact',
        icon: <FaEnvelopeOpen className='nav-icon' />,
        path: '/contact',
    },
];

export const portfolio = [
    {
        id: 1,
        img: projectImg1,
        title: 'Nerdys Tech Repair',
        description: 
            'A bilingual, responsive website for a local mobile PC repair business. Built using Vite, Bootstrap, JavaScript, HTML, and CSS, the site features a dynamic contact form powered by Web3Forms, language toggle functionality, and mobile-friendly design. Services, modals, and multimedia carousels are integrated to highlight offerings and recent YouTube content.',
        skills: [skillsImg1, skillsImg2, skillsImg3, skillsImg8],
        link: 'https://nerdystechrepair.com/',
    },

    {
        id: 2,
        img: projectImg2,
        title: 'Gordo Sells(E-commerce)',
        description: 
            'GordoSells is a full-stack web application designed to sell secondhand items in a local, community-focused marketplace. Built with Next.js, TypeScript, and TailwindCSS, the site pulls product data directly from Stripe, simplifying inventory and payment management. Users can send inquiries via a custom email form, powered by Resend. The project includes responsive design, a streamlined checkout experience, and email notifications to facilitate communication between buyer and seller',
        skills: [skillsImg4, skillsImg7, skillsImg5, skillsImg6],
        link: 'https://www.gordosells.com/',
    },

    {
        id: 3,
        img: projectImg3,
        title: 'MC Landscaping',
        description: 
            'Redesigned a local landscaping companys website on the Wix platform to create a more modern, user-friendly, and visually appealing experience. Focused on improving layout, mobile responsiveness, and clear navigation to highlight services and encourage customer inquiries. Collaborated with the client to update content, integrate contact forms, and enhance overall branding.',
        skills: [skillsImg9, skillsImg16],
        link: 'https://www.mclandscapeanddesign.com/',
    },

    {
        id: 4,
        img: projectImg4,
        title: 'Center For Education News',
        description: 
            'I developed an education news web app using Wix and Velo (Wix Developer Tools), integrating it with a Supabase backend built by another intern. The site fetched and displayed education-related news articles, showing summaries and metadata for each. I implemented dynamic content loading, basic keyword filtering, and organized the front-end structure using Wix custom coding features. The project aimed to provide accessible news content while laying the groundwork for future data-driven features like trend visualizations and topic-based filtering.',
        skills: [skillsImg9, skillsImg10],
        link: 'https://www.centerforeducationnews.org/',
    },

    {
        id: 5,
        img: projectImg5,
        title: 'Verdani Institute For The Built Environment',
        description: 
            'I was hired to improve the SEO for this Wix website. I used tools like Screaming Frog to audit the sites structure and Google PageSpeed Insights to optimize performance. I updated meta titles and descriptions, improved header hierarchy, and increased page load speed. I also connected Google Analytics and added a gated download feature that required users to sign up before accessing reports, allowing the client to track downloads and generate custom analytics reports.',
        skills: [skillsImg9, skillsImg16, skillsImg17],
        link: 'https://www.verdani-institute.org/',
    },
];

export const skills = [
    {
        id: 1, 
        img: skillsImg2,
        title: 'HTML',
        level: 'Intermediate',
        category: 'developer',
    },

    {
        id: 2, 
        img: skillsImg1,
        title: 'CSS',
        level: 'Intermediate',
        category: 'developer',
    },

    {
        id: 3, 
        img: skillsImg3,
        title: 'JavaScript',
        level: 'Intermediate',
        category: 'developer',
    },

    {
        id: 4, 
        img: skillsImg5,
        title: 'React',
        level: 'Intermediate',
        category: 'developer',
    },

    {
        id: 5, 
        img: skillsImg14,
        title: 'PostgreSQL',
        level: 'Intermediate',
        category: 'backend',
    },

    {
        id: 6, 
        img: skillsImg12,
        title: 'Express.js',
        level: 'Intermediate',
        category: 'backend',
    },

    {
        id: 7, 
        img: skillsImg10,
        title: 'SupaBase',
        level: 'Intermediate',
        category: 'backend',
    },

    {
        id: 8, 
        img: skillsImg11,
        title: 'APIs',
        level: 'Intermediate',
        category: 'backend',
    },

    {
        id: 9, 
        img: skillsImg13,
        title: 'Git',
        level: 'Intermediate',
        category: 'developer',
    },

    {
        id: 10, 
        img: skillsImg15,
        title: 'Terminal',
        level: 'Intermediate',
        category: 'developer',
    },

];