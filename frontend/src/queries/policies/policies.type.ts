type Policy = {
  id: string
  title: string
  category: '금융' | '주거' | '일자리' | '교육' | '생활복지문화' | '참여'
  targetGroup: string
  description: string
}

export type PoliciesResponse = {
  success: boolean
  data: Policy[]
  total: number
  message: string
}
