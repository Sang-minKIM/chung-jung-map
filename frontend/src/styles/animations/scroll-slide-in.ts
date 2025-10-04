import { keyframes, css, type SerializedStyles } from '@emotion/react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface ScrollSlideInConfig {
  direction?: Direction
  defaultRange?: string
  timeline?: string
}

export class ScrollSlideInAnimation {
  private static readonly slideInUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `

  private static readonly slideInDown = keyframes`
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `

  private static readonly slideInLeft = keyframes`
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `

  private static readonly slideInRight = keyframes`
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `

  private static getKeyframes(direction: Direction): ReturnType<typeof keyframes> {
    switch (direction) {
      case 'up':
        return ScrollSlideInAnimation.slideInUp
      case 'down':
        return ScrollSlideInAnimation.slideInDown
      case 'left':
        return ScrollSlideInAnimation.slideInLeft
      case 'right':
        return ScrollSlideInAnimation.slideInRight
      default:
        return ScrollSlideInAnimation.slideInUp
    }
  }

  // Instance 멤버들
  private readonly direction: Direction
  private readonly defaultRange: string
  private readonly timeline: string
  private readonly keyframesAnimation: ReturnType<typeof keyframes>

  // Constructor
  constructor({
    direction = 'up',
    defaultRange = 'entry 0% cover 30%',
    timeline = 'view()',
  }: ScrollSlideInConfig = {}) {
    this.direction = direction
    this.defaultRange = defaultRange
    this.timeline = timeline
    this.keyframesAnimation = ScrollSlideInAnimation.getKeyframes(this.direction)
  }

  // Public 메서드
  apply(range?: string): SerializedStyles {
    const finalRange = range ?? this.defaultRange

    return css`
      opacity: 0;
      animation: ${this.keyframesAnimation} linear both;
      animation-timeline: ${this.timeline};
      animation-range: ${finalRange};
    `
  }
}
