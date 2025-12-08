package com.testetecnico.backend_todolist.controller;

import com.testetecnico.backend_todolist.dto.UserRequest;
import com.testetecnico.backend_todolist.dto.UserResponse;
import com.testetecnico.backend_todolist.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class UserController extends BaseController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Object> getAll() {
        var result = userService.getAll();
        return customResponse(result, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid UserRequest userRequest){
        var result = userService.login(userRequest.username(), userRequest.password());
        return customResponse(result, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid UserRequest userRequest){
        var result = userService.register(userRequest);
        return customResponse(result, HttpStatus.CREATED);
    }
}
