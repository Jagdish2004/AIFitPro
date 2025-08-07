package com.fitness.userservices.services;

import com.fitness.userservices.dto.RegisterRequest;
import com.fitness.userservices.dto.UserResponse;
import com.fitness.userservices.model.User;
import com.fitness.userservices.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserResponse register(@Valid RegisterRequest request) {
        if(repository.existsByEmail(request.getEmail())){
            User existingUser = repository.findByEmail(request.getEmail());
            UserResponse UserResponse = new UserResponse();

            UserResponse.setId(existingUser.getId());
            UserResponse.setEmail(existingUser.getEmail());
            UserResponse.setPassword(existingUser.getPassword());
            UserResponse.setKeycloakId(existingUser.getKeycloakId());
            UserResponse.setFirstName(existingUser.getFirstName());
            UserResponse.setLastName(existingUser.getLastName());
            UserResponse.setCreatedAt(existingUser.getCreatedAt());
            UserResponse.setUpdatedAt(existingUser.getUpdatedAt());
            return UserResponse;
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setKeycloakId(request.getKeycloakId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User saveUser = repository.save(user);
        UserResponse UserResponse = new UserResponse();
        UserResponse.setId(saveUser.getId());
        UserResponse.setEmail(saveUser.getEmail());
        UserResponse.setKeycloakId(saveUser.getKeycloakId());
        UserResponse.setPassword(saveUser.getPassword());
        UserResponse.setFirstName(saveUser.getFirstName());
        UserResponse.setLastName(saveUser.getLastName());
        UserResponse.setCreatedAt(saveUser.getCreatedAt());
        UserResponse.setUpdatedAt(saveUser.getUpdatedAt());

        log.info("\nnew user registered successfully userId: {}",saveUser.getId());
        return UserResponse;
    }

    public UserResponse getUserProfile(String userId) {
        User user = repository.findById(userId)
                .orElseThrow(()-> new RuntimeException("User Not Found!")) ;

        UserResponse UserResponse = new UserResponse();
        UserResponse.setId(user.getId());
        UserResponse.setPassword(user.getPassword());
        UserResponse.setKeycloakId(user.getKeycloakId());
        UserResponse.setEmail(user.getEmail());
        UserResponse.setFirstName(user.getFirstName());
        UserResponse.setLastName(user.getLastName());
        UserResponse.setCreatedAt(user.getCreatedAt());
        UserResponse.setUpdatedAt(user.getUpdatedAt());

        return UserResponse;
    }

    public Boolean existByUserId(String userId) {
        log.info("\n Calling user Validation Api for User: {}", userId);
//        return repository.existsById(userId);
        return repository.existsByKeycloakId(userId);
    }
}
