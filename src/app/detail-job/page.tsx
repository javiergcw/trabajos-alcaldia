'use client';
import React, { useState, useEffect } from 'react';
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

export default function JobDetailPage() {
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
      <br />
      <Box sx={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Banner Header similar al del home */}

        {/* Contenido principal */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Top Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/" underline="hover">
                Trabajos
              </Link>
              <Typography color="text.primary">Desarrollador .Net</Typography>
            </Breadcrumbs>

            <Link href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'text.secondary' }}>
              <ArrowBackIcon sx={{ fontSize: '1.25rem' }} />
              <Typography>Volver</Typography>
            </Link>
          </Box>

          {/* Job Detail Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{
              fontWeight: 600,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              mb: 1,
              color: 'text.primary'
            }}>
              Información del Trabajo
            </Typography>
            <Typography variant="h6" sx={{
              color: 'text.secondary',
              mb: 3,
              fontSize: { xs: '1rem', sm: '1.125rem' },
              fontWeight: 400
            }}>
              Revisa los detalles completos del trabajo.
            </Typography>

            {/* Job Card Header */}
            <Paper elevation={0} sx={{ p: 2.5, background: 'transparent', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    background: '#1976d2',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}>
                    ⚡
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{
                      fontWeight: 600,
                      mb: 0.5,
                      color: 'text.primary',
                      fontSize: { xs: '1.125rem', sm: '1.25rem' }
                    }}>
                      Desarrollador .Net
                    </Typography>
                    <Typography variant="body1" sx={{
                      color: 'text.secondary',
                      fontSize: '0.875rem'
                    }}>
                      Alcaldía de Santa Marta
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton sx={{
                    border: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.08)',
                    borderRadius: 1,
                    p: 1
                  }}>
                    <BookmarkIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    onClick={handleApplyClick}
                    sx={{
                      background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                      color: '#ffffff',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 122, 255, 0.4)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Aplicar Ahora
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Job Metadata Section */}
          <Paper elevation={0} sx={{ p: 2.5, background: 'transparent', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 2, mb: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.25rem' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Ubicación
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    Santa Marta, Magdalena
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <MoneyIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.25rem' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Salario
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    $2.500.000/mes
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WorkIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.25rem' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Tipo de Trabajo
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    Tiempo completo
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DescriptionIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.25rem' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Carta de Presentación
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    Requerida
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BusinessIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.25rem' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Sector Industrial
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    Tecnología de la Información
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EventIcon sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.25rem' }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    Cierre de Postulación
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    21/01/2025
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Job Description Section */}
          <Paper elevation={0} sx={{ p: 2.5, background: 'transparent', border: '1px solid', borderColor: 'rgba(0, 0, 0, 0.08)', borderRadius: 2, mb: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 3,
              color: 'text.primary',
              fontSize: { xs: '1.125rem', sm: '1.25rem' }
            }}>
              Descripción del Trabajo
            </Typography>

            {/* Overview */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
                fontSize: '1rem'
              }}>
                Resumen
              </Typography>
              <Typography variant="body1" sx={{
                lineHeight: 1.6,
                color: 'text.secondary',
                fontSize: '0.875rem'
              }}>
                Con presencia en más de 60 países, somos una organización global en crecimiento que ayuda a empresas increíbles a conectarse con los clientes a través de mensajería móvil, correo electrónico, voz y video. Buscamos un Desarrollador .Net de nivel intermedio que pueda unirse a nuestro equipo y ayudarnos a crear soluciones tecnológicas innovadoras para la ciudad.
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Requirements */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
                fontSize: '1rem'
              }}>
                Requisitos
              </Typography>
              <List sx={{ py: 0 }}>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Convertir historias de usuario en código y entregar software de alta calidad"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ser un miembro valioso del equipo y contribuir al éxito del equipo"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Promover el intercambio de conocimientos y mejores prácticas"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Colaborar con equipos multifuncionales"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
              </List>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Skills and Expertise */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
                fontSize: '1rem'
              }}>
                Habilidades y Experiencia
              </Typography>
              <List sx={{ py: 0 }}>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="3+ años como Desarrollador .Net"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Experiencia con Visual Studio, SQL Server"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Experiencia en entorno ágil"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5, px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Familiarizado con Azure DevOps"
                    sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem', color: 'text.secondary' } }}
                  />
                </ListItem>
              </List>
            </Box>
          </Paper>

          {/* Bottom Call to Action */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" sx={{
              color: 'text.secondary',
              mb: 2,
              fontSize: '0.875rem'
            }}>
              Candidatos interesados pueden{' '}
              <Link
                href="#"
                onClick={handleApplyClick}
                sx={{
                  color: '#1976d2',
                  textDecoration: 'underline',
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': { color: '#1565c0' }
                }}
              >
                ¡Aplicar ahora!
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Modal de Aplicación */}
      <Dialog
        open={applyModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }
        }}
      >
        <DialogTitle sx={{
          pb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Aplicar a Desarrollador .Net
          </Typography>
          <IconButton onClick={handleCloseModal} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="info" sx={{ mb: 3, mt: 2, borderRadius: 2 }}>
            <Typography variant="body2">
              Completa tu información para aplicar a este trabajo. Los campos marcados con * son obligatorios.
            </Typography>
          </Alert>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Nombre Completo */}
            <TextField
              label="Nombre Completo *"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              size="small"
            />

            {/* Email */}
            <TextField
              label="Email *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              size="small"
            />

            {/* Teléfono */}
            <TextField
              label="Teléfono *"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              size="small"
            />

            {/* Experiencia */}
            <FormControl fullWidth size="small" error={!!errors.experience}>
              <InputLabel>Nivel de Experiencia *</InputLabel>
              <Select
                value={formData.experience}
                label="Nivel de Experiencia *"
                onChange={(e) => handleInputChange('experience', e.target.value)}
              >
                <MenuItem value="junior">Junior (0-2 años)</MenuItem>
                <MenuItem value="mid">Mid-Level (2-5 años)</MenuItem>
                <MenuItem value="senior">Senior (5+ años)</MenuItem>
              </Select>
              {errors.experience && <FormHelperText>{errors.experience}</FormHelperText>}
            </FormControl>

            {/* Carta de Presentación */}
            <TextField
              label="Carta de Presentación (Opcional)"
              multiline
              rows={4}
              value={formData.coverLetter}
              onChange={(e) => handleInputChange('coverLetter', e.target.value)}
              placeholder="Cuéntanos por qué te interesa este trabajo y por qué serías un buen candidato..."
              fullWidth
              size="small"
            />

            {/* Subir CV */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Subir CV * {formData.cvFile && <Chip label={formData.cvFile.name} size="small" color="primary" sx={{ ml: 1 }} />}
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  py: 2,
                  width: '100%',
                  '&:hover': {
                    borderStyle: 'dashed',
                    borderWidth: 2,
                  }
                }}
              >
                {formData.cvFile ? 'Cambiar archivo' : 'Seleccionar archivo PDF'}
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Button>
              {errors.cvFile && (
                <FormHelperText error sx={{ mt: 1 }}>
                  {errors.cvFile}
                </FormHelperText>
              )}
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                Formatos aceptados: PDF, DOC, DOCX (máx. 5MB)
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button
            onClick={handleCloseModal}
            variant="outlined"
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1.2,
              borderRadius: 2
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
              color: '#ffffff',
              px: 4,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #0056CC 0%, #1976D2 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Aplicación'}
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
}
