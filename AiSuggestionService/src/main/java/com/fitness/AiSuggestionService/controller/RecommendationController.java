package com.fitness.AiSuggestionService.controller;

import com.fitness.AiSuggestionService.model.Recommendation;
import com.fitness.AiSuggestionService.service.RecommendationServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendation")
public class RecommendationController {
    private final RecommendationServices recommendationServices;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommendation>>getUserRecommendation (@PathVariable String userId){
        return ResponseEntity.ok(recommendationServices.getUserRecommendation(userId));
    }
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<Recommendation>getActivityRecommendation (@PathVariable String activityId){
        return ResponseEntity.ok(recommendationServices.getActivityRecommention(activityId));
    }
}
