import { FluidObject, FixedObject } from 'gatsby-image'

export interface PrismicTitle {
  text?: string
  html?: string
}
export interface PrismicRichText {
  html?: string
}
export interface PrismicLink {
  url?: string
  target?: string
}
export interface PrismicMedia {
  localFile?: PrismicMediaFile
}
export interface PrismicMediaFile {
  absolutePath?: string
  relativePath?: string
  childImageSharp?: SharpImage
}
export interface SharpImage {
  fluid?: FluidObject
  fixed?: FixedObject
}
export interface PrismicDocumentLink<T> extends PrismicLink {
  document: [{ data: T }]
}
