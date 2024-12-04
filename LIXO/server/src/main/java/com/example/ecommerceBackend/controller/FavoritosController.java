package com.example.ecommerceBackend.controller;

import com.example.ecommerceBackend.model.Favoritos;
import com.example.ecommerceBackend.service.FavoritosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wishlist")
public class FavoritosController {

    @Autowired
    private FavoritosService favoritosService;

    @PostMapping("/add/{produtoId}")
    public ResponseEntity<String> adicionarAosFavoritos(@RequestParam Long usuarioId, @PathVariable Long produtoId) {
        return ResponseEntity.ok(favoritosService.adicionarAosFavoritos(usuarioId, produtoId));
    }

    @GetMapping
    public ResponseEntity<Favoritos> visualizarFavoritos(@RequestParam Long usuarioId) {
        return ResponseEntity.ok(favoritosService.visualizarFavoritos(usuarioId));
    }
}

