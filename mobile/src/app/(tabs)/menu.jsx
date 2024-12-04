import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Platform, Alert, Modal } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Animated } from 'react-native';

export default function MenuScreen() {
    const router = useRouter();
    const [darkMode, setDarkMode] = React.useState(false);
    const [backgroundColor] = React.useState(new Animated.Value(0));
    const [isModalVisible, setModalVisible] = React.useState(false);

    const dynamicStyles = styles(darkMode);

    React.useEffect(() => {
        Animated.timing(backgroundColor, {
            toValue: darkMode ? 1 : 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [darkMode]);

    const backgroundColorInterpolate = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#fff', '#000'],
    });

    const handleDeleteAccount = () => {
        setModalVisible(true);
    };

    const confirmDeleteAccount = () => {
        setModalVisible(false);
        Alert.alert("Conta excluída com sucesso");
    };

    const cancelDeleteAccount = () => {
        setModalVisible(false);
    };


    const handleLogout = () => {
        Alert.alert('Sair', 'Deseja realmente sair?', [
            {
                text: 'Sim',
                onPress: () => {
                    router.push('/');
                },
            },
            {
                text: 'Não',
                style: 'cancel',
            },
        ]);
    };

    return (
        <Animated.View style={[dynamicStyles.container, { backgroundColor: backgroundColorInterpolate }]}>
            <View style={dynamicStyles.userContainer}>
                <Ionicons name="person-circle-outline" size={50} color={darkMode ? "#fff" : "#000"} />
                <Text style={dynamicStyles.userName}>Nome do usuário</Text>
                <Link href='/screens/perfil'><Text style={dynamicStyles.link}>Meu perfil</Text></Link>
                
            </View>
            <View style={dynamicStyles.options}>
                <View style={dynamicStyles.option}>
                    <Ionicons name="moon" size={25} color={darkMode ? "#fff" : "#000"} />
                    <Text style={dynamicStyles.optionText}>Modo escuro</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={() => setDarkMode(!darkMode)}
                        trackColor={{ false: "#ccc", true: "#555" }}
                        thumbColor={darkMode ? "#fff" : "#000"}
                    />
                </View>

                <TouchableOpacity style={dynamicStyles.option} onPress={() => router.push('/(tabs)/')}>
                    <Ionicons name="home" size={25} color={darkMode ? "#fff" : "#000"} />
                    <Text style={dynamicStyles.optionText}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.option}>
                    <Ionicons name="search" size={25} color={darkMode ? "#fff" : "#000"} />
                    <Text style={dynamicStyles.optionText}>Busca</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.option} onPress={() => router.push('/(tabs)/favoritos')}>
                    <Ionicons name="heart" size={25} color={"red"} />
                    <Text style={dynamicStyles.optionText}>Favoritos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.option} onPress={() => router.push('/screens/perfil')}>
                    <Ionicons name="person" size={25} color={darkMode ? "#fff" : "#000"} />
                    <Text style={dynamicStyles.optionText}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.option}>
                    <Ionicons name="ticket" size={25} color={darkMode ? "#fff" : "#000"} />
                    <Text style={dynamicStyles.optionText}>Ofertas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.option} onPress={() => router.push('/screens/historico')}>
                    <Ionicons name="time" size={25} color={darkMode ? "#fff" : "#000"}/>
                    <Text style={dynamicStyles.optionText}>Histórico</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.option} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={25} color={darkMode ? "#fff" : "#000"} />
                    <Text style={dynamicStyles.optionText}>Sair</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dynamicStyles.option} onPress={handleDeleteAccount}>
                    <Ionicons name="trash" size={25} color={"red"} />
                    <Text style={{ fontSize: 16, flex: 1, marginLeft: 10, color: 'red' }}>Excluir conta</Text>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={isModalVisible}
                    animationType="fade"
                    onRequestClose={cancelDeleteAccount}
                >
                    <View style={dynamicStyles.modalOverlay}>
                        <View style={dynamicStyles.modalContainer}>
                            <Text style={dynamicStyles.modalTitle}>Deseja realmente excluir sua conta?</Text>
                            <View style={dynamicStyles.modalButtons}>
                                <TouchableOpacity
                                    style={[dynamicStyles.modalButton, { backgroundColor: 'red' }]}
                                    onPress={confirmDeleteAccount}
                                >
                                    <Text style={dynamicStyles.modalButtonText}>Sim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[dynamicStyles.modalButton, { backgroundColor: 'gray' }]}
                                    onPress={cancelDeleteAccount}
                                >
                                    <Text style={dynamicStyles.modalButtonText}>Não</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </Animated.View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
    },
    userContainer: {
        alignItems: 'center',
        marginVertical: 20,
        paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? Constants.statusBarHeight : 20
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#000',
    },
    link: {
        color: darkMode ? '#1E90FF' : '#007BFF',
    },
    options: {
        paddingHorizontal: 20,
        flex: 1,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        minHeight: 35,
        justifyContent: 'space-between',
    },
    optionText: {
        fontSize: 16,
        flex: 1,
        marginLeft: 10,
        color: darkMode ? '#fff' : '#000',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: darkMode ? '#333' : '#e0e0e0',
        backgroundColor: darkMode ? '#121212' : '#f8f8f8',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
