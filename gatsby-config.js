require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `allisondm`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => video => `/${video.uid}`
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-image`,
    `gatsby-plugin-typescript`,
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-layout'
  ]
}
