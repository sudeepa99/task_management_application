package com.taskmanagement.task_management.service.impl;

import com.taskmanagement.task_management.dto.TaskRequest;
import com.taskmanagement.task_management.dto.TaskResponse;
import com.taskmanagement.task_management.entity.Task;
import com.taskmanagement.task_management.entity.User;
import com.taskmanagement.task_management.enums.Role;
import com.taskmanagement.task_management.enums.TaskPriority;
import com.taskmanagement.task_management.enums.TaskStatus;
import com.taskmanagement.task_management.exception.DuplicateTaskException;
import com.taskmanagement.task_management.exception.ResourceNotFoundException;
import com.taskmanagement.task_management.repository.TaskRepository;

import com.taskmanagement.task_management.security.SecurityUtills;
import com.taskmanagement.task_management.service.TaskService;
import com.taskmanagement.task_management.specification.TaskSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final SecurityUtills securityUtils;

    @Override
    public TaskResponse createTask(TaskRequest request) {
        User currentUser = securityUtils.getCurrentUser();

        if (taskRepository.existsByTitleAndUserId(request.getTitle(), currentUser.getId())) {
            throw new DuplicateTaskException("A task with this title already exists");
        }


        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO);
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setUser(currentUser);

        Task saved = taskRepository.save(task);
        return TaskResponse.fromEntity(saved);
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request) {
        Task task = findTaskByIdAndCheckOwnership(id);

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setUpdatedAt(LocalDateTime.now());

        Task updated = taskRepository.save(task);
        return TaskResponse.fromEntity(updated);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = findTaskByIdAndCheckOwnership(id);
        taskRepository.delete(task);
    }

    @Override
    public TaskResponse getTaskById(Long id) {
        Task task = findTaskByIdAndCheckOwnership(id);
        return TaskResponse.fromEntity(task);
    }

    @Override
    public Page<TaskResponse> getTasksForCurrentUser(TaskStatus status, TaskPriority priority, Pageable pageable) {
        User currentUser = securityUtils.getCurrentUser();
        Specification<Task> spec = TaskSpecification.belongsToUser(currentUser.getId());
        if (status != null) {
            spec = spec.and(TaskSpecification.hasStatus(status));
        }
        if (priority != null) {
            spec = spec.and(TaskSpecification.hasPriority(priority));
        }
        return taskRepository.findAll(spec, pageable)
                .map(TaskResponse::fromEntity);
    }

    @Override
    public Page<TaskResponse> getAllTasksForAdmin(TaskStatus status, TaskPriority priority, Pageable pageable) {
        Specification<Task> spec = (root, query, cb) -> cb.conjunction();
        if (status != null) {
            spec = spec.and(TaskSpecification.hasStatus(status));
        }
        if (priority != null) {
            spec = spec.and(TaskSpecification.hasPriority(priority));
        }
        return taskRepository.findAll(spec, pageable)
                .map(TaskResponse::fromEntity);
    }

    private Task findTaskByIdAndCheckOwnership(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        User currentUser = securityUtils.getCurrentUser();
        if (currentUser.getRole() != Role.ADMIN && !task.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to access this task");
        }
        return task;
    }
}