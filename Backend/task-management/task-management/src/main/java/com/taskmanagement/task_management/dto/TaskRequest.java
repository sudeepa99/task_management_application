package com.taskmanagement.task_management.dto;

import com.taskmanagement.task_management.enums.TaskPriority;
import com.taskmanagement.task_management.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TaskRequest {
    @NotBlank
    private String title;

    private String description;

    private TaskStatus status;

    private TaskPriority priority;

    private LocalDate dueDate;

}
