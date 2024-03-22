package org.example.be.repository;

import org.example.be.model.StatusBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusBookingRepository extends JpaRepository<StatusBooking, Long> {
}
