package com.neeraj.studentmanagement.service.impl;

import com.neeraj.studentmanagement.dto.request.StudentRequestDTO;
import com.neeraj.studentmanagement.dto.response.StudentResponseDTO;
import com.neeraj.studentmanagement.entity.Student;
import com.neeraj.studentmanagement.exception.DuplicateResourceException;
import com.neeraj.studentmanagement.exception.StudentNotFoundException;
import com.neeraj.studentmanagement.mapper.StudentMapper;
import com.neeraj.studentmanagement.repository.StudentRepository;
import com.neeraj.studentmanagement.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    public StudentServiceImpl(StudentRepository studentRepository, StudentMapper studentMapper) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> getAllStudents(int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return studentRepository.findAll(pageable).map(studentMapper::toResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public StudentResponseDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
        return studentMapper.toResponseDTO(student);
    }

    @Override
    @Transactional
    public StudentResponseDTO createStudent(StudentRequestDTO request) {
        if (studentRepository.existsByEnrollmentNumber(request.getEnrollmentNumber())) {
            throw new DuplicateResourceException("Student with enrollment number '" + request.getEnrollmentNumber() + "' already exists");
        }

        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Student with email '" + request.getEmail() + "' already exists");
        }

        Student student = studentMapper.toEntity(request);
        Student savedStudent = studentRepository.save(student);
        return studentMapper.toResponseDTO(savedStudent);
    }

    @Override
    @Transactional
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO request) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));

        if (studentRepository.existsByEnrollmentNumberAndIdNot(request.getEnrollmentNumber(), id)) {
            throw new DuplicateResourceException("Student with enrollment number '" + request.getEnrollmentNumber() + "' already exists");
        }

        if (studentRepository.existsByEmailAndIdNot(request.getEmail(), id)) {
            throw new DuplicateResourceException("Student with email '" + request.getEmail() + "' already exists");
        }

        studentMapper.updateEntityFromDTO(request, student);
        Student updatedStudent = studentRepository.save(student);
        return studentMapper.toResponseDTO(updatedStudent);
    }

    @Override
    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(id));
        studentRepository.delete(student);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StudentResponseDTO> searchAndFilter(String keyword, String branch, Integer year, 
                                                    int page, int size, String sortBy, String direction) {
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(direction) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        
        String sanitizedKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        String sanitizedBranch = (branch != null && !branch.trim().isEmpty()) ? branch.trim() : null;

        return studentRepository.searchAndFilter(sanitizedKeyword, sanitizedBranch, year, pageable)
                .map(studentMapper::toResponseDTO);
    }
}

