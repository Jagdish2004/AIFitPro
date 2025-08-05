package com.fitness.AiSuggestionService.service;

import com.fitness.AiSuggestionService.model.Activity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListner {
    private final ActivityService aiService;

    @RabbitListener(queues = "activity.queue")
    public void processActivity(Activity activity){
    log.info("Received activity for processing: {}",activity.getId());
   log.info("Generated recommendation: {}", aiService.generateRecommendation(activity));

    }
}
