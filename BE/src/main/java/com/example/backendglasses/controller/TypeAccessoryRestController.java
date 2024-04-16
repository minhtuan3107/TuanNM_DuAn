package com.example.backendglasses.controller;

import com.example.backendglasses.model.TypeAccessory;
import com.example.backendglasses.service.impl.ITypeAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/type")
public class TypeAccessoryRestController {
    @Autowired
    private ITypeAccessoryService typeAccessoryService;

    @GetMapping()
    private ResponseEntity<List<TypeAccessory>> getList() { // lấy danh sách loại phụ tùng
        List<TypeAccessory> list = typeAccessoryService.getList(); // lấy danh sách loại phụ tùng
        return new ResponseEntity<>(list, HttpStatus.OK); // trả về danh sách loại phụ tùng
    }

    @GetMapping("/getAll")
    private ResponseEntity<List<TypeAccessory>> getAll() { // lấy danh sách loại phụ tùng
        List<TypeAccessory> list = typeAccessoryService.getAll(); // lấy danh sách loại phụ tùng
        return new ResponseEntity<>(list, HttpStatus.OK); // trả về danh sách loại phụ tùng
    }
}
