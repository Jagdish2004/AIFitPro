package com.fitness.activityService.controller;

import com.fitness.activityService.dto.ActivityRequest;
import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.activityService.model.Activity;
import com.fitness.activityService.service.ActivityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@AllArgsConstructor
public class ActivityController {

    private ActivityService activityService;

    @PostMapping("/")
    public ResponseEntity<ActivityResponse> trackActivity(@RequestBody ActivityRequest request ,@RequestHeader("USERID") String userId){
        if(userId != null){
            request.setUserId(userId);
        }
        return ResponseEntity.ok(activityService.trackActivity(request));
    }

    @GetMapping("/")
    public ResponseEntity<List<ActivityResponse>> getActivities (@RequestHeader("USERID") String userId){
        return ResponseEntity.ok(activityService.getActivities(userId));

    }
    @GetMapping("/{activityId}")
    public ResponseEntity<ActivityResponse> getActivity( @PathVariable String activityId){
        return ResponseEntity.ok(activityService.getActivityById(activityId));
    }

}
