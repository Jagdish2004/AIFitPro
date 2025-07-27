package com.fitness.activityService.service;

import com.fitness.activityService.ActivityRepository;
import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.activityService.model.Activity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityResponse trackActivity(ActivityRequest request) {
        Activity activity  = Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned((request.getCaloriesBurned()))
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .additionalMetrics(request.getAdditionalMetrics())
                .build();
        Activity saveActivity = activityRepository.save(activity);
        return mapToResponse(saveActivity);
    }

    private ActivityResponse mapToResponse(Activity activity){
        ActivityResponse response = new ActivityResponse();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setStartTime(activity.getStartTime());
        response.setEndTime(activity.getEndTime());
        response.setAdditionalMetrics(activity.getAdditionalMetrics());
        response.setCreatedAt(activity.getCreatedAt());
        response.setUpdatedAt(activity.getUpdatedAt());

        return response;


    }

    public List<ActivityResponse> getActivities(String userId) {
        List<Activity> response = activityRepository.findByUserId(userId);
        return response.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());


    }
}
