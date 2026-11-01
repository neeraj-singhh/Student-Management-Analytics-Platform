package com.neeraj.studentmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Add new student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Update student
    public Student updateStudent(Long id, Student updatedStudent) {
        updatedStudent.setId(id);
        return studentRepository.save(updatedStudent);
    }

    // Delete student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}