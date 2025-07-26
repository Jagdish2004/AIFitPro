package com.fitness.userservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UserservicesApplication {

	public static void main(String[] args)
	{
		SpringApplication.run(UserservicesApplication.class, args);
		System.out.println(" ------------->User Microservice Application started!");
	}

}
