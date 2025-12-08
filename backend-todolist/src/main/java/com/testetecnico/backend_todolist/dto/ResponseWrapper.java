package com.testetecnico.backend_todolist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseWrapper {
    private boolean success;
    private String message;
    private Object data;
}
