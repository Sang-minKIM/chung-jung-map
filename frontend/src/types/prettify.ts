/**
 * @description 표시용 타입: 교차/중첩으로 복잡해진 T를 객체 리터럴 형태로 '펼쳐' 보여준다.
 * 타입 의미는 유지하고, IDE 표시만 깔끔하게 만든다.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
