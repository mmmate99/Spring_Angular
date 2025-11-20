package com.matemazlo.portfolio_backend.controller;

import com.matemazlo.portfolio_backend.model.Like;
import com.matemazlo.portfolio_backend.model.Post;
import com.matemazlo.portfolio_backend.repository.LikeRepository;
import com.matemazlo.portfolio_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "http://localhost:4200")
public class LikeController {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

    @PostMapping("/post/{postId}")
    public ResponseEntity<Like> toggleLike(
            @PathVariable Long postId,
            @RequestHeader(value = "User-Session", required = false) String userSession) {

        // Ha nincs session, generáljunk egyet
        if (userSession == null || userSession.isEmpty()) {
            userSession = UUID.randomUUID().toString();
        }

        Optional<Post> post = postRepository.findById(postId);
        if (post.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<Like> existingLike = likeRepository.findByPostIdAndUserSessionId(postId, userSession);

        if (existingLike.isPresent()) {
            // Unlike - töröljük a like-ot
            likeRepository.delete(existingLike.get());
            return ResponseEntity.noContent().build();
        } else {
            // Like - új like létrehozása
            Like newLike = new Like(userSession, post.get());
            Like savedLike = likeRepository.save(newLike);
            return ResponseEntity.ok(savedLike);
        }
    }

    @GetMapping("/post/{postId}/count")
    public int getLikeCount(@PathVariable Long postId) {
        return likeRepository.countByPostId(postId);
    }

    @GetMapping("/post/{postId}/user")
    public boolean hasUserLiked(
            @PathVariable Long postId,
            @RequestHeader(value = "User-Session", required = false) String userSession) {

        if (userSession == null || userSession.isEmpty()) {
            return false;
        }

        return likeRepository.findByPostIdAndUserSessionId(postId, userSession).isPresent();
    }
}