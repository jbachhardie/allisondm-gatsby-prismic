import * as React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import * as colors from '../styles/colors'

const HEADER_HEIGHT = `5rem`

const SeparatorContainer = styled.div`
  height: ${HEADER_HEIGHT};
  text-align: center;
  width: 100%;
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

const Header = styled.header`
  position: fixed;
  top: 0;
  background: ${colors.black};
  height: ${HEADER_HEIGHT};
  width: 100%;
  z-index: 10;
`
const Title = styled.h1`
  position: fixed;
  top: 0;
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

const Main = styled.main`
  background: ${colors.black};
  padding: 1rem;
  margin: auto;
  margin-top: ${HEADER_HEIGHT};
  max-width: 1280px;
  color: ${colors.white};
  a {
    color: ${colors.primary};
  }
  a:visited {
    color: ${colors.primaryDark};
  }
`

const VideoTitle = styled.h2`
  color: ${colors.primary};
  text-align: center;
  margin: 0;
`

const VideoEmbed = styled.div`
  text-align: center;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  iframe {
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
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
  filter: invert(1);
  transition: opacity 0.25s ease;
  opacity: 0.8;
  margin-bottom: 0;
  &:hover {
    opacity: 1;
  }
`

const Video = ({
  pageContext: {
    quick_links,
    data: { title, description, video_embed }
  }
}) => (
  <>
    <Header>
      <Link to="/">
        <Title>Allison Declercq-Matthas</Title>
        <Title mobile>ADM</Title>
      </Link>
    </Header>
    <Main>
      {title && <VideoTitle>{title.text}</VideoTitle>}
      <Separator to="#video" />
      {video_embed && (
        <VideoEmbed
          id="video"
          dangerouslySetInnerHTML={{ __html: video_embed.html }}
        />
      )}
      <Separator to="#description" />
      {description && (
        <div
          id="description"
          dangerouslySetInnerHTML={{ __html: description.html }}
        />
      )}
      <FooterContainer>
        {quick_links.map(({ icon, link_to_section, link }) =>
          link_to_section ? (
            <Link to={`/#${link_to_section}`}>
              <FooterIcon width={50} src={icon && icon.url} />
            </Link>
          ) : (
            <a
              key={icon && icon.url}
              href={(link && link.url) || `#${link_to_section}`}
              target={(link && link.target) || '_self'}
            >
              <FooterIcon width={50} src={icon && icon.url} />
            </a>
          )
        )}
      </FooterContainer>
    </Main>
  </>
)

export default Video
