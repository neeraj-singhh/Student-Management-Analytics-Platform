package com.neeraj.studentmanagement.dto.response;

import java.util.List;
import java.util.Map;

public class StudentStatsDTO {

    private long totalStudents;
    private Map<String, Long> studentsByBranch;
    private Map<Integer, Long> studentsByYear;
    private List<StudentResponseDTO> recentlyAdded;

    public StudentStatsDTO() {}

    public StudentStatsDTO(long totalStudents, Map<String, Long> studentsByBranch, 
                           Map<Integer, Long> studentsByYear, List<StudentResponseDTO> recentlyAdded) {
        this.totalStudents = totalStudents;
        this.studentsByBranch = studentsByBranch;
        this.studentsByYear = studentsByYear;
        this.recentlyAdded = recentlyAdded;
    }

    public long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public Map<String, Long> getStudentsByBranch() {
        return studentsByBranch;
    }

    public void setStudentsByBranch(Map<String, Long> studentsByBranch) {
        this.studentsByBranch = studentsByBranch;
    }

    public Map<Integer, Long> getStudentsByYear() {
        return studentsByYear;
    }

    public void setStudentsByYear(Map<Integer, Long> studentsByYear) {
        this.studentsByYear = studentsByYear;
    }

    public List<StudentResponseDTO> getRecentlyAdded() {
        return recentlyAdded;
    }

    public void setRecentlyAdded(List<StudentResponseDTO> recentlyAdded) {
        this.recentlyAdded = recentlyAdded;
    }
}
