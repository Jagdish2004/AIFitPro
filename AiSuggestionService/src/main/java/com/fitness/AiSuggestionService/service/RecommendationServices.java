package com.fitness.AiSuggestionService.service;

import com.fitness.AiSuggestionService.model.Recommendation;
import com.fitness.AiSuggestionService.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationServices {
    
    private final RecommendationRepository recommendationRepository;
    
    public List<Recommendation> getUserRecommendation(String userId) {

    return recommendationRepository.findByUserId(userId);
    }

    public Recommendation getActivityRecommention(String activityId) {
        return recommendationRepository.findByActivityId(activityId).orElseThrow(() -> new RuntimeException("No recommendation for this Activity id: "+activityId));

    }
}
