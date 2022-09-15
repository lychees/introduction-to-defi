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
        text: 'Ch-1 快速入门',
        link: '/Ch-1 快速入门/',
      },      
      {
        text: 'Ch-2 去中心化交易所',
        link: '/Ch-2 去中心化交易所/',
      },
      {
        text: 'Ch-3 去中心化借贷',
        link: '/Ch-3 去中心化借贷/'
      },
      {
        text: 'Ch-4 去中心化稳定币',
        link: '/Ch-4 去中心化稳定币/'
      },
      {
        text: 'Ch-5 DeFi 聚合器',
        link: '/Ch-5 DeFi 聚合器/'
      },
      {
        text: 'Ch-6 去中心化衍生品',
        link: '/Ch-6 去中心化衍生品/'
      },      
      {
        text: 'Ch-7 附录',
        link: '/Ch-7 附录/'
      },            
    ],
    sidebar: {
      '/Ch-1 快速入门/': [
        {
          title: 'Ch-1 快速入门',
          collapsable: false,
          children: [
            '',
            '1-1 代币标准',
            '1-2 计数器合约',
            'Problems',
            'Note',
          ]   
        }
      ],
      '/Ch-2 去中心化交易所/': [
        {
          title: 'Ch-2 去中心化交易所',
          collapsable: false,
          children: [
            '',
            '2-1 Proof of Week Hand',
            '2-2 Uniswap V2',
            '2-3 Curve',
            '2-4 Uniswap V3',
            'Problems',
            'Note',            
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
  ],
  markdown: {
    extendMarkdown: md => {
      md.use(require("markdown-it-footnote"));
    }
  }
}
