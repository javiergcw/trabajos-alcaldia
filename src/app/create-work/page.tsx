'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Divider,
  Grid,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
  InputAdornment,
  Slider,
  Switch,
  LinearProgress,
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  School as EducationIcon,
  Star as StarIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import AppLayout from '@/views/layouts/AppLayout';

interface JobData {
  // Información básica del trabajo
  title: string;
  company: string;
  location: string;
  jobType: string;
  workMode: string;
  category: string;

  // Salario y beneficios
  salaryType: 'hourly' | 'monthly' | 'project';
  salaryMin: number;
  salaryMax: number;
  benefits: string[];

  // Descripción y requisitos
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];

  // Información adicional
  experienceLevel: string;
  educationLevel: string;
  applicationDeadline: string;
  startDate: string;
  isRemote: boolean;
  isUrgent: boolean;
}

export default function CreateWorkPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    company: '',
    location: '',
    jobType: '',
    workMode: '',
    category: '',
    salaryType: 'monthly',
    salaryMin: 0,
    salaryMax: 0,
    benefits: [],
    description: '',
    requirements: [],
    responsibilities: [],
    skills: [],
    experienceLevel: '',
    educationLevel: '',
    applicationDeadline: '',
    startDate: '',
    isRemote: false,
    isUrgent: false,
  });

  const [tempData, setTempData] = useState<JobData>(jobData);
  const [newRequirement, setNewRequirement] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const steps = [
    'Información Básica',
    'Salario y Beneficios',
    'Descripción del Trabajo',
    'Requisitos y Habilidades',
    'Información Adicional',
    'Revisar y Publicar'
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (field: keyof JobData, value: any) => {
    setTempData({ ...tempData, [field]: value });
  };

  const handleBenefitsChange = (benefit: string, checked: boolean) => {
    const newBenefits = checked
      ? [...tempData.benefits, benefit]
      : tempData.benefits.filter(b => b !== benefit);
    setTempData({ ...tempData, benefits: newBenefits });
  };

  const handleSkillsChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...tempData.skills, skill]
      : tempData.skills.filter(s => s !== skill);
    setTempData({ ...tempData, skills: newSkills });
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setTempData({
        ...tempData,
        requirements: [...tempData.requirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    const newRequirements = tempData.requirements.filter((_, i) => i !== index);
    setTempData({ ...tempData, requirements: newRequirements });
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setTempData({
        ...tempData,
        responsibilities: [...tempData.responsibilities, newResponsibility.trim()]
      });
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    const newResponsibilities = tempData.responsibilities.filter((_, i) => i !== index);
    setTempData({ ...tempData, responsibilities: newResponsibilities });
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return tempData.title && tempData.company && tempData.location && tempData.jobType && tempData.workMode && tempData.category;
      case 1:
        return tempData.salaryMin > 0 && tempData.salaryMax >= tempData.salaryMin;
      case 2:
        return tempData.description.length > 50;
      case 3:
        return tempData.requirements.length > 0 && tempData.skills.length > 0;
      case 4:
        return tempData.experienceLevel && tempData.educationLevel && tempData.applicationDeadline;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    setJobData(tempData);
    console.log('Trabajo creado:', tempData);
    // Aquí iría la lógica para enviar al backend
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Información Básica del Trabajo
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Título del Trabajo"
                  value={tempData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  size="medium"
                  placeholder="Ej: Desarrollador Full Stack"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Empresa"
                  value={tempData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  size="medium"
                  placeholder="Ej: Alcaldía de Santa Marta"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Ubicación"
                  value={tempData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  size="medium"
                  placeholder="Ej: Santa Marta, Magdalena"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box>
                <FormControl fullWidth size="medium">
                  <InputLabel>Tipo de Trabajo</InputLabel>
                  <Select
                    value={tempData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    label="Tipo de Trabajo"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="full-time">Tiempo completo</MenuItem>
                    <MenuItem value="part-time">Medio tiempo</MenuItem>
                    <MenuItem value="contractor">Contratista</MenuItem>
                    <MenuItem value="freelancer">Freelancer</MenuItem>
                    <MenuItem value="internship">Pasantía</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl fullWidth size="medium">
                  <InputLabel>Modalidad de Trabajo</InputLabel>
                  <Select
                    value={tempData.workMode}
                    onChange={(e) => handleInputChange('workMode', e.target.value)}
                    label="Modalidad de Trabajo"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="on-site">Presencial</MenuItem>
                    <MenuItem value="remote">Remoto</MenuItem>
                    <MenuItem value="hybrid">Híbrido</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl fullWidth size="medium">
                  <InputLabel>Categoría</InputLabel>
                  <Select
                    value={tempData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    label="Categoría"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="development">Desarrollo</MenuItem>
                    <MenuItem value="design">Diseño</MenuItem>
                    <MenuItem value="marketing">Marketing</MenuItem>
                    <MenuItem value="sales">Ventas</MenuItem>
                    <MenuItem value="administration">Administración</MenuItem>
                    <MenuItem value="customer-service">Atención al Cliente</MenuItem>
                    <MenuItem value="other">Otros</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Salario y Beneficios
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              <Box>
                <FormControl fullWidth size="medium">
                  <InputLabel>Tipo de Salario</InputLabel>
                  <Select
                    value={tempData.salaryType}
                    onChange={(e) => handleInputChange('salaryType', e.target.value)}
                    label="Tipo de Salario"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="hourly">Por Hora</MenuItem>
                    <MenuItem value="monthly">Mensual</MenuItem>
                    <MenuItem value="project">Por Proyecto</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={tempData.isUrgent}
                      onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                      size="medium"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      Trabajo Urgente
                    </Typography>
                  }
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label={`Salario Mínimo (${tempData.salaryType === 'hourly' ? '/hr' : tempData.salaryType === 'monthly' ? '/mes' : '/proyecto'})`}
                  type="number"
                  value={tempData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', Number(e.target.value))}
                  size="medium"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label={`Salario Máximo (${tempData.salaryType === 'hourly' ? '/hr' : tempData.salaryType === 'monthly' ? '/mes' : '/proyecto'})`}
                  type="number"
                  value={tempData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', Number(e.target.value))}
                  size="medium"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Beneficios Ofrecidos
                </Typography>
                <FormGroup sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1 }}>
                  {['Seguro médico', 'Vacaciones pagadas', 'Bonos de rendimiento', 'Capacitación', 'Horario flexible', 'Teletrabajo', 'Comida subsidiada', 'Transporte', 'Gimnasio'].map((benefit) => (
                    <FormControlLabel
                      key={benefit}
                      control={
                        <Checkbox
                          checked={tempData.benefits.includes(benefit)}
                          onChange={(e) => handleBenefitsChange(benefit, e.target.checked)}
                          size="small"
                        />
                      }
                      label={benefit}
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Descripción del Trabajo
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Descripción del Trabajo"
                  value={tempData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  size="medium"
                  multiline
                  rows={6}
                  placeholder="Describe detalladamente el trabajo, las responsabilidades principales, el ambiente de trabajo y cualquier información relevante..."
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Responsabilidades Principales
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Agregar nueva responsabilidad..."
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <Button
                      variant="contained"
                      onClick={addResponsibility}
                      startIcon={<AddIcon />}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
                        },
                      }}
                    >
                      Agregar
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {tempData.responsibilities.map((responsibility, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, background: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                        <Typography variant="body2" sx={{ flex: 1, fontSize: '0.875rem' }}>
                          {responsibility}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeResponsibility(index)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Requisitos y Habilidades
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Requisitos del Candidato
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Agregar nuevo requisito..."
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <Button
                      variant="contained"
                      onClick={addRequirement}
                      startIcon={<AddIcon />}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
                        },
                      }}
                    >
                      Agregar
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {tempData.requirements.map((requirement, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, background: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                        <Typography variant="body2" sx={{ flex: 1, fontSize: '0.875rem' }}>
                          {requirement}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeRequirement(index)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                  Habilidades Técnicas
                </Typography>
                <FormGroup sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1 }}>
                  {['React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'Docker', 'Git', 'Agile', 'Scrum'].map((skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={tempData.skills.includes(skill)}
                          onChange={(e) => handleSkillsChange(skill, e.target.checked)}
                          size="small"
                        />
                      }
                      label={skill}
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Box>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Información Adicional
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              <Box>
                <FormControl fullWidth size="medium">
                  <InputLabel>Nivel de Experiencia</InputLabel>
                  <Select
                    value={tempData.experienceLevel}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    label="Nivel de Experiencia"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="entry">Sin experiencia</MenuItem>
                    <MenuItem value="junior">Junior (1-2 años)</MenuItem>
                    <MenuItem value="mid">Intermedio (3-5 años)</MenuItem>
                    <MenuItem value="senior">Senior (5+ años)</MenuItem>
                    <MenuItem value="lead">Líder de equipo</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl fullWidth size="medium">
                  <InputLabel>Nivel de Educación</InputLabel>
                  <Select
                    value={tempData.educationLevel}
                    onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                    label="Nivel de Educación"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="high-school">Bachillerato</MenuItem>
                    <MenuItem value="technical">Técnico</MenuItem>
                    <MenuItem value="bachelor">Pregrado</MenuItem>
                    <MenuItem value="master">Maestría</MenuItem>
                    <MenuItem value="phd">Doctorado</MenuItem>
                    <MenuItem value="not-required">No requerido</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Fecha de Cierre de Postulaciones"
                  type="date"
                  value={tempData.applicationDeadline}
                  onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                  size="medium"
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Fecha de Inicio"
                  type="date"
                  value={tempData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  size="medium"
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>

              <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={tempData.isRemote}
                      onChange={(e) => handleInputChange('isRemote', e.target.checked)}
                      size="medium"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                      Permite trabajo remoto
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </Box>
        );

      case 5:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Revisar y Publicar
            </Typography>

            <Paper elevation={0} sx={{ p: 3, background: 'rgba(25, 118, 210, 0.04)', border: '1px solid rgba(25, 118, 210, 0.2)', borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                Resumen del Trabajo
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Título
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {tempData.title}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Empresa
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {tempData.company}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Ubicación
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {tempData.location}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Salario
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    ${tempData.salaryMin.toLocaleString()} - ${tempData.salaryMax.toLocaleString()}
                    {tempData.salaryType === 'hourly' ? '/hr' : tempData.salaryType === 'monthly' ? '/mes' : '/proyecto'}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', textAlign: 'center' }}>
              Revisa toda la información antes de publicar. Una vez publicado, el trabajo será visible para todos los candidatos.
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <br />
      <Box sx={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Banner Header similar al del home */}


        {/* Contenido principal */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper elevation={0} sx={{
            p: { xs: 3, sm: 4 },
            background: 'transparent',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: 2
          }}>
            {/* Stepper grande */}
            <Box sx={{ mb: 6 }}>
              {/* Indicador del paso actual */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Paso {activeStep + 1} de {steps.length}
                </Typography>
                <Chip
                  label={steps[activeStep]}
                  sx={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                />
              </Box>

              {/* Barra de progreso */}
              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={((activeStep + 1) / steps.length) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(0, 0, 0, 0.08)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>

              {/* Porcentaje de progreso */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  Progreso de la publicación
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem' }}>
                  {Math.round(((activeStep + 1) / steps.length) * 100)}%
                </Typography>
              </Box>
            </Box>

            {/* Contenido del paso */}
            {renderStepContent()}

            {/* Botones de navegación */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
              <Button

                onClick={handleBack}
                startIcon={<ArrowBackIcon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                  borderColor: 'rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.4)',
                  },
                }}
                variant="outlined"
              >
                Anterior
              </Button>

              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}

                    endIcon={<CheckIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 122, 255, 0.4)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Publicar Trabajo
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}

                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 122, 255, 0.4)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Siguiente
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </AppLayout>
  );
}
