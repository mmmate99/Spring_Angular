package com.matemazlo.portfolio_backend.service;

import com.matemazlo.portfolio_backend.model.Like;
import com.matemazlo.portfolio_backend.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    public int getLikeCountForPost(Long postId) {
        return likeRepository.countByPostId(postId);
    }

    public boolean hasUserLikedPost(Long postId, String userSession) {
        return likeRepository.findByPostIdAndUserSessionId(postId, userSession).isPresent();
    }

    public Like addLike(Like like) {
        return likeRepository.save(like);
    }

    public void removeLike(Like like) {
        likeRepository.delete(like);
    }

    public Optional<Like> findLike(Long postId, String userSession) {
        return likeRepository.findByPostIdAndUserSessionId(postId, userSession);
    }
}