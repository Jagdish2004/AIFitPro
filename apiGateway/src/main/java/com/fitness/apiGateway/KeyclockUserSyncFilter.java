package com.fitness.apiGateway;


import com.fitness.apiGateway.user.RegisterRequest;
import com.fitness.apiGateway.user.UserService;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor

public class KeyclockUserSyncFilter implements WebFilter {
    private final UserService userService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain){
         String  token = exchange.getRequest().getHeaders().getFirst("Authorization");
        String userId = exchange.getRequest().getHeaders().getFirst("USERID");
        RegisterRequest registerRequest = getUserDetails(token);

        if(userId == null){
            userId = registerRequest.getKeycloakId();
        }
        if(userId != null && token != null){
            String finalUserId = userId;
            return userService.validateUser(userId)
                    .flatMap(exist -> {
                        if(!exist) {
                            //return user
                            if (registerRequest != null){
                                return userService.registerUser(registerRequest)
                                        .then(Mono.empty());
                            }
                            else{
                                return Mono.empty();
                            }
                        }
                            else{
                                log.info("user already exist, skiping sync.");
                                return Mono.empty();


                        }
                    })
                    .then(Mono.defer(() -> {
                ServerHttpRequest mutateRequest = exchange.getRequest().mutate()
                        .header("USERID", finalUserId)
                        .build();
                return chain.filter(exchange.mutate().request(mutateRequest).build());
            }));
        }
        return chain.filter(exchange);

    }

    private RegisterRequest getUserDetails(String token) {
        try{
            String tokenWithoutBearer = token.replace("Bearer" , "").trim();
            SignedJWT signedJWT = SignedJWT.parse(tokenWithoutBearer);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.setEmail(claims.getStringClaim("email"));
            registerRequest.setKeycloakId(claims.getStringClaim("sub"));
            registerRequest.setPassword("dummy@password");
            registerRequest.setFirstName(claims.getStringClaim("given_name"));
            registerRequest.setLastName(claims.getStringClaim("family_name"));

            return registerRequest;


        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
