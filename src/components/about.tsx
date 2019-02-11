import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import * as colors from '../styles/colors'

const VideoBanner = styled.video`
  width: 100%;
`

const BlurbContainer = styled.div`
  padding: 1rem;
  max-width: 1080px;
  margin: auto;
`

const QuickLinkContainer = styled.div`
  position: relative;
  top: -3rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const QuickLink = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  color: ${colors.white};
`

const PortraitContainer = styled.div`
  float: left;
  padding-right: 1rem;
  width: 25%;
  img {
    margin: 0;
  }
`

const About = ({
  data: {
    prismicAbout: {
      data: { title, banner_video, quick_links, profile_picture, blurb }
    }
  }
}) => (
  <>
    <VideoBanner autoPlay loop muted playsInline>
      <source src={banner_video.url} type="video/mp4" />
    </VideoBanner>
    <QuickLinkContainer>
      {quick_links.map(({ title, link }) => (
        <QuickLink
          key={link.url}
          href={link.url}
          target={link.target || '_self'}
        >
          <h3>{title.text}</h3>
        </QuickLink>
      ))}
    </QuickLinkContainer>
    <BlurbContainer>
      <PortraitContainer>
        <Img fluid={profile_picture.localFile.childImageSharp.fluid} />
      </PortraitContainer>
      <h2>{title.text}</h2>
      <div dangerouslySetInnerHTML={{ __html: blurb.html }} />
    </BlurbContainer>
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
              url
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
                  fluid(maxWidth: 320) {
                    ...GatsbyImageSharpFluid_withWebp
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
