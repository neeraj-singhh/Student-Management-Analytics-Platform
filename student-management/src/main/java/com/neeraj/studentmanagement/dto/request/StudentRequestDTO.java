package com.neeraj.studentmanagement.dto.request;

import jakarta.validation.constraints.*;

public class StudentRequestDTO {

    @NotBlank(message = "Enrollment number is required")
    @Size(min = 4, max = 50, message = "Enrollment number must be between 4 and 50 characters")
    private String enrollmentNumber;

    @NotBlank(message = "Student name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+0-9\\-\\s()]{10,20}$", message = "Phone must be a valid contact number (10-20 digits)")
    private String phone;

    @NotBlank(message = "Academic branch is required")
    @Size(min = 2, max = 50, message = "Branch must be between 2 and 50 characters")
    private String branch;

    @NotNull(message = "Academic year is required")
    @Min(value = 1, message = "Year must be between 1 and 5")
    @Max(value = 5, message = "Year must be between 1 and 5")
    private Integer year;

    public StudentRequestDTO() {}

    public StudentRequestDTO(String enrollmentNumber, String name, String email, String phone, String branch, Integer year) {
        this.enrollmentNumber = enrollmentNumber;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.branch = branch;
        this.year = year;
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
}
