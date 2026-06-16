package com.juliana.vendedores.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.juliana.vendedores.dto.SellerRequest;
import com.juliana.vendedores.entity.SellerEntity;
import com.juliana.vendedores.repository.SellerRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SellerService {


    private final SellerRepository sellerRepository;

    public SellerService(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }


    public SellerEntity save(SellerRequest request) {

        SellerEntity entity = new SellerEntity();
        entity.setName(request.name());
        entity.setSalary(request.salary());
        entity.setBonus(request.bonus());
        entity.setGender(request.gender());
        


        return sellerRepository.save(entity);
    }

    public List<SellerEntity> findAll() {
        return sellerRepository.findAll();
    }

    public SellerEntity findById(Long id) {
        return sellerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vendedor não encontrado"));
    }

    public void deleteById(Long id) {
        sellerRepository.deleteById(id);
    }

    public SellerEntity update(Long id, SellerRequest request) {

    SellerEntity entity = sellerRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Vendedor não encontrado"));

    entity.setName(request.name());
    entity.setGender(request.gender());
    entity.setSalary(request.salary());
    entity.setBonus(request.bonus());

    return sellerRepository.save(entity);
}

}
