package com.testetecnico.backend_todolist.controller;

import com.testetecnico.backend_todolist.dto.UserRequest;
import com.testetecnico.backend_todolist.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController extends BaseController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
