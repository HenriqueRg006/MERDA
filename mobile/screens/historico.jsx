import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Platform, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HistoryScreen() {
    const router = useRouter();

    const [historico, setHistorico] = useState([
        { id: '1', produto: 'Produto A', preco: 'R$50,00', data: '25/11/2024', status: 'Entregue' },
        { id: '2', produto: 'Produto B', preco: 'R$30,00', data: '20/11/2024', status: 'Em transporte' },
        { id: '3', produto: 'Produto C', preco: 'R$70,00', data: '15/11/2024', status: 'Cancelado' },
    ]);

    const visualizarDetalhes = (item) => {
        Alert.alert(
            'Detalhes da Compra',
            `Produto: ${item.produto}\nPreço: ${item.preco}\nData: ${item.data}\nStatus: ${item.status}`,
            [{ text: 'Fechar', style: 'cancel' }]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => visualizarDetalhes(item)}>
            <View style={styles.info}>
                <Text style={styles.produto}>{item.produto}</Text>
                <Text style={styles.data}>{item.data}</Text>
            </View>
            <View style={styles.detalhes}>
                <Text style={styles.preco}>{item.preco}</Text>
                <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Entregue':
                return { color: 'green' };
            case 'Em transporte':
                return { color: 'orange' };
            case 'Cancelado':
                return { color: 'red' };
            default:
                return { color: 'gray' };
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
                    <Ionicons name="arrow-back" size={24} color="black" style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Histórico de compras</Text>
            </View>

            {historico.length > 0 ? (
                <FlatList
                    data={historico}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                />
            ) : (
                <Text style={styles.mensagemVazia}>Você ainda não realizou nenhuma compra.</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
    },
    info: {
        flex: 1,
    },
    produto: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    data: {
        fontSize: 14,
        color: '#808080',
    },
    detalhes: {
        alignItems: 'flex-end',
    },
    preco: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        marginTop: 5,
    },
    mensagemVazia: {
        textAlign: 'center',
        fontSize: 16,
        color: '#808080',
    },
    icon:{
        marginRight: 10
      }
});
