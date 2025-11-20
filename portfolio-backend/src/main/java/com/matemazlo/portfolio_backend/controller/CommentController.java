package com.matemazlo.portfolio_backend.controller;

import com.matemazlo.portfolio_backend.model.Comment;
import com.matemazlo.portfolio_backend.model.Post;
import com.matemazlo.portfolio_backend.repository.CommentRepository;
import com.matemazlo.portfolio_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPost(@PathVariable Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId);
    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long postId,
            @RequestBody Comment comment) {

        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            comment.setPost(post.get());
            Comment savedComment = commentRepository.save(comment);
            return ResponseEntity.ok(savedComment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}