import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TelaPrincipal() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/logo_shopeasy.png')} style={styles.logo} />
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Pesquisar" />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Link href={"/screens/carrinho"}><Ionicons name="cart-outline" size={28} color="black" /></Link>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.ads}>
          <Text style={styles.placeholder}>Anúncios</Text>
        </View>
        <View style={styles.highlight}>
          <Text style={styles.placeholder}>Destaque</Text>
        </View>
        <View style={styles.products}>
          <View style={styles.product}>
            <Text style={styles.placeholder}>Produto</Text>
          </View>
          <View style={styles.product}>
            <Text style={styles.placeholder}>Produto</Text>
          </View>
          <View style={styles.product}>
            <Text style={styles.placeholder}>Produto</Text>
          </View>
          <View style={styles.product}>
            <Text style={styles.placeholder}>Produto</Text>
          </View>
        </View>
      </ScrollView>
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
    marginRight: 10, 
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
  ads: {
    height: width * 0.4,
    backgroundColor: '#e0e0e0',
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    height: width * 0.3,
    backgroundColor: '#d0d0d0',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  product: {
    width: width * 0.42,
    height: width * 0.42,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
});
