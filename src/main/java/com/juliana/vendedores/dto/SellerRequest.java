package com.juliana.vendedores.dto;

import com.juliana.vendedores.enums.Gender;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record SellerRequest(
    
        @NotNull @Size(min = 5) String name,

        @NotNull Gender gender,

        @NotNull(message = "O salário é obrigatório") @Positive(message = "O salário deve ser maior que zero") Double salary,

        @NotNull(message = "A bonificação é obrigatória") @Min(value = 0, message = "A bonificação deve ser no mínimo 0") @Max(value = 100, message = "A bonificação deve ser no máximo 100") Double bonus) {
}
