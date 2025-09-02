import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Button,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputAdornment,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface JobFiltersProps {
  onFiltersChange: (filters: JobFilters) => void;
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

export default function JobFilters({ onFiltersChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    jobType: ['full-time', 'contractor'],
    workMode: ['on-site'],
    categories: ['artificial-intelligence'],
    salary: {
      type: 'monthly',
      range: 'less-than-1k',
    },
  });

  const handleFilterChange = (category: keyof JobFilters, value: any) => {
    const newFilters = { ...filters, [category]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleArrayFilterChange = (category: keyof JobFilters, value: string, checked: boolean) => {
    const currentValues = filters[category] as string[];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    handleFilterChange(category, newValues);
  };

  const clearFilters = () => {
    const clearedFilters: JobFilters = {
      jobType: [],
      workMode: [],
      categories: [],
      salary: {
        type: 'monthly',
      },
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Paper elevation={0} sx={{
      p: 2.5,
      height: 'fit-content',
      background: 'transparent',
      borderRadius: 2,
      border: '1px solid rgba(0, 0, 0, 0.08)',
    }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'text.primary',
          mb: 1.5,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Filtrado por
        </Typography>
      </Box>

      {/* Búsqueda */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Tipo de Trabajo */}
      <Accordion defaultExpanded sx={{ background: 'transparent', boxShadow: 'none', mb: 1.5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight="bold">
            Tipo de Trabajo
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.jobType.includes('full-time')}
                  onChange={(e) => handleArrayFilterChange('jobType', 'full-time', e.target.checked)}
                />
              }
              label={`Tiempo completo (102)`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.jobType.includes('part-time')}
                  onChange={(e) => handleArrayFilterChange('jobType', 'part-time', e.target.checked)}
                />
              }
              label={`Medio tiempo (98)`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.jobType.includes('contractor')}
                  onChange={(e) => handleArrayFilterChange('jobType', 'contractor', e.target.checked)}
                />
              }
              label={`Contratista (77)`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.jobType.includes('freelancer')}
                  onChange={(e) => handleArrayFilterChange('jobType', 'freelancer', e.target.checked)}
                />
              }
              label={`Freelancer (36)`}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Modalidad de Trabajo */}
      <Accordion sx={{ background: 'transparent', boxShadow: 'none', mb: 1.5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight="bold">
            Presencial / Remoto
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.workMode.includes('remote')}
                  onChange={(e) => handleArrayFilterChange('workMode', 'remote', e.target.checked)}
                />
              }
              label={`Remoto (212)`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.workMode.includes('on-site')}
                  onChange={(e) => handleArrayFilterChange('workMode', 'on-site', e.target.checked)}
                />
              }
              label={`Presencial (172)`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.workMode.includes('hybrid')}
                  onChange={(e) => handleArrayFilterChange('workMode', 'hybrid', e.target.checked)}
                />
              }
              label={`Híbrido (322)`}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Categorías */}
      <Accordion sx={{ background: 'transparent', boxShadow: 'none', mb: 1.5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight="bold">
            Categorías
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.categories.includes('accounting')}
                  onChange={(e) => handleArrayFilterChange('categories', 'accounting', e.target.checked)}
                />
              }
              label="Contabilidad"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.categories.includes('artificial-intelligence')}
                  onChange={(e) => handleArrayFilterChange('categories', 'artificial-intelligence', e.target.checked)}
                />
              }
              label="Inteligencia Artificial"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.categories.includes('cyber-security')}
                  onChange={(e) => handleArrayFilterChange('categories', 'cyber-security', e.target.checked)}
                />
              }
              label="Ciberseguridad"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.categories.includes('design')}
                  onChange={(e) => handleArrayFilterChange('categories', 'design', e.target.checked)}
                />
              }
              label="Diseño"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Salario */}
      <Accordion sx={{ background: 'transparent', boxShadow: 'none', mb: 1.5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2" fontWeight="bold">
            Salario
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.salary.type === 'hourly'}
                  onChange={() => handleFilterChange('salary', { ...filters.salary, type: 'hourly' })}
                />
              }
              label="Por Hora (212)"
            />
            {filters.salary.type === 'hourly' && (
              <Box sx={{ ml: 3, mt: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    size="small"
                    placeholder="$ min /hr"
                    sx={{ width: '50%' }}
                    type="number"
                    value={filters.salary.min || ''}
                    onChange={(e) => handleFilterChange('salary', { ...filters.salary, min: Number(e.target.value) })}
                  />
                  <Typography>/</Typography>
                  <TextField
                    size="small"
                    placeholder="$ max /hr"
                    sx={{ width: '50%' }}
                    type="number"
                    value={filters.salary.max || ''}
                    onChange={(e) => handleFilterChange('salary', { ...filters.salary, max: Number(e.target.value) })}
                  />
                </Box>
              </Box>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.salary.type === 'monthly'}
                  onChange={() => handleFilterChange('salary', { ...filters.salary, type: 'monthly' })}
                />
              }
              label="Mensual (432)"
            />
            {filters.salary.type === 'monthly' && (
              <Box sx={{ ml: 3, mt: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.salary.range === 'less-than-1k'}
                      onChange={() => handleFilterChange('salary', { ...filters.salary, range: 'less-than-1k' })}
                    />
                  }
                  label="Menos de $1k (432)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.salary.range === '1k-2k'}
                      onChange={() => handleFilterChange('salary', { ...filters.salary, range: '1k-2k' })}
                    />
                  }
                  label="$1k - $2k (32)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.salary.range === '2k-5k'}
                      onChange={() => handleFilterChange('salary', { ...filters.salary, range: '2k-5k' })}
                    />
                  }
                  label="$2k - $5k (132)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.salary.range === '5k-plus'}
                      onChange={() => handleFilterChange('salary', { ...filters.salary, range: '5k-plus' })}
                    />
                  }
                  label="$5k+ (111)"
                />
              </Box>
            )}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        fullWidth
        onClick={() => onFiltersChange(filters)}
        sx={{
          py: 1.5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
          fontWeight: 700,
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: '0 4px 15px rgba(0, 122, 255, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 122, 255, 0.4)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          mb: 2,
        }}
      >
        Aplicar Filtros
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={clearFilters}
        sx={{
          py: 1.5,
          fontSize: '0.875rem',
          borderRadius: 2,
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: 'text.secondary',
          fontWeight: 600,
          '&:hover': {
            borderColor: '#f44336',
            background: 'rgba(244, 67, 54, 0.08)',
            color: '#f44336',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        Limpiar Filtros
      </Button>
    </Paper>
  );
}
