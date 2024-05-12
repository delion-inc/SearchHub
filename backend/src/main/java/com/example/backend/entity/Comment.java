package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "created_at", nullable = false)
    private String createdAt;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;
}
