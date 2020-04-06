import * as React from 'react'
import { graphql, Link } from 'gatsby'
import HTMLRenderer from 'react-html-renderer'
import { PrismicRichText } from '../prismic-types'
import { Styled } from 'theme-ui'

interface Props {
  data: {
    prismicPlainPage: {
      data: {
        content: PrismicRichText
      }
    }
  }
}

const Credits: React.FC<Props> = ({ data }) => (
  <HTMLRenderer
    html={data.prismicPlainPage.data.content.html}
    components={Styled}
  />
)

export default Credits

export const pageQuery = graphql`
  query CreditsPage {
    prismicPlainPage(uid: { eq: "credits" }) {
      data {
        content {
          html
        }
      }
    }
  }
`
