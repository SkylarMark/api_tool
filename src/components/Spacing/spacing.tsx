import { Box, styled, Theme } from '@mui/material';

interface ISpacingProps {
  theme?: Theme;
  spacing: number;
  variant?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'horizontal'
    | 'vertical'
    | 'all';
}

export const Spacing = styled(Box)(
  ({ theme, spacing = 3, variant }: ISpacingProps) => {
    switch (variant) {
      case 'top':
        return {
          marginTop: theme?.spacing(spacing),
        };
      case 'bottom':
        return {
          marginBottom: theme?.spacing(spacing),
        };
      case 'right':
        return {
          marginRight: theme?.spacing(spacing),
        };
      case 'left':
        return {
          marginLeft: theme?.spacing(spacing),
        };
      case 'horizontal':
        return {
          marginRight: theme?.spacing(spacing),
          marginLeft: theme?.spacing(spacing),
        };
      case 'vertical':
        return {
          marginTop: theme?.spacing(spacing),
          marginBottom: theme?.spacing(spacing),
        };
      default:
        return {
          margin: theme?.spacing(spacing),
        };
    }
  },
);
