package org.example.be.service;

import org.example.be.model.StatusBooking;

public interface IStatusBookingService {
    StatusBooking findById(Long id);
}
