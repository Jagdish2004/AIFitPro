package com.fitness.AiSuggestionService.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.AiSuggestionService.model.Activity;
import com.fitness.AiSuggestionService.model.Recommendation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityService {
    private final GeminiService geminiService;

    public Recommendation generateRecommendation(Activity activity){
        String prompt = createPromptForActivity(activity);
//        String prompt = "is this prompt reach to you or not";
        String aiResponse = geminiService.getAnswer(prompt);

        return processAiResponce(activity, aiResponse);


    }
    private Recommendation processAiResponce(Activity activity, String aiResponse){
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(aiResponse);

            JsonNode textNode = rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            String jsonContent = textNode.asText()
                    .replaceAll("```json\\n","")
                    .replaceAll("\\n```","")
                    .trim();

            log.info("parsed response from ai : {}",jsonContent);

            JsonNode analysisJson = mapper.readTree(jsonContent);
            JsonNode analysisNode = analysisJson.path("analysis");

            StringBuilder fullAnalysis = new StringBuilder();
            addAnalysisSection(fullAnalysis,analysisNode,"overall","Overall:");
            addAnalysisSection(fullAnalysis,analysisNode,"pace","Pace:");
            addAnalysisSection(fullAnalysis,analysisNode,"heartRate","Heart Rate:");
            addAnalysisSection(fullAnalysis,analysisNode,"caloriesBurned","Calories:");

            List<String> improvement = extractEmprovements(analysisJson.path("improvement"));
            List<String> safety = extractSafety(analysisJson.path("safety"));

            return Recommendation.builder()
                    .activityId(activity.getId())
                    .userId(activity.getUserId())
                    .activityType(activity.getType())
                    .recommendation(fullAnalysis.toString().trim())
                    .improvements(improvement)
                    .saftey(safety)
                    .createdAt(LocalDateTime.now())
                    .build();

        }catch(Exception e){
            e.printStackTrace();
            return defaultRecomandation(activity);
        }

    }

    private Recommendation defaultRecomandation(Activity activity) {
        return Recommendation.builder()
                .activityId(activity.getId())
                .userId(activity.getUserId())
                .activityType(activity.getType())
                .recommendation("Unable to generate detail recommandation")
                .improvements(Collections.singletonList("Continue with your current workout"))
                .saftey(Arrays.asList(
                        "always warm up before excercise",
                        "stay hydrated",
                        "Listen to your body"
                ))
                .createdAt(LocalDateTime.now())
                .build();
    }

    private List<String> extractSafety(JsonNode safetyNode) {
        List<String> safety = new ArrayList<>();

        if(safetyNode.isArray()){
            safetyNode.forEach(item ->safety.add(item.asText()));
        }
        return safety.isEmpty()?
                Collections.singletonList("No Specific Safety Provided"):
                safety;

    }

    private List<String> extractEmprovements(JsonNode improvementsNode) {
        List<String> improvements = new ArrayList<>();
        if(improvementsNode.isArray()){
            improvementsNode.forEach(improvement->{
                String area = improvement.path("area").asText();
                String detail = improvement.path("recommendation").asText();
                improvements.add(String.format("%s: %s", area, detail));
            });

        }
        return improvements.isEmpty()?
                Collections.singletonList("No Specific Improvement Provided"):
                improvements;
    }

    private void addAnalysisSection(StringBuilder fullAnalysis, JsonNode analysisNode, String key, String prefix) {
        if(!analysisNode.path(key).isMissingNode()){
            fullAnalysis.append(prefix)
                    .append(analysisNode.path(key).asText())
                    .append("\n\n");

        }

    }


    private String createPromptForActivity(Activity activity) {
        return String.format("""
            Analyze this fitness activity and provide detailed recommendation in the following exact JSON format:
            "analysis":{
              "overall": "overall analysis here",
              "peace": "peace analysis here",
              "heartRate": "Heart rate analysis here",
              "caloriesburned": "calories analysis here"
            },
            "improvement": [
              {
                "area": "Area name",
                "recommendation": "detailed recommendation here"
              }
            ],
            "safety": [
              "safety point1",
              "safety point2"
            ]
            Analyze this activity:
            Activity Type: %s
            Duration: %d minutes
            Calories Burned: %d
            Additional Metrics: %s
            Provide the detailed analysis focusing on performance improvement, and next activity.
            Ensure the response follows the EXACT JSON format shown above.""",
                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getAdditionalMetrics()
        );
    }

}
