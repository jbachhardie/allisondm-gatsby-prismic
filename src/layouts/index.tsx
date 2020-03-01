/** @jsx jsx */
import * as React from 'react'
import { jsx, Grid, Flex, Text } from 'theme-ui'
import { Link, GatsbyLinkProps } from 'gatsby'
import { keyframes } from '@emotion/core'

const dash = keyframes`
  10%, 80% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  85%, 100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
`

const Logo: React.FC<{}> = () => {
  return (
    <svg sx={{ height: '7rem', padding: 2 }} viewBox="0 0 211 495">
      <path
        sx={{
          fill: 'none',
          stroke: 'black',
          strokeDasharray: 1200,
          strokeDashoffset: 1200,
          strokeWidth: 13,
          animation: `${dash} 14s linear forwards infinite`
        }}
        d="M5.883 242.302L119.438 2.773v473.762l84.29-105.244-143.572-245"
      />
    </svg>
  )
}

const NavLink: React.FC<GatsbyLinkProps<unknown> & {
  as?: string | React.ComponentType
}> = ({ children, as: Component = Link, ...props }) => {
  return (
    <Component
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingX: 2,
        justifyContent: 'center',
        textDecoration: 'none',
        color: 'text',
        fontFamily: 'heading',
        fontWeight: 'light',
        textTransform: 'uppercase',
        fontSize: 4,
        height: '4rem',
        '&:hover': {
          backgroundColor: 'primary',
          color: 'background'
        }
      }}
      activeClassName="active"
      {...props}
    >
      {children}
    </Component>
  )
}

const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div sx={{ maxWidth: '1024px', margin: 'auto', paddingX: 3 }}>
      <Grid
        gap={0}
        sx={{ minHeight: '8rem', alignItems: 'center' }}
        columns="min-content auto auto auto"
        as="nav"
      >
        <Flex paddingRight={4} sx={{ alignItems: 'center' }}>
          <Logo />
          <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text variant="nav" sx={{ letterSpacing: 2.2 }}>
              Allison
            </Text>
            <Text variant="nav" sx={{ letterSpacing: 0 }}>
              Declercq
            </Text>
            <Text variant="nav" sx={{ letterSpacing: 1.5 }}>
              Matthas
            </Text>
          </Flex>
        </Flex>
        <NavLink to="/">About Me</NavLink>
        <NavLink to="/equipment">Equipment</NavLink>
        <NavLink to="/credits">Credits</NavLink>
      </Grid>
      {children}
      <Grid gap={0} sx={{ paddingBottom: 3 }} columns="auto auto auto auto">
        <NavLink as="a" href="https://www.facebook.com/AllisonSoundSpeed/">
          Facebook
        </NavLink>
        <NavLink as="a" href="https://www.instagram.com/allisondecmat/">
          Instagram
        </NavLink>
        <NavLink as="a" href="https://www.linkedin.com/in/allisondm/">
          LinkedIn
        </NavLink>
        <NavLink as="a" href="mailto:allison.dmj@gmail.com">
          Email
        </NavLink>
      </Grid>
    </div>
  )
}

export default Layout
