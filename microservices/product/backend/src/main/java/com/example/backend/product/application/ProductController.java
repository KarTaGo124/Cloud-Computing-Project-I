package com.example.backend.product.application;

import com.example.backend.product.dto.ProductRequestDto;
import com.example.backend.product.domain.ProductService;
import com.example.backend.product.dto.ProductResponseDto;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponseDto> create(@RequestBody ProductRequestDto productRequestDto) {
        ProductResponseDto productResponseDto = productService.create(productRequestDto);
        return ResponseEntity.ok(productResponseDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDto> findById(@PathVariable ObjectId id) {
        ProductResponseDto productResponseDto = productService.findById(id);
        return ResponseEntity.ok(productResponseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable ObjectId id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Iterable<ProductResponseDto>> findAll() {
        Iterable<ProductResponseDto> productResponseDtos = productService.findAll();
        return ResponseEntity.ok(productResponseDtos);
    }

}
