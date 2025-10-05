import { css, keyframes, type SerializedStyles } from '@emotion/react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface SlideInConfig {
  delay?: number
  gap?: number
  duration?: number
  direction?: Direction
}

export class SlideInAnimation {
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
        return SlideInAnimation.slideInUp
      case 'down':
        return SlideInAnimation.slideInDown
      case 'left':
        return SlideInAnimation.slideInLeft
      case 'right':
        return SlideInAnimation.slideInRight
      default:
        return SlideInAnimation.slideInUp
    }
  }

  private readonly delay: number
  private readonly gap: number
  private readonly duration: number
  private readonly direction: Direction
  private readonly keyframesAnimation: ReturnType<typeof keyframes>

  constructor({ delay = 0, gap = 0.1, duration = 0.5, direction = 'up' }: SlideInConfig = {}) {
    this.delay = delay
    this.gap = gap
    this.duration = duration
    this.direction = direction
    this.keyframesAnimation = SlideInAnimation.getKeyframes(this.direction)
  }

  at(index: number): SerializedStyles {
    const calculatedDelay = this.delay + index * this.gap

    return css`
      opacity: 0;
      animation: ${this.keyframesAnimation} ${this.duration}s ease-out ${calculatedDelay}s forwards;
    `
  }
}
