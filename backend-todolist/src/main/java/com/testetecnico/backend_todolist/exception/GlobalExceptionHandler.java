package com.testetecnico.backend_todolist.exception;

import com.testetecnico.backend_todolist.dto.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ResponseWrapper> handleUserAlreadyExists(UserAlreadyExistsException ex) {

        ResponseWrapper body = new ResponseWrapper(
                false,
                ex.getMessage(),
                null
        );

        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ResponseWrapper> handleUserNotFound(UserNotFoundException ex) {

        ResponseWrapper body = new ResponseWrapper(
                false,
                ex.getMessage(),
                null
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ResponseWrapper> handleTaskNotFound(TaskNotFoundException ex) {

        ResponseWrapper body = new ResponseWrapper(
                false,
                ex.getMessage(),
                null

        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(TaskDateException.class)
    public ResponseEntity<ResponseWrapper> handleTaskNotFound(TaskDateException ex) {

        ResponseWrapper body = new ResponseWrapper(
                false,
                ex.getMessage(),
                null

        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }
}