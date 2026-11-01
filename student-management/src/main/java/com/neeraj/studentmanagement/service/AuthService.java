package com.neeraj.studentmanagement.service;

import com.neeraj.studentmanagement.dto.request.LoginRequestDTO;
import com.neeraj.studentmanagement.dto.request.RegisterRequestDTO;
import com.neeraj.studentmanagement.dto.response.AuthResponseDTO;

public interface AuthService {

    AuthResponseDTO login(LoginRequestDTO request);

    AuthResponseDTO register(RegisterRequestDTO request);
}
