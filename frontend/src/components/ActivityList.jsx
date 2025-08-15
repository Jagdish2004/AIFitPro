import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api'; // adjust the path

const ActivityList = ({ limit = null }) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const shownActivities = limit ? activities.slice(0, limit) : activities;
  // Sort by start time descending (most recent first)
  const sortedActivities = [...shownActivities].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  return (
    <Box sx={{
      maxHeight: { xs: 'none', md: '75vh' },
      overflowY: { xs: 'visible', md: 'auto' },
      pr: 1,
      '::-webkit-scrollbar': {
        width: '8px',
        background: 'rgba(187, 222, 251, 0.3)',
        borderRadius: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(135deg, #64b5f6 0%, #1976d2 100%)',
        borderRadius: '8px',
      },
      'scrollbarWidth': 'thin',
      'scrollbarColor': '#1976d2 #bbdefb',
    }}>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sortedActivities.map((activity) => (
          <Card
            key={activity.id}
            onClick={() => navigate(`/activities/${activity.id}`)}
            sx={{
              cursor: 'pointer',
              boxShadow: 3,
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
              background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: 3,
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              minHeight: 64,
              maxWidth: '100%',
              flexWrap: 'wrap',
              boxSizing: 'border-box',
            }}
          >
            <Chip label={activity.type} color="primary" sx={{ fontWeight: 600, fontSize: '1rem', mr: 2, mb: { xs: 1, md: 0 } }} />
            <Typography variant="body1" sx={{ fontWeight: 500, minWidth: 120 }}>
              Duration: <span style={{ color: '#1976d2', fontWeight: 700 }}>{activity.duration} min</span>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500, minWidth: 160, ml: 2 }}>
              Calories: <span style={{ color: '#388e3c', fontWeight: 700 }}>{activity.caloriesBurned}</span>
            </Typography>
            <Typography variant="body2" sx={{ color: '#888', ml: 2, minWidth: 180 }}>
              Start: {activity.startTime ? new Date(activity.startTime).toLocaleString() : 'N/A'}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ActivityList;
