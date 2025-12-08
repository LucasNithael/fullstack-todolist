package com.testetecnico.backend_todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.testetecnico.backend_todolist.model.Task;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}
