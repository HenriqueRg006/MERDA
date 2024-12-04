import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const validarLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Estrutura de email inválida.');
      return;
  }

    if (senha.length < 8) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    Alert.alert('Sucesso', 'Login efetuado com sucesso!', [
      {
        text: 'OK',
        onPress: () => router.push('/(tabs)/'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/logo_shopeasy.png')} style={styles.logo} />
        <Text style={styles.headerText}>Login</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Digite seu e-mail, telefone ou usuário</Text>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={validarLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link href="/screens/registro" style={styles.link}>
            Não tem uma conta? Criar conta
          </Link>
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
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
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
});
