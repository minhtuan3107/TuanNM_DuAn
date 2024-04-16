package com.example.backendglasses.service;

import com.example.backendglasses.model.TypeAccessory;
import com.example.backendglasses.repository.TypeAccessoryRepository;
import com.example.backendglasses.service.impl.ITypeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeAccessoryService implements ITypeAccessoryService {
    @Autowired
    private TypeAccessoryRepository typeAccessoryRepository;

    @Override
    public List<TypeAccessory> getList() {
        return typeAccessoryRepository.getTypeAccessories();
    }


    @Override
    public void save(TypeAccessory typeAccessory) {
        typeAccessoryRepository.save(typeAccessory);
    }

    @Override
    public TypeAccessory findById(Long id) {
        return typeAccessoryRepository.findById(id).get();
    }

    @Override
    public List<TypeAccessory> getAll() {
        return typeAccessoryRepository.findAll();
    }
}
