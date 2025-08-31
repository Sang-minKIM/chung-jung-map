import { css, useTheme, type Theme } from '@emotion/react'
import { Flex, type FlexProps } from '~/components/layout/flex'
import { Text } from '~/components/typo/text'

type TagColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy' | 'purple' | 'grey500'

interface TagProps extends FlexProps {
  children: string
  color?: TagColor
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Tag({ children, color = 'green', size = 'md', className, ...rest }: TagProps) {
  const theme = useTheme()
  return (
    <Flex
      align="center"
      justify="center"
      css={(theme: Theme) => [baseTagStyles(theme), sizeStyles[size](theme), colorStyles[color](theme)]}
      className={className}
      {...rest}
    >
      <Text fontSize={theme.fontSizes[size]} fontWeight={theme.fontWeights.medium} color={color}>
        {children}
      </Text>
    </Flex>
  )
}

const baseTagStyles = (theme: Theme) => css`
  border-radius: ${theme.radius.lg};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};
`

const colorStyles = {
  red: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.red} 10%, transparent);
  `,
  orange: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.orange} 10%, transparent);
  `,
  yellow: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.yellow} 10%, transparent);
  `,
  green: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.green} 10%, transparent);
  `,
  blue: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.blue} 10%, transparent);
  `,
  navy: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.navy} 10%, transparent);
  `,
  purple: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.purple} 10%, transparent);
  `,
  grey500: (theme: Theme) => css`
    background-color: color-mix(in srgb, ${theme.colors.grey500} 10%, transparent);
  `,
}

const sizeStyles = {
  sm: (theme: Theme) => css`
    padding: ${theme.space.xs} ${theme.space.sm};
    min-height: 20px;
  `,
  md: (theme: Theme) => css`
    padding: ${theme.space.xs} ${theme.space.md};
    min-height: 24px;
  `,
  lg: (theme: Theme) => css`
    padding: ${theme.space.sm} ${theme.space.lg};
    min-height: 28px;
  `,
}
