package com.example.ecommerceBackend.service;

import com.example.ecommerceBackend.model.Carrinho;
import com.example.ecommerceBackend.model.Produto;
import com.example.ecommerceBackend.repository.CarrinhoRepository;
import com.example.ecommerceBackend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    public String adicionarAoCarrinho(Long usuarioId, Long produtoId) {
        Optional<Carrinho> carrinhoOpt = carrinhoRepository.findByUsuario_Id(usuarioId);
        Optional<Produto> produtoOpt = produtoRepository.findById(produtoId);

        if (produtoOpt.isEmpty()) {
            return "Produto não encontrado.";
        }

        Carrinho carrinho = carrinhoOpt.orElseGet(() -> {
            Carrinho novoCarrinho = new Carrinho();
            novoCarrinho.setUsuarioId(usuarioId);
            return carrinhoRepository.save(novoCarrinho);
        });

        carrinho.getProdutos().add(produtoOpt.get());
        carrinhoRepository.save(carrinho);

        return "Produto adicionado ao carrinho!";
    }

    public Carrinho visualizarCarrinho(Long usuarioId) {
        return carrinhoRepository.findByUsuario_Id(usuarioId).orElse(null);
    }
}

