export type Policy = {
  id: number
  title: string
  category: '금융' | '주거' | '일자리' | '교육' | '생활복지문화' | '참여'
  subCategory: string
  targetGroup: string
  description: string
}

export type PoliciesResponse = {
  success: boolean
  data: Pick<Policy, 'id' | 'title' | 'category' | 'description'>[]
  total: number
  message: string
}
