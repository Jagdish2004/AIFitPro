package com.fitness.activityService;

import com.fitness.activityService.dto.ActivityResponse;
import com.fitness.activityService.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity,String> {
    List<Activity> findByUserId(String userId);
}
