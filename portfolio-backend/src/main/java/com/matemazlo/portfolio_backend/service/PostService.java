package com.matemazlo.portfolio_backend.service;

import com.matemazlo.portfolio_backend.dto.PostDTO;
import com.matemazlo.portfolio_backend.model.Post;
import com.matemazlo.portfolio_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private LikeService likeService;

    @Autowired
    private CommentService commentService;

    public List<PostDTO> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PostDTO> getPostsByCategory(String category) {
        return postRepository.findByCategoryOrderByCreatedAtDesc(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PostDTO convertToDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setCategory(post.getCategory());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setImageUrl(post.getImageUrl());
        dto.setCommentCount(post.getComments() != null ? post.getComments().size() : 0);
        dto.setLikeCount(post.getLikeCount());
        // userHasLiked-t külön kell kezelni session alapján
        dto.setUserHasLiked(false); // Alapértelmezett

        return dto;
    }
}