/** @jsx jsx */
import * as React from 'react'
import { jsx, Grid, Box, Styled } from 'theme-ui'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import HTMLRenderer from 'react-html-renderer'
import {
  PrismicRichText,
  PrismicTitle,
  PrismicLink,
  PrismicMedia
} from '../prismic-types'

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
        showreel?: PrismicRichText
      }
    }
  }
}

const About = ({
  data: {
    prismicAbout: {
      data: { title, profile_picture, blurb, showreel }
    }
  }
}: Props) => (
  <Box as="article" marginX="auto">
    <Grid columns={['1fr', '1fr 3fr']}>
      {profile_picture &&
        profile_picture.localFile &&
        profile_picture.localFile.childImageSharp && (
          <Img
            sx={{ marginX: 'auto' }}
            fixed={profile_picture.localFile.childImageSharp.fixed}
          />
        )}
      <div>
        {title && title.text && <Styled.h1>{title.text}</Styled.h1>}
        {blurb && blurb.html && (
          <HTMLRenderer html={blurb.html} components={Styled} />
        )}
      </div>
    </Grid>
    {showreel && (
      <Box paddingTop={3}>
        <div
          sx={{
            textAlign: 'center',
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
            '& iframe': {
              margin: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }
          }}
          id="video"
          dangerouslySetInnerHTML={{ __html: showreel.html }}
        />
      </Box>
    )}
  </Box>
)

const AboutContainer = (props: {}) => (
  <StaticQuery
    query={graphql`
      query AboutPage {
        prismicAbout {
          data {
            title {
              text
            }
            profile_picture {
              localFile {
                childImageSharp {
                  fixed(width: 320) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
            blurb {
              html
            }
            showreel {
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
