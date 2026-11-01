# Resume Project Entry & Portfolio Guide

**Repository Link**: [https://github.com/neeraj-singhh/Student-Management-Analytics-Platform](https://github.com/neeraj-singhh/Student-Management-Analytics-Platform)  
**Target Roles**: Frontend Developer / React Developer / Full-Stack Engineer  

---

## 📄 Resume Project Section (Copy & Paste Ready)

### **EduPulse — Full-Stack Student Management & Analytics Platform**
**GitHub**: [github.com/neeraj-singhh/Student-Management-Analytics-Platform](https://github.com/neeraj-singhh/Student-Management-Analytics-Platform)  
**Tech Stack**: React 18, TypeScript, Tailwind CSS, TanStack Query (React Query), React Hook Form, Zod, Recharts, Spring Boot 3.2, Java 17, PostgreSQL, Flyway, JWT, Docker

- **Engineered a High-Performance React 18 SPA** using TypeScript, Tailwind CSS, and TanStack Query (v5), implementing stale-while-revalidate caching and automatic cache invalidation on mutations to eliminate redundant network traffic.
- **Implemented Type-Safe Form Architectures** leveraging React Hook Form coupled with Zod schema resolvers, preventing unwanted re-renders, displaying live validation feedback, and synchronizing with backend Jakarta Bean Validation rules.
- **Architected Interactive Real-Time Analytics Dashboards** utilizing Recharts (Pie & Bar charts) to visualize departmental enrollment and cohort progression powered by direct SQL database aggregations (`GROUP BY`).
- **Engineered Advanced Data Grids** supporting live multi-field debounced search (Name, Enrollment ID, Email), multi-column sorting, department & academic year dropdown filtering, and paginated record boundaries.
- **Constructed Secure Spring Boot 3.2 Microservice** with stateless HMAC-SHA256 JWT authentication, BCrypt password hashing, Flyway-managed PostgreSQL migrations, and Docker Compose orchestration.

---

## 🎯 Technical Interview Talking Points

1. **Why TanStack Query over Redux?**
   > *"For server-state management (fetching, caching, synchronizing, and updating student records), TanStack Query provides out-of-the-box caching, pagination, background refetching, and query invalidation without hundreds of lines of Redux boilerplate and slice maintenance."*

2. **Form Engineering Strategy (React Hook Form + Zod):**
   > *"Uncontrolled inputs managed via React Hook Form drastically minimize component re-renders during keystrokes compared to standard `useState` forms. Combining it with Zod allows runtime TypeScript schema validation that matches the backend's Jakarta validation constraints, catching errors before requests even hit the network."*

3. **Data Security & Role-Based Access Control:**
   > *"Authentication is handled through stateless cryptographic JWT tokens. On the frontend, higher-order protected route guards verify roles (`ROLE_ADMIN` vs `ROLE_STAFF`), ensuring administrative actions like additions, updates, and deletions are strictly restricted."*

4. **Database & Infrastructure:**
   > *"Relational schema evolution is version-controlled via Flyway migrations (`V1` and `V2`), eliminating manual DDL alterations and guaranteeing parity across local Docker containers and production deployments."*

