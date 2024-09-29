package com.example.backend.product.dto;

import com.example.backend.category.dto.CategoryResponseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDto {
    private String id;
    private String name;
    private String description;
    private Double price;
    private Long stock;
    private String imageUrl;
    private CategoryResponseDto category;
}
