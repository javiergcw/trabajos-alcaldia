'use client';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import Image from 'next/image';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const footerSections = [
    {
      title: 'Para Candidatos',
      links: [
        { text: 'Buscar Trabajos', href: '/search' },
        { text: 'Crear Perfil', href: '/create-account' },
        { text: 'Mi Perfil', href: '/profile' },
        { text: 'Mis Postulaciones', href: '/applications' },
        { text: 'Alertas de Empleo', href: '/job-alerts' },
        { text: 'Consejos de Carrera', href: '/career-tips' },
      ],
    },
    {
      title: 'Para Empresas',
      links: [
        { text: 'Publicar Trabajo', href: '/create-work' },
        { text: 'Buscar Candidatos', href: '/search-candidates' },
        { text: 'Precios', href: '/pricing' },
        { text: 'Recursos Empresariales', href: '/business-resources' },
        { text: 'Panel de Control', href: '/dashboard' },
        { text: 'Soporte Empresarial', href: '/business-support' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { text: 'Blog de Empleo', href: '/blog' },
        { text: 'Guías de Carrera', href: '/career-guides' },
        { text: 'Eventos', href: '/events' },
        { text: 'Centro de Ayuda', href: '/help' },
        { text: 'Preguntas Frecuentes', href: '/faq' },
        { text: 'Contacto', href: '/contact' },
      ],
    },
    {
      title: 'Información Legal',
      links: [
        { text: 'Términos y Condiciones', href: '/terms' },
        { text: 'Política de Privacidad', href: '/privacy' },
        { text: 'Cookies', href: '/cookies' },
        { text: 'Aviso Legal', href: '/legal' },
        { text: 'Accesibilidad', href: '/accessibility' },
        { text: 'Mapa del Sitio', href: '/sitemap' },
      ],
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        {/* Sección principal del footer */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1fr 1fr 1fr 1fr'
          },
          gap: 4,
          mb: 4
        }}>
          {/* Información de la empresa */}
          <Box sx={{ mb: 3 }}>
            <Image
              src="/logos/Logo-PDESM.jpg"
              alt="Logo PDESM"
              width={isMobile ? 200 : 250}
              height={isMobile ? 60 : 80}
              style={{ objectFit: 'contain', marginBottom: '1rem' }}
            />

            <Typography variant="body2" sx={{ mb: 2, color: 'grey.300' }}>
              Tu portal de empleo confiable, conectando talento con oportunidades
              laborales en toda la región. Encuentra tu próximo trabajo o encuentra
              al candidato perfecto para tu empresa.
            </Typography>

            {/* Información de contacto */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationIcon sx={{ mr: 1, fontSize: '1rem', color: '#4A90E2' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  Alcaldía Municipal, Ciudad
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, fontSize: '1rem', color: '#4A90E2' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  +123 456 7890
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1, fontSize: '1rem', color: '#4A90E2' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  info@trabajosalcaldia.com
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Enlaces de navegación */}
          {footerSections.map((section) => (
            <Box key={section.title}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: '#4A90E2',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: 'bold',
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.text} sx={{ mb: 1 }}>
                    <Link
                      href={link.href}
                      sx={{
                        color: 'grey.300',
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#4A90E2',
                          textDecoration: 'underline',
                        },
                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                      }}
                    >
                      {link.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: 'grey.700', mb: 3 }} />

        {/* Sección inferior */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
          gap: 2,
          alignItems: 'center'
        }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'grey.400', textAlign: isMobile ? 'center' : 'left' }}>
              © {new Date().getFullYear()} Trabajos Alcaldía. Todos los derechos reservados.
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            gap: 1,
            pl: { md: 4 }
          }}>
            <Typography variant="body2" sx={{ color: 'grey.400', mr: 2 }}>
              Síguenos:
            </Typography>
            <IconButton
              size="small"
              sx={{ color: 'grey.400', '&:hover': { color: '#4A90E2' } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: 'grey.400', '&:hover': { color: '#4A90E2' } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: 'grey.400', '&:hover': { color: '#4A90E2' } }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: 'grey.400', '&:hover': { color: '#4A90E2' } }}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Sección de colaboración */}
        <Box sx={{
          mt: 4,
          pt: 3,
          borderTop: '1px solid',
          borderColor: 'grey.700',
          textAlign: 'center'
        }}>
          <Typography variant="body2" sx={{ color: 'grey.400', mb: 2 }}>
            En colaboración con:
          </Typography>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
