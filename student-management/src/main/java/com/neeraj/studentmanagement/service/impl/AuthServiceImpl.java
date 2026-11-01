package com.neeraj.studentmanagement.service.impl;

import com.neeraj.studentmanagement.dto.request.LoginRequestDTO;
import com.neeraj.studentmanagement.dto.request.RegisterRequestDTO;
import com.neeraj.studentmanagement.dto.response.AuthResponseDTO;
import com.neeraj.studentmanagement.entity.Role;
import com.neeraj.studentmanagement.entity.User;
import com.neeraj.studentmanagement.exception.DuplicateResourceException;
import com.neeraj.studentmanagement.exception.InvalidCredentialsException;
import com.neeraj.studentmanagement.repository.UserRepository;
import com.neeraj.studentmanagement.security.JwtTokenProvider;
import com.neeraj.studentmanagement.security.UserPrincipal;
import com.neeraj.studentmanagement.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userRepository.findByUsername(userPrincipal.getUsername())
                    .orElseThrow(() -> new InvalidCredentialsException("User not found"));

            return new AuthResponseDTO(
                    jwt,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole().name()
            );
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentialsException("Invalid username or password");
        }
    }

    @Override
    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already taken: " + request.getUsername());
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already in use: " + request.getEmail());
        }

        Role assignedRole = request.getRole() != null ? request.getRole() : Role.ROLE_STAFF;

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                assignedRole
        );

        User savedUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                    )
        );

        String jwt = tokenProvider.generateToken(authentication);

        return new AuthResponseDTO(
                jwt,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole().name()
        );
    }
}
