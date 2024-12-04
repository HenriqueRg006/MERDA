import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Link, useRouter } from 'expo-router';
import axios from 'axios'; 
import { baseUrl } from '../service/api'; 

const { width } = Dimensions.get('window');

export default function Registro() {
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [usuario, setUsuario] = useState('');
    const [endereco, setEndereco] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    const validarFormulario = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefoneRegex = /^\d{11}$/;

        if (!email || !telefone || !senha || !confirmarSenha || !usuario || !endereco) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return false;
        }
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Estrutura de email inválida.');
            return false;
        }
        if (!telefoneRegex.test(telefone)) {
            Alert.alert('Erro', 'Estrutura de telefone inválida. O telefone deve conter exatamente 11 números.');
            return false;
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return false;
        }
        if (senha.length < 8) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (validarFormulario()) {
            try {
                const response = await axios.post(`${baseUrl}/auth/register`, {
                    email: email,
                    telefone: telefone,
                    senha: senha,
                    usuario: usuario,
                    endereco: endereco
                });

                Alert.alert('Sucesso', 'Conta criada com sucesso!', [
                    {
                        text: 'OK',
                        onPress: () => router.push('/(tabs)/'), 
                    },
                ]);
            } catch (e) {
                console.log(e)
                if (e.response && e.response.status === 409) {
                    setErrorMessage('O email informado já está em uso.');
                } else {
                    setErrorMessage('Erro ao cadastrar. Tente novamente.');
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/images/logo_shopeasy.png')} style={styles.logo}/>
                <Text style={styles.headerText}>Registro</Text>
            </View>

            <TextInput
                keyboardType="email-address"
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#808080"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                maxLength={11}
                keyboardType="phone-pad"
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#808080"
                value={telefone}
                onChangeText={setTelefone}
            />
            <TextInput
                style={styles.input}
                placeholder="Crie uma senha"
                placeholderTextColor="#808080"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirme a senha"
                placeholderTextColor="#808080"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
            />
            <TextInput
                maxLength={15}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Nome de usuário"
                placeholderTextColor="#808080"
                value={usuario}
                onChangeText={setUsuario}
            />
            <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder="Endereço"
                placeholderTextColor="#808080"
                value={endereco}
                onChangeText={setEndereco}
            />

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Link href="/screens/login" style={styles.link}>
                    Já possui uma conta? Entrar
                </Link>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#808080', 
        padding: 10,
        marginBottom: 20,
    },
    logo: {
        width: width * 0.2,
        height: width * 0.1,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        textAlign: 'center',
        color: '#007BFF',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
    },
});
