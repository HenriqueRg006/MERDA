import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, ScrollView, Dimensions, Alert, Platform, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ProductScreen() {
    const router = useRouter();
    const [quantity, setQuantity] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [sold, setSold] = useState(0);
    const stock = 10;
    const otherProducts = Array(4).fill({ name: 'Produto', image: null });

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 999) + 1;
    };

    useEffect(() => {
        setSold(getRandomNumber());
    }, []);

    const handleQuantityChange = (text) => {
        const parsedQuantity = parseInt(text) || 0; 

        if (parsedQuantity <= stock) {
            setQuantity(parsedQuantity);
        } else {
            Alert.alert('Estoque insuficiente', `A quantidade máxima disponível é ${stock}.`);
        }
    };

    const incrementQuantity = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        } else {
            Alert.alert('Estoque insuficiente', `A quantidade máxima disponível é ${stock}.`);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        console.log('Produto adicionado ao carrinho!');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>

                <View style={styles.productDetails}>
                    <Text style={styles.title}>NomeProduto</Text>
                    <Text style={styles.seller}>Vendido por <Text style={styles.sellerName}>ShopEasy</Text></Text>
                    <Image style={styles.productImage} source={{ uri: 'https://via.placeholder.com/150' }} />
                    <Text style={styles.price}>R$00,00</Text>
                    <Text style={styles.paymentInfo}>Em até 12x de R$00,00</Text>

                    <TouchableOpacity onPress={() => setShowPaymentModal(true)}>
                        <Text style={styles.paymentLink}>Ver formas de pagamento</Text>
                    </TouchableOpacity>

                    <Text style={styles.stock}>Estoque: {stock}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.quantityInput}
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={handleQuantityChange}
                        />
                        <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.buyNowButton}>
                        <Text style={styles.buyNowText}>Comprar agora</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                        <Text style={styles.addToCartText}>Adicionar ao carrinho</Text>
                    </TouchableOpacity>
                    <Text style={styles.seller}>Vendido por ShopEasy</Text>
                    <Text style={styles.salesInfo}>+{sold} Vendidos</Text>

                    <Text style={styles.otherProductsTitle}>Outros produtos</Text>
                    <FlatList
                        data={otherProducts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.otherProduct}>
                                <Image style={styles.otherProductImage} source={{ uri: 'https://via.placeholder.com/100' }} />
                                <Text style={styles.otherProductName}>{item.name}</Text>
                            </View>
                        )}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        scrollEnabled={false}
                    />
                </View>
            </View>


            <Modal
                visible={showPaymentModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowPaymentModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.paymentModal}>
                        <Text style={styles.paymentTitle}>Formas de Pagamento</Text>
                        <TouchableOpacity onPress={() => console.log('Pagamento via Pix')}>
                            <Text style={styles.paymentOption}>Pix</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('Pagamento via Cartão de Débito/Crédito')}>
                            <Text style={styles.paymentOption}>Cartão de Débito ou Crédito</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                            <Text style={styles.closeModal}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    content:{
        padding: 15
    },
    header: {
        paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? Constants.statusBarHeight : 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    productDetails: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    seller: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    sellerName: {
        color: '#000',
        fontWeight: 'bold',
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    paymentInfo: {
        fontSize: 14,
        color: '#777',
    },
    paymentLink: {
        fontSize: 14,
        color: '#0066cc',
        textDecorationLine: 'underline',
    },
    stock: {
        fontSize: 14,
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    quantityButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        width: 60,
        height: 40,
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 10,
    },
    buyNowButton: {
        backgroundColor: '#0066cc',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    buyNowText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    addToCartButton: {
        backgroundColor: '#ddd',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    addToCartText: {
        color: '#333',
        fontSize: 16,
        textAlign: 'center',
    },
    salesInfo: {
        fontSize: 14,
        marginBottom: 15,
    },
    otherProductsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    otherProduct: {
        width: (width / 2) - 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    otherProductImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
        borderRadius: 5,
    },
    otherProductName: {
        fontSize: 14,
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    paymentModal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
        alignItems: 'center',
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    paymentOption: {
        fontSize: 16,
        color: '#0066cc',
        marginBottom: 10,
    },
    closeModal: {
        fontSize: 16,
        color: '#ff0000',
        marginTop: 15,
    },
    icon: {
        marginRight: 10
    }
});
