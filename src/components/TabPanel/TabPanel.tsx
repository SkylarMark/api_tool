import React, { ReactElement, ReactNode } from 'react';
import { Box } from '@mui/material';

export interface TabPanelProps {
  index: number;
  value: number;
  children?: ReactNode;
}

/**
 * Tab Panel for Tabs
 * @param {TabPanelProps} props
 * @return {ReactElement}
 */
export function TabPanel(props: TabPanelProps): ReactElement {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.defaultProps = {
  children: null,
};
