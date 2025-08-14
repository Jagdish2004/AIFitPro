import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api'; // adjust the path

const ActivityList = () => {
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

  return (
    <Grid container spacing={2} sx={{ padding: '16px' }}>
      {activities.map((activity) => (
        <Grid key={activity.id} xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigate(`/activities/${activity.id}`)}
            sx={{
              cursor: 'pointer',
              boxShadow: 3,
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                {activity.type}
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                Duration: {activity.duration} mins
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                Calories Burned: {activity.caloriesBurned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;
