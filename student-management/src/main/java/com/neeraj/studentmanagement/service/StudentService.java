package com.neeraj.studentmanagement.service;

import com.neeraj.studentmanagement.dto.request.StudentRequestDTO;
import com.neeraj.studentmanagement.dto.response.StudentResponseDTO;
import org.springframework.data.domain.Page;

public interface StudentService {

    Page<StudentResponseDTO> getAllStudents(int page, int size, String sortBy, String direction);

    StudentResponseDTO getStudentById(Long id);

    StudentResponseDTO createStudent(StudentRequestDTO request);

    StudentResponseDTO updateStudent(Long id, StudentRequestDTO request);

    void deleteStudent(Long id);

    Page<StudentResponseDTO> searchAndFilter(String keyword, String branch, Integer year, 
                                            int page, int size, String sortBy, String direction);
}
