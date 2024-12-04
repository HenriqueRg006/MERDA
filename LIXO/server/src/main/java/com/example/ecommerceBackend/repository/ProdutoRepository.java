package com.example.ecommerceBackend.repository;

import com.example.ecommerceBackend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
