package com.example.backend.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDto {
    private String name;
    private String description;
    private Double price;
    private String categoryId;  // Cambia de Category a solo un id
}
