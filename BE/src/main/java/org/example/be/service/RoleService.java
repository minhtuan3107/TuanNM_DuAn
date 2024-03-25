package org.example.be.service;

import org.example.be.model.Role;
import org.example.be.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role findById(Long id) {
        return roleRepository.findById(id).get();
    }
}
