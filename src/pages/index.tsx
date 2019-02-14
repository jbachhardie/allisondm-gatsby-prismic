import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import * as colors from '../styles/colors'
import About from '../components/about'

const CoverSection = styled.section`
  position: relative;
  height: 100vh;
`

const BackgroundVideo = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
`

const Title = styled.h1`
  display: none;
  position: absolute;
  top: 1rem;
  left: 1rem;
  text-transform: uppercase;
  font-size: 2.5rem;
  letter-spacing: 0.25rem;
  opacity: 0.8;
  color: ${colors.white};
`

const QuickLinkContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media (min-width: 640px) {
    bottom: 1.5rem;
  }
  @media (min-width: 1280px) {
    bottom: 2rem;
  }
`

const QuickLinkIcon = styled.img`
  filter: invert(1);
  transition: opacity 0.25s ease;
  opacity: 0.8;
  margin-bottom: 0;
  &:hover {
    opacity: 1;
  }
`

const ShowreelSection = styled.section`
  background-color: ${colors.black};
  line-height: 0;
  padding: 0.25rem;
`

const ShowreelPanel = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 0.25rem;
  width: 100%;
  @media (min-width: 640px) {
    width: 50%;
  }
  @media (min-width: 1280px) {
    width: 33.33%;
  }
`

const ShowreelPanelOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: ${colors.black};
  transition: opacity 0.25s ease;
  opacity: 0;
  &:hover {
    opacity: 0.8;
  }
`

const ShowreelTitle = styled.h2`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: ${colors.white};
`

const RoleContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @media (min-width: 640px) {
    bottom: 1.5rem;
  }
  @media (min-width: 1280px) {
    bottom: 2rem;
  }
`

const RoleIcon = styled.img`
  filter: invert(1);
  margin-bottom: 0;
`

const AboutSection = styled.section`
  background: ${colors.white};
  padding-bottom: 2rem;
`

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const FooterIcon = styled.img`
  transition: opacity 0.25s ease;
  opacity: 0.8;
  margin-bottom: 0;
  &:hover {
    opacity: 1;
  }
`

const Index = ({
  data: {
    prismicIndexPage: {
      data: { title, banner_video, quick_links = [], panel }
    }
  }
}) => (
  <>
    <CoverSection id="cover">
      <Title>{title.text}</Title>
      {banner_video && (
        <BackgroundVideo autoPlay loop muted playsInline>
          <source src={banner_video.url} type="video/mp4" />
        </BackgroundVideo>
      )}
      <QuickLinkContainer>
        {quick_links.map(({ icon, link_to_section, link }) => (
          <a
            key={icon.url}
            href={(link && link.url) || `#${link_to_section}`}
            target={(link && link.target) || '_self'}
          >
            <QuickLinkIcon width={50} src={icon.url} />
          </a>
        ))}
      </QuickLinkContainer>
    </CoverSection>
    <ShowreelSection id="showreel">
      {panel.map(({ video: { url, document } }, index) => {
        const {
          data: { title, thumbnail, roles = [] }
        } = document[0]
        return (
          <ShowreelPanel key={index} to={url}>
            <Img fluid={thumbnail.localFile.childImageSharp.fluid} />
            <ShowreelPanelOverlay>
              <ShowreelTitle>{title.text}</ShowreelTitle>
              <RoleContainer>
                {roles.map(
                  ({ role }, index) =>
                    role && (
                      <RoleIcon
                        key={index}
                        src={role.document[0].data.icon.url}
                        width={50}
                      />
                    )
                )}
              </RoleContainer>
            </ShowreelPanelOverlay>
          </ShowreelPanel>
        )
      })}
    </ShowreelSection>
    <AboutSection id="about">
      <About />
      <FooterContainer>
        {quick_links.map(({ icon, link_to_section, link }) => (
          <a
            key={icon.url}
            href={(link && link.url) || `#${link_to_section}`}
            target={(link && link.target) || '_self'}
          >
            <FooterIcon width={50} src={icon.url} />
          </a>
        ))}
      </FooterContainer>
    </AboutSection>
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
        banner_video {
          url
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
                      fluid(maxWidth: 640, maxHeight: 320) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
                roles {
                  role {
                    document {
                      data {
                        icon {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
