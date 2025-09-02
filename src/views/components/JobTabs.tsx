import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface JobTabsProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`job-tabpanel-${index}`}
      aria-labelledby={`job-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function JobTabs({
  activeTab,
  onTabChange,
  onSearch,
  searchQuery,
}: JobTabsProps) {
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        borderBottom: 2, 
        borderColor: 'divider', 
        mb: 4,
        pb: 1
      }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="job tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              minHeight: 48,
              minWidth: 120,
              color: 'text.secondary',
              px: 3,
              py: 1.5,
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 700,
                background: 'transparent',
                borderRadius: '8px 8px 0 0',
                borderBottom: '3px solid',
                borderColor: 'primary.main',
              },
              '&:hover': {
                color: 'primary.main',
                background: 'rgba(0, 122, 255, 0.04)',
              },
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab label="Todos los Trabajos" />
          <Tab label="Trabajos Aplicados" />
          <Tab label="Trabajos Guardados" />
        </Tabs>
      </Box>
    </Box>
  );
}
