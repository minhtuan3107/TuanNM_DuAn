package org.example.be.repository;

import org.example.be.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query(value = "select * from booking where booking.account_id = :id and booking.status_booking_id = 2 limit 20", nativeQuery = true)
    List<Booking> getListBookingByIdAccount(@Param("id") Long id);

    @Query(value = "select * from booking where booking.status_booking_id = 1 and booking.account_id = :id", nativeQuery = true)
    List<Booking> getCart(@Param("id") Long id);

    @Query(value = "select sum(motobike_accessory.price) from booking\n" +
            "join motobike_accessory on booking.motobike_accessory_id = motobike_accessory.id\n" +
            "where booking.status_booking_id = 1 and booking.account_id = :id", nativeQuery = true)
    Long getAmountPriceByAccountId(@Param("id") Long id);

    @Query(value = "INSERT INTO `xe`.`booking` (`account_id`, `motobike_accessory_id`, `status_booking_id`) VALUES (:idAccount, :idAccessory, '2')", nativeQuery = true)
    void addToCard(@Param("idAccount")Long idAccount, @Param("idAccessory") Long idAccessory);
}
