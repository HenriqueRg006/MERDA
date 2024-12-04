import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

export default function Favoritos() {
    const [favoritos, setFavoritos] = useState([
        { id: '1', nome: 'Produto A', preco: 'R$50,00', imagem: 'https://via.placeholder.com/100' },
        { id: '2', nome: 'Produto B', preco: 'R$30,00', imagem: 'https://via.placeholder.com/100' },
        { id: '3', nome: 'Produto C', preco: 'R$70,00', imagem: 'https://via.placeholder.com/100' },
    ]);

    const removerFavorito = (id) => {
        Alert.alert(
            'Remover favorito',
            'Deseja realmente remover este item dos favoritos?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Remover', onPress: () => setFavoritos(favoritos.filter(item => item.id !== id)) },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.detalhes}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.preco}>{item.preco}</Text>
            </View>
            <TouchableOpacity style={styles.botaoRemover} onPress={() => removerFavorito(item.id)}>
                <Text style={styles.textoBotaoRemover}>Remover</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
                    <Image source={require('../../../assets/images/logo_shopeasy.png')} style={styles.logo} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Favoritos</Text>
            </View>

            {favoritos.length > 0 ? (
                <FlatList
                    data={favoritos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                />
            ) : (
                <Text style={styles.mensagemVazia}>Sua lista de favoritos está vazia.</Text>
            )}
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
        marginLeft: 5,
    },
    flatListContent: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    imagem: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 15,
    },
    detalhes: {
        flex: 1,
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    preco: {
        fontSize: 14,
        color: '#808080',
    },
    botaoRemover: {
        backgroundColor: '#FF0000',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textoBotaoRemover: {
        color: '#fff',
        fontSize: 14,
    },
    mensagemVazia: {
        textAlign: 'center',
        fontSize: 16,
        color: '#808080',
    },
});
