package com.example.backend.category.domain;

import com.example.backend.category.dto.CategoryResponseDto;
import com.example.backend.category.exception.CategoryCreationException;
import com.example.backend.category.exception.CategoryDeletionException;
import com.example.backend.category.exception.CategoryNotFoundException;
import com.example.backend.category.infrastructure.CategoryRepository;
import com.example.backend.product.infrastructure.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    private CategoryResponseDto mapToResponseDto(Category category) {
        CategoryResponseDto categoryResponseDto = new CategoryResponseDto();
        categoryResponseDto.setId(category.getId().toHexString());
        categoryResponseDto.setName(category.getName());
        categoryResponseDto.setDescription(category.getDescription());
        return categoryResponseDto;
    }

    public CategoryResponseDto create(Category category) {
        try {
            categoryRepository.save(category);
            return mapToResponseDto(category);
        } catch (Exception e) {
            throw new CategoryCreationException("Error al crear la categoría");
        }
    }

    public CategoryResponseDto update(ObjectId id, Category category) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Categoría no encontrada con id: " + id.toHexString()));
        if (category.getName() != null)
            existingCategory.setName(category.getName());
        if (category.getDescription() != null)
            existingCategory.setDescription(category.getDescription());
        try {
            categoryRepository.save(existingCategory);
            return mapToResponseDto(existingCategory);
        } catch (Exception e) {
            throw new CategoryCreationException("Error al actualizar la categoría");
        }
    }

    public CategoryResponseDto findById(ObjectId id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Categoría no encontrada con id: " + id.toHexString()));
        return mapToResponseDto(category);
    }

    public void deleteById(ObjectId id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException("Categoría no encontrada con id: " + id.toHexString());
        }
        if (productRepository.existsByCategoryId(id)) {
            throw new CategoryDeletionException("No se puede eliminar la categoría porque está asociada a uno o más productos");
        }
        try {
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            throw new CategoryDeletionException("Error al eliminar la categoría");
        }
    }

    public Iterable<CategoryResponseDto> findAll() {
        Iterable<Category> categories = categoryRepository.findAll();
        return StreamSupport.stream(categories.spliterator(), false)
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }
}
