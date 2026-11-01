package com.neeraj.studentmanagement.controller;

import com.neeraj.studentmanagement.dto.response.StudentStatsDTO;
import com.neeraj.studentmanagement.service.AnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@Tag(name = "Analytics & Reports", description = "Endpoints for academic distribution, demographic metrics, and recent registrations")
@SecurityRequirement(name = "bearerAuth")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/stats")
    @Operation(summary = "Fetch real database-aggregated metrics for student dashboard")
    public ResponseEntity<StudentStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(analyticsService.getStudentStats());
    }
}

