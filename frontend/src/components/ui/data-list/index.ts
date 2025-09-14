import { Root } from './root'
import { Item } from './item'
import { Label } from './label'
import { Value } from './value'

/**
 * DataList 합성 컴포넌트
 *
 * @example 기본 사용
 * ```tsx
 * <DataList.Root>
 *   <DataList.Item>
 *     <DataList.Label>신청 기간</DataList.Label>
 *     <DataList.Value>2024-01-01 ~ 2024-01-31</DataList.Value>
 *   </DataList.Item>
 * </DataList.Root>
 * ```
 *
 * @example 아이콘과 함께 사용
 * ```tsx
 * <DataList.Root>
 *   <DataList.Item>
 *     <DataList.Label Icon={Calendar}>신청 기간</DataList.Label>
 *     <DataList.Value>2024-01-01 ~ 2024-01-31</DataList.Value>
 *   </DataList.Item>
 * </DataList.Root>
 * ```
 */
export const DataList = { Root, Item, Label, Value }
