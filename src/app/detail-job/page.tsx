'use client';
import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  BookmarkBorder as BookmarkIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  Event as EventIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useSearchParams, useRouter } from 'next/navigation';
import AppLayout from '@/views/layouts/AppLayout';

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

function JobDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('id');
  
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    cvFile: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos de ejemplo del trabajo (en un caso real esto vendría de una API)
  const [job] = useState<Job | null>(() => {
    // Simular datos del trabajo basado en el ID
    if (jobId === '1') {
      return {
        id: '1',
        title: 'Desarrollador .Net',
        company: 'Alcaldía de Santa Marta',
        companyLogo: '/company1.png',
        location: 'Santa Marta, Magdalena',
        category: 'desarrollo',
        description: 'Buscamos un desarrollador .Net de nivel intermedio para unirse a nuestro equipo y ayudarnos a crear soluciones tecnológicas innovadoras para la ciudad. El candidato ideal debe tener experiencia en desarrollo de aplicaciones web y móviles, conocimiento sólido de C#, ASP.NET Core, y bases de datos SQL Server.',
        jobType: 'Tiempo completo',
        salary: '$2.500.000/mes',
        postedTime: 'hace 21 horas',
        closeDate: '21/01/2025',
        status: 'disponible',
      };
    } else if (jobId === '2') {
      return {
        id: '2',
        title: 'Ingeniero de Inteligencia Artificial',
        company: 'Gobernación de Magdalena',
        companyLogo: '/company2.png',
        location: 'Santa Marta, Magdalena',
        category: 'desarrollo',
        description: 'Buscamos un ingeniero de IA para desarrollar soluciones inteligentes que mejoren los servicios públicos del departamento. El candidato debe tener experiencia en machine learning, deep learning, y procesamiento de datos masivos.',
        jobType: 'Tiempo completo',
        salary: '$3.200.000/mes',
        postedTime: 'hace 21 horas',
        closeDate: '21/01/2025',
        status: 'disponible',
      };
    } else if (jobId === '3') {
      return {
        id: '3',
        title: 'Especialista en Ciberseguridad',
        company: 'Secretaría de Tecnologías de Magdalena',
        companyLogo: '/company3.png',
        location: 'Santa Marta, Magdalena',
        category: 'ciberseguridad',
        description: 'Buscamos un especialista en ciberseguridad para proteger la infraestructura tecnológica del departamento. El candidato debe tener experiencia en análisis de amenazas, implementación de medidas de seguridad y respuesta a incidentes.',
        jobType: 'Tiempo completo',
        salary: '$3.500.000/mes',
        postedTime: 'hace 21 horas',
        closeDate: '21/01/2025',
        status: 'disponible',
      };
    } else if (jobId === '4') {
      return {
        id: '4',
        title: 'Diseñador UI/UX Web',
        company: 'Secretaría de Comunicaciones',
        companyLogo: '/company4.png',
        location: 'Santa Marta, Magdalena',
        category: 'diseño',
        description: 'Buscamos un diseñador web para crear interfaces modernas y atractivas para los portales digitales del gobierno. El candidato debe tener experiencia en diseño de interfaces, prototipado y herramientas como Figma o Adobe XD.',
        jobType: 'Tiempo completo',
        salary: '$2.800.000/mes',
        postedTime: 'hace 21 horas',
        closeDate: '23/11/2024',
        status: 'disponible',
      };
    } else if (jobId === '5') {
      return {
        id: '5',
        title: 'Analista de Datos',
        company: 'Secretaría de Planeación',
        companyLogo: '/company5.png',
        location: 'Santa Marta, Magdalena',
        category: 'análisis',
        description: 'Buscamos un analista de datos para procesar información estadística y generar reportes para la toma de decisiones. El candidato debe tener experiencia en análisis estadístico, herramientas de BI y visualización de datos.',
        jobType: 'Tiempo completo',
        salary: '$2.600.000/mes',
        postedTime: 'hace 21 horas',
        closeDate: '23/11/2024',
        status: 'disponible',
      };
    }
    return null;
  });

  useEffect(() => {
    if (!jobId || !job) {
      // Si no hay ID o no se encuentra el trabajo, redirigir a la página principal
      router.push('/');
    }
  }, [jobId, job, router]);

  const handleBackClick = () => {
    router.back();
  };

  const handleApplyClick = () => {
    setApplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setApplyModalOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      coverLetter: '',
      cvFile: null,
    });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cvFile: file }));
      if (errors.cvFile) {
        setErrors(prev => ({ ...prev, cvFile: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    if (!formData.experience) {
      newErrors.experience = 'Selecciona tu nivel de experiencia';
    }
    if (!formData.cvFile) {
      newErrors.cvFile = 'El CV es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simular envío
      setTimeout(() => {
        setIsSubmitting(false);
        setApplyModalOpen(false);
        alert('¡Aplicación enviada con éxito!');
      }, 2000);
    }
  };

  if (!job) {
    return (
      <AppLayout>
        <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2, color: 'text.secondary' }}>
            Trabajo no encontrado
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            El trabajo que buscas no existe o ha sido removido.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/')}
            sx={{ px: 4, py: 1.5 }}
          >
            Volver al Inicio
          </Button>
        </Container>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link 
              color="inherit" 
              href="/" 
              sx={{ 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Inicio
            </Link>
            <Link 
              color="inherit" 
              href="/" 
              sx={{ 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Trabajos
            </Link>
            <Typography color="text.primary">{job.title}</Typography>
          </Breadcrumbs>
        </Box>

        {/* Información del trabajo */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
              }}>
                {job.title}
              </Typography>
              <Typography variant="h6" sx={{
                color: 'text.secondary',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
              }}>
                {job.company}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              onClick={handleApplyClick}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minWidth: 140,
              }}
            >
              Aplicar Ahora
            </Button>
          </Box>

          {/* Detalles del trabajo */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 4 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocationIcon color="action" />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Ubicación
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {job.location}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MoneyIcon color="action" />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Salario
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {job.salary}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <WorkIcon color="action" />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Tipo de Trabajo
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {job.jobType}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <BusinessIcon color="action" />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Categoría
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {job.category}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EventIcon color="action" />
              <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Fecha de Cierre
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                  {job.closeDate}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Descripción del trabajo */}
          <Box>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2,
              fontSize: { xs: '1.125rem', sm: '1.25rem' }
            }}>
              Descripción del Trabajo
            </Typography>
            <Typography variant="body1" sx={{
              lineHeight: 1.7,
              color: 'text.secondary',
              fontSize: '0.875rem'
            }}>
              {job.description}
            </Typography>
          </Box>
        </Paper>

        {/* Modal de aplicación */}
        <Dialog 
          open={applyModalOpen} 
          onClose={handleCloseModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 1
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Aplicar a {job?.title}
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  size="medium"
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  size="medium"
                />
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  size="medium"
                />
                <FormControl fullWidth error={!!errors.experience}>
                  <InputLabel>Nivel de Experiencia</InputLabel>
                  <Select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    label="Nivel de Experiencia"
                    size="medium"
                  >
                    <MenuItem value="junior">Junior (0-2 años)</MenuItem>
                    <MenuItem value="mid">Mid-Level (2-5 años)</MenuItem>
                    <MenuItem value="senior">Senior (5+ años)</MenuItem>
                  </Select>
                  {errors.experience && (
                    <FormHelperText>{errors.experience}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  label="Carta de Presentación"
                  multiline
                  rows={4}
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  size="medium"
                />
                <Box>
                  <input
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    id="cv-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="cv-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Subir CV
                    </Button>
                  </label>
                  {formData.cvFile && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                      ✓ {formData.cvFile.name}
                    </Typography>
                  )}
                  {errors.cvFile && (
                    <Typography variant="body2" sx={{ mt: 1, color: 'error.main' }}>
                      {errors.cvFile}
                    </Typography>
                  )}
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseModal} sx={{ px: 3 }}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isSubmitting}
              sx={{ px: 4 }}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Aplicación'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AppLayout>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <JobDetailContent />
    </Suspense>
  );
}
