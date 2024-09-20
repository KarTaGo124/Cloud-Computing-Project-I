package com.example.backend.product.infrastructure;

import com.example.backend.product.domain.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {
    boolean existsByCategoryId(ObjectId id);
}
