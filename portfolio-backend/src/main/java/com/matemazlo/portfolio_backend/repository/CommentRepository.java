package com.matemazlo.portfolio_backend.repository;

import com.matemazlo.portfolio_backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdOrderByCreatedAtDesc(Long postId);
    List<Comment> findByPostId(Long postId);
}