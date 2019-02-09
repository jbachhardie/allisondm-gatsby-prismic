import * as React from 'react'

const Video = ({
  pageContext: {
    data: { title, description, video_embed }
  }
}) => (
  <>
    <h1>{title.text}</h1>
    <div dangerouslySetInnerHTML={{ __html: video_embed.html }} />
    <div dangerouslySetInnerHTML={{ __html: description.html }} />
  </>
)

export default Video
