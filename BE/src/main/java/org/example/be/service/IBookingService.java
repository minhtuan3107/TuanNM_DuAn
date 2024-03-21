package org.example.be.service;

import org.example.be.model.Booking;

import java.util.List;

public interface IBookingService {
    List<Booking> getListByIdAccount(Long id);

    List<Booking> getCartByIdAccount(Long id);

    Long getAmountPriceCart(Long id);

    void addToCard(Long idAccount, Long idAccessory);
}
