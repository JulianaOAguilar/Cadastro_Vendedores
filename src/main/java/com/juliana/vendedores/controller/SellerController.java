package com.juliana.vendedores.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.juliana.vendedores.dto.SellerRequest;
import com.juliana.vendedores.entity.SellerEntity;
import com.juliana.vendedores.service.SellerService;

import jakarta.validation.Valid;

@RestController

@RequestMapping("/sellers") //caminho base da api
public class SellerController {

    private final SellerService service;

    public SellerController(SellerService service) {
        this.service = service;
 
    }
    @GetMapping // método GET
    public ResponseEntity<List<SellerEntity>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}") // método GET pelo ID
    public ResponseEntity<SellerEntity> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping // método POST
    public ResponseEntity<SellerEntity> save(@RequestBody @Valid SellerRequest request) {

        SellerEntity saved = service.save(request);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(saved.getId())
                .toUri();

        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("/{id}") // método POST (edit)
    public ResponseEntity<SellerEntity> update(
            @PathVariable Long id,
            @RequestBody @Valid SellerRequest request) {

        return ResponseEntity.ok(service.update(id, request));
    }


    @DeleteMapping("/{id}") // método DELETE
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}