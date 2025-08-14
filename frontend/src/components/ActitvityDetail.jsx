import React, { useEffect, useState} from "react";
import { getActivityDetail, getActivity} from "../services/api";
import { useParams } from "react-router";

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
    return <p>Loading activity details...</p>;
  }

  return (
    <div style={{ padding: "10px", fontFamily: "Arial" }}>
      <h2>Activity Detail</h2>

      <div style={{ marginBottom: "15px" }}>
        <p><strong>Type:</strong> {activity.type}</p>
        <p><strong>Duration:</strong> {activity.duration} mins</p>
        <p><strong>Calories Burned:</strong> {activity.caloriesBurned}</p>
        <p><strong>Distance:</strong> {activity.additionalMetrics?.distance || 'N/A'} km</p>
        <p><strong>Average Heart Rate:</strong> {activity.additionalMetrics?.averageHeartRate || 'N/A'} bpm</p>
        <p><strong>Steps:</strong> {activity.additionalMetrics?.steps || 'N/A'}</p>
        <p><strong>Start Time:</strong> {new Date(activity.startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(activity.endTime).toLocaleString()}</p>
      </div>

      {recommendation && (
        <div>
          <h3>Recommendation</h3>
          <p>{recommendation.recommendation}</p>

          {recommendation.improvements?.length > 0 && (
            <>
              <h4>Improvements</h4>
              <ul>
                {recommendation.improvements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {recommendation.saftey?.length > 0 && (
            <>
              <h4>Safety Tips</h4>
              <ul>
                {recommendation.saftey.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
