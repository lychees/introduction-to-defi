const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Introduction to DeFi',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Ch-1 概述',
        link: '/Ch-1 概述/',
      },      
      {
        text: 'Ch-2 交易所',
        link: '/Ch-2 交易所/',
      },
      {
        text: 'Ch-3 借贷',
        link: '/Ch-3 借贷/'
      },
      {
        text: 'Ch-4 稳定币',
        link: '/Ch-4 稳定币/'
      },      
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    sidebar: {
      '/Ch-1 概述/': [
        {
          title: '概述',
          collapsable: false,
          children: [
            '',
          ]   
        }
      ],
      '/Ch-2 交易所/': [
        {
          title: '交易所',
          collapsable: false,
          children: [
            '',
            '2-2 定价曲线',
            '2-3 流动性',
          ]   
        }
      ],
      '/Ch-3 借贷/': [
        {
          title: '借贷',
          collapsable: false,
          children: [
            '',
          ]   
        }
      ],
      '/Ch-4 稳定币/': [
        {
          title: '稳定币',
          collapsable: false,
          children: [
            '',
          ]   
        }
      ],
      '/Ch-5 聚合器/': [
        {
          title: '聚合器',
          collapsable: false,
          children: [
            '',
          ]   
        }
      ],      
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
