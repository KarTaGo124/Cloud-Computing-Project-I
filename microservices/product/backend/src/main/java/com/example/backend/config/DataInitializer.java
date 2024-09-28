package com.example.backend.config;

import com.example.backend.category.domain.Category;
import com.example.backend.category.infrastructure.CategoryRepository;
import com.example.backend.product.domain.Product;
import com.example.backend.product.infrastructure.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.bson.types.ObjectId;

import java.util.Arrays;

@Component
public class DataInitializer {

    @Bean
    CommandLineRunner initData(CategoryRepository categoryRepository, ProductRepository productRepository) {
        return args -> {
            // Inserción de Categorías
            Category electronics = new Category();
            electronics.setId(new ObjectId("66ecb5cd128f2fef1c964034"));
            electronics.setName("Electronics");
            electronics.setDescription("Devices and gadgets for everyday use");

            Category games = new Category();
            games.setId(new ObjectId("66ecb5cd128f2fef1c964035"));
            games.setName("Games");
            games.setDescription("Video games and board games");

            Category books = new Category();
            books.setId(new ObjectId("66ecb5cd128f2fef1c964036"));
            books.setName("Books");
            books.setDescription("Fictional and non-fictional literature");

            // Agrega más categorías
            Category clothing = new Category();
            clothing.setId(new ObjectId());
            clothing.setName("Clothing");
            clothing.setDescription("Clothes and accessories");

            Category furniture = new Category();
            furniture.setId(new ObjectId());
            furniture.setName("Furniture");
            furniture.setDescription("Home and office furniture");

            Category beauty = new Category();
            beauty.setId(new ObjectId());
            beauty.setName("Beauty");
            beauty.setDescription("Beauty products and personal care");

            Category sports = new Category();
            sports.setId(new ObjectId());
            sports.setName("Sports");
            sports.setDescription("Sports equipment and gear");

            categoryRepository.saveAll(Arrays.asList(electronics, games, books, clothing, furniture, beauty, sports));

            // Inserción de Productos
            Product smartphone = new Product();
            smartphone.setId(new ObjectId());
            smartphone.setName("Smartphone");
            smartphone.setDescription("A powerful smartphone");
            smartphone.setPrice(699.99);
            smartphone.setStock(100L);
            smartphone.setCategoryId(electronics.getId());

            Product laptop = new Product();
            laptop.setId(new ObjectId());
            laptop.setName("Laptop");
            laptop.setDescription("A powerful laptop");
            laptop.setPrice(1200.99);
            laptop.setStock(50L);
            laptop.setCategoryId(electronics.getId());

            Product tablet = new Product();
            tablet.setId(new ObjectId());
            tablet.setName("Tablet");
            tablet.setDescription("A powerful tablet");
            tablet.setPrice(499.99);
            tablet.setStock(80L);
            tablet.setCategoryId(electronics.getId());

            // Más productos con el mismo patrón
            Product chess = new Product();
            chess.setId(new ObjectId());
            chess.setName("Chess");
            chess.setDescription("Classic board game");
            chess.setPrice(20.99);
            chess.setStock(150L);
            chess.setCategoryId(games.getId());

            Product monopoly = new Product();
            monopoly.setId(new ObjectId());
            monopoly.setName("Monopoly");
            monopoly.setDescription("Famous board game");
            monopoly.setPrice(25.99);
            monopoly.setStock(120L);
            monopoly.setCategoryId(games.getId());

            Product videoGameConsole = new Product();
            videoGameConsole.setId(new ObjectId());
            videoGameConsole.setName("Video Game Console");
            videoGameConsole.setDescription("Next-gen console");
            videoGameConsole.setPrice(499.99);
            videoGameConsole.setStock(60L);
            videoGameConsole.setCategoryId(games.getId());

            Product novel = new Product();
            novel.setId(new ObjectId());
            novel.setName("Novel");
            novel.setDescription("Best-seller novel");
            novel.setPrice(12.99);
            novel.setStock(200L);
            novel.setCategoryId(books.getId());

            Product cookbook = new Product();
            cookbook.setId(new ObjectId());
            cookbook.setName("Cookbook");
            cookbook.setDescription("Delicious recipes");
            cookbook.setPrice(18.99);
            cookbook.setStock(90L);
            cookbook.setCategoryId(books.getId());

            Product textbook = new Product();
            textbook.setId(new ObjectId());
            textbook.setName("Textbook");
            textbook.setDescription("Educational textbook");
            textbook.setPrice(55.99);
            textbook.setStock(70L);
            textbook.setCategoryId(books.getId());

            // Más productos
            Product tshirt = new Product();
            tshirt.setId(new ObjectId());
            tshirt.setName("T-shirt");
            tshirt.setDescription("Cotton T-shirt");
            tshirt.setPrice(14.99);
            tshirt.setStock(300L);
            tshirt.setCategoryId(clothing.getId());

            Product jeans = new Product();
            jeans.setId(new ObjectId());
            jeans.setName("Jeans");
            jeans.setDescription("Comfortable jeans");
            jeans.setPrice(39.99);
            jeans.setStock(200L);
            jeans.setCategoryId(clothing.getId());

            Product sofa = new Product();
            sofa.setId(new ObjectId());
            sofa.setName("Sofa");
            sofa.setDescription("Leather sofa");
            sofa.setPrice(799.99);
            sofa.setStock(20L);
            sofa.setCategoryId(furniture.getId());

            Product desk = new Product();
            desk.setId(new ObjectId());
            desk.setName("Desk");
            desk.setDescription("Wooden office desk");
            desk.setPrice(159.99);
            desk.setStock(40L);
            desk.setCategoryId(furniture.getId());

            Product shampoo = new Product();
            shampoo.setId(new ObjectId());
            shampoo.setName("Shampoo");
            shampoo.setDescription("Organic hair shampoo");
            shampoo.setPrice(8.99);
            shampoo.setStock(500L);
            shampoo.setCategoryId(beauty.getId());

            Product moisturizer = new Product();
            moisturizer.setId(new ObjectId());
            moisturizer.setName("Moisturizer");
            moisturizer.setDescription("Face moisturizer");
            moisturizer.setPrice(19.99);
            moisturizer.setStock(250L);
            moisturizer.setCategoryId(beauty.getId());

            Product basketball = new Product();
            basketball.setId(new ObjectId());
            basketball.setName("Basketball");
            basketball.setDescription("Official size basketball");
            basketball.setPrice(29.99);
            basketball.setStock(100L);
            basketball.setCategoryId(sports.getId());

            Product tennisRacket = new Product();
            tennisRacket.setId(new ObjectId());
            tennisRacket.setName("Tennis Racket");
            tennisRacket.setDescription("Professional tennis racket");
            tennisRacket.setPrice(129.99);
            tennisRacket.setStock(60L);
            tennisRacket.setCategoryId(sports.getId());

            productRepository.saveAll(Arrays.asList(
                    smartphone, laptop, tablet, chess, monopoly, videoGameConsole, novel, cookbook, textbook,
                    tshirt, jeans, sofa, desk, shampoo, moisturizer, basketball, tennisRacket
            ));
        };
    }
}
