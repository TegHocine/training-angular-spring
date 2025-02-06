package com.pl.training_spring.mappers;

import com.pl.training_spring.dtos.CategoryDtoIn;
import com.pl.training_spring.dtos.CategoryDtoOut;
import com.pl.training_spring.entities.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    @Mapping(target = "id", ignore = true)
    Category categoryDtoInToCategory(CategoryDtoIn categoryDtoIn);

    CategoryDtoOut categoryToCategoryDtoOut(Category category);

    List<CategoryDtoOut> categoriesToCategoryDtoOuts(List<Category> categories);
}
