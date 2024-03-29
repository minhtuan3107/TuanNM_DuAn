package com.example.backendglasses.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentResDTO {
    private String status;
    private String message;
    private String url;
}
