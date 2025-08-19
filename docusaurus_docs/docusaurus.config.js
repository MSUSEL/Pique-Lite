// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pique Lite',
  tagline: 'A lightweight software quality assessment tool.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://MSUSEL.github.io', // Changed from default value
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Pique-Lite/', // Changed from default value

  // GitHub pages deployment config.
  organizationName: 'MSUSEL', // Changed from 'facebook'
  projectName: 'Pique-Lite', // Changed from 'docusaurus'

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Set docs as the root
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/MSUSEL/Pique-Lite/tree/main/website/', // Updated with Pique-Lite repository
        },
        blog: false, // This line disables the blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Pique Lite', // Changed from 'Pique Lite Site'
        // logo: {
        //  alt: 'My Site Logo',
        //  src: 'img/logo.svg',
        //},
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
            to: '/', // Updated to reflect the documentation is at the root
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/MSUSEL/Pique-Lite', // Updated with Pique-Lite repository
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Docs',
                to: '/', // Updated to reflect the documentation is at the root
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/MSUSEL/Pique-Lite', // Updated with Pique-Lite repository
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Pique Lite. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;