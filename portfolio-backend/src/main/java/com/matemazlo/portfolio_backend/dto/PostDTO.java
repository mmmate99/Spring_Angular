package com.matemazlo.portfolio_backend.dto;

import java.time.LocalDateTime;

public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private String category;
    private LocalDateTime createdAt;
    private String imageUrl;
    private int commentCount;
    private int likeCount;
    private boolean userHasLiked;

    // Constructors
    public PostDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public int getCommentCount() { return commentCount; }
    public void setCommentCount(int commentCount) { this.commentCount = commentCount; }

    public int getLikeCount() { return likeCount; }
    public void setLikeCount(int likeCount) { this.likeCount = likeCount; }

    public boolean isUserHasLiked() { return userHasLiked; }
    public void setUserHasLiked(boolean userHasLiked) { this.userHasLiked = userHasLiked; }
}