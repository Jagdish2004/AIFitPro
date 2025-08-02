package com.fitness.userservices.services;

import com.fitness.userservices.dto.RegisterRequest;
import com.fitness.userservices.dto.UserResponse;
import com.fitness.userservices.model.User;
import com.fitness.userservices.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserResponse register(@Valid RegisterRequest request) {
        if(repository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exist");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User saveUser = repository.save(user);
        UserResponse UserResponse = new UserResponse();
        UserResponse.setId(saveUser.getId());
        UserResponse.setEmail(saveUser.getEmail());
        UserResponse.setFirstName(saveUser.getFirstName());
        UserResponse.setLastName(saveUser.getLastName());
        UserResponse.setCreatedAt(saveUser.getCreatedAt());
        UserResponse.setUpdatedAt(saveUser.getUpdatedAt());

        return UserResponse;
    }

    public UserResponse getUserProfile(String userId) {
        User user = repository.findById(userId)
                .orElseThrow(()-> new RuntimeException("User Not Found!")) ;

        UserResponse UserResponse = new UserResponse();
        UserResponse.setId(user.getId());
        UserResponse.setPassword(user.getPassword());
        UserResponse.setEmail(user.getEmail());
        UserResponse.setFirstName(user.getFirstName());
        UserResponse.setLastName(user.getLastName());
        UserResponse.setCreatedAt(user.getCreatedAt());
        UserResponse.setUpdatedAt(user.getUpdatedAt());

        return UserResponse;
    }

    public Boolean existByUserId(String userId) {
        return repository.existsById(userId);
    }
}
