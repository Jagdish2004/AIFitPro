package com.fitness.activityService.service;

import com.fitness.activityService.ActivityRepository;
import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.activityService.model.Activity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UservalidationService uservalidationService;

    public ActivityResponse trackActivity(ActivityRequest request) {

        boolean isValidUser = uservalidationService.validateUser(request.getUserId());
        if(!isValidUser) throw new RuntimeException("Invalid User" + request.getUserId());
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

        log.info("Activity saved Successfully activityId: {}",activity.getId());
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
        log.info("\nCall for All Activities of userId: {}",userId);
        return response.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());


    }

    public ActivityResponse getActivityById(String activityId) {
        log.info("\nCall for activity if id : {}",activityId);
    return activityRepository.findById(activityId)
            .map(this::mapToResponse)
            .orElseThrow(()->new RuntimeException("No Such Activity Found!"));

    }
}
