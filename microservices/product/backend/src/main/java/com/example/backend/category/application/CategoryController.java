package com.example.backend.category.application;

import com.example.backend.category.dto.CategoryResponseDto;
import com.example.backend.category.domain.CategoryService;
import com.example.backend.category.domain.Category;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@Tag(name = "Category API", description = "Operaciones relacionadas con las categorías de productos")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @Operation(
            summary = "Crear una nueva categoría",
            description = "Crea una nueva categoría de productos",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Cuerpo de la solicitud para crear una nueva categoría",
                    required = true,
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            examples = @ExampleObject(
                                    name = "Ejemplo de categoría",
                                    summary = "Una categoría válida",
                                    value = "{\"name\": \"Electrónica\", \"description\": \"Categoría de productos electrónicos\"}"
                            )
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Categoría creada con éxito"),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<CategoryResponseDto> create(@RequestBody Category category) {
        CategoryResponseDto categoryResponseDto = categoryService.create(category);
        return ResponseEntity.ok(categoryResponseDto);
    }

    @PutMapping("/{id}")
    @Operation(
            summary = "Actualizar una categoría",
            description = "Actualiza una categoría específica según su ID",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Cuerpo de la solicitud para actualizar una categoría existente",
                    required = true,
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            examples = @ExampleObject(
                                    name = "Ejemplo de actualización de categoría",
                                    summary = "Una categoría válida para actualizar",
                                    value = "{\"name\": \"Electrodomésticos\", \"description\": \"Categoría actualizada de electrodomésticos\"}"
                            )
                    )
            )
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoría actualizada con éxito"),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos"),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<CategoryResponseDto> update(
            @Parameter(description = "ID de la categoría en formato hexString", example = "66ecb5c83e2cf02bef160394")
            @PathVariable String id, @RequestBody Category category) {
        ObjectId objectId = new ObjectId(id);
        CategoryResponseDto categoryResponseDto = categoryService.update(objectId, category);
        return ResponseEntity.ok(categoryResponseDto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar una categoría por ID", description = "Obtiene una categoría específica según su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categoría encontrada"),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<CategoryResponseDto> findById(
            @Parameter(description = "ID de la categoría en formato hexString", example = "66ecb5c83e2cf02bef160394")
            @PathVariable String id) {
        ObjectId objectId = new ObjectId(id);
        CategoryResponseDto categoryResponseDto = categoryService.findById(objectId);
        return ResponseEntity.ok(categoryResponseDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar una categoría", description = "Elimina una categoría específica según su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Categoría eliminada con éxito"),
            @ApiResponse(responseCode = "404", description = "Categoría no encontrada"),
            @ApiResponse(responseCode = "409", description = "Conflicto al eliminar la categoría"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Void> deleteById(
            @Parameter(description = "ID de la categoría en formato hexString", example = "66ecb5c83e2cf02bef160394")
            @PathVariable String id) {
        ObjectId objectId = new ObjectId(id);
        categoryService.deleteById(objectId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @Operation(summary = "Obtener todas las categorías", description = "Devuelve todas las categorías de productos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Listado de categorías devuelto con éxito"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<Iterable<CategoryResponseDto>> findAll() {
        Iterable<CategoryResponseDto> categoryResponseDtos = categoryService.findAll();
        return ResponseEntity.ok(categoryResponseDtos);
    }
}
