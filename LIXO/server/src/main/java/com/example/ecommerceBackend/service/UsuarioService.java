package com.example.ecommerceBackend.service;

import com.example.ecommerceBackend.model.Usuario;
import com.example.ecommerceBackend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario usuario) {
        usuario.setId(null);
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

        public Usuario atualizarUsuario(Long id, Usuario usuario) {
        if (!usuarioRepository.existsById(id)) {
            return null; 
        }
        
        usuario.setId(id);
        
        return usuarioRepository.save(usuario);
    }

    public boolean deletarUsuario(Long id) {
        try {
            usuarioRepository.deleteById(id);
            return true;
        } catch (EmptyResultDataAccessException e) {
            return false; 
        }
    }
}

