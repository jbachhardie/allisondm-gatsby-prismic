import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import {
  PrismicLink,
  PrismicTitle,
  PrismicDocumentLink,
  PrismicMedia
} from '../prismic-types'

import About from '../components/about'

interface Props {
  data: {
    prismicIndexPage: {
      data: {
        title?: PrismicTitle
      }
    }
  }
}

const Index = ({
  data: {
    prismicIndexPage: {
      data: { title }
    }
  }
}: Props) => (
  <>
    <About />
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
      }
    }
  }
`
