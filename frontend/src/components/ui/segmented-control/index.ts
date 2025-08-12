import { Root } from './root'
import { Item } from './item'

/**
 * SegmentedControl 합성 컴포넌트
 *
 * @example 비제어
 * ```tsx
 * <SegmentedControl.Root defaultValue="inbox" aria-label="메일함">
 *   <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
 *   <SegmentedControl.Item value="drafts" color="orange">Drafts</SegmentedControl.Item>
 *   <SegmentedControl.Item value="sent" color="blue">Sent</SegmentedControl.Item>
 * </SegmentedControl.Root>
 * ```
 *
 * @example 제어
 * ```tsx
 * const [value, setValue] = useState('inbox')
 * <SegmentedControl.Root value={value} onValueChange={setValue} aria-label="메일함">
 *   <SegmentedControl.Item value="inbox">Inbox</SegmentedControl.Item>
 *   <SegmentedControl.Item value="drafts" color="orange">Drafts</SegmentedControl.Item>
 *   <SegmentedControl.Item value="sent" color="blue">Sent</SegmentedControl.Item>
 * </SegmentedControl.Root>
 * ```
 */
export const SegmentedControl = { Root, Item }
export type { SegmentedRootProps } from './root'
export type { SegmentedItemProps } from './item'
