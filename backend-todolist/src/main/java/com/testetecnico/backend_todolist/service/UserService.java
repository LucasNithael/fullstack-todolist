package com.testetecnico.backend_todolist.service;

import com.testetecnico.backend_todolist.dto.TaskResponse;
import com.testetecnico.backend_todolist.dto.UserRequest;
import com.testetecnico.backend_todolist.dto.UserResponse;
import com.testetecnico.backend_todolist.exception.UserAlreadyExistsException;
import com.testetecnico.backend_todolist.exception.UserNotFoundException;
import com.testetecnico.backend_todolist.model.Task;
import com.testetecnico.backend_todolist.model.User;
import com.testetecnico.backend_todolist.repository.UserRepository;
import com.testetecnico.backend_todolist.security.TokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    public UserService(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            TokenService tokenService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    public List<UserResponse> getAll() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UserResponse login(String username, String password) {

        if (userRepository.findByUsername(username) == null) {
            throw new UserNotFoundException("Usuário não encontrado: " + username);
        }

        var usernamePassoword = new UsernamePasswordAuthenticationToken(username, password);
        var auth = this.authenticationManager.authenticate(usernamePassoword);
        var user = (User) auth.getPrincipal();
        var token = tokenService.generateToken(user);
        return new UserResponse(user.getId(), user.getUsername(), token);
    }

    public UserResponse register(UserRequest userRequest){

        if (userRepository.findByUsername(userRequest.username()) != null) {
            throw new UserAlreadyExistsException("Usuário já existe: " + userRequest.username());
        }

        String encryotedPassword = new BCryptPasswordEncoder().encode(userRequest.password());
        User  user = new User(userRequest.username(), encryotedPassword);

        this.userRepository.save(user);

        return login(userRequest.username(), userRequest.password());
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                ""
        );
    }
}
