package com.neeraj.studentmanagement.controller;

import com.neeraj.studentmanagement.dto.request.StudentRequestDTO;
import com.neeraj.studentmanagement.dto.response.StudentResponseDTO;
import com.neeraj.studentmanagement.dto.response.StudentStatsDTO;
import com.neeraj.studentmanagement.service.AnalyticsService;
import com.neeraj.studentmanagement.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@Tag(name = "Student Management", description = "Endpoints for managing student profiles, searching, and filtering")
@SecurityRequirement(name = "bearerAuth")
public class StudentController {

    private final StudentService studentService;
    private final AnalyticsService analyticsService;

    public StudentController(StudentService studentService, AnalyticsService analyticsService) {
        this.studentService = studentService;
        this.analyticsService = analyticsService;
    }

    @GetMapping
    @Operation(summary = "Get paginated, sorted, and filtered list of students")
    public ResponseEntity<Page<StudentResponseDTO>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String branch,
            @RequestParam(required = false) Integer year
    ) {
        if ((keyword != null && !keyword.trim().isEmpty()) || 
            (branch != null && !branch.trim().isEmpty()) || 
            year != null) {
            return ResponseEntity.ok(studentService.searchAndFilter(keyword, branch, year, page, size, sortBy, direction));
        }
        return ResponseEntity.ok(studentService.getAllStudents(page, size, sortBy, direction));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get single student profile by ID")
    public ResponseEntity<StudentResponseDTO> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Register a new student (Admin only)")
    public ResponseEntity<StudentResponseDTO> createStudent(@Valid @RequestBody StudentRequestDTO request) {
        StudentResponseDTO created = studentService.createStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Update an existing student profile by ID (Admin only)")
    public ResponseEntity<StudentResponseDTO> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequestDTO request
    ) {
        StudentResponseDTO updated = studentService.updateStudent(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @Operation(summary = "Delete student profile by ID (Admin only)")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Search students by keyword in name, enrollment number, or email")
    public ResponseEntity<Page<StudentResponseDTO>> searchStudents(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return ResponseEntity.ok(studentService.searchAndFilter(keyword, null, null, page, size, sortBy, direction));
    }

    @GetMapping("/filter")
    @Operation(summary = "Filter students by academic branch and/or year")
    public ResponseEntity<Page<StudentResponseDTO>> filterStudents(
            @RequestParam(required = false) String branch,
            @RequestParam(required = false) Integer year,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        return ResponseEntity.ok(studentService.searchAndFilter(null, branch, year, page, size, sortBy, direction));
    }

    @GetMapping("/stats")
    @Operation(summary = "Get aggregated student statistics (branch, year distributions, counts)")
    public ResponseEntity<StudentStatsDTO> getStudentStats() {
        return ResponseEntity.ok(analyticsService.getStudentStats());
    }
}
