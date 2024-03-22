package org.example.be.service;

import org.example.be.model.StatusBooking;
import org.example.be.repository.StatusBookingRepository;
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
