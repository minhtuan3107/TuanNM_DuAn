package org.example.be.service;

import org.example.be.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IBookingService {
    List<Booking> getListByIdAccount(Long id);

    List<Booking> getCartByIdAccount(Long id);

    Long getAmountPriceCart(Long id);

    void addToCard(Long idAccount, Long idAccessory);

    void deleteCart(Long id);

    void updateQuantity(int quantity, Long idBooking);

    Page<Booking> getListAndSearch(String name, Pageable pageable);

    void save(Booking booking);

    Booking findById(Long id);

    List<Booking> checkBooking(Long idAccount, Long idAccessory);
    Booking findBookingByIdAccountAndIdAccessory(Long idAccount, Long idAccessory);

}
