package com.testetecnico.backend_todolist.model;

import com.testetecnico.backend_todolist.model.enums.Priority;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDate deadline;

    @Column(nullable = false)
    private boolean completed = false;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "responsible_id", nullable = false)
    private User responsible;
}

// title string
// description string
// responsible User
// Priority EnumPriority
// deadline