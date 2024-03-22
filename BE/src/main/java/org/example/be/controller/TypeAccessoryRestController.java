package org.example.be.controller;

import org.example.be.model.TypeAccessory;
import org.example.be.service.ITypeAccessoryService;
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
    private ResponseEntity<List<TypeAccessory>> getList() {
        List<TypeAccessory> list = typeAccessoryService.getList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
