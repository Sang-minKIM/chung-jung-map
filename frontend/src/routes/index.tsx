import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '~/components/layout/flex'
import { Heading } from '~/components/typo/heading'
import { Text } from '~/components/typo/text'

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <Flex direction="column" align="center" justify="center" gap="lg" height="100dvh">
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          청년 정책,
        </Heading>
        <Heading as="h1" fontSize="2xl" fontWeight="bold">
          이제 놓치지 마세요
        </Heading>
      </Flex>
      <Flex align="center" justify="center" gap="lg" height="100dvh">
        <Flex direction="column" align="center" justify="center" gap="lg">
          <Heading as="h2" fontSize="xl" fontWeight="bold">
            정책 탐색
          </Heading>
          <Text as="p" fontSize="lg">
            어려운 청년 정책, 60여 가지의 정책 개요를 통해 쉽게 탐색해보세요.
          </Text>
        </Flex>
      </Flex>
      <Flex align="center" justify="center" gap="lg" height="100dvh">
        <Flex direction="column" align="center" justify="center" gap="lg">
          <Heading as="h2" fontSize="xl" fontWeight="bold">
            공고 탐색
          </Heading>
          <Text as="p" fontSize="lg">
            정책과 관련된 공고를 청정맵 만의 유사도 측정 기술을 통해 추천해드려요.
          </Text>
        </Flex>
      </Flex>
    </>
  ),
})
