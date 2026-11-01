package com.neeraj.studentmanagement.config;

import com.neeraj.studentmanagement.entity.Role;
import com.neeraj.studentmanagement.entity.Student;
import com.neeraj.studentmanagement.entity.User;
import com.neeraj.studentmanagement.repository.StudentRepository;
import com.neeraj.studentmanagement.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, 
                           StudentRepository studentRepository, 
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUsers();
        seedStudents();
    }

    private void seedUsers() {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User(
                    "admin",
                    "admin@university.edu",
                    passwordEncoder.encode("admin123"),
                    Role.ROLE_ADMIN
            );
            userRepository.save(admin);
            logger.info("Default ADMIN user initialized (username: 'admin', password: 'admin123')");
        }

        if (!userRepository.existsByUsername("staff")) {
            User staff = new User(
                    "staff",
                    "staff@university.edu",
                    passwordEncoder.encode("staff123"),
                    Role.ROLE_STAFF
            );
            userRepository.save(staff);
            logger.info("Default STAFF user initialized (username: 'staff', password: 'staff123')");
        }
    }

    private void seedStudents() {
        if (studentRepository.count() == 0) {
            List<Student> initialStudents = List.of(
                    new Student("EN2024001", "Aarav Sharma", "aarav.sharma@university.edu", "+91 9876543210", "Computer Science", 3),
                    new Student("EN2024002", "Priya Patel", "priya.patel@university.edu", "+91 9876543211", "Information Technology", 2),
                    new Student("EN2024003", "Rohan Gupta", "rohan.gupta@university.edu", "+91 9876543212", "Electronics", 4),
                    new Student("EN2024004", "Ananya Singh", "ananya.singh@university.edu", "+91 9876543213", "Computer Science", 1),
                    new Student("EN2024005", "Vikram Malhotra", "vikram.m@university.edu", "+91 9876543214", "Mechanical", 3),
                    new Student("EN2024006", "Sneha Reddy", "sneha.reddy@university.edu", "+91 9876543215", "Computer Science", 2),
                    new Student("EN2024007", "Aditya Verma", "aditya.verma@university.edu", "+91 9876543216", "Civil", 4),
                    new Student("EN2024008", "Neha Joshi", "neha.joshi@university.edu", "+91 9876543217", "Information Technology", 1),
                    new Student("EN2024009", "Karan Mehta", "karan.mehta@university.edu", "+91 9876543218", "Electronics", 2),
                    new Student("EN2024010", "Ishita Sen", "ishita.sen@university.edu", "+91 9876543219", "Computer Science", 4),
                    new Student("EN2024011", "Devansh Roy", "devansh.roy@university.edu", "+91 9876543220", "Mechanical", 1),
                    new Student("EN2024012", "Tanvi Desai", "tanvi.desai@university.edu", "+91 9876543221", "Civil", 3)
            );
            studentRepository.saveAll(initialStudents);
            logger.info("Sample students initialized successfully for analytics visualization.");
        }
    }
}
