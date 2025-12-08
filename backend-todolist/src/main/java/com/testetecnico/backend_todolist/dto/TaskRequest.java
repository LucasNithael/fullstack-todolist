package com.testetecnico.backend_todolist.dto;

import com.testetecnico.backend_todolist.model.enums.Priority;

import java.time.LocalDate;

public record TaskRequest(
    String title,
    String description,
    LocalDate deadline,
    boolean completed,
    Priority priority,
    Integer responsibleId
){}
