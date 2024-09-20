package com.example.backend.product.domain;

import com.example.backend.category.domain.Category;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
@Getter
@Setter
public class Product {
    @Id
    private ObjectId id;

    private String name;

    private String description;

    private Double price;

    @DBRef
    private Category category;

}
