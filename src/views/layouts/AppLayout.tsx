'use client';
import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default AppLayout;
