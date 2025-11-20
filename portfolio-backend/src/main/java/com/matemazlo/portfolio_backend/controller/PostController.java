package com.matemazlo.portfolio_backend.controller;

import com.matemazlo.portfolio_backend.dto.PostDTO;
import com.matemazlo.portfolio_backend.model.Post;
import com.matemazlo.portfolio_backend.repository.PostRepository;
import com.matemazlo.portfolio_backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/category/{category}")
    public List<PostDTO> getPostsByCategory(@PathVariable String category) {
        return postService.getPostsByCategory(category);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postRepository.save(post);
    }
}