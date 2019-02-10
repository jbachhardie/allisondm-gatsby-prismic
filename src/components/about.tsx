import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const About = ({
  data: {
    prismicAbout: {
      data: { banner_video, quick_links, profile_picture, blurb }
    }
  }
}) => (
  <>
    {banner_video && (
      <video autoPlay loop muted playsInline>
        <source src={banner_video.url} type="video/mp4" />
      </video>
    )}
    {quick_links.map(({ title, link }) => (
      <a key={link.url} href={link.url} target={link.target || '_self'}>
        {title.text}
      </a>
    ))}
    <Img fixed={profile_picture.localFile.childImageSharp.fixed} />
    <div dangerouslySetInnerHTML={{ __html: blurb.html }} />
  </>
)

const AboutContainer = props => (
  <StaticQuery
    query={graphql`
      query AboutPage {
        prismicAbout {
          data {
            title {
              text
            }
            banner_video {
              target
            }
            quick_links {
              title {
                text
              }
              link {
                url
                target
              }
            }
            profile_picture {
              localFile {
                childImageSharp {
                  fixed(width: 900, height: 1500) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            blurb {
              html
            }
          }
        }
      }
    `}
    render={data => <About data={data} {...props} />}
  />
)

export default AboutContainer
