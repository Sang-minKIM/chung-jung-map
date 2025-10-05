import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '~/components/layout/flex'
import { Heading } from '~/components/typo/heading'
import { Text } from '~/components/typo/text'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { css } from '@emotion/react'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Dot } from '~/components/ui/dot'
import type { ComponentProps } from 'react'
import { Building2 } from 'lucide-react'
import { Grid } from '~/components/layout/grid'
import { SlideInAnimation } from '~/styles/animations/slide-in'
import { ScrollSlideInAnimation } from '~/styles/animations/scroll-slide-in'

const introAnimation = new SlideInAnimation({
  duration: 1,
  gap: 0.5,
  direction: 'down',
})

const policyAnimation = new ScrollSlideInAnimation({
  direction: 'left',
  defaultRange: 'entry 0% cover 50%',
  timeline: 'view()',
})

const noticeAnimation = new ScrollSlideInAnimation({
  direction: 'right',
  defaultRange: 'entry 0% cover 50%',
  timeline: 'view()',
})

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <Flex direction="column" align="center" justify="center" gap="sm" height="100dvh">
        <Heading as="h1" fontSize="2xl" fontWeight="bold" css={introAnimation.at(0)}>
          청년 정책,
        </Heading>
        <Heading as="h1" fontSize="2xl" fontWeight="bold" css={introAnimation.at(1)}>
          이제 놓치지 마세요
        </Heading>
        <DotLottieReact
          src="/lottie/location.lottie"
          loop
          autoplay
          css={css`
            height: 50%;
            aspect-ratio: 4/3;
          `}
        />
      </Flex>
      <Flex direction="column" align="center" justify="center" gap="xl" minHeight="100dvh" height="max-content">
        <Flex direction="column" align="center" justify="center" gap="lg">
          <Heading as="h2" fontSize="xl" fontWeight="bold" css={policyAnimation.apply()}>
            정책 탐색
          </Heading>
          <Text as="p" fontSize="lg" css={policyAnimation.apply()}>
            어려운 청년 정책, 60개의 정책 개요를 통해 쉽게 탐색해보세요.
          </Text>
        </Flex>
        <Grid as="ul" width="100%" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg">
          <PolicyCard
            dotColor="green"
            category="일자리"
            title="국민취업지원제도"
            description="맞춤형 취업지원서비스(1:1 심층상담 일경험/직업훈련 연계 컨설팅 등); 구직촉진수당(월 50만원 + 부양가족 1인당 10만원 × 6개월); 취업성공수당 최대 150만원; 취업활동비용 최대"
            css={policyAnimation.apply('entry 10% contain 30%')}
          />
          <PolicyCard
            dotColor="orange"
            category="주거"
            title="버팀목대출(청년)"
            description="2.2~3.3% 금리로 최장 10년간 전세자금 대출"
            css={policyAnimation.apply('entry 20% contain 30%')}
          />
          <PolicyCard
            dotColor="yellow"
            category="금융"
            title="청년도약계좌"
            description="월 1천원~70만원 자유 납입; 정부기여금 3~6% + 이자소득 비과세; 5년 만기"
            css={policyAnimation.apply('entry 30% contain 30%')}
          />
        </Grid>
      </Flex>
      <Flex direction="column" align="center" justify="center" gap="xl" minHeight="100dvh" height="max-content">
        <Flex direction="column" align="center" justify="center" gap="lg">
          <Heading as="h2" fontSize="xl" fontWeight="bold" css={noticeAnimation.apply()}>
            공고 탐색
          </Heading>
          <Text as="p" fontSize="lg" css={noticeAnimation.apply()}>
            정책과 관련된 공고를 청정맵 만의 유사도 측정 기술을 통해 추천해드려요.
          </Text>
        </Flex>
        <Grid as="ul" width="100%" templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="lg">
          <NoticeCard
            dotColor="green"
            category="취업"
            title="국민취업지원제도"
            description="청년실업자 등에게 원하는 일자리를 찾을 수 있도록 취업지원서비스와 소득지원을 함께 제공하여 노동시장 진입촉진과 경제적 자립기반 마련"
            supervisingInstitution="고용노동부"
            css={noticeAnimation.apply('entry 0% contain 30%')}
          />
          <NoticeCard
            dotColor="orange"
            category="주거"
            title="청년층 임대주택 공급 확대"
            description="저소득 서민, 청년, 신혼부부, 장애인, 국가유공자 등 주거취약계층을 통합한 통합공공임대주택 공급으로 주거안정 및 주거환경 개선 도모"
            supervisingInstitution="주택정책과"
            css={noticeAnimation.apply('entry 20% contain 30%')}
          />
          <NoticeCard
            dotColor="yellow"
            category="금융"
            title="청년 자산형성 지원(청년도약계좌)"
            description="만기 5년 동안 매월 70만원 한도 내에서 자유롭게 납입 가능한 정부지원형 적금상품으로 청년의 중장기 자산형성을 지원합니다."
            supervisingInstitution="금융위원회"
            css={noticeAnimation.apply('entry 30% contain 30%')}
          />
        </Grid>
      </Flex>
    </>
  ),
})

interface PolicyCardProps {
  dotColor: ComponentProps<typeof Dot>['color']
  category: string
  title: string
  description: string
}

const PolicyCard = ({ dotColor, category, title, description, ...rest }: PolicyCardProps) => {
  return (
    <Card variant="surface" as="li" p="xl" minHeight="280px" {...rest}>
      <Flex direction="column" justify="between" height="100%">
        <Flex direction="column" gap="xl">
          <Flex align="center" gap="sm">
            <Dot color={dotColor} size="md" />
            <Text fontSize="sm" fontWeight="semibold">
              {category}
            </Text>
          </Flex>
          <Text fontSize="md" fontWeight="bold">
            {title}
          </Text>
          <Text
            fontSize="sm"
            color="grey600"
            css={css`
              line-height: 1.6;
              word-break: keep-all;
            `}
          >
            {description}
          </Text>
        </Flex>

        <Flex gap="sm">
          <Button variant="outline" size="sm" disabled>
            <Text fontSize="sm" fontWeight="semibold" p="xs">
              자세히 보기
            </Text>
          </Button>
          <Button size="sm" disabled>
            <Text fontSize="sm" fontWeight="semibold" p="xs" color="inherit">
              관련 공고 보기
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}

interface NoticeCardProps {
  dotColor: ComponentProps<typeof Dot>['color']
  category: string
  title: string
  description: string
  supervisingInstitution: string
}

const NoticeCard = ({ dotColor, category, title, description, supervisingInstitution, ...rest }: NoticeCardProps) => {
  return (
    <Card as="li" variant="basic" p="xl" minHeight="280px" {...rest}>
      <Flex direction="column" justify="between" height="100%">
        <Flex align="center" gap="sm">
          <Dot color={dotColor} size="md" />
          <Text fontSize="sm" fontWeight="semibold">
            {category}
          </Text>
        </Flex>
        <Text fontSize="md" fontWeight="bold">
          {title}
        </Text>
        <Text
          fontSize="sm"
          color="grey600"
          css={css`
            line-height: 1.6;
            word-break: keep-all;
          `}
        >
          {description}
        </Text>

        <Flex align="center" gap="xs">
          <Building2 size={16} color="var(--grey-600)" />
          <Text fontSize="sm" fontWeight="regular" p="xs" color="grey600">
            {supervisingInstitution}
          </Text>
        </Flex>

        <Button size="sm" disabled>
          <Text fontSize="sm" fontWeight="semibold">
            자세히 보기
          </Text>
        </Button>
      </Flex>
    </Card>
  )
}
