import React from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';

interface SearchHeaderProps {
  onSearch: (searchData: SearchData) => void;
}

interface SearchData {
  query: string;
  industry: string;
  location: string;
}

export default function SearchHeader({ onSearch }: SearchHeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [searchData, setSearchData] = React.useState<SearchData>({
    query: '',
    industry: '',
    location: '',
  });

  const handleSearch = () => {
    onSearch(searchData);
  };

  const handleInputChange = (field: keyof SearchData, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url("/historic.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: { xs: '400px', sm: '500px', md: '600px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        {/* Contenido superior centrado */}
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            pt: { xs: 3, sm: 4, md: 8 },
            pb: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1.5, sm: 2, md: 0 }
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 800,
              mb: { xs: 1.5, sm: 2, md: 3 },
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3.5rem', lg: '4.5rem' },
              lineHeight: { xs: 1.3, sm: 1.25, md: 1.1 },
              letterSpacing: { xs: '-0.01em', md: '-0.02em' },
              px: { xs: 0.5, sm: 1, md: 0 }
            }}
          >
            Encuentra el trabajo que ilumine tu vida
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mb: { xs: 2.5, sm: 3, md: 4 },
              opacity: 0.95,
              fontSize: { xs: '0.875rem', sm: '1.125rem', md: '1.375rem', lg: '1.625rem' },
              fontWeight: 400,
              lineHeight: { xs: 1.6, sm: 1.5, md: 1.4 },
              maxWidth: { xs: '100%', sm: '500px', md: '800px' },
              mx: 'auto',
              px: { xs: 0.5, sm: 1, md: 0 }
            }}
          >
            10k + trabajos para que explores. Ejecuta una búsqueda y encuentra tu próximo trabajo.
          </Typography>
        </Box>
      </Container>

      {/* Buscador posicionado en la parte inferior */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          pb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 0 }
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            borderRadius: { xs: 1.5, sm: 2, md: 3 },
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            mx: { xs: 0, sm: 0, md: 0 },
          }}
        >
          {/* Sección de búsqueda */}
          <Box
            sx={{
              p: { xs: 2, sm: 2.5, md: 4 },
              borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 1.5, sm: 2, md: 3 },
                alignItems: { xs: 'stretch', md: 'center' },
              }}
            >
              <TextField
                fullWidth
                placeholder={isMobile ? "Buscar trabajo..." : "Buscar cualquier cosa..."}
                value={searchData.query}
                onChange={(e) => handleInputChange('query', e.target.value)}
                sx={{ 
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: { xs: 1, sm: 1.5, md: 2 },
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
                size={isMobile ? "small" : "medium"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon 
                        color="action" 
                        sx={{ 
                          fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }} 
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl sx={{ 
                minWidth: { xs: '100%', md: 180 }
              }}>
                <Select
                  value={searchData.industry}
                  onChange={(e: SelectChangeEvent) => handleInputChange('industry', e.target.value)}
                  displayEmpty
                  size={isMobile ? "small" : "medium"}
                  startAdornment={
                    <InputAdornment position="start">
                      <BusinessIcon 
                        color="action" 
                        sx={{ 
                          fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }} 
                      />
                    </InputAdornment>
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: { xs: 1, sm: 1.5, md: 2 },
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                >
                  <MenuItem value="">Industria</MenuItem>
                  <MenuItem value="technology">Tecnología</MenuItem>
                  <MenuItem value="healthcare">Salud</MenuItem>
                  <MenuItem value="finance">Finanzas</MenuItem>
                  <MenuItem value="education">Educación</MenuItem>
                  <MenuItem value="retail">Comercio</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ 
                minWidth: { xs: '100%', md: 180 }
              }}>
                <Select
                  value={searchData.location}
                  onChange={(e: SelectChangeEvent) => handleInputChange('location', e.target.value)}
                  displayEmpty
                  size={isMobile ? "small" : "medium"}
                  startAdornment={
                    <InputAdornment position="start">
                      <LocationIcon 
                        color="action" 
                        sx={{ 
                          fontSize: { xs: '1.25rem', sm: '1.5rem' }
                        }} 
                      />
                    </InputAdornment>
                  }
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: { xs: 1, sm: 1.5, md: 2 },
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                >
                  <MenuItem value="">Ubicación</MenuItem>
                  <MenuItem value="santa-marta">Santa Marta</MenuItem>
                  <MenuItem value="barranquilla">Barranquilla</MenuItem>
                  <MenuItem value="cartagena">Cartagena</MenuItem>
                  <MenuItem value="valledupar">Valledupar</MenuItem>
                  <MenuItem value="riohacha">Riohacha</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={handleSearch}
                sx={{
                  px: { xs: 2, sm: 3, md: 4 },
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  borderRadius: { xs: 1, sm: 1.5, md: 2 },
                  minWidth: { xs: '100%', md: 'auto' },
                  fontSize: { xs: '0.875rem', sm: '0.875rem', md: '1rem' },
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.25)',
                  },
                  transition: 'all 0.2s ease-in-out',
                  height: { xs: '44px', sm: '48px', md: '56px' },
                }}
                startIcon={
                  <SearchIcon 
                    sx={{ 
                      fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }} 
                  />
                }
              >
                {isMobile ? 'Buscar' : 'Buscar'}
              </Button>
            </Box>
          </Box>

          {/* Sección de preferencias guardadas - oculta en móviles muy pequeños */}
          {!isSmallMobile && (
            <Box
              sx={{
                p: { xs: 1.5, sm: 2, md: 3 },
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mr: 1, 
                    fontWeight: 500,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  Preferencias guardadas:
                </Typography>
                {/* Aquí se renderizarán las preferencias guardadas */}
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
