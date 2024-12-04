package com.example.ecommerceBackend.controller;

import com.example.ecommerceBackend.model.Pedido;
import com.example.ecommerceBackend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class HistoricoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping("/history")
    public ResponseEntity<List<Pedido>> listarPedidos(@RequestParam Long usuarioId) {
        List<Pedido> pedidos = pedidoService.listarPedidosPorUsuario(usuarioId);
        return ResponseEntity.ok(pedidos);
    }
}

