package org.example.be.repository;

import jakarta.transaction.Transactional;
import org.example.be.DTO.HistoryBookingDTO;
import org.example.be.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Modifying
    @Transactional
    @Query(value = "SELECT DATE_FORMAT(booking.date_booking, '%Y-%m-%d %H:%i:%s.%f') AS dateBooking,\n" +
            "       SUM(booking.total_price) AS price,\n" +
            "       booking.status_payment AS statusPayment \n" +
            "FROM booking\n" +
            "WHERE booking.status_booking_id = 2 AND booking.account_id = :id\n" +
            "GROUP BY DATE_FORMAT(booking.date_booking, '%Y-%m-%d %H:%i:%s.%f'), booking.status_payment;\n", nativeQuery = true)
    List<HistoryBookingDTO> getListBookingFormat(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = "SELECT DATE_FORMAT(booking.date_booking, '%Y-%m-%d %H:%i:%s.%f') AS dateBooking,\n" +
            "       SUM(booking.total_price) AS price,\n" +
            "       booking.status_payment AS statusPayment\n" +
            "FROM booking\n" +
            "WHERE booking.status_booking_id = 2 " +
            "GROUP BY DATE_FORMAT(booking.date_booking, '%Y-%m-%d %H:%i:%s.%f'), booking.status_payment;\n", nativeQuery = true)
    List<HistoryBookingDTO> getListBooking();


    @Query(value = "select * from booking where booking.status_booking_id = 1 and booking.account_id = :id", nativeQuery = true)
    List<Booking> getCart(@Param("id") Long id);

    @Query(value = "select sum(motobike_accessory.price * booking.quantity) from booking\n" +
            "join motobike_accessory on booking.motobike_accessory_id = motobike_accessory.id\n" +
            "where booking.status_booking_id = 1 and booking.account_id = :id", nativeQuery = true)
    Long getAmountPriceByAccountId(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO booking (`account_id`, `motobike_accessory_id`, `status_booking_id`,`quantity`,`status_payment`) VALUES (:idAccount, :idAccessory, '1','1','0')", nativeQuery = true)
    void addToCard(@Param("idAccount") Long idAccount, @Param("idAccessory") Long idAccessory);


    @Modifying
    @Transactional
    @Query(value = "select * from booking\n" +
            "where booking.status_booking_id = 1 and status_payment = 0 and account_id = :id ;", nativeQuery = true)
    List<Booking> getListPay(@Param("id") Long id);


    @Modifying
    @Transactional
    @Query(value = "update booking set quantity = :quantity where booking.id = :id", nativeQuery = true)
    void updateQuantity(@Param("quantity") int quantity, @Param("id") Long id);

    @Query(value = "select * from booking\n" +
            "where booking.status_booking_id = 2", nativeQuery = true)
    Page<Booking> getBooking(String name, Pageable pageable);

    @Query(value = "select * from booking\n" +
            "where booking.account_id =  :idAccount and booking.motobike_accessory_id = :idAccessory and booking.status_booking_id = 1 ", nativeQuery = true)
    List<Booking> checkBooking(@Param("idAccount") Long id, @Param("idAccessory") Long idAccessory);

    @Query(value = "select * from booking\n" +
            "where booking.account_id =  :idAccount and booking.motobike_accessory_id = :idAccessory and booking.status_booking_id = 1 ", nativeQuery = true)
    Booking findBookingByIdAccountAndIdAccessory(@Param("idAccount") Long id, @Param("idAccessory") Long idAccessory);


    @Query(value = "select * from booking\n" +
            "where booking.date_booking = :date and booking.account_id = :idAccount and booking.status_booking_id = 2", nativeQuery = true)
    List<Booking> detailsBooking(@Param("date") String dateTime, Long idAccount);
    @Query(value = "select * from booking\n" +
            "where booking.date_booking = :date and booking.account_id = :idAccount", nativeQuery = true)
    List<Booking> detailBookingAdmin(@Param("date") String dateTime);
}
