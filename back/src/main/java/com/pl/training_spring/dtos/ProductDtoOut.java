package com.pl.training_spring.dtos;

import com.pl.training_spring.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDtoOut {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private Category category;
}
