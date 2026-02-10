/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ecfrontiers.org',
  changefreq: 'weekly',
  priority: 0.9,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml', '/dashboard', '/dashboard/*', '/portal', '/portal/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.ecfrontiers.org/server-sitemap.xml',
    ],
  },
}

