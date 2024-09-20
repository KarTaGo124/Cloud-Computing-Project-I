package com.example.backend;

import com.example.backend.category.exception.CategoryCreationException;
import com.example.backend.category.exception.CategoryDeletionException;
import com.example.backend.category.exception.CategoryNotFoundException;
import com.example.backend.product.exception.ProductCreationException;
import com.example.backend.product.exception.ProductDeletionException;
import com.example.backend.product.exception.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({CategoryNotFoundException.class, ProductNotFoundException.class})
    public String handleNotFoundException(Exception e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({IllegalArgumentException.class, CategoryCreationException.class, ProductCreationException.class})
    public String handleIllegalArgumentException(IllegalArgumentException e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler({CategoryDeletionException.class, ProductDeletionException.class})
    public String handleConflictException(Exception e) {
        return e.getMessage();
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public String handleException(Exception e) {
        return e.getMessage();
    }


}
