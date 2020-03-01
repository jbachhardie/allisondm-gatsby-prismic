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

const Equipment: React.FC<Props> = ({ data }) => (
  <HTMLRenderer
    html={data.prismicPlainPage.data.content.html}
    components={Styled}
  />
)

export default Equipment

export const pageQuery = graphql`
  query EquipmentPage {
    prismicPlainPage(uid: { eq: "equipment" }) {
      data {
        content {
          html
        }
      }
    }
  }
`
