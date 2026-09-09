package com.smartcampus.dto;

import com.smartcampus.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private String phone;
    private String department;
    private String studentId;
    private String avatar;
    private LocalDateTime createdAt;
}
