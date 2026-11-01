# Upgrade Plan: Student-management (20260526091049)

- **Generated**: 2026-05-26 09:30:00
- **HEAD Branch**: N/A
- **HEAD Commit ID**: N/A

## Available Tools

**JDKs**
- JDK 17.0.19: C:\Program Files\Eclipse Adoptium\jdk-17.0.19.10-hotspot\bin (current project JDK, used by Step 2)
- Java 25: **<TO_BE_INSTALLED>** (required by Steps 1-4)

**Build Tools**
- Maven Wrapper: 3.9.16 (`.mvn/wrapper/maven-wrapper.properties`) - compatible with Java 25
- System Maven: none installed (wrapper-only build)

## Guidelines

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred.

- No additional upgrade constraints were provided by the user.

## Options

- Working branch: N/A (version control unavailable)
- Run tests before and after the upgrade: true

## Upgrade Goals

- Upgrade the project runtime to the latest LTS Java version: Java 25

## Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------- |
| Java | 17 | 25 | User requested latest LTS runtime |
| Spring Boot | 4.0.6 | 4.0.6 | Already on a modern Spring Boot line; no upgrade required for Java 25 |
| Maven Wrapper | 3.9.16 | 3.9.16 | Compatible with Java 25; no wrapper version change needed |
| maven-compiler-plugin | managed by Spring Boot parent | 3.11+ recommended | Spring Boot 4 uses compatible plugin versions; newer Java may still compile with managed plugin |
| JUnit Jupiter / Spring Boot Test | managed by Spring Boot | compatible | Spring Boot 4 integrates JUnit 5 and supports modern Java runtimes |
| H2 Database | managed by Spring Boot | compatible | runtime-only support for tests/dev, no upgrade required |

## Derived Upgrades

- Update `pom.xml` `java.version` property from `17` to `25` to meet the requested Java runtime target.
- Keep Spring Boot `4.0.6` unchanged because it already supports Java 17+ and is compatible with an LTS Java runtime.
- Keep Maven Wrapper at `3.9.16` because it is already compatible with Java 25.

## Impact Analysis

### Dependency Changes

| File | Dependency | Current | Action | Target | Reason |
|------|------------|---------|--------|--------|--------|
| pom.xml | `java.version` property | 17 | upgrade | 25 | User requested latest LTS Java runtime |

### Source Code Changes

| File | Location | Current | Required Change | Reason |
|------|----------|---------|----------------|--------|
| None | N/A | N/A | None planned | Java runtime upgrade should not require source changes in this project unless new compatibility issues appear |

### Configuration Changes

| File | Property/Setting | Current | Required Change | Reason |
|------|------------------|---------|----------------|--------|
| None | N/A | N/A | None planned | No application config changes identified for this upgrade |

### CI/CD Changes

| File | Location | Current | Required Change |
|------|----------|---------|----------------|
| None detected | N/A | N/A | None needed | No CI/CD files found in the repository root |

### Risks & Warnings

- **JDK 25 availability**: JDK 25 is not installed on the host and must be installed before upgrade verification. Mitigation: use Step 1 to install Java 25 and verify with `appmod-list-jdks`.
- **Minimal test coverage**: The project currently has only a `contextLoads()` test, so runtime issues may be hidden. Mitigation: full `mvnw clean test` on Java 25 and careful review of any failures.
- **Package name inconsistency**: The source path uses `com.neeraj.Student_management` while the entity and repository packages use `com.neeraj.studentmanagement`. This is an existing structural risk for Spring scanning; if upgrade verification reveals application context or component scanning failures, address it explicitly.

## Upgrade Steps

- Step 1: Setup Environment
  - **Rationale**: Java 25 is required for the target runtime, and the host currently only has JDK 17 installed.
  - **Changes to Make**: Install Java 25, confirm `appmod-list-jdks` sees it, and ensure the Maven wrapper is the build tool.
  - **Verification**: `mvnw -q -version` using Java 25, `appmod-list-jdks` output includes Java 25.

- Step 2: Setup Baseline
  - **Rationale**: Capture current build/test behavior before changing the runtime to establish a baseline.
  - **Changes to Make**: None to source or pom; run baseline build/tests on existing Java 17.
  - **Verification**: `mvnw -q clean compile test-compile` and `mvnw -q clean test` using JDK 17.

- Step 3: Upgrade to Java 25
  - **Rationale**: Apply the requested runtime upgrade in the pom and confirm compile compatibility on the target JDK.
  - **Changes to Make**: Update `pom.xml` `java.version` property from `17` to `25`.
  - **Verification**: `mvnw -q -DskipTests clean test-compile` using Java 25.

- Step 4: Final Validation
  - **Rationale**: Ensure the project compiles and all tests pass on the target Java runtime.
  - **Changes to Make**: Resolve any Java 25 compatibility issues revealed by test execution.
  - **Verification**: `mvnw -q clean test` using Java 25.
