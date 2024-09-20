package com.example.backend.category.application;

import com.example.backend.category.dto.CategoryResponseDto;
import com.example.backend.category.domain.CategoryService;
import com.example.backend.category.domain.Category;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponseDto> create(@RequestBody Category category) {
        CategoryResponseDto categoryResponseDto = categoryService.create(category);
        return ResponseEntity.ok(categoryResponseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDto> findById(@PathVariable ObjectId id) {
        CategoryResponseDto categoryResponseDto = categoryService.findById(id);
        return ResponseEntity.ok(categoryResponseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable ObjectId id) {
        categoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Iterable<CategoryResponseDto>> findAll() {
        Iterable<CategoryResponseDto> categoryResponseDtos = categoryService.findAll();
        return ResponseEntity.ok(categoryResponseDtos);
    }
}
