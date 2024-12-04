import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Platform, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Link, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Carrinho() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Produto Exemplo',
      price: 50.0,
      quantity: 1,
      image: require('../../../assets/images/logomc.png'),
    },
  ]);

  const updateQuantity = (id, operation) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: operation === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
          }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrease')}>
            <Ionicons name="remove-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'increase')}>
            <Ionicons name="add-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/')}>
          <Ionicons name="arrow-back" size={24} color="black" style={styles.icon}/>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Pesquisar" />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Text style={styles.subtotalText}>Subtotal: R$ {calculateSubtotal()}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.continueButton}>
                <Link href={"/(tabs)/"}><Text style={styles.buttonText}>Continuar comprando</Text></Link>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkoutButton}>
                <Link href={"/screens/pagamento"}><Text style={styles.buttonText}>Finalizar compra</Text></Link>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#808080',
  },
  logo: {
    width: width * 0.2,
    height: width * 0.1,
    resizeMode: 'contain',
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  productImage: {
    width: width * 0.2,
    height: width * 0.15,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    marginTop: 10
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#888',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    padding: 10
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continueButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  icon:{
    marginRight: 10
  }
});
