import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import * as colors from '../styles/colors'
import {
  PrismicRichText,
  PrismicTitle,
  PrismicLink,
  PrismicMedia
} from '../prismic-types'

const BannerContainer = styled.div`
  position: relative;
`

const VideoBanner = styled.video`
  width: 100%;
`

const BlurbContainer = styled.div`
  padding: 1rem;
  max-width: 1080px;
  margin: auto;
`

const QuickLinkContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  z-index: 10;
  @media (min-width: 640px) {
    bottom: 1rem;
  }
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
  display: none;
  @media (min-width: 640px) {
    display: unset;
  }
`

interface Props {
  data: {
    prismicAbout: {
      data: {
        title?: PrismicTitle
        banner_video?: PrismicLink
        quick_links?: Array<{
          title?: PrismicTitle
          link?: PrismicLink
        }>
        profile_picture?: PrismicMedia
        blurb?: PrismicRichText
      }
    }
  }
}

const About = ({
  data: {
    prismicAbout: {
      data: { title, banner_video, quick_links, profile_picture, blurb }
    }
  }
}: Props) => (
  <>
    <BannerContainer>
      {banner_video && (
        <VideoBanner autoPlay loop muted playsInline>
          <source src={banner_video.url} type="video/mp4" />
        </VideoBanner>
      )}
      {quick_links && (
        <QuickLinkContainer>
          {quick_links.map(
            ({ title, link }) =>
              link &&
              title && (
                <QuickLink
                  key={link.url}
                  href={link.url}
                  target={link.target || '_self'}
                >
                  <h3>{title.text}</h3>
                </QuickLink>
              )
          )}
        </QuickLinkContainer>
      )}
    </BannerContainer>
    <BlurbContainer>
      {profile_picture &&
        profile_picture.localFile &&
        profile_picture.localFile.childImageSharp && (
          <PortraitContainer>
            <Img fluid={profile_picture.localFile.childImageSharp.fluid} />
          </PortraitContainer>
        )}
      {title && title.text && <h2>{title.text}</h2>}
      {blurb && blurb.html && (
        <div dangerouslySetInnerHTML={{ __html: blurb.html }} />
      )}
    </BlurbContainer>
  </>
)

const AboutContainer = (props: Props) => (
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
