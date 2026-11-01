package com.neeraj.studentmanagement.service;

import com.neeraj.studentmanagement.dto.request.StudentRequestDTO;
import com.neeraj.studentmanagement.dto.response.StudentResponseDTO;
import com.neeraj.studentmanagement.entity.Student;
import com.neeraj.studentmanagement.exception.DuplicateResourceException;
import com.neeraj.studentmanagement.exception.StudentNotFoundException;
import com.neeraj.studentmanagement.mapper.StudentMapper;
import com.neeraj.studentmanagement.repository.StudentRepository;
import com.neeraj.studentmanagement.service.impl.StudentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @Spy
    private StudentMapper studentMapper = new StudentMapper();

    @InjectMocks
    private StudentServiceImpl studentService;

    private Student testStudent;
    private StudentRequestDTO testRequestDTO;

    @BeforeEach
    void setUp() {
        testStudent = new Student(
                "EN2024999",
                "Rahul Sharma",
                "rahul@university.edu",
                "+91 9999988888",
                "Computer Science",
                3
        );
        testStudent.setId(100L);

        testRequestDTO = new StudentRequestDTO(
                "EN2024999",
                "Rahul Sharma",
                "rahul@university.edu",
                "+91 9999988888",
                "Computer Science",
                3
        );
    }

    @Test
    @DisplayName("Should create student successfully when valid payload is provided")
    void shouldCreateStudentSuccessfully() {
        when(studentRepository.existsByEnrollmentNumber("EN2024999")).thenReturn(false);
        when(studentRepository.existsByEmail("rahul@university.edu")).thenReturn(false);
        when(studentRepository.save(any(Student.class))).thenReturn(testStudent);

        StudentResponseDTO response = studentService.createStudent(testRequestDTO);

        assertNotNull(response);
        assertEquals("EN2024999", response.getEnrollmentNumber());
        assertEquals("Rahul Sharma", response.getName());
        assertEquals("rahul@university.edu", response.getEmail());
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    @DisplayName("Should throw DuplicateResourceException when enrollment number already exists")
    void shouldThrowDuplicateEnrollmentException() {
        when(studentRepository.existsByEnrollmentNumber("EN2024999")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> studentService.createStudent(testRequestDTO));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    @DisplayName("Should throw DuplicateResourceException when email already exists")
    void shouldThrowDuplicateEmailException() {
        when(studentRepository.existsByEnrollmentNumber("EN2024999")).thenReturn(false);
        when(studentRepository.existsByEmail("rahul@university.edu")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> studentService.createStudent(testRequestDTO));
        verify(studentRepository, never()).save(any(Student.class));
    }

    @Test
    @DisplayName("Should return student profile when student exists by ID")
    void shouldReturnStudentById() {
        when(studentRepository.findById(100L)).thenReturn(Optional.of(testStudent));

        StudentResponseDTO response = studentService.getStudentById(100L);

        assertNotNull(response);
        assertEquals(100L, response.getId());
        assertEquals("Rahul Sharma", response.getName());
    }

    @Test
    @DisplayName("Should throw StudentNotFoundException when student ID does not exist")
    void shouldThrowNotFoundForNonExistentStudent() {
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(StudentNotFoundException.class, () -> studentService.getStudentById(999L));
    }

    @Test
    @DisplayName("Should delete student when valid ID exists")
    void shouldDeleteStudent() {
        when(studentRepository.findById(100L)).thenReturn(Optional.of(testStudent));
        doNothing().when(studentRepository).delete(testStudent);

        assertDoesNotThrow(() -> studentService.deleteStudent(100L));
        verify(studentRepository, times(1)).delete(testStudent);
    }

    @Test
    @DisplayName("Should return paginated list of students")
    void shouldReturnPaginatedStudents() {
        Page<Student> page = new PageImpl<>(Collections.singletonList(testStudent));
        when(studentRepository.findAll(any(Pageable.class))).thenReturn(page);

        Page<StudentResponseDTO> result = studentService.getAllStudents(0, 10, "name", "asc");

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Rahul Sharma", result.getContent().get(0).getName());
    }
}
