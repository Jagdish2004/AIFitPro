package com.fitness.userservices.repository;

import com.fitness.userservices.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    User findByEmail(@NotBlank(message = "Email is required") @Email(message = "Invalid Email Format" ) String email);

    Boolean existsByKeycloakId(String userId);
}
