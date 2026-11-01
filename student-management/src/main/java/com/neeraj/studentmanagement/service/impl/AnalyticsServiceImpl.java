package com.neeraj.studentmanagement.service.impl;

import com.neeraj.studentmanagement.dto.response.StudentResponseDTO;
import com.neeraj.studentmanagement.dto.response.StudentStatsDTO;
import com.neeraj.studentmanagement.mapper.StudentMapper;
import com.neeraj.studentmanagement.repository.StudentRepository;
import com.neeraj.studentmanagement.service.AnalyticsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsServiceImpl implements AnalyticsService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public AnalyticsServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public StudentStatsDTO getStudentStats() {
        long totalStudents = studentRepository.count();

        // Aggregate branch distribution
        Map<String, Long> studentsByBranch = new LinkedHashMap<>();
        List<Object[]> branchResults = studentRepository.countStudentsByBranch();
        for (Object[] row : branchResults) {
            String branch = (String) row[0];
            Long count = ((Number) row[1]).longValue();
            studentsByBranch.put(branch, count);
        }

        // Aggregate year distribution
        Map<Integer, Long> studentsByYear = new LinkedHashMap<>();
        List<Object[]> yearResults = studentRepository.countStudentsByYear();
        for (Object[] row : yearResults) {
            Integer year = (Integer) row[0];
            Long count = ((Number) row[1]).longValue();
            studentsByYear.put(year, count);
        }

        // Top 5 recently registered students
        List<StudentResponseDTO> recentlyAdded = studentRepository.findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(studentMapper::toResponseDTO)
                .collect(Collectors.toList());

        return new StudentStatsDTO(
                totalStudents,
                studentsByBranch,
                studentsByYear,
                recentlyAdded
        );
    }
}

