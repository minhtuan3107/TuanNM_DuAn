package com.example.backendglasses.service;

import com.example.backendglasses.model.TypeAccessory;
import com.example.backendglasses.repository.ITypeAccessoryRepository;
import com.example.backendglasses.service.impl.ITypeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeAccessoryService implements ITypeAccessoryService {
    @Autowired
    private ITypeAccessoryRepository typeAccessoryRepository;

    @Override
    public List<TypeAccessory> getList() {
        return typeAccessoryRepository.getTypeAccessories();
    }
}
