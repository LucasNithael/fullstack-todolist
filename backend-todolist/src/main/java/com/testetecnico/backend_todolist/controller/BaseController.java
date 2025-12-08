package com.testetecnico.backend_todolist.controller;

import com.testetecnico.backend_todolist.dto.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {
    protected ResponseEntity<Object> customResponse(Object result, HttpStatus status) {
        var body = new ResponseWrapper(
                status.is2xxSuccessful(),
                "",
                result
        );
        return new ResponseEntity<>(body, status);
    }


}
