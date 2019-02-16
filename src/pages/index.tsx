import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  PrismicLink,
  PrismicTitle,
  PrismicDocumentLink,
  PrismicMedia
} from '../prismic-types'

import * as colors from '../styles/colors'
import About from '../components/about'

const HEADER_HEIGHT = `5rem`
const VIDEO_HEIGHT = `calc(100vh - ${HEADER_HEIGHT})`

const CoverSection = styled.section`
  position: relative;
  height: ${VIDEO_HEIGHT};
`

const BackgroundVideo = styled.video`
  position: fixed;
  width: 100%;
  height: ${VIDEO_HEIGHT};
  /* top: ${HEADER_HEIGHT}; */
  z-index: -100;
  object-fit: cover;
  object-position: center;
  @supports (-ms-accelerator: true) { /* Edge only */
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: ${VIDEO_HEIGHT};
  }
}
`

const Header = styled.div`
  position: fixed;
  height: ${HEADER_HEIGHT};
  z-index: 10;
`

const Title = styled.h1`
  position: fixed;
  width: 100%;
  background: transparent;
  height: ${HEADER_HEIGHT};
  padding-left: 1rem;
  line-height: ${HEADER_HEIGHT};
  display: ${({ mobile }) => (mobile ? 'unset' : 'none')};
  font-size: 2.5rem;
  letter-spacing: 0.25rem;
  color: ${colors.white};
  @media (min-width: 640px) {
    display: ${({ mobile }) => (!mobile ? 'unset' : 'none')};
  }
`

const QuickLinkContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  @supports (-ms-accelerator: true) {
    /* Edge only */
    justify-content: space-around;
    /* you can also add some other adjustments to size, margins etc to get the same positioning */
  }
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
const MainContainer = styled.main`
  & > * {
    max-width: 1280px;
    margin: auto;
  }
  background: ${colors.black};
`

const ShowreelSection = styled.section`
  line-height: 0;
`

const InnerShowreelContainer = styled.div`
  margin: 0 -0.25rem;
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
  z-index: 1;
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
  @supports (-ms-accelerator: true) {
    /* Edge only */
    justify-content: space-around;
    /* you can also add some other adjustments to size, margins etc to get the same positioning */
  }
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
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-evenly;
  @supports (-ms-accelerator: true) {
    /* Edge only */
    justify-content: space-around;
    /* you can also add some other adjustments to size, margins etc to get the same positioning */
  }
`

const FooterIcon = styled.img`
  padding-top: 20%;
  transition: opacity 0.25s ease;
  opacity: 0.8;
  margin-bottom: 0;
  &:hover {
    opacity: 1;
  }
`

const SeparatorContainer = styled.div`
  height: ${HEADER_HEIGHT};
  text-align: center;
  width: 90%;
`

const SeparatorLine = styled.hr`
  position: relative;
  top: 50%;
  overflow: visible; /* For IE */
  padding: 0;
  border: none;
  border-top: medium double ${colors.primary};
  color: ${colors.primary};
  text-align: center;
`

const SeparatorIcon = styled.svg`
  position: relative;
  background: ${colors.black};
  padding: 0 2rem;
  top: -10%;
  fill: ${colors.primary};
  height: 50%;
`

const Separator = ({ to }) => (
  <SeparatorContainer>
    <SeparatorLine />
    <a href={to}>
      <SeparatorIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
      </SeparatorIcon>
    </a>
  </SeparatorContainer>
)

interface PanelProps {
  video?: PrismicDocumentLink<{
    title?: PrismicTitle
    thumbnail?: PrismicMedia
    roles?: Array<{
      role?: PrismicDocumentLink<{ icon?: PrismicLink }>
    }>
  }>
}

const Panel = ({ video }: PanelProps) => {
  if (!video) return null
  const { url, document } = video
  const {
    data: { title, thumbnail, roles = [] }
  } = document[0]
  const imageProps =
    thumbnail && thumbnail.localFile && thumbnail.localFile.childImageSharp
  if (!imageProps) return null
  return (
    <ShowreelPanel to={url}>
      {imageProps && <Img {...imageProps} />}
      <ShowreelPanelOverlay>
        <ShowreelTitle>{title && title.text}</ShowreelTitle>
        <RoleContainer>
          {roles.map(
            ({ role }, index) =>
              role &&
              role.document &&
              role.document[0] &&
              role.document[0].data.icon && (
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
}

interface Props {
  data: {
    prismicIndexPage: {
      data: {
        title?: PrismicTitle
        banner_video: PrismicLink
        quick_links: Array<{
          icon?: PrismicLink
          link_to_section?: string
          link: PrismicLink
        }>
        panel?: Array<PanelProps>
      }
    }
  }
}

const Index = ({
  data: {
    prismicIndexPage: {
      data: { title, banner_video, quick_links = [], panel }
    }
  }
}: Props) => (
  <>
    <Header>
      <Title>{title && title.text}</Title>
      <Title mobile>ADM</Title>
    </Header>
    <CoverSection id="cover">
      {banner_video && (
        <BackgroundVideo autoPlay loop muted playsInline>
          <source src={banner_video.url} type="video/mp4" />
        </BackgroundVideo>
      )}
      <QuickLinkContainer>
        {quick_links.map(({ icon, link_to_section, link }) => (
          <a
            key={icon && icon.url}
            href={(link && link.url) || `#${link_to_section}`}
            target={(link && link.target) || '_self'}
          >
            <QuickLinkIcon width={50} src={icon && icon.url} />
          </a>
        ))}
      </QuickLinkContainer>
    </CoverSection>
    <MainContainer>
      <Separator to="#showreel" />
      <ShowreelSection id="showreel">
        <InnerShowreelContainer>
          {panel &&
            panel.map((props, index) => <Panel key={index} {...props} />)}
        </InnerShowreelContainer>
      </ShowreelSection>
      <Separator to="#about" />
      <AboutSection id="about">
        <About />
        <FooterContainer>
          {quick_links.map(({ icon, link_to_section, link }) => (
            <a
              key={icon && icon.url}
              href={(link && link.url) || `#${link_to_section}`}
              target={(link && link.target) || '_self'}
            >
              <FooterIcon width={50} src={icon && icon.url} />
            </a>
          ))}
        </FooterContainer>
      </AboutSection>
    </MainContainer>
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
