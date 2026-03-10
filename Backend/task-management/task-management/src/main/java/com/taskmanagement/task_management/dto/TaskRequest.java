package com.taskmanagement.task_management.dto;

import com.taskmanagement.task_management.enums.TaskPriority;
import com.taskmanagement.task_management.enums.TaskStatus;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    private TaskPriority priority;

    @Future(message = "Due date must be in the future")
    private LocalDate dueDate;

}
