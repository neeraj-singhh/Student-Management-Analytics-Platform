package com.neeraj.studentmanagement.mapper;

import com.neeraj.studentmanagement.dto.request.StudentRequestDTO;
import com.neeraj.studentmanagement.dto.response.StudentResponseDTO;
import com.neeraj.studentmanagement.entity.Student;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public Student toEntity(StudentRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        return new Student(
                dto.getEnrollmentNumber(),
                dto.getName(),
                dto.getEmail(),
                dto.getPhone(),
                dto.getBranch(),
                dto.getYear()
        );
    }

    public void updateEntityFromDTO(StudentRequestDTO dto, Student student) {
        if (dto == null || student == null) {
            return;
        }
        student.setEnrollmentNumber(dto.getEnrollmentNumber());
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setPhone(dto.getPhone());
        student.setBranch(dto.getBranch());
        student.setYear(dto.getYear());
    }

    public StudentResponseDTO toResponseDTO(Student student) {
        if (student == null) {
            return null;
        }
        return new StudentResponseDTO(
                student.getId(),
                student.getEnrollmentNumber(),
                student.getName(),
                student.getEmail(),
                student.getPhone(),
                student.getBranch(),
                student.getYear(),
                student.getCreatedAt(),
                student.getUpdatedAt()
        );
    }
}

