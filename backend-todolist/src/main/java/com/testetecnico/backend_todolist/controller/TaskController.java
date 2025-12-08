package com.testetecnico.backend_todolist.controller;

import com.testetecnico.backend_todolist.service.TaskService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.testetecnico.backend_todolist.dto.TaskRequest;

@RestController
@RequestMapping("/task")
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin(origins = "*")
public class TaskController extends BaseController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<Object>  getAll(){
        var tasks = taskService.getAll();
        return customResponse(tasks, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> save(@RequestBody TaskRequest task){
        taskService.save(null, task);
        return customResponse(null, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable Integer id, @RequestBody TaskRequest task){
        taskService.save(id, task);
        return customResponse(null, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id){
        taskService.deleteById(id);
        return customResponse(null, HttpStatus.NO_CONTENT);
    }

}
