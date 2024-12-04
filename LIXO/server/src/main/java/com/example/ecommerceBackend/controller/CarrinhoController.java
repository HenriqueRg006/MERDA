package com.example.ecommerceBackend.controller;

import com.example.ecommerceBackend.model.Carrinho;
import com.example.ecommerceBackend.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @PostMapping("/add/{produtoId}")
    public ResponseEntity<String> adicionarAoCarrinho(@RequestParam Long usuarioId, @PathVariable Long produtoId) {
        String resultado = carrinhoService.adicionarAoCarrinho(usuarioId, produtoId);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping
    public ResponseEntity<Carrinho> visualizarCarrinho(@RequestParam Long usuarioId) {
        Carrinho carrinho = carrinhoService.visualizarCarrinho(usuarioId);
        return ResponseEntity.ok(carrinho);
    }
}

