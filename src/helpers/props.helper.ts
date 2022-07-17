interface AllyReturn {
  [key: string]: string;
}

export const PropsHelper = {
  /**
   * Ally Props
   * @param {number} index
   * @return {AllyReturn}
   */
  a11yProps: (index: number): AllyReturn => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }),
};
