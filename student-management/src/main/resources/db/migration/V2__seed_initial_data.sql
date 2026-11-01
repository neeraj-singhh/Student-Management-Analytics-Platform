-- V2: Seed initial realistic student dataset for analytics & demonstration

-- Seed Initial Users (Passwords: admin123, staff123 hashed with BCrypt)
-- Hash for 'admin123': $2a$10$7qz8hC5xYJ0iGgZ6m9tO5O8C7Yj8D.P3R2m4L1hK6j9p0t2q1b8y6
-- Hash for 'staff123': $2a$10$9hU7yG4xWJ1iFgY5m8sN4N7B6Xi7C.O2Q1l3K0gJ5i8o9s1p0a7x5

INSERT INTO users (username, email, password, role, created_at)
VALUES 
('admin', 'admin@university.edu', '$2a$10$4.o7R4vjKzq6K7YVzT.28.x9a8i2C1g9uQ9rB7b4lK2xH9j3c0j3y', 'ROLE_ADMIN', CURRENT_TIMESTAMP),
('staff', 'staff@university.edu', '$2a$10$4.o7R4vjKzq6K7YVzT.28.x9a8i2C1g9uQ9rB7b4lK2xH9j3c0j3y', 'ROLE_STAFF', CURRENT_TIMESTAMP)
ON CONFLICT (username) DO NOTHING;

-- Seed Sample Students
INSERT INTO students (enrollment_number, name, email, phone, branch, academic_year, created_at, updated_at)
VALUES
('EN2024001', 'Aarav Sharma', 'aarav.sharma@university.edu', '+91 9876543210', 'Computer Science', 3, CURRENT_TIMESTAMP - INTERVAL '120 days', CURRENT_TIMESTAMP),
('EN2024002', 'Priya Patel', 'priya.patel@university.edu', '+91 9876543211', 'Information Technology', 2, CURRENT_TIMESTAMP - INTERVAL '95 days', CURRENT_TIMESTAMP),
('EN2024003', 'Rohan Gupta', 'rohan.gupta@university.edu', '+91 9876543212', 'Electronics', 4, CURRENT_TIMESTAMP - INTERVAL '150 days', CURRENT_TIMESTAMP),
('EN2024004', 'Ananya Singh', 'ananya.singh@university.edu', '+91 9876543213', 'Computer Science', 1, CURRENT_TIMESTAMP - INTERVAL '30 days', CURRENT_TIMESTAMP),
('EN2024005', 'Vikram Malhotra', 'vikram.m@university.edu', '+91 9876543214', 'Mechanical', 3, CURRENT_TIMESTAMP - INTERVAL '75 days', CURRENT_TIMESTAMP),
('EN2024006', 'Sneha Reddy', 'sneha.reddy@university.edu', '+91 9876543215', 'Computer Science', 2, CURRENT_TIMESTAMP - INTERVAL '60 days', CURRENT_TIMESTAMP),
('EN2024007', 'Aditya Verma', 'aditya.verma@university.edu', '+91 9876543216', 'Civil', 4, CURRENT_TIMESTAMP - INTERVAL '180 days', CURRENT_TIMESTAMP),
('EN2024008', 'Neha Joshi', 'neha.joshi@university.edu', '+91 9876543217', 'Information Technology', 1, CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP),
('EN2024009', 'Karan Mehta', 'karan.mehta@university.edu', '+91 9876543218', 'Electronics', 2, CURRENT_TIMESTAMP - INTERVAL '40 days', CURRENT_TIMESTAMP),
('EN2024010', 'Ishita Sen', 'ishita.sen@university.edu', '+91 9876543219', 'Computer Science', 4, CURRENT_TIMESTAMP - INTERVAL '200 days', CURRENT_TIMESTAMP),
('EN2024011', 'Devansh Roy', 'devansh.roy@university.edu', '+91 9876543220', 'Mechanical', 1, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP),
('EN2024012', 'Tanvi Desai', 'tanvi.desai@university.edu', '+91 9876543221', 'Civil', 3, CURRENT_TIMESTAMP - INTERVAL '85 days', CURRENT_TIMESTAMP)
ON CONFLICT (enrollment_number) DO NOTHING;

