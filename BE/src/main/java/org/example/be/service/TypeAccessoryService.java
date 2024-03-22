package org.example.be.service;

import org.example.be.model.TypeAccessory;
import org.example.be.repository.ITypeAccessoryRepository;
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
