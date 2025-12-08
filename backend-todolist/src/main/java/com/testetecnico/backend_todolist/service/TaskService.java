package com.testetecnico.backend_todolist.service;

import com.testetecnico.backend_todolist.dto.TaskRequest;
import com.testetecnico.backend_todolist.dto.TaskResponse;
import com.testetecnico.backend_todolist.dto.UserResponse;
import com.testetecnico.backend_todolist.exception.TaskDateException;
import com.testetecnico.backend_todolist.exception.TaskNotFoundException;
import com.testetecnico.backend_todolist.exception.UserNotFoundException;
import com.testetecnico.backend_todolist.repository.TaskRepository;
import com.testetecnico.backend_todolist.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.testetecnico.backend_todolist.model.*;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,  UserRepository userRepository) {

        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public List<TaskResponse> getAll() {
        return taskRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }


    public void save(Integer id, TaskRequest task) {

        if (task.deadline().isBefore(LocalDate.now())) {
            throw new TaskDateException("A data de deadline não pode ser anterior à data atual.");
        }

        Task taskEntity;

        if (id != null) {
            taskEntity = taskRepository.findById(id)
                    .orElseThrow(() -> new TaskNotFoundException("Tarefa não encontrada: " + id));
        } else {
            taskEntity = new Task();
        }

        User user = userRepository.findById(task.responsibleId())
                .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado: " + task.responsibleId()));

        taskEntity.setTitle(task.title());
        taskEntity.setDescription(task.description());
        taskEntity.setDeadline(task.deadline());
        taskEntity.setCompleted(task.completed());
        taskEntity.setPriority(task.priority());
        taskEntity.setResponsible(user);

        taskRepository.save(taskEntity);
    }

    public void deleteById(Integer id) {

        if (id == null || !taskRepository.existsById(id)) {
            throw new UserNotFoundException("Task não encontrada: " + id);
        }

        taskRepository.deleteById(id);
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDeadline(),
                task.isCompleted(),
                task.getPriority(),
                new UserResponse(
                        task.getResponsible().getId(),
                        task.getResponsible().getUsername(),
                        ""
                )
        );
    }


}
