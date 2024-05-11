package com.example.backend.entity;

import com.example.backend.entity.constant.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "description", nullable = false)
    String description;

    @Column(name = "created_at", nullable = false)
    String createdAt;

    @Column(name = "gender", nullable = false)
    Gender gender;

    @Column(name = "location", nullable = false)
    String location;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
