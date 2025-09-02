import { MapPin, Mail } from 'lucide-react'
import styled from '@emotion/styled'
import { css, type Theme } from '@emotion/react'

import { Container } from '~/components/layout/container'
import { Flex } from '~/components/layout/flex'
import { Heading } from '~/components/typo/heading'
import { Text } from '~/components/typo/text'
import { Separator } from '../separator/separator'
import { Box } from '~/components/layout/box'

export function Footer() {
  return (
    <Box as="footer" css={footerStyles}>
      <Container>
        <Flex direction="column" justify="center" gap="lg" height="100%">
          <Flex align="center" gap="sm" mb="md">
            <LogoWrapper>
              <MapPin color="white" size="20" />
            </LogoWrapper>
            <Flex direction="column" gap="2xs">
              <Heading as="h1" fontSize="lg" fontWeight="bold" color="grey900">
                청정맵
              </Heading>
              <Text fontSize="xs" color="grey500">
                청년 정보 맵
              </Text>
            </Flex>
          </Flex>

          <Text fontSize="md" color="grey600">
            청년들을 위한 정책 정보를 한눈에 보기 쉽게 정리해서 제공하는 서비스입니다. 지역별 혜택부터 취업, 창업,
            교육까지 다양한 정보를 확인하세요.
          </Text>

          <Flex align="center" gap="sm">
            <Mail size="16" color="#888888" />
            <Text fontSize="sm" color="grey500">
              kimpran@naver.com
            </Text>
          </Flex>

          <Separator size="full" orientation="horizontal" />

          <Flex direction="column" align="center" justify="between" gap="md" py="lg" css={bottomSectionStyles}>
            <Text fontSize="sm" color="grey500">
              © 2025 청정맵. All rights reserved.
            </Text>
            <Text fontSize="sm" color="grey500">
              청년을 위한, 청년에 의한 정보 서비스
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.green};
  border-radius: ${({ theme }) => theme.radius.md};
`

const footerStyles = (theme: Theme) => css`
  width: 100%;
  height: 260px;
  border-top: 1px solid ${theme.colors.grey200};
  background-color: ${theme.colors.grey100};
`

const bottomSectionStyles = css`
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`
