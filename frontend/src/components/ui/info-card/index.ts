import { Root } from './root'
import { Heading } from './heading'
import { Content } from './content'

/**
 * 카드 형태의 정보 UI 컴포넌트
 * 제공된 props 외에 다른 props 변경은 지양해서 공통된 style과 semantic을 유지하는 것을 권장
 *
 * @example
 * ```tsx
 * <InfoCard.Root>
 *   <InfoCard.Heading as="h1" size="lg">제목</InfoCard.Heading>
 *   <InfoCard.Content variant="surface">
 *     카드 내용
 *   </InfoCard.Content>
 * </InfoCard.Root>
 * ```
 *
 */
export const InfoCard = { Root, Heading, Content }
