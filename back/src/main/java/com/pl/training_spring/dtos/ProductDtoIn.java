package com.pl.training_spring.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDtoIn {
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private Long category_id;
}
