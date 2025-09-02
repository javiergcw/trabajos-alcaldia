import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import { Grid } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import SearchHeader from '../components/SearchHeader';
import JobTabs from '../components/JobTabs';
import JobFilters from '../components/JobFilters';
import JobCard from '../components/JobCard';
import Navigation from '../components/Navigation';

interface SearchData {
  query: string;
  industry: string;
  location: string;
}

interface JobFilters {
  jobType: string[];
  workMode: string[];
  categories: string[];
  salary: {
    type: 'hourly' | 'monthly';
    min?: number;
    max?: number;
    range?: string;
  };
}

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  category: string;
  description: string;
  jobType: string;
  salary: string;
  postedTime: string;
  closeDate: string;
  status: 'aplicado' | 'guardado' | 'disponible';
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(0); // Todos los Trabajos por defecto
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPreferences, setSavedPreferences] = useState<string[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    jobType: ['full-time', 'contractor'],
    workMode: ['on-site'],
    categories: ['artificial-intelligence'],
    salary: {
      type: 'monthly',
      range: 'less-than-1k',
    },
  });

  // Datos de ejemplo de trabajos
  const [jobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Desarrollador .Net',
      company: 'Alcaldía de Santa Marta',
      companyLogo: '/company1.png',
      location: 'Santa Marta, Magdalena',
      category: 'desarrollo',
      description: 'Buscamos un desarrollador .Net de nivel intermedio para unirse a nuestro equipo y ayudarnos a crear soluciones tecnológicas innovadoras para la ciudad...',
      jobType: 'Tiempo completo',
      salary: '$2.500.000/mes',
      postedTime: 'hace 21 horas',
      closeDate: '21/01/2025',
      status: 'disponible',
    },
    {
      id: '2',
      title: 'Ingeniero de Inteligencia Artificial',
      company: 'Gobernación de Magdalena',
      companyLogo: '/company2.png',
      location: 'Santa Marta, Magdalena',
      category: 'desarrollo',
      description: 'Buscamos un ingeniero de IA para desarrollar soluciones inteligentes que mejoren los servicios públicos del departamento...',
      jobType: 'Tiempo completo',
      salary: '$3.200.000/mes',
      postedTime: 'hace 21 horas',
      closeDate: '21/01/2025',
      status: 'disponible',
    },
    {
      id: '3',
      title: 'Especialista en Ciberseguridad',
      company: 'Secretaría de Tecnologías de Magdalena',
      companyLogo: '/company3.png',
      location: 'Santa Marta, Magdalena',
      category: 'ciberseguridad',
      description: 'Buscamos un especialista en ciberseguridad para proteger la infraestructura tecnológica del departamento...',
      jobType: 'Tiempo completo',
      salary: '$3.500.000/mes',
      postedTime: 'hace 21 horas',
      closeDate: '21/01/2025',
      status: 'disponible',
    },
    {
      id: '4',
      title: 'Diseñador UI/UX Web',
      company: 'Secretaría de Comunicaciones',
      companyLogo: '/company4.png',
      location: 'Santa Marta, Magdalena',
      category: 'diseño',
      description: 'Buscamos un diseñador web para crear interfaces modernas y atractivas para los portales digitales del gobierno...',
      jobType: 'Tiempo completo',
      salary: '$2.800.000/mes',
      postedTime: 'hace 21 horas',
      closeDate: '23/11/2024',
      status: 'disponible',
    },
    {
      id: '5',
      title: 'Analista de Datos',
      company: 'Secretaría de Planeación',
      companyLogo: '/company5.png',
      location: 'Santa Marta, Magdalena',
      category: 'análisis',
      description: 'Buscamos un analista de datos para procesar información estadística y generar reportes para la toma de decisiones...',
      jobType: 'Tiempo completo',
      salary: '$2.600.000/mes',
      postedTime: 'hace 21 horas',
      closeDate: '23/11/2024',
      status: 'disponible',
    },
  ]);

  const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<string>>(new Set());

  const handleSearch = (searchData: SearchData) => {
    console.log('Búsqueda principal:', searchData);
    // Aquí implementarías la lógica de búsqueda
  };

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Aquí implementarías la lógica de búsqueda en tiempo real
  };

  const handleFiltersChange = (newFilters: JobFilters) => {
    setFilters(newFilters);
    // Aquí implementarías la lógica de filtrado
  };

  const handleBookmark = (jobId: string) => {
    setBookmarkedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const removePreference = (preference: string) => {
    setSavedPreferences(prev => prev.filter(p => p !== preference));
  };

  // Simular preferencias guardadas
  useEffect(() => {
    setSavedPreferences([
      'Cyber Security 1',
      'Data Analyst 1',
      'UI UX 3',
      'Mobile Design, Design & Creative, Australia',
    ]);
  }, []);

  return (
    <Box >

      <SearchHeader onSearch={handleSearch} />

      {/* Pestañas principales - Toman todo el ancho */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 4 }}>
        <JobTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onSearch={handleSearchChange}
          searchQuery={searchQuery}
        />
      </Container>

      {/* Contenido principal */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 2.5fr' },
          gap: 4
        }}>
          {/* Columna izquierda - Filtros */}
          <Box>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Filtros */}
              <JobFilters onFiltersChange={handleFiltersChange} />
            </Box>
          </Box>

          {/* Columna derecha - Lista de trabajos */}
          <Box>
            {/* Ordenar por */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              pb: 2,
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', md: '1.5rem' }
                }}
              >
                {activeTab === 0 && 'Todos los Trabajos'}
                {activeTab === 1 && 'Trabajos Aplicados'}
                {activeTab === 2 && 'Trabajos Guardados'}
              </Typography>

              <FormControl size="medium" sx={{ minWidth: 180 }}>
                <Select
                  value="recent"
                  displayEmpty
                  sx={{
                    textTransform: 'none',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'divider'
                    }
                  }}
                >
                  <MenuItem value="recent">Más Recientes</MenuItem>
                  <MenuItem value="salary-high">Mayor Salario</MenuItem>
                  <MenuItem value="salary-low">Menor Salario</MenuItem>
                  <MenuItem value="deadline">Fecha de Cierre</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Lista de trabajos */}
            <Box sx={{ mb: 4 }}>
              {jobs.map((job) => (
                <Box key={job.id} sx={{ mb: 3 }}>
                  <JobCard
                    job={job}
                    onBookmark={handleBookmark}
                    isBookmarked={bookmarkedJobs.has(job.id)}
                  />
                </Box>
              ))}
            </Box>

            {/* Botón ver todos */}
            {activeTab === 1 && (
              <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 6,
                    py: 2,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  Ver Todos los Trabajos Aplicados
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
