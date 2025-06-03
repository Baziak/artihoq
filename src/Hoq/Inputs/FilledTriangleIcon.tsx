import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const FilledTriangleIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M12 3.3 L2 20.7 L22 20.7 Z" />
    </SvgIcon>
  );
};

export default FilledTriangleIcon;
