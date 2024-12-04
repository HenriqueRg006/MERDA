package com.example.ecommerceBackend.service;

import com.example.ecommerceBackend.model.Favoritos;
import com.example.ecommerceBackend.model.Produto;
import com.example.ecommerceBackend.repository.FavoritosRepository;
import com.example.ecommerceBackend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FavoritosService {

    @Autowired
    private FavoritosRepository favoritosRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public String adicionarAosFavoritos(Long usuarioId, Long produtoId) {
        Optional<Produto> produtoOpt = produtoRepository.findById(produtoId);
        if (produtoOpt.isEmpty()) {
            return "Produto não encontrado.";
        }

        Favoritos favoritos = favoritosRepository.findByUsuario_Id(usuarioId).orElseGet(() -> {
            Favoritos novoFavoritos = new Favoritos();
            novoFavoritos.setUsuarioId(usuarioId);
            return favoritosRepository.save(novoFavoritos);
        });

        favoritos.getProdutos().add(produtoOpt.get());
        favoritosRepository.save(favoritos);

        return "Produto adicionado aos favoritos!";
    }

    public Favoritos visualizarFavoritos(Long usuarioId) {
        return favoritosRepository.findByUsuario_Id(usuarioId).orElse(null);
    }
}

