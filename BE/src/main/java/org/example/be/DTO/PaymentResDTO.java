package org.example.be.DTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentResDTO {
    private String status;
    private String message;
    private String url;
}
