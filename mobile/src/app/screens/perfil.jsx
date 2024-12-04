import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Dimensions, Image } from 'react-native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Perfil() {
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const router = useRouter();

    const salvarAlteracoes = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefoneRegex = /^\d{11}$/;

        if (!email || !telefone || !senha || !confirmarSenha || !usuario || !endereco) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Estrutura de email inválida.');
            return;
        }
        if (!telefoneRegex.test(telefone)) {
            Alert.alert('Erro', 'Estrutura de telefone inválida. O telefone deve conter exatamente 11 números.');
            return;
        }
        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        if (senha.length < 8) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        Alert.alert('Sucesso', 'Informações atualizadas com sucesso!', [
            {
                text: 'OK',
                onPress: () => router.push('/(tabs)/menu'),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
                    <Ionicons name="arrow-back" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.titulo}>Meu Perfil</Text>
            </View>

            <View style={styles.inputs}>
                <Text style={styles.label}>Nome de usuário</Text>
                <TextInput
                    style={styles.input}
                    value={usuario}
                    onChangeText={setUsuario}
                    placeholder="Digite seu nome de usuário"
                    placeholderTextColor="#757575"
                />

                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#757575"
                />

                <Text style={styles.label}>Nova senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Crie uma senha"
                    placeholderTextColor="#757575"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />

                <Text style={styles.label}>Confirme sua senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirme a senha"
                    placeholderTextColor="#757575"
                    secureTextEntry
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />

                <Text style={styles.label}>Telefone</Text>
                <TextInput
                    style={styles.input}
                    maxLength={11}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    placeholder="Digite seu telefone"
                    placeholderTextColor="#757575"
                />

                <Text style={styles.label}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    value={endereco}
                    onChangeText={setEndereco}
                    placeholder="Digite seu endereço"
                    placeholderTextColor="#757575"
                />

                <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
                    <Text style={styles.buttonText}>Salvar Alterações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? Constants.statusBarHeight : 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ccc',
        padding: 10,
        marginBottom: 20
    },
    logo: {
        width: width * 0.2,
        height: width * 0.1,
        resizeMode: 'contain',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputs: {
        padding: 12
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    icon: {
        marginRight: 10
    }
});