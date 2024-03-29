package com.example.backendglasses.service.impl;

import com.example.backendglasses.model.MotobikeAccessory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IMotobikeAccessoryService {
    List<MotobikeAccessory> getList();

    MotobikeAccessory findById(Long id);

    List<MotobikeAccessory> getListNew();

    List<MotobikeAccessory> getListHot();


    List<MotobikeAccessory> getListNewAll(@Param("name") String name);

    Page<MotobikeAccessory> getAllAndSearch(String name, Pageable pageable);

    void save(MotobikeAccessory motobikeAccessory);
}
