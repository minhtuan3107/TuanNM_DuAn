package com.example.backendglasses.service.impl;


import com.example.backendglasses.model.TypeAccessory;

import java.util.List;

public interface ITypeAccessoryService {
    List<TypeAccessory> getList();

    void save(TypeAccessory typeAccessory);

    TypeAccessory findById(Long id);
}
