package com.example.backend.category.exception;

public class CategoryDeletionException extends RuntimeException {
    public CategoryDeletionException(String message) {
        super(message);
    }
}
