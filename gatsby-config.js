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
    // `gatsby-source-filesystem`,
    `gatsby-image`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    `gatsby-plugin-styled-components`
  ]
}
