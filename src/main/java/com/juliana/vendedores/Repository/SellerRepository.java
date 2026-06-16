package com.juliana.vendedores.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.juliana.vendedores.entity.SellerEntity;

public interface SellerRepository extends JpaRepository<SellerEntity, Long> {
    
}
