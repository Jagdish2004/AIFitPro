package com.fitness.AiSuggestionService.service;

import com.fitness.AiSuggestionService.model.Activity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityService {
    private final GeminiService geminiService;

    public String generateRecommendation(Activity activity){
        String prompt = createPromptForActivity(activity);
//        String prompt = "is this prompt reach to you or not";
        String aiResponse = geminiService.getAnswer(prompt);

        log.info("response from ai: {}",aiResponse);

        return aiResponse;

    }

    private String createPromptForActivity(Activity activity) {
        return String.format("""
            You are a fitness coach AI. Analyze the following user activity and return personalized fitness recommendations strictly in JSON format only. Do not add any explanation.

            The activity data includes:

            - duration (in minutes)
            - caloriesBurned
            - startTime and endTime
            - additionalMetrics (could include heart rate, steps, reps, distance, etc.)

            The response must be a valid JSON object like:

            {
              "summary": "Concise summary of activity performance.",
              "recommendations": [
                "First recommendation",
                "Second recommendation"
              ],
              "nextSteps": {
                "suggestedActivity": "e.g. Rest day, Cardio, Strength training",
                "duration": "e.g. 30 minutes",
                "intensity": "Low / Moderate / High",
                "focus": "e.g. endurance, flexibility, strength"
              },
              "wellnessTips": [
                "hydration, sleep, recovery, etc."
              ]
            }

            Here is the user's activity data:

            {
              "duration": %d,
              "caloriesBurned": %d,
              "startTime": "%s",
              "endTime": "%s",
              "type": %s,
              "additionalMetrics": %s,
            }
            """,
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getStartTime(),
                activity.getEndTime(),
                activity.getType(),
                activity.getAdditionalMetrics().toString()
        );
    }

}
