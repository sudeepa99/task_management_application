package com.taskmanagement.task_management.dto;

import com.taskmanagement.task_management.enums.TaskPriority;
import com.taskmanagement.task_management.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class TaskRequest {
    @NotBlank
    private String title;

    private String description;

    private String status;

    private TaskStatus taskStatus;

    private TaskPriority taskPriority;

    private LocalDate dueDate;

}
