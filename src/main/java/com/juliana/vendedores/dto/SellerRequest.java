package com.juliana.vendedores.dto;

import com.juliana.vendedores.enums.Gender;

public record SellerRequest(
    String name,
    Gender gender,
    Double salary,
    Double bonus
) {}

