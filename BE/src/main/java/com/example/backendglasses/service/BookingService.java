package com.example.backendglasses.service;

import com.example.backendglasses.model.StatusBooking;
import com.example.backendglasses.repository.StatusBookingRepository;
import com.example.backendglasses.service.impl.IStatusBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusBookingService implements IStatusBookingService {
    @Autowired
    private StatusBookingRepository statusBookingRepository;

    @Override
    public StatusBooking findById(Long id) {
        return statusBookingRepository.findById(id).get();
    }
}
