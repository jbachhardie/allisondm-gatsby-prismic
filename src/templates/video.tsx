/** @jsx jsx */
import * as React from 'react'
import { Styled, jsx } from 'theme-ui'
import HTMLRenderer from 'react-html-renderer'

const Video = ({
  pageContext: {
    data: { title, description, video_embed }
  }
}) => (
  <React.Fragment>
    {title && <Styled.h1>{title.text}</Styled.h1>}
    {video_embed && (
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
        dangerouslySetInnerHTML={{ __html: video_embed.html }}
      />
    )}
    {description && (
      <HTMLRenderer html={description.html} components={Styled} />
    )}
  </React.Fragment>
)

export default Video
