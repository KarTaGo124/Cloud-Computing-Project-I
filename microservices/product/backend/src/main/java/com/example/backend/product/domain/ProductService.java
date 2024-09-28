package com.example.backend.product.domain;

import com.example.backend.category.domain.Category;
import com.example.backend.category.dto.CategoryResponseDto;
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
        productResponseDto.setStock(product.getStock());
        Category category = categoryRepository.findById(product.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Categoría no encontrada"));
        CategoryResponseDto categoryResponseDto = new CategoryResponseDto();
        categoryResponseDto.setId(category.getId().toHexString());
        categoryResponseDto.setName(category.getName());
        categoryResponseDto.setDescription(category.getDescription());
        productResponseDto.setCategory(categoryResponseDto);
        return productResponseDto;
    }

    public ProductResponseDto create(ProductRequestDto productRequestDto) {
        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setStock(productRequestDto.getStock());
        product.setCategoryId(new ObjectId(productRequestDto.getCategoryId()));

        if (!categoryRepository.existsById(product.getCategoryId())) {
            throw new CategoryNotFoundException("Categoría no encontrada");
        }
        
        try {
            productRepository.save(product);
            return mapToResponseDto(product);
        } catch (Exception e) {
            throw new ProductCreationException("Error al crear el producto");
        }
    }

    public ProductResponseDto update(ObjectId id, ProductRequestDto productRequestDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto no encontrado con id: " + id.toHexString()));
        Category category = categoryRepository.findById(new ObjectId(productRequestDto.getCategoryId()))
                .orElseThrow(() -> new CategoryNotFoundException("Categoría no encontrada"));
        if (productRequestDto.getName() != null)
            existingProduct.setName(productRequestDto.getName());
        if (productRequestDto.getDescription() != null)
            existingProduct.setDescription(productRequestDto.getDescription());
        if (productRequestDto.getPrice() != null)
            existingProduct.setPrice(productRequestDto.getPrice());
        if (productRequestDto.getStock() != null)
            existingProduct.setStock(productRequestDto.getStock());
        if (productRequestDto.getCategoryId() != null)
            existingProduct.setCategoryId(category.getId());

        try {
            productRepository.save(existingProduct);
            return mapToResponseDto(existingProduct);
        } catch (Exception e) {
            throw new ProductCreationException("Error al actualizar el producto");
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
