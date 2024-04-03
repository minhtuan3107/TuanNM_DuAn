package com.example.backendglasses.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "motobikeAccessory_id", referencedColumnName = "id")
    private MotobikeAccessory motobikeAccessory;
    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private User account;
    @Column(columnDefinition = "boolean default false")
    private Boolean isDeleted = false;
    private LocalDateTime dateBooking;
    @ManyToOne
    @JoinColumn(name = "statusBooking_id", referencedColumnName = "id")
    private StatusBooking statusBooking;
    private Long totalPrice;
    private int quantity;
    private int statusPayment; // 1 là thanh toán bằng shipcod// 2 là đã thanh toán // 0 đang trong giỏ hàng
    private String address;
    private String phone;
    private String des;
}
