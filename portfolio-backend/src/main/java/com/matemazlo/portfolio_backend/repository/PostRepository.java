package com.matemazlo.portfolio_backend.repository;

import com.matemazlo.portfolio_backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategoryOrderByCreatedAtDesc(String category);
    List<Post> findAllByOrderByCreatedAtDesc();
}