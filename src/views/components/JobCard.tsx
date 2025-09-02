import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  Flag as FlagIcon,
  FiberManualRecord as DotIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface JobCardProps {
  job: Job;
  onBookmark: (jobId: string) => void;
  isBookmarked?: boolean;
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

export default function JobCard({ job, onBookmark, isBookmarked = false }: JobCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/detail-job?id=${job.id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se active la navegación al hacer clic en el bookmark
    onBookmark(job.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aplicado':
        return 'success';
      case 'guardado':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aplicado':
        return 'Aplicado';
      case 'guardado':
        return 'Guardado';
      default:
        return 'Disponible';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'development': '#1976d2',
      'cyber-security': '#f57c00',
      'design': '#7b1fa2',
      'artificial-intelligence': '#388e3c',
    };
    return colors[category] || '#757575';
  };

  return (
    <Card
      elevation={0}
      onClick={handleCardClick}
      sx={{
        borderRadius: 2,
        background: 'transparent',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-1px)',
          borderColor: 'rgba(0, 0, 0, 0.12)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          mb: 1.5 
        }}>
          {/* Logo de la empresa */}
          <Avatar
            src={job.companyLogo}
            sx={{
              width: 48,
              height: 48,
              background: '#1976d2',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#ffffff',
              mr: 2,
            }}
          >
            {job.company.charAt(0).toUpperCase()}
          </Avatar>

          {/* Título y empresa en el centro */}
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 0.5,
                fontSize: '1rem',
                lineHeight: 1.2,
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              {job.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 400,
                fontSize: '0.875rem',
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {job.company}
            </Typography>
          </Box>

          {/* Botón de guardar */}
          <IconButton
            onClick={handleBookmarkClick}
            sx={{
              color: isBookmarked ? '#1976d2' : 'rgba(0, 0, 0, 0.4)',
              p: 0.5,
              border: '1px solid',
              borderColor: 'rgba(0, 0, 0, 0.08)',
              borderRadius: 1,
              background: isBookmarked ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
              '&:hover': {
                color: '#1976d2',
                background: 'rgba(25, 118, 210, 0.08)',
                borderColor: 'rgba(0, 0, 0, 0.12)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <BookmarkIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>
        </Box>

        {/* Etiquetas de ubicación y categoría */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          mb: 1.5, 
          flexWrap: 'wrap',

        }}>
          <Chip
            icon={<FlagIcon sx={{ fontSize: '0.875rem' }} />}
            label={job.location}
            size="small"
            variant="outlined"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 400,
              px: 1,
              py: 0.25,
              height: '24px',
              background: 'transparent',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              color: 'rgba(0, 0, 0, 0.7)',
            }}
          />
          <Chip
            icon={<DotIcon sx={{ color: getCategoryColor(job.category), fontSize: '0.75rem' }} />}
            label={job.category}
            size="small"
            variant="outlined"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 400,
              px: 1,
              py: 0.25,
              height: '24px',
              background: 'transparent',
              borderColor: 'rgba(0, 0, 0, 0.12)',
              color: 'rgba(0, 0, 0, 0.7)',
            }}
          />
        </Box>

        {/* Descripción */}
        <Typography
          variant="body2"
          sx={{
            mb: 1.5,

            fontSize: '0.875rem',
            lineHeight: 1.4,
            color: 'rgba(0, 0, 0, 0.6)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {job.description}
        </Typography>

        {/* Detalles del trabajo */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          mb: 1.5,

          flexWrap: 'wrap'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <WorkIcon sx={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }} />
            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }}>
              {job.jobType}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <MoneyIcon sx={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }} />
            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }}>
              {job.salary}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon sx={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }} />
            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'rgba(0, 0, 0, 0.6)' }}>
              {job.postedTime}
            </Typography>
          </Box>
        </Box>

        {/* Fecha de cierre */}
        <Typography
          variant="body2"
          sx={{
            fontStyle: 'italic',
            textAlign: 'right',
            fontSize: '0.75rem',
            color: 'rgba(0, 0, 0, 0.5)',
            mr: 1,
          }}
        >
          Trabajo cierra: {job.closeDate}
        </Typography>
      </CardContent>
    </Card>
  );
}
