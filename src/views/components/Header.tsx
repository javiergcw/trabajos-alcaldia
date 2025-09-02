'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleCreateWorkClick = () => {
    router.push('/create-work');
  };

  const handleProfileClick = () => {
    router.push('/profile');
    handleProfileMenuClose();
  };

  const handleCreateAccountClick = () => {
    router.push('/create-account');
  };

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Buscar Trabajos', path: '/search' },
    { text: 'Empresas', path: '/companies' },
    { text: 'Mi Perfil', path: '/profile' },
    { text: 'Crear Cuenta', path: '/create-account' },
    { text: 'Publicar Trabajo', path: '/create-work' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%' }}>
      {/* Header del drawer con logo */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
      }}>
        <Image
          src="/logos/Logo vertical-APDESM.png"
          alt="Logo Alcaldía"
          width={140}
          height={90}
          style={{ objectFit: 'contain' }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.1rem',
              color: 'text.primary',
              mb: 0.5
            }}
          >
            Alcaldía del Magdalena
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '0.8rem',
              fontWeight: 400,
              display: 'block'
            }}
          >
            Tu portal de empleo confiable
          </Typography>
        </Box>
      </Box>
      
      {/* Lista de navegación */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => router.push(item.path)}
                sx={{ 
                  textAlign: 'left',
                  borderRadius: 2,
                  mx: 1.5,
                  py: 1.75,
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    color: 'primary.main',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 500,
                      fontSize: '1rem',
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer del drawer */}
      <Box sx={{ 
        p: 2, 
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
      }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: 'text.secondary',
            fontSize: '0.75rem',
            textAlign: 'center',
            display: 'block'
          }}
        >
          © 2024 Alcaldía del Magdalena
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: theme.zIndex.drawer + 1,
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo y Título */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
                transition: 'opacity 0.2s ease-in-out',
              }}
              onClick={handleLogoClick}
            >
              <Image
                src="/logos/Logo vertical-APDESM.png"
                alt="Logo Alcaldía"
                width={isMobile ? 70 : 90}
                height={isMobile ? 50 : 70}
                style={{ objectFit: 'contain' }}
              />
              {!isMobile && (
                <Box>
                  
                    <Typography variant="h6">Alcaldía del Magdalena</Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: isTablet ? '0.7rem' : '0.8rem',
                      fontWeight: 400,
                    }}
                  >
                    Tu portal de empleo confiable
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Navegación Desktop */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Button 
                  color="inherit" 
                  startIcon={<PersonIcon />}
                  onClick={handleCreateAccountClick}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 400,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2.5,
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      color: 'text.primary',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Registro
                </Button>
                <Button 
                  color="inherit" 
                  startIcon={<WorkIcon />}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 400,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2.5,
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      color: 'text.primary',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Trabajos
                </Button>
                <Button 
                  color="inherit" 
                  startIcon={<BusinessIcon />}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 400,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2.5,
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      color: 'text.primary',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Empresas
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleCreateWorkClick}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3.5,
                    py: 1.2,
                    borderRadius: 3,
                    boxShadow: '0 1px 3px rgba(0, 122, 255, 0.12)',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 122, 255, 0.2)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Publicar Trabajo
                </Button>
                <IconButton 
                  color="inherit"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      color: 'text.primary',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <NotificationsIcon />
                </IconButton>
                <IconButton 
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      color: 'text.primary',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Box>
            )}

            {/* Botón de menú móvil */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.03)',
                    color: 'text.primary',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menú de perfil */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid',
            borderColor: 'divider',
            minWidth: 200,
          }
        }}
      >
        <MenuItem 
          onClick={handleProfileClick}
          sx={{
            py: 1.5,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <PersonIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
          <Typography sx={{ fontWeight: 500 }}>Mi Perfil</Typography>
        </MenuItem>
        <MenuItem 
          onClick={handleProfileMenuClose}
          sx={{
            py: 1.5,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <WorkIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
          <Typography sx={{ fontWeight: 500 }}>Mis Postulaciones</Typography>
        </MenuItem>
        <MenuItem 
          onClick={handleProfileMenuClose}
          sx={{
            py: 1.5,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <BusinessIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
          <Typography sx={{ fontWeight: 500 }}>Mi Empresa</Typography>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem 
          onClick={handleProfileMenuClose}
          sx={{
            py: 1.5,
            color: 'error.main',
            '&:hover': {
              backgroundColor: alpha(theme.palette.error.main, 0.08),
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>

      {/* Drawer móvil */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          zIndex: theme.zIndex.drawer + 2,
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
            zIndex: theme.zIndex.drawer + 2,
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Espacio para el contenido */}
      <Toolbar sx={{ minHeight: { xs: '60px', md: '70px' } }} />
    </>
  );
};

export default Header;
