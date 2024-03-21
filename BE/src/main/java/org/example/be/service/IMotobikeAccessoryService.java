package org.example.be.service;

import org.example.be.model.MotobikeAccessory;

import java.util.List;

public interface IMotobikeAccessoryService {
    List<MotobikeAccessory> getList();

    MotobikeAccessory findById(Long id);

    List<MotobikeAccessory> getListNew();

    List<MotobikeAccessory> getListByOrders();

    List<MotobikeAccessory> getListByIdAccount();
}
