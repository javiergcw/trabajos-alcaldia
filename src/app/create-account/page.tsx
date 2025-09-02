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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  Divider,
  Avatar,
  IconButton,
  InputAdornment,
  Alert,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';

import AppLayout from '@/views/layouts/AppLayout';

interface UserData {
  userType: 'trabajador' | 'empleador';
  // Datos básicos
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Datos del trabajador
  profession: string;
  experience: string;
  skills: string[];
  location: string;
  // Datos del empleador
  companyName: string;
  companySize: string;
  industry: string;
  position: string;
  // Términos
  acceptTerms: boolean;
  acceptNewsletter: boolean;
}

export default function CreateAccountPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    userType: 'trabajador',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profession: '',
    experience: '',
    skills: [],
    location: '',
    companyName: '',
    companySize: '',
    industry: '',
    position: '',
    acceptTerms: false,
    acceptNewsletter: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = [
    'Tipo de Usuario',
    'Información Básica',
    userData.userType === 'trabajador' ? 'Perfil Profesional' : 'Información de Empresa',
    'Términos y Condiciones'
  ];

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUserTypeChange = (userType: 'trabajador' | 'empleador') => {
    setUserData({ ...userData, userType });
    setActiveStep(0); // Reset to first step when changing user type
  };

  const handleInputChange = (field: keyof UserData, value: any) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSkillsChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...userData.skills, skill]
      : userData.skills.filter(s => s !== skill);
    setUserData({ ...userData, skills: newSkills });
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return true;
      case 1:
        return userData.firstName && userData.lastName && userData.email && userData.password && userData.confirmPassword && userData.password === userData.confirmPassword;
      case 2:
        if (userData.userType === 'trabajador') {
          return userData.profession && userData.experience && userData.location;
        } else {
          return userData.companyName && userData.companySize && userData.industry;
        }
      case 3:
        return userData.acceptTerms;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box sx={{ py: 4 }}>
                <br/>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              ¿Qué tipo de cuenta quieres crear?
            </Typography>

            <Typography variant="body1" sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: '1rem',
              textAlign: 'center'
            }}>
              Selecciona el tipo de cuenta que mejor se adapte a tus necesidades
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center' }}>
              {/* Opción Trabajador */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: userData.userType === 'trabajador' ? '#007AFF' : 'rgba(0, 0, 0, 0.08)',
                  background: userData.userType === 'trabajador' ? 'rgba(0, 122, 255, 0.04)' : 'white',
                  borderRadius: 2,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: '#007AFF',
                    background: 'rgba(0, 122, 255, 0.04)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 122, 255, 0.15)',
                  },
                  minWidth: { xs: '100%', sm: '250px' },
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => handleUserTypeChange('trabajador')}
              >
                {userData.userType === 'trabajador' && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 40px 40px 0',
                    borderColor: 'transparent #007AFF transparent transparent',
                  }} />
                )}
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{
                    width: 80,
                    height: 80,
                    background: userData.userType === 'trabajador' ? '#007AFF' : 'rgba(0, 0, 0, 0.08)',
                    mx: 'auto',
                    mb: 3,
                    transition: 'all 0.2s ease'
                  }}>
                    <WorkIcon sx={{ fontSize: '2.5rem' }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Trabajador
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    Busca y aplica a trabajos en tu área de experiencia. Encuentra las mejores oportunidades laborales.
                  </Typography>
                </Box>
              </Paper>

              {/* Opción Empleador */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: userData.userType === 'empleador' ? '#007AFF' : 'rgba(0, 0, 0, 0.08)',
                  background: userData.userType === 'empleador' ? 'rgba(0, 122, 255, 0.04)' : 'white',
                  borderRadius: 2,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    borderColor: '#007AFF',
                    background: 'rgba(0, 122, 255, 0.04)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 122, 255, 0.15)',
                  },
                  minWidth: { xs: '100%', sm: '250px' },
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => handleUserTypeChange('empleador')}
              >
                {userData.userType === 'empleador' && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 40px 40px 0',
                    borderColor: 'transparent #007AFF transparent transparent',
                  }} />
                )}
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{
                    width: 80,
                    height: 80,
                    background: userData.userType === 'empleador' ? '#007AFF' : 'rgba(0, 0, 0, 0.08)',
                    mx: 'auto',
                    mb: 3,
                    transition: 'all 0.2s ease'
                  }}>
                    <BusinessIcon sx={{ fontSize: '2.5rem' }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Empleador
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    Publica ofertas de trabajo y encuentra al talento perfecto para tu empresa.
                  </Typography>
                </Box>
              </Paper>
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
              Información Básica
            </Typography>

            <Typography variant="body1" sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: '1rem'
            }}>
              Completa tu información personal para crear tu cuenta
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
              <TextField
                fullWidth
                label="Nombre"
                value={userData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                size="medium"
                placeholder="Ej: Juan Carlos"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Apellido"
                value={userData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                size="medium"
                placeholder="Ej: Rodríguez"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Correo Electrónico"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                size="medium"
                placeholder="Ej: juan.rodriguez@email.com"
                sx={{
                  gridColumn: { xs: '1', sm: '1 / -1' },
                  '& .MuiOutlinedInput-root': { borderRadius: 2 }
                }}
              />

              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={userData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                size="medium"
                placeholder="Mínimo 8 caracteres"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                fullWidth
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                value={userData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                size="medium"
                placeholder="Repite tu contraseña"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Box>

            {userData.password && userData.confirmPassword && userData.password !== userData.confirmPassword && (
              <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
                Las contraseñas no coinciden
              </Alert>
            )}
          </Box>
        );

      case 2:
        if (userData.userType === 'trabajador') {
          return (
            <Box sx={{ py: 4 }}>
              <Typography variant="h5" sx={{
                fontWeight: 600,
                mb: 4,
                color: 'text.primary',
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}>
                Perfil Profesional
              </Typography>

              <Typography variant="body1" sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: '1rem'
              }}>
                Cuéntanos sobre tu experiencia y habilidades profesionales
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Profesión"
                  value={userData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  size="medium"
                  placeholder="Ej: Desarrollador Full Stack"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <FormControl fullWidth size="medium">
                  <InputLabel>Experiencia</InputLabel>
                  <Select
                    value={userData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    label="Experiencia"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="sin-experiencia">Sin experiencia</MenuItem>
                    <MenuItem value="1-2-anos">1-2 años</MenuItem>
                    <MenuItem value="3-5-anos">3-5 años</MenuItem>
                    <MenuItem value="5-10-anos">5-10 años</MenuItem>
                    <MenuItem value="mas-de-10-anos">Más de 10 años</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Ubicación"
                  value={userData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  size="medium"
                  placeholder="Ej: Santa Marta, Magdalena"
                  sx={{
                    gridColumn: { xs: '1', sm: '1 / -1' },
                    '& .MuiOutlinedInput-root': { borderRadius: 2 }
                  }}
                />

                <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Habilidades Principales
                  </Typography>
                  <FormGroup sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1 }}>
                    {['Desarrollo Web', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'Git', 'Docker', 'AWS', 'MongoDB', 'TypeScript', 'Angular'].map((skill) => (
                      <FormControlLabel
                        key={skill}
                        control={
                          <Checkbox
                            checked={userData.skills.includes(skill)}
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
        } else {
          return (
            <Box sx={{ py: 4 }}>
              <Typography variant="h5" sx={{
                fontWeight: 600,
                mb: 4,
                color: 'text.primary',
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}>
                Información de Empresa
              </Typography>

              <Typography variant="body1" sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: '1rem'
              }}>
                Cuéntanos sobre tu empresa y tu rol en ella
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                <TextField
                  fullWidth
                  label="Nombre de la Empresa"
                  value={userData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  size="medium"
                  placeholder="Ej: Alcaldía de Santa Marta"
                  sx={{
                    gridColumn: { xs: '1', sm: '1 / -1' },
                    '& .MuiOutlinedInput-root': { borderRadius: 2 }
                  }}
                />

                <FormControl fullWidth size="medium">
                  <InputLabel>Tamaño de la Empresa</InputLabel>
                  <Select
                    value={userData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    label="Tamaño de la Empresa"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="1-10">1-10 empleados</MenuItem>
                    <MenuItem value="11-50">11-50 empleados</MenuItem>
                    <MenuItem value="51-200">51-200 empleados</MenuItem>
                    <MenuItem value="201-1000">201-1000 empleados</MenuItem>
                    <MenuItem value="mas-de-1000">Más de 1000 empleados</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="medium">
                  <InputLabel>Industria</InputLabel>
                  <Select
                    value={userData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    label="Industria"
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="tecnologia">Tecnología</MenuItem>
                    <MenuItem value="salud">Salud</MenuItem>
                    <MenuItem value="finanzas">Finanzas</MenuItem>
                    <MenuItem value="educacion">Educación</MenuItem>
                    <MenuItem value="comercio">Comercio</MenuItem>
                    <MenuItem value="manufactura">Manufactura</MenuItem>
                    <MenuItem value="gobierno">Gobierno</MenuItem>
                    <MenuItem value="otros">Otros</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Cargo en la Empresa"
                  value={userData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  size="medium"
                  placeholder="Ej: Gerente de Recursos Humanos"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>
            </Box>
          );
        }

      case 3:
        return (
          <Box sx={{ py: 4 }}>
            <Typography variant="h5" sx={{
              fontWeight: 600,
              mb: 4,
              color: 'text.primary',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              Términos y Condiciones
            </Typography>

            <Typography variant="body1" sx={{
              color: 'text.secondary',
              mb: 4,
              fontSize: '1rem'
            }}>
              Revisa y acepta los términos para completar tu registro
            </Typography>

            <Box sx={{ mb: 5 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={userData.acceptTerms}
                    onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                    size="medium"
                  />
                }
                label={
                  <Typography variant="body1" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                    Acepto los{' '}
                    <Typography component="span" sx={{ color: '#007AFF', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>
                      Términos y Condiciones
                    </Typography>
                    {' '}y la{' '}
                    <Typography component="span" sx={{ color: '#007AFF', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>
                      Política de Privacidad
                    </Typography>
                  </Typography>
                }
                sx={{ alignItems: 'flex-start' }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={userData.acceptNewsletter}
                    onChange={(e) => handleInputChange('acceptNewsletter', e.target.checked)}
                    size="medium"
                  />
                }
                label={
                  <Typography variant="body1" sx={{ fontSize: '0.95rem', color: 'text.secondary', lineHeight: 1.5 }}>
                    Quiero recibir notificaciones sobre nuevas ofertas de trabajo y actualizaciones de la plataforma
                  </Typography>
                }
                sx={{ alignItems: 'flex-start' }}
              />
            </Box>

            <Paper elevation={0} sx={{
              p: 3,
              background: 'rgba(0, 122, 255, 0.04)',
              border: '1px solid rgba(0, 122, 255, 0.2)',
              borderRadius: 2
            }}>
              <Typography variant="body1" sx={{ fontSize: '0.9rem', color: 'text.secondary', lineHeight: 1.6 }}>
                Al crear tu cuenta, confirmas que tienes al menos 18 años y que la información proporcionada es verdadera y precisa.
                Nos comprometemos a proteger tu privacidad y a usar tu información únicamente para los fines descritos en nuestra política de privacidad.
              </Typography>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos del usuario:', userData);
    // Redirigir o mostrar mensaje de éxito
  };

  return (
    <AppLayout>
      <Box sx={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* Contenido principal */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper elevation={0} sx={{
            p: { xs: 3, sm: 4 },
            background: 'transparent',
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.08)',
            borderRadius: 2
          }}>
            {/* Barra de progreso moderna */}
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
                  value={progressPercentage}
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
                  Progreso del registro
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem' }}>
                  {Math.round(progressPercentage)}%
                </Typography>
              </Box>
            </Box>

            {/* Contenido del paso */}
            {renderStepContent()}

            {/* Botones de navegación */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
              <Button
                disabled={activeStep === 0}
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
                    disabled={!isStepValid()}
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
                    Crear Cuenta
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!isStepValid()}
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
