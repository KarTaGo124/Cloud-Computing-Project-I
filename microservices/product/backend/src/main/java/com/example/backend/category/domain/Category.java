package com.example.backend.category.domain;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
@Getter
@Setter
public class Category {
    @Id
    private ObjectId id;

    private String name;

    private String description;
}
