package com.example.backendglasses.service;

import com.example.backendglasses.model.MotobikeAccessory;
import com.example.backendglasses.repository.MotobikeAccessoryRepository;
import com.example.backendglasses.service.impl.IMotobikeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MotobikeAccessoryService implements IMotobikeAccessoryService {
    @Autowired
    private MotobikeAccessoryRepository motobikeAccessoryRepository;

    @Override
    public List<MotobikeAccessory> getList() {
        return motobikeAccessoryRepository.findAll();
    }

    @Override
    public MotobikeAccessory findById(Long id) {
        return motobikeAccessoryRepository.findById(id).get();
    }

    @Override
    public List<MotobikeAccessory> getListNew() {
        return motobikeAccessoryRepository.getListNew();
    }

    @Override
    public List<MotobikeAccessory> getListHot() {
        return motobikeAccessoryRepository.getListHot();
    }


    @Override
    public List<MotobikeAccessory> getListNewAll(String name) {
        return motobikeAccessoryRepository.getListNewAll(name);
    }


    @Override
    public Page<MotobikeAccessory> getAllAndSearch(String name, Pageable pageable) {
        return motobikeAccessoryRepository.getAllAndSearch("%" + name.trim() + "%", pageable);
    }

    @Override
    public void save(MotobikeAccessory motobikeAccessory) {
        motobikeAccessoryRepository.save(motobikeAccessory);
    }

    @Override
    public List<MotobikeAccessory> getAll() {
        return motobikeAccessoryRepository.getAllSortByQuantity();
    }


}
