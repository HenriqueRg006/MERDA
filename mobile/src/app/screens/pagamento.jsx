import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, Alert, Image } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Pagamento() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSelectPaymentMethod = (method) => {
        setPaymentMethod(method);
    };

    const handleFinishPayment = () => {
        Alert.alert(
            "Compra efetuada com sucesso",
            "Obrigado por usar nosso serviço!",
            [
                {
                    text: "OK",
                    onPress: () => router.push('/(tabs)/'),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/screens/carrinho')}>
                    <Ionicons name="arrow-back" size={24} color="black" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Pagamento</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.titulo}>Escolha a forma de pagamento:</Text>

                <TouchableOpacity
                    style={[styles.paymentOption, paymentMethod === 'creditCard' && styles.selected]}
                    onPress={() => handleSelectPaymentMethod('creditCard')}>
                    <Ionicons name="card-outline" size={25} />
                    <Text style={[styles.paymentText, { marginLeft: 10 }]}>Cartão de crédito ou débito</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.paymentOption, paymentMethod === 'pix' && styles.selected]}
                    onPress={() => handleSelectPaymentMethod('pix')}>
                    <FontAwesome6 name="pix" size={22} color="black" />
                    <Text style={[styles.paymentText, { marginLeft: 10 }]}>Pix</Text>
                </TouchableOpacity>
            </View>



            <View style={styles.footer}>
                <Text style={styles.total}>Valor a ser pago: R$00,00</Text>
                <TouchableOpacity style={styles.button} onPress={handleFinishPayment}>
                    <Text style={styles.buttonText}>Finalizar pagamento</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
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
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    content: {
        padding: 10
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selected: {
        backgroundColor: '#e0e0e0',
        borderColor: '#000',
    },
    paymentText: {
        fontSize: 16,
        color: '#333',
    },
    footer: {
        marginTop: 400,
        alignItems: 'center',
    },
    total: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#3b5998',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    icon:{
        marginRight: 10
      }
});