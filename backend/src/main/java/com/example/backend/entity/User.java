package com.example.backend.entity;

import com.example.backend.entity.constant.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "surname", nullable = false)
    String surname;

    @Column(name = "email", nullable = false)
    String email;

    @Column(name = "password", nullable = false)
    String password;

    @Column(name = "phone", nullable = false)
    String phone;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    List<Request> requests;

    @Column(name = "refresh_token")
    private String refreshToken;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Role> roles = new ArrayList<>();

}