import React, { act } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { addActivity } from '../services/api';


 
const ActivityForm = ({onActivitiesAdded}) => {

    const [activity, setActivity] = useState({
        type: "OTHER",
        duration: '',
        caloriesBurned: '',
        startTime: '',
        endTime: '',
        additionalMetrics:{
            distance: '',
            averageHeartRate: '',
            steps: ''
        }
    });



    const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        await addActivity(activity);
        console.log(activity);
        onActivitiesAdded();
        setActivity({
        type: "OTHER",
        duration: '',
        caloriesBurned: '',
        startTime: '',
        endTime: '',
        additionalMetrics:{
            distance: '',
            averageHeartRate: '',
            steps: ''
        }
        });
        
    }catch (error) {
        console.error("Error adding activity:", error);
    }
}


  return (
    <Box sx={{ width: '100%', mt: { xs: 2, sm: 2 }, px: { xs: 0, sm: 1, md: 2 }, display: 'flex', justifyContent: 'center', alignItems: 'center', height: { md: 'auto' } }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: '100%', md: '90%' },
          maxWidth: { xs: '100%', md: 420 },
          background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)',
          borderRadius: { xs: 0, sm: 4 },
          boxShadow: { xs: 'none', sm: '0 4px 24px 0 rgba(63,81,181,0.10)' },
          p: { xs: 1, sm: 2 },
          mb: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: 'auto',
          minHeight: { md: 256 },
        }}
      >
        <Box sx={{ width: '100%', mb: 2, textAlign: 'center' }}>
          <Box sx={{ fontWeight: 700, fontSize: '2rem', color: '#3f51b5', mb: 1 }}>Add Activity</Box>
          <Box sx={{ color: '#1976d2', fontSize: '1rem' }}>Track your fitness journey</Box>
        </Box>
        {/* Activity Type Section */}
        <Box sx={{ width: '100%', background: 'linear-gradient(90deg, #e8f5e9 0%, #c8e6c9 100%)', borderRadius: 2, p: 1, mb: 2, boxShadow: '0 2px 8px 0 rgba(76,175,80,0.08)' }}>
          <FormControl fullWidth>
            <InputLabel>Activity Type</InputLabel>
            <Select value={activity.type || ""} onChange={(e) => setActivity({ ...activity, type: e.target.value })}>
              <MenuItem value="OTHER">Other</MenuItem>
              <MenuItem value="WEIGHT_TRAINING">Weight Training</MenuItem>
              <MenuItem value="CYCLING">Cycling</MenuItem>
              <MenuItem value="CARDIO">Cardio</MenuItem>
              <MenuItem value="WALKING">Walking</MenuItem>
              <MenuItem value="STRETCHING">Stretching</MenuItem>
              <MenuItem value="RUNNING">Running</MenuItem>
              <MenuItem value="YOGA">Yoga</MenuItem>
              <MenuItem value="CLIMBING">Climbing</MenuItem>
              <MenuItem value="SWIMMING">Swimming</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Main Metrics Section */}
        <Box sx={{ width: '100%', background: 'linear-gradient(90deg, #fffde7 0%, #fff9c4 100%)', borderRadius: 2, p: 1, mb: 2, boxShadow: '0 2px 8px 0 rgba(255,235,59,0.08)', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
          <TextField
            fullWidth
            label="Duration (mins)"
            type="number"
            value={activity.duration}
            onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
          />
          <TextField
            fullWidth
            label="Calories Burned"
            type="number"
            value={activity.caloriesBurned}
            onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Start Time"
            name="startTime"
            type="datetime-local"
            value={activity.startTime}
            onChange={(e) => setActivity({ ...activity, startTime: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="End Time"
            name="endTime"
            type="datetime-local"
            value={activity.endTime}
            onChange={(e) => setActivity({ ...activity, endTime: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        {/* Additional Metrics Section */}
        <Box sx={{ width: '100%', background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: 2, p: 1, mb: 2, boxShadow: '0 2px 8px 0 rgba(33,150,243,0.08)', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Distance (km)"
            name="distance"
            type="number"
            value={activity.additionalMetrics.distance}
            onChange={(e) => setActivity({ ...activity, additionalMetrics: { ...activity.additionalMetrics, distance: e.target.value } })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Average Heart Rate (bpm)"
            name="averageHeartRate"
            type="number"
            value={activity.additionalMetrics.averageHeartRate}
            onChange={(e) => setActivity({ ...activity, additionalMetrics: { ...activity.additionalMetrics, averageHeartRate: e.target.value } })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Steps"
            name="steps"
            type="number"
            value={activity.additionalMetrics.steps}
            onChange={(e) => setActivity({ ...activity, additionalMetrics: { ...activity.additionalMetrics, steps: e.target.value } })}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            width: { xs: '100%', md: '60%' },
            background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            padding: '12px 0',
            borderRadius: '30px',
            boxShadow: '0 2px 8px 0 rgba(33,150,243,0.10)',
            textTransform: 'none',
            letterSpacing: 1,
            transition: '0.3s',
            '&:hover': {
              background: 'linear-gradient(90deg, #283593 0%, #1976d2 100%)',
              transform: 'scale(1.03)',
              boxShadow: '0 4px 16px 0 rgba(33,150,243,0.15)',
            },
            display: 'block',
            mx: { xs: 0, md: 'auto' },
          }}
        >
          Add Activity
        </Button>
      </Box>
    </Box>
  );
}

export default ActivityForm;