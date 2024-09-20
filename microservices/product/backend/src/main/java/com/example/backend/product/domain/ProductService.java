package com.example.backend.product.domain;

import com.example.backend.category.domain.Category;
import com.example.backend.category.exception.CategoryNotFoundException;
import com.example.backend.category.infrastructure.CategoryRepository;
import com.example.backend.product.dto.ProductRequestDto;
import com.example.backend.product.dto.ProductResponseDto;
import com.example.backend.product.exception.ProductCreationException;
import com.example.backend.product.exception.ProductDeletionException;
import com.example.backend.product.exception.ProductNotFoundException;
import com.example.backend.product.infrastructure.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    private ProductResponseDto mapToResponseDto(Product product) {
        ProductResponseDto productResponseDto = new ProductResponseDto();
        productResponseDto.setId(product.getId().toHexString());
        productResponseDto.setName(product.getName());
        productResponseDto.setDescription(product.getDescription());
        productResponseDto.setPrice(product.getPrice());
        Category category = product.getCategory();
        productResponseDto.setCategoryId(category.getId().toHexString());
        return productResponseDto;
    }

    public ProductResponseDto create(ProductRequestDto productRequestDto) {
        Category category = categoryRepository.findById(new ObjectId(productRequestDto.getCategoryId()))
                .orElseThrow(() -> new CategoryNotFoundException("Categoría no encontrada"));
        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setCategory(category);

        try {
            productRepository.save(product);
            return mapToResponseDto(product);
        } catch (Exception e) {
            throw new ProductCreationException("Error al crear el producto");
        }
    }

    public ProductResponseDto findById(ObjectId id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado"));
        return mapToResponseDto(product);
    }

    public void deleteById(ObjectId id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Producto no encontrado con id: " + id.toHexString());
        }
        try {
            productRepository.deleteById(id);
        } catch (Exception e) {
            throw new ProductDeletionException("Error al eliminar el producto");
        }    }

    public Iterable<ProductResponseDto> findAll() {
        Iterable<Product> products = productRepository.findAll();
        return StreamSupport.stream(products.spliterator(), false)
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }
}
