import React, { useEffect, useState} from "react";
import { getActivityDetail, getActivity} from "../services/api";
import { useParams } from "react-router";
import { Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material';

const ActivityDetail = ({}) => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    fetchActivityDetail();
  }, []);

  const fetchActivityDetail = async () => {
    try {

      const response = await getActivityDetail(id);
      const detail = await getActivity(id);
      setActivity(detail.data);
      setRecommendation(response.data);
    } catch (error) {
      console.error("Error fetching activity detail:", error);
    }
  };

  if (!activity) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}><Typography>Loading activity details...</Typography></Box>;
  }

  return (
    <Box sx={{ width: '100%', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', py: { xs: 2, md: 6 } }}>
      <Card sx={{ width: '100%', maxWidth: 1200, borderRadius: 4, boxShadow: '0 4px 24px 0 rgba(63,81,181,0.10)', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardContent sx={{ width: '100%' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#3f51b5', mb: 2, textAlign: 'center' }}>
            Activity Detail
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {/* Header Row: Type and Times */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', mb: 3, gap: 2 }}>
            <Chip label={activity.type} color="primary" sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#1976d2' }}><strong>Start:</strong> {new Date(activity.startTime).toLocaleString()}</Typography>
              <Typography variant="body2" sx={{ color: '#1976d2' }}><strong>End:</strong> {new Date(activity.endTime).toLocaleString()}</Typography>
            </Box>
          </Box>
          {/* Key Metrics Grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr 1fr' },
            gap: 3,
            mb: 3,
            justifyItems: 'center',
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ color: '#888' }}>Duration</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{activity.duration} <span style={{fontSize: '0.9rem', color: '#aaa'}}>min</span></Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ color: '#888' }}>Calories</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{activity.caloriesBurned}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ color: '#888' }}>Distance</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{activity.additionalMetrics?.distance || 'N/A'} <span style={{fontSize: '0.9rem', color: '#aaa'}}>km</span></Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ color: '#888' }}>Heart Rate</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{activity.additionalMetrics?.averageHeartRate || 'N/A'} <span style={{fontSize: '0.9rem', color: '#aaa'}}>bpm</span></Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ color: '#888' }}>Steps</Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{activity.additionalMetrics?.steps || 'N/A'}</Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: 2 }} />
          {recommendation && (
            <Box sx={{ mt: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {/* Recommendation Section */}
              <Box sx={{ flex: 1, background: 'linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: 2, p: 3, boxShadow: '0 2px 8px 0 rgba(33,150,243,0.08)' }}>
                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 600, mb: 1 }}>Recommendation</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{recommendation.recommendation}</Typography>
              </Box>
              {/* Improvements Section */}
              {recommendation.improvements?.length > 0 && (
                <Box sx={{ flex: 1, background: 'linear-gradient(90deg, #e8f5e9 0%, #c8e6c9 100%)', borderRadius: 2, p: 3, boxShadow: '0 2px 8px 0 rgba(76,175,80,0.08)' }}>
                  <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 600, mb: 1 }}>Improvements</Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {recommendation.improvements.map((item, idx) => (
                      <li key={idx} style={{ marginBottom: 6 }}><Typography variant="body2">{item}</Typography></li>
                    ))}
                  </ul>
                </Box>
              )}
              {/* Safety Tips Section */}
              {recommendation.saftey?.length > 0 && (
                <Box sx={{ flex: 1, background: 'linear-gradient(90deg, #fffde7 0%, #fff9c4 100%)', borderRadius: 2, p: 3, boxShadow: '0 2px 8px 0 rgba(255,235,59,0.08)' }}>
                  <Typography variant="h6" sx={{ color: '#fbc02d', fontWeight: 600, mb: 1 }}>Safety Tips</Typography>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {recommendation.saftey.map((tip, idx) => (
                      <li key={idx} style={{ marginBottom: 6 }}><Typography variant="body2">{tip}</Typography></li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityDetail;
