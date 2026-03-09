package com.taskmanagement.task_management.service;

import com.taskmanagement.task_management.dto.TaskRequest;
import com.taskmanagement.task_management.dto.TaskResponse;
import com.taskmanagement.task_management.enums.TaskPriority;
import com.taskmanagement.task_management.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    TaskResponse createTask(TaskRequest request);
    TaskResponse updateTask(Long id, TaskRequest request);
    void deleteTask(Long id);
    TaskResponse getTaskById(Long id);
    Page<TaskResponse> getTasksForCurrentUser(TaskStatus status, TaskPriority priority, Pageable pageable);
    Page<TaskResponse> getAllTasksForAdmin(TaskStatus status, TaskPriority priority, Pageable pageable);
}