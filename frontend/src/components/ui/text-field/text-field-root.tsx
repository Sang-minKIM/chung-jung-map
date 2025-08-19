import { css, type Theme } from '@emotion/react'
import { Flex, type FlexProps } from '~/components/layout/flex'

export interface TextFieldRootProps extends FlexProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outline' | 'filled' | 'ghost'
  color?: 'default' | 'error' | 'success' | 'warning'
}

export function TextFieldRoot({
  size = 'md',
  variant = 'outline',
  color = 'default',
  align = 'center',
  ...rest
}: TextFieldRootProps) {
  return <Flex align={align} css={rootStyles} data-size={size} data-variant={variant} data-color={color} {...rest} />
}

const rootStyles = (theme: Theme) => css`
  position: relative;
  width: 100%;
  border-radius: ${theme.radius.md};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.easeInOut};

  &[data-size='sm'] {
    min-height: ${theme.componentSizes.sm.height};
    font-size: ${theme.fontSizes.sm};
  }

  &[data-size='md'] {
    min-height: ${theme.componentSizes.md.height};
    font-size: ${theme.fontSizes.md};
  }

  &[data-size='lg'] {
    min-height: ${theme.componentSizes.lg.height};
    font-size: ${theme.fontSizes.lg};
  }

  &[data-variant='outline'] {
    border: 1px solid ${theme.colors.grey300};
    background-color: transparent;

    &:focus-within {
      border-color: ${theme.colors.green};
      box-shadow: ${theme.shadows.focus};
    }
  }

  &[data-variant='filled'] {
    border: 1px solid transparent;
    background-color: ${theme.colors.grey100};

    &:focus-within {
      background-color: ${theme.colors.white};
      border-color: ${theme.colors.green};
      box-shadow: ${theme.shadows.focus};
    }
  }

  &[data-variant='ghost'] {
    border: 1px solid transparent;
    background-color: transparent;

    &:focus-within {
      background-color: ${theme.colors.grey100};
    }
  }

  &[data-color='error'] {
    border-color: ${theme.colors.red};

    &:focus-within {
      border-color: ${theme.colors.red};
      box-shadow: 0 0 0 1px ${theme.colors.red};
    }
  }

  &[data-color='success'] {
    border-color: ${theme.colors.green};

    &:focus-within {
      border-color: ${theme.colors.green};
      box-shadow: 0 0 0 1px ${theme.colors.green};
    }
  }

  &[data-color='warning'] {
    border-color: ${theme.colors.yellow};

    &:focus-within {
      border-color: ${theme.colors.yellow};
      box-shadow: 0 0 0 1px ${theme.colors.yellow};
    }
  }
`
