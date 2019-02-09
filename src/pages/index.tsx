import * as React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const Index = ({
  data: {
    prismicIndexPage: {
      data: { title, quick_links, panel }
    }
  }
}) => (
  <>
    <h1>{title.text}</h1>
    {quick_links.map(({ icon, link_to_section, link }) => (
      <a
        href={(link && link.url) || `#${link_to_section}`}
        target={(link && link.target) || '_self'}
      >
        <img width={50} src={icon.url} />
      </a>
    ))}
    <section id="showreel">
      {panel.map(({ video: { url, document } }) => {
        const {
          data: { title, thumbnail, roles }
        } = document[0]
        return (
          <a href={url}>
            <h2>{title.text}</h2>
            <Img fixed={thumbnail.localFile.childImageSharp.fixed} />
            {roles.map(({ id }) => (
              <p>{id}</p>
            ))}
          </a>
        )
      })}
    </section>
  </>
)

export default Index

export const pageQuery = graphql`
  query IndexPage {
    prismicIndexPage {
      data {
        title {
          text
        }
        quick_links {
          icon {
            url
          }
          link_to_section
          link {
            target
            url
          }
        }
        panel {
          video {
            url
            document {
              data {
                title {
                  text
                }
                thumbnail {
                  localFile {
                    childImageSharp {
                      fixed(width: 640, height: 320) {
                        ...GatsbyImageSharpFixed_withWebp
                      }
                    }
                  }
                }
                roles {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`
