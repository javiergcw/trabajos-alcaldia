'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Language as WebsiteIcon,
  School as EducationIcon,
  Star as StarIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import AppLayout from '@/views/layouts/AppLayout';

interface ProfileData {
  userType: 'trabajador' | 'empleador';
  // Información básica
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;

  // Para trabajadores
  profession: string;
  experience: string;
  skills: string[];
  education: string;
  certifications: string[];
  portfolio: string;
  linkedin: string;
  github: string;

  // Para empleadores
  companyName: string;
  companySize: string;
  industry: string;
  position: string;
  companyWebsite: string;
  companyDescription: string;

  // Configuración
  isProfilePublic: boolean;
  receiveNotifications: boolean;
  showContactInfo: boolean;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    userType: 'trabajador',
    firstName: 'Juan Carlos',
    lastName: 'Rodríguez',
    email: 'juan.rodriguez@email.com',
    phone: '+57 300 123 4567',
    location: 'Santa Marta, Magdalena',
    bio: 'Desarrollador Full Stack apasionado por crear soluciones tecnológicas innovadoras. Especializado en React, Node.js y tecnologías cloud.',
    profession: 'Desarrollador Full Stack',
    experience: '5-10 años',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
    education: 'Ingeniería de Sistemas',
    certifications: ['AWS Certified Developer', 'MongoDB Developer'],
    portfolio: 'https://juanrodriguez.dev',
    linkedin: 'https://linkedin.com/in/juanrodriguez',
    github: 'https://github.com/juanrodriguez',
    companyName: '',
    companySize: '',
    industry: '',
    position: '',
    companyWebsite: '',
    companyDescription: '',
    isProfilePublic: true,
    receiveNotifications: true,
    showContactInfo: true,
  });

  const [tempData, setTempData] = useState<ProfileData>(profileData);
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: any) => {
    setTempData({ ...tempData, [field]: value });
  };

  const handleSkillsChange = (skill: string, checked: boolean) => {
    const newSkills = checked
      ? [...tempData.skills, skill]
      : tempData.skills.filter(s => s !== skill);
    setTempData({ ...tempData, skills: newSkills });
  };

  const handleCertificationsChange = (cert: string, checked: boolean) => {
    const newCerts = checked
      ? [...tempData.certifications, cert]
      : tempData.certifications.filter(c => c !== cert);
    setTempData({ ...tempData, certifications: newCerts });
  };

  const availableSkills = [
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'PHP',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Azure', 'GCP', 'Docker',
    'Kubernetes', 'Git', 'CI/CD', 'Agile', 'Scrum', 'UI/UX', 'Figma', 'Adobe XD'
  ];

  const availableCertifications = [
    'AWS Certified Developer', 'AWS Solutions Architect', 'MongoDB Developer',
    'Microsoft Certified: Azure Developer', 'Google Cloud Professional Developer',
    'Certified Scrum Master', 'PMP', 'ITIL Foundation'
  ];

  const renderWorkerProfile = () => (
    <Box>
      {/* Información Profesional */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'transparent',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 2,
          mb: 3,
          boxShadow: 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1.125rem' }}>
          Información Profesional
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
          <Box>
            <TextField
              fullWidth
              label="Profesión"
              value={isEditing ? tempData.profession : profileData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="Ej: Desarrollador Full Stack"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box>
            <FormControl fullWidth size="medium">
              <InputLabel>Experiencia</InputLabel>
              <Select
                value={isEditing ? tempData.experience : profileData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                label="Experiencia"
                disabled={!isEditing}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="sin-experiencia">Sin experiencia</MenuItem>
                <MenuItem value="1-2-anos">1-2 años</MenuItem>
                <MenuItem value="3-5-anos">3-5 años</MenuItem>
                <MenuItem value="5-10-anos">5-10 años</MenuItem>
                <MenuItem value="mas-de-10-anos">Más de 10 años</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
            <TextField
              fullWidth
              label="Educación"
              value={isEditing ? tempData.education : profileData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="Ej: Ingeniería de Sistemas"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Habilidades */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'transparent',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 2,
          mb: 3,
          boxShadow: 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1.125rem' }}>
          Habilidades Técnicas
        </Typography>

        {isEditing ? (
          <FormGroup sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1 }}>
            {availableSkills.map((skill) => (
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
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profileData.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  background: 'rgba(0, 122, 255, 0.1)',
                  color: '#007AFF',
                  fontSize: '0.75rem'
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Certificaciones */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'transparent',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 2,
          mb: 3,
          boxShadow: 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1.125rem' }}>
          Certificaciones
        </Typography>

        {isEditing ? (
          <FormGroup sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 1 }}>
            {availableCertifications.map((cert) => (
              <FormControlLabel
                key={cert}
                control={
                  <Checkbox
                    checked={tempData.certifications.includes(cert)}
                    onChange={(e) => handleCertificationsChange(cert, e.target.checked)}
                    size="small"
                  />
                }
                label={cert}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
              />
            ))}
          </FormGroup>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profileData.certifications.map((cert) => (
              <Chip
                key={cert}
                label={cert}
                size="small"
                icon={<StarIcon />}
                sx={{
                  background: 'rgba(255, 193, 7, 0.1)',
                  color: '#f57c00',
                  fontSize: '0.75rem'
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Enlaces */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'transparent',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 2,
          mb: 3,
          boxShadow: 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1.125rem' }}>
          Enlaces Profesionales
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
          <Box>
            <TextField
              fullWidth
              label="Portfolio"
              value={isEditing ? tempData.portfolio : profileData.portfolio}
              onChange={(e) => handleInputChange('portfolio', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="https://tuportfolio.com"
              InputProps={{
                startAdornment: <WebsiteIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="LinkedIn"
              value={isEditing ? tempData.linkedin : profileData.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="https://linkedin.com/in/tuuser"
              InputProps={{
                startAdornment: <LinkedInIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="GitHub"
              value={isEditing ? tempData.github : profileData.github}
              onChange={(e) => handleInputChange('github', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="https://github.com/tuuser"
              InputProps={{
                startAdornment: <GitHubIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );

  const renderEmployerProfile = () => (
    <Box>
      {/* Información de la Empresa */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: 'transparent',
          border: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          borderRadius: 2,
          mb: 3,
          boxShadow: 'none',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1.125rem' }}>
          Información de la Empresa
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
          <Box>
            <TextField
              fullWidth
              label="Nombre de la Empresa"
              value={isEditing ? tempData.companyName : profileData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="Ej: Alcaldía de Santa Marta"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box>
            <FormControl fullWidth size="medium">
              <InputLabel>Tamaño de la Empresa</InputLabel>
              <Select
                value={isEditing ? tempData.companySize : profileData.companySize}
                onChange={(e) => handleInputChange('companySize', e.target.value)}
                label="Tamaño de la Empresa"
                disabled={!isEditing}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="1-10">1-10 empleados</MenuItem>
                <MenuItem value="11-50">11-50 empleados</MenuItem>
                <MenuItem value="51-200">51-200 empleados</MenuItem>
                <MenuItem value="201-1000">201-1000 empleados</MenuItem>
                <MenuItem value="mas-de-1000">Más de 1000 empleados</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth size="medium">
              <InputLabel>Industria</InputLabel>
              <Select
                value={isEditing ? tempData.industry : profileData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                label="Industria"
                disabled={!isEditing}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="tecnologia">Tecnología</MenuItem>
                <MenuItem value="salud">Salud</MenuItem>
                <MenuItem value="finanzas">Finanzas</MenuItem>
                <MenuItem value="educacion">Educación</MenuItem>
                <MenuItem value="comercio">Comercio</MenuItem>
                <MenuItem value="manufactura">Manufactura</MenuItem>
                <MenuItem value="otros">Otros</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Cargo en la Empresa"
              value={isEditing ? tempData.position : profileData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="Ej: Gerente de Recursos Humanos"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Sitio Web de la Empresa"
              value={isEditing ? tempData.companyWebsite : profileData.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              disabled={!isEditing}
              size="medium"
              placeholder="https://tuempresa.com"
              InputProps={{
                startAdornment: <WebsiteIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
            <TextField
              fullWidth
              label="Descripción de la Empresa"
              value={isEditing ? tempData.companyDescription : profileData.companyDescription}
              onChange={(e) => handleInputChange('companyDescription', e.target.value)}
              disabled={!isEditing}
              size="medium"
              multiline
              rows={3}
              placeholder="Describe tu empresa, misión, visión y valores..."
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <AppLayout>
      <br />
      <Box sx={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* Contenido principal */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 4 }}>
            {/* Columna izquierda - Información básica */}
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'none',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: 2,
                  mb: 3,
                  boxShadow: 'none',
                }}
              >
                {/* Avatar y nombre */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      mb: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                        mx: 'auto',
                        fontSize: '3rem',
                        fontWeight: 700,
                      }}
                    >
                      {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                    </Avatar>

                    {/* Indicador de estado */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        width: 20,
                        height: 20,
                        background: '#4caf50',
                        borderRadius: '50%',
                        border: '2px solid white',
                      }}
                    />
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                    {profileData.firstName} {profileData.lastName}
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.875rem' }}>
                    {profileData.profession || profileData.position}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                    <Chip
                      label={profileData.userType === 'trabajador' ? 'Trabajador' : 'Empleador'}
                      icon={profileData.userType === 'trabajador' ? <WorkIcon /> : <BusinessIcon />}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    />

                    <Chip
                      label={profileData.isProfilePublic ? 'Público' : 'Privado'}
                      size="small"
                      sx={{
                        background: profileData.isProfilePublic ? '#e8f5e8' : '#f5f5f5',
                        color: profileData.isProfilePublic ? '#388e3c' : '#757575',
                        fontSize: '0.75rem',
                        border: '1px solid',
                        borderColor: profileData.isProfilePublic ? '#c8e6c9' : '#e0e0e0',
                      }}
                    />
                  </Box>

                  {/* Barra de progreso del perfil */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                        Perfil completado
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.primary', fontWeight: 600 }}>
                        85%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: 4,
                        background: '#f5f5f5',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: '85%',
                          height: '100%',
                          background: 'linear-gradient(135deg, #007AFF 0%, #4DA3FF 100%)',
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Botones de acción */}
                <Box sx={{ mb: 4 }}>
                  {!isEditing ? (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                      sx={{
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
                      Editar Perfil
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        sx={{
                          flex: 1,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #388E3C 0%, #4CAF50 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancel}
                        sx={{
                          flex: 1,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                          color: 'text.secondary',
                          '&:hover': {
                            borderColor: 'rgba(0, 0, 0, 0.4)',
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          },
                        }}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Información de contacto */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1rem' }}>
                    Información de Contacto
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        background: '#f5f5f5',
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          background: 'rgba(0, 122, 255, 0.1)',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#007AFF',
                        }}
                      >
                        <EmailIcon sx={{ fontSize: '1.25rem' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 0.5 }}>
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {profileData.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        background: '#f5f5f5',
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          background: 'rgba(76, 175, 80, 0.1)',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#4CAF50',
                        }}
                      >
                        <PhoneIcon sx={{ fontSize: '1.25rem' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 0.5 }}>
                          Teléfono
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {profileData.phone}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        background: '#f5f5f5',
                        borderRadius: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          background: 'rgba(255, 193, 7, 0.1)',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FF9800',
                        }}
                      >
                        <LocationIcon sx={{ fontSize: '1.25rem' }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 0.5 }}>
                          Ubicación
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
                          {profileData.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Configuración */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'transparent',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: 2,
                  boxShadow: 'none',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1rem' }}>
                  Configuración del Perfil
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      background: '#f9f9f9',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          background: profileData.isProfilePublic ? 'rgba(76, 175, 80, 0.1)' : '#f5f5f5',
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: profileData.isProfilePublic ? '#4CAF50' : '#757575',
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: '1.25rem' }} />
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 0.5 }}>
                          Perfil público
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                          {profileData.isProfilePublic ? 'Visible para empleadores' : 'Solo tú puedes verlo'}
                        </Typography>
                      </Box>
                    </Box>
                    <Switch
                      checked={profileData.isProfilePublic}
                      onChange={(e) => setProfileData({ ...profileData, isProfilePublic: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#4CAF50',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#4CAF50',
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      background: '#f9f9f9',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          background: profileData.receiveNotifications ? 'rgba(255, 193, 7, 0.1)' : '#f5f5f5',
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: profileData.receiveNotifications ? '#FF9800' : '#757575',
                        }}
                      >
                        <EmailIcon sx={{ fontSize: '1.25rem' }} />
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 0.5 }}>
                          Notificaciones
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                          {profileData.receiveNotifications ? 'Recibir alertas' : 'Sin notificaciones'}
                        </Typography>
                      </Box>
                    </Box>
                    <Switch
                      checked={profileData.receiveNotifications}
                      onChange={(e) => setProfileData({ ...profileData, receiveNotifications: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#FF9800',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#FF9800',
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      background: '#f9f9f9',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          background: profileData.showContactInfo ? 'rgba(0, 122, 255, 0.1)' : '#f5f5f5',
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: profileData.showContactInfo ? '#007AFF' : '#757575',
                        }}
                      >
                        <PhoneIcon sx={{ fontSize: '1.25rem' }} />
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 600, mb: 0.5 }}>
                          Información de contacto
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                          {profileData.showContactInfo ? 'Visible para empleadores' : 'Oculta'}
                        </Typography>
                      </Box>
                    </Box>
                    <Switch
                      checked={profileData.showContactInfo}
                      onChange={(e) => setProfileData({ ...profileData, showContactInfo: e.target.checked })}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#007AFF',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#007AFF',
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Columna derecha - Información detallada */}
            <Box>
              {/* Información básica */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'transparent',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.08)',
                  borderRadius: 2,
                  mb: 3,
                  boxShadow: 'none',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary', fontSize: '1.125rem' }}>
                  Información Básica
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                  <Box>
                    <TextField
                      fullWidth
                      label="Nombre"
                      value={isEditing ? tempData.firstName : profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                      size="medium"
                      placeholder="Ej: Juan Carlos"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>

                  <Box>
                    <TextField
                      fullWidth
                      label="Apellido"
                      value={isEditing ? tempData.lastName : profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                      size="medium"
                      placeholder="Ej: Rodríguez"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>

                  <Box>
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      type="email"
                      value={isEditing ? tempData.email : profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      size="medium"
                      placeholder="juan.rodriguez@email.com"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>

                  <Box>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={isEditing ? tempData.phone : profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      size="medium"
                      placeholder="+57 300 123 4567"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>

                  <Box>
                    <TextField
                      fullWidth
                      label="Ubicación"
                      value={isEditing ? tempData.location : profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                      size="medium"
                      placeholder="Ej: Santa Marta, Magdalena"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>

                  <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                    <TextField
                      fullWidth
                      label="Biografía"
                      value={isEditing ? tempData.bio : profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      size="medium"
                      multiline
                      rows={3}
                      placeholder="Cuéntanos sobre ti, tu experiencia y objetivos profesionales..."
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                </Box>
              </Paper>

              {/* Perfil específico según el tipo de usuario */}
              {profileData.userType === 'trabajador' ? renderWorkerProfile() : renderEmployerProfile()}
            </Box>
          </Box>
        </Container>
      </Box>
    </AppLayout>
  );
}
