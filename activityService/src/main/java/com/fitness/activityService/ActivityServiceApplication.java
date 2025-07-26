package com.fitness.activityService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ActivityServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ActivityServiceApplication.class, args);
		System.out.println("-------------->ActivityService Microservice is Started ");
	}

}
