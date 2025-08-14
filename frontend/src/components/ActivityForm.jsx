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
     <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
    <FormControl fullWidth sx={{ mb: 2 }}>
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
        <TextField fullWidth
            label ="Duration(mins)"
            type = "number"
            sx={{mb:2}} 
            value={activity.duration}
            onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
        ></TextField>
         <TextField fullWidth
            label ="caloriesBurned"
            type = "number"
            sx={{mb:2}} 
            value={activity.caloriesBurned}
            onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
        ></TextField>

        
      <TextField
        fullWidth
        margin="normal"
        label="Start Time"
        name="startTime"
        type="datetime-local"
        value={activity.startTime}
        onChange={(e) => setActivity({ ...activity, startTime: e.target.value })}
      />

      <TextField
        fullWidth
        margin="normal"
        label="End Time"
        name="endTime"
        type="datetime-local"
        value={activity.endTime}
        onChange={(e) => setActivity({ ...activity, endTime: e.target.value })}
      />

      {/* Metrics Fields */}
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


        <Button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '4px' }}>
            Add Activity
        </Button>
    </Box>
  );
}

export default ActivityForm;