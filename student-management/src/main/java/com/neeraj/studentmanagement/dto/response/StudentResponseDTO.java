package com.neeraj.studentmanagement.dto.response;

import java.time.LocalDateTime;

public class StudentResponseDTO {

    private Long id;
    private String enrollmentNumber;
    private String name;
    private String email;
    private String phone;
    private String branch;
    private Integer year;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public StudentResponseDTO() {}

    public StudentResponseDTO(Long id, String enrollmentNumber, String name, String email, 
                              String phone, String branch, Integer year, 
                              LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.enrollmentNumber = enrollmentNumber;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.branch = branch;
        this.year = year;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnrollmentNumber() {
        return enrollmentNumber;
    }

    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

