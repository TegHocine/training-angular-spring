package com.pl.training_spring.mappers;

import com.pl.training_spring.dtos.ProductDtoIn;
import com.pl.training_spring.dtos.ProductDtoOut;
import com.pl.training_spring.entities.Product;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    @Mapping(target = "id", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Product productDtoInToProduct(ProductDtoIn productDtoIn);

    ProductDtoOut productToProductDtoOut(Product products);

    List<ProductDtoOut> productToProductDtoOuts(List<Product> products);
}
