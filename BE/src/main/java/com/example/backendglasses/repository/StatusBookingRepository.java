package com.example.backendglasses.repository;

import com.example.backendglasses.model.StatusBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusBookingRepository extends JpaRepository<StatusBooking, Long> {
}
