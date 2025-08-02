import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import StarIcon from '@mui/icons-material/Star';
import SquareIcon from '@mui/icons-material/Square';
import PentagonIcon from '@mui/icons-material/Pentagon';
import FilledTriangleIcon from "./Inputs/FilledTriangleIcon";
import { competitorColors as defaultCompetitorColors } from "./styles";

export const competitorIconClasses = [CircleIcon, FilledTriangleIcon, SquareIcon, PentagonIcon, StarIcon];
export const competitorColorsArray = defaultCompetitorColors;

export const getCompetitorIconElement = (
    competitorIndex: number,
    iconProps?: Record<string, any> & { sx?: React.CSSProperties },
    baseIconSx?: React.CSSProperties
  ): React.ReactElement => {
  const IconComponent = competitorIconClasses[competitorIndex % competitorIconClasses.length];
  const color = competitorColorsArray[competitorIndex % competitorColorsArray.length];

  const { sx: sxFromIconProps, ...otherIconProps } = iconProps || {};

  return <IconComponent
    {...otherIconProps} 
    sx={{
      ...(baseIconSx || {}), 
      color,
      ...(sxFromIconProps || {}),
    }}
  />;
};