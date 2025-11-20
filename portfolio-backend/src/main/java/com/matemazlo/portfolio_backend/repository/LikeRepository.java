package com.matemazlo.portfolio_backend.repository;

import com.matemazlo.portfolio_backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByPostIdAndUserSessionId(Long postId, String userSessionId);
    List<Like> findByPostId(Long postId);
    int countByPostId(Long postId);
}