package com.fitness.AiSuggestionService.model;

import lombok.Data;

import java.util.Map;
import java.time.LocalDateTime;

@Data

public class Activity {

    private String id;
    private String userId;
    private Integer duration;
    private String type;
    private Integer caloriesBurned;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Map<String, Object> additionalMetrics;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
