package com.fitness.userservices.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
public class RegisterRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email Format" )
    private String email;
    private String keycloakId;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password should be greater than 5")
    private String password;
    private String firstName;
    private String lastName;


}
