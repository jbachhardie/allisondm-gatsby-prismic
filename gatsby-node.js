const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`
    {
      allPrismicVideo {
        edges {
          node {
            uid
            data {
              title {
                text
              }
              description {
                html
              }
              video_embed {
                html
              }
            }
          }
        }
      }
    }
  `)

  const template = path.resolve('src/templates/video.tsx')

  pages.data.allPrismicVideo.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: template,
      context: {
        uid: edge.node.uid,
        data: edge.node.data
      }
    })
  })
}
