package com.example.backend.product.application;

import com.example.backend.product.dto.ProductRequestDto;
import com.example.backend.product.domain.ProductService;
import com.example.backend.product.dto.ProductResponseDto;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.ExampleObject;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Tag(name = "Product API", description = "Operaciones relacionadas con los productos")
@CrossOrigin(origins = "*")
public class ProductController {

        private final ProductService productService;

        @PostMapping
        @Operation(summary = "Crear un nuevo producto", description = "Crea un nuevo producto con base en la información proporcionada", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Cuerpo de la solicitud para crear un nuevo producto", required = true, content = @io.swagger.v3.oas.annotations.media.Content(examples = @ExampleObject(name = "Ejemplo de producto", summary = "Producto válido", value = "{\"name\": \"Computer\", \"description\": \"A powerful computer\", \"price\": 1200.99, \"stock\": 50, \"imageUrl\": https://picsum.photos/400/300, \"categoryId\": \"66ecf8e319382626f90783e8\"}"))))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Producto creado con éxito"),
                        @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<ProductResponseDto> create(@RequestBody ProductRequestDto productRequestDto) {
                ProductResponseDto productResponseDto = productService.create(productRequestDto);
                return ResponseEntity.ok(productResponseDto);
        }

        @PutMapping("/{id}")
        @Operation(summary = "Actualizar un producto", description = "Actualiza un producto específico según su ID", requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Cuerpo de la solicitud para actualizar un producto existente", required = true, content = @io.swagger.v3.oas.annotations.media.Content(examples = @ExampleObject(name = "Ejemplo de actualización de producto", summary = "Producto válido para actualizar", value = "{\"name\": \"Updated Computer\", \"description\": \"An updated description for a powerful computer\", \"price\": 1300.99, \"stock\": 100, \"imageUrl\": https://picsum.photos/400/300, \"categoryId\": \"66ecf8e319382626f90783e8\"}"))))
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Producto actualizado con éxito"),
                        @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos"),
                        @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<ProductResponseDto> update(
                        @Parameter(description = "ID del producto en formato hexString", example = "66ecb5d53e2cf02bef160395") @PathVariable String id,
                        @RequestBody ProductRequestDto productRequestDto) {
                ObjectId objectId = new ObjectId(id);
                ProductResponseDto productResponseDto = productService.update(objectId, productRequestDto);
                return ResponseEntity.ok(productResponseDto);
        }

        @GetMapping("/{id}")
        @Operation(summary = "Buscar un producto por ID", description = "Obtiene un producto específico según su ID")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Producto encontrado"),
                        @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<ProductResponseDto> findById(
                        @Parameter(description = "ID del producto en formato hexString", example = "66ecb5d53e2cf02bef160395") @PathVariable String id) {
                ObjectId objectId = new ObjectId(id);
                ProductResponseDto productResponseDto = productService.findById(objectId);
                return ResponseEntity.ok(productResponseDto);
        }

        @DeleteMapping("/{id}")
        @Operation(summary = "Eliminar un producto", description = "Elimina un producto específico según su ID")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Producto eliminado con éxito"),
                        @ApiResponse(responseCode = "404", description = "Producto no encontrado"),
                        @ApiResponse(responseCode = "409", description = "Conflicto al eliminar el producto"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<Void> deleteById(
                        @Parameter(description = "ID del producto en formato hexString", example = "66ecb5d53e2cf02bef160395") @PathVariable String id) {
                ObjectId objectId = new ObjectId(id);
                productService.deleteById(objectId);
                return ResponseEntity.noContent().build();
        }

        @GetMapping
        @Operation(summary = "Obtener todos los productos", description = "Devuelve todos los productos disponibles")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Listado de productos devuelto con éxito"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<Iterable<ProductResponseDto>> findAll() {
                Iterable<ProductResponseDto> productResponseDtos = productService.findAll();
                return ResponseEntity.ok(productResponseDtos);
        }

}