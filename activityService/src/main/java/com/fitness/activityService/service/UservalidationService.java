package com.fitness.activityService.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Slf4j
@Service
@RequiredArgsConstructor
public class UservalidationService {

    private final WebClient userServideWebclient;

    public boolean validateUser(String userId){

        try{
            Boolean block = userServideWebclient.get()
                    .uri("api/user/{userId}/validate", userId)
                    .retrieve().bodyToMono(Boolean.class)
                    .block();
            log.info("user validation called ");
            return block;

        }catch(WebClientResponseException e){
            if(e.getStatusCode() == HttpStatus.NOT_FOUND)
                throw new RuntimeException("User Not Fount!");
            else if(e.getStatusCode() == HttpStatus.BAD_REQUEST)
                throw new RuntimeException("Server is returning Bad Request!");
            else if(e.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR)
                throw new RuntimeException("Server may Be crashed !");


        }


     return false;

        
    }
}
