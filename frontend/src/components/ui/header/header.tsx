import { useState } from 'react'
import { MapPin, Menu, X } from 'lucide-react'
import styled from '@emotion/styled'
import { css, type Theme } from '@emotion/react'

import { Container } from '~/components/layout/container'
import { Link } from '~/components/ui/link'
import { Flex } from '~/components/layout/flex'
import { Heading } from '~/components/typo/heading'
import { Text } from '~/components/typo/text'
import { Button } from '../button'
import { Box } from '~/components/layout/box'
import { Separated } from '~/components/kits/separated'
import { Separator } from '../separator'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <Box as="header" css={headerContainerStyles}>
      <Container>
        <Flex justify="between" align="center" height="64px">
          <Link to="/" css={linkStyles}>
            <LogoWrapper>
              <MapPin color="white" size="20" />
            </LogoWrapper>
            <Flex direction="column" gap="2xs">
              <Heading as="h1" fontSize="lg" fontWeight="bold">
                청정맵
              </Heading>
              <Text fontSize="xs" fontWeight="regular" color="grey500">
                청년 정보 맵
              </Text>
            </Flex>
          </Link>

          <DesktopNav>
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.name}
              </Link>
            ))}
          </DesktopNav>

          <Button variant="ghost" css={mobileMenuButtonStyles} onClick={toggleMenu}>
            {isMenuOpen ? <X size="24" /> : <Menu size="24" />}
          </Button>
        </Flex>

        <MobileNav isOpen={isMenuOpen}>
          <Flex direction="column" gap="lg">
            <Separated by={<Separator size="full" color="grey300" />}>
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
            </Separated>
          </Flex>
        </MobileNav>
      </Container>
    </Box>
  )
}

const navItems = [
  { name: '정책 정보', to: '/policies' as const },
  { name: '공고 정보', to: '/notices' as const },
]

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.radius.md};
  gap: ${({ theme }) => theme.space.sm};
`

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`

const MobileNav = styled.nav<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  background-color: white;
  padding: 16px 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`
const mobileMenuButtonStyles = css`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`

const linkStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: ${theme.space.sm};
  color: ${theme.colors.black};
`

const headerContainerStyles = (theme: Theme) => css`
  width: 100%;
  border-bottom: 1px solid ${theme.colors.grey200};
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: ${theme.shadows.sm};
  background-color: ${theme.colors.white};
`
