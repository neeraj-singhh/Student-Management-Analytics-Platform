package com.neeraj.studentmanagement.repository;

import com.neeraj.studentmanagement.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    boolean existsByEnrollmentNumber(String enrollmentNumber);

    boolean existsByEmail(String email);

    boolean existsByEnrollmentNumberAndIdNot(String enrollmentNumber, Long id);

    boolean existsByEmailAndIdNot(String email, Long id);

    // Dynamic search and filter query
    @Query("SELECT s FROM Student s WHERE " +
           "(:keyword IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(s.enrollmentNumber) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           " LOWER(s.email) LIKE LOWER(CONCAT('%', :keyword, '%'))) AND " +
           "(:branch IS NULL OR :branch = '' OR LOWER(s.branch) = LOWER(:branch)) AND " +
           "(:year IS NULL OR s.year = :year)")
    Page<Student> searchAndFilter(
            @Param("keyword") String keyword,
            @Param("branch") String branch,
            @Param("year") Integer year,
            Pageable pageable
    );

    // Analytics Aggregation Queries
    @Query("SELECT s.branch, COUNT(s) FROM Student s GROUP BY s.branch")
    List<Object[]> countStudentsByBranch();

    @Query("SELECT s.year, COUNT(s) FROM Student s GROUP BY s.year ORDER BY s.year ASC")
    List<Object[]> countStudentsByYear();

    List<Student> findTop5ByOrderByCreatedAtDesc();
}

