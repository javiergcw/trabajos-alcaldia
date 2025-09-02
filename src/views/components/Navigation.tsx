'use client';
import React from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import NextLink from 'next/link';

interface NavigationProps {
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  title?: string;
  subtitle?: string;
}

const Navigation = ({ breadcrumbs = [], title, subtitle }: NavigationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 2,
        mb: 3,
      }}
    >
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ mb: 2 }}
          >
            <Link
              component={NextLink}
              href="/"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              <HomeIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
              Inicio
            </Link>
            {breadcrumbs.map((breadcrumb, index) => (
              <Box key={index}>
                {breadcrumb.href ? (
                  <Link
                    component={NextLink}
                    href={breadcrumb.href}
                    color="inherit"
                    sx={{
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {breadcrumb.label}
                  </Link>
                ) : (
                  <Typography color="text.primary" sx={{ fontWeight: 500 }}>
                    {breadcrumb.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Breadcrumbs>
        )}

        {/* Título y subtítulo */}
        {(title || subtitle) && (
          <Box>
            {title && (
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: subtitle ? 1 : 0,
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: isMobile ? '1rem' : '1.125rem',
                  lineHeight: 1.5,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navigation;
