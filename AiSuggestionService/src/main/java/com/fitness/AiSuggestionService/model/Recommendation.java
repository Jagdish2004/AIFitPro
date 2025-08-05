package com.fitness.AiSuggestionService.model;


import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.annotation.Collation;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "recommendation")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Recommendation{

    @Id
    private String id;

    private String activityId;
    private String userId;
    private String activityType;
    private String recommendation;
    private List<String> improvements;
//    private List<String> suggestions;
    private List<String> saftey;

    @CreatedDate
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
