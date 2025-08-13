import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import { useState } from 'react';


 
const ActivityForm = ({onActivitiesAdded}) => {

    const [activity, setActivity] = useState({
        title: "RUNNING",
        duration: '',
        caloriesBurned: ''
    });



    const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        // await addActivity(activity);
        onActivitiesAdded();
        setActivity({
        title: "RUNNING",
        duration: '',
        caloriesBurned: ''
        });
    }catch (error) {
        console.error("Error adding activity:", error);
    }
}


  return (
     <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
    <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Activity Type</InputLabel>
        <Select value={activity.type} onChange={(e) => setActivity({ ...activity, type: e.target.value })}>
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
            <MenuItem value="SWIMMING">Swimming</MenuItem>
            <MenuItem value="YOGA">Yoga</MenuItem>
            <MenuItem value="WEIGHTLIFTING">Weightlifting</MenuItem>        
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
        <Button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '4px' }}>
            Add Activity
        </Button>
    </Box>
  );
}

export default ActivityForm;