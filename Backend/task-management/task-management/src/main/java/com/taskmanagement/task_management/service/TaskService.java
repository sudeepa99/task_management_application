package com.taskmanagement.task_management.service;

import com.taskmanagement.task_management.dto.TaskRequest;
import com.taskmanagement.task_management.entity.Task;
import org.springframework.data.domain.Page;

public interface TaskService {
    Task createTask(TaskRequest taskRequest);

    Task updateTask(Long id, TaskRequest request);

    void deleteTask(Long id);

    Page<Task> getTasks(int page, int size);
}
