package com.matemazlo.portfolio_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "post_likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userSessionId; // Egyszerű session kezelés
    private int count = 1;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonIgnore
    private Post post;

    // Constructors
    public Like() {}

    public Like(String userSessionId, Post post) {
        this.userSessionId = userSessionId;
        this.post = post;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserSessionId() { return userSessionId; }
    public void setUserSessionId(String userSessionId) { this.userSessionId = userSessionId; }

    public int getCount() { return count; }
    public void setCount(int count) { this.count = count; }

    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }
}