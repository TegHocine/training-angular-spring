package com.pl.training_spring.repositories;

import com.pl.training_spring.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE (:name IS NULL OR :name = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) ) AND (:category = 0 OR p.category.id = :category) AND (p.price BETWEEN :minPrice AND :maxPrice)")
    List<Product> searchProducts(
            @Param("name") String name,
            @Param("category") long category,
            @Param("minPrice") int minPrice,
            @Param("maxPrice") int maxPrice
    );
}
