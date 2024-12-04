import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Importando o ícone da seta

export default function Termos() {
    const [aceito, setAceito] = useState(false);
    const [showCheckbox, setShowCheckbox] = useState(false); // Controle de visibilidade do checkbox
    const [showFloatingButton, setShowFloatingButton] = useState(true); // Controle de visibilidade do botão flutuante
    const router = useRouter();
    const scrollViewRef = useRef(null); // Referência para o ScrollView

    const aceitarTermos = () => {
        if (!aceito) {
            Alert.alert('Erro', 'Você precisa aceitar os termos e condições para continuar.');
            return;
        }
        router.push('/screens/registro');
    };

    const rolarParaFinal = () => {
        scrollViewRef.current.scrollToEnd({ animated: true }); // Rola até o final
    };

    const onScroll = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;
        const offsetY = event.nativeEvent.contentOffset.y;

        if (contentHeight - layoutHeight <= offsetY) {
            setShowCheckbox(true); // Exibe o checkbox quando chega ao final
        }
    };

    const hideFloatingButton = () => {
        setShowFloatingButton(false); // Esconde o botão flutuante quando pressionado
    };

    return (
        <View style={styles.container}>

            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                onScroll={onScroll} // Verifica se chegou ao final
                scrollEventThrottle={16} // Configura para escutar os eventos de scroll com mais frequência
            >
                <Text style={styles.titulo}>Termos e Condições</Text>

                <Text style={styles.texto}>
                    <Text style={styles.bold}>Última atualização: 04/12/2024</Text>
                    {'\n\n'}
                    <Text style={styles.bold}>1. Aceitação dos Termos</Text>{'\n'}
                    Ao usar o aplicativo ShopEasy, você concorda com os termos e condições aqui descritos. Caso não concorde com algum dos termos, não utilize o aplicativo.
                    {'\n\n'}
                    <Text style={styles.bold}>2. Objetivo do Aplicativo</Text>{'\n'}
                    O ShopEasy é uma plataforma de e-commerce que conecta vendedores e compradores, permitindo a comercialização de produtos e serviços. Não nos responsabilizamos pela qualidade, segurança ou legalidade dos itens anunciados, uma vez que a responsabilidade é exclusiva dos vendedores.
                    {'\n\n'}
                    <Text style={styles.bold}>3. Cadastro de Usuários</Text>{'\n'}
                    3.1. Para utilizar os serviços do ShopEasy, é necessário criar uma conta informando dados verdadeiros e atualizados. {'\n'}
                    3.2. O usuário é responsável pela segurança das credenciais de acesso. O compartilhamento de senhas é proibido. {'\n'}
                    3.3. Usuários menores de 18 anos só poderão utilizar o aplicativo com supervisão de um responsável legal.
                    {'\n\n'}
                    <Text style={styles.bold}>4. Uso do Aplicativo</Text>{'\n'}
                    4.1. É proibido utilizar o ShopEasy para:{'\n'}
                    - Práticas ilegais ou fraudulentas.{'\n'}
                    - Distribuição de conteúdo ofensivo, difamatório ou prejudicial.{'\n'}
                    - Violar direitos de terceiros, incluindo direitos autorais e propriedade intelectual.
                    {'\n\n'}
                    <Text style={styles.bold}>5. Compras e Pagamentos</Text>{'\n'}
                    5.1. Todas as transações realizadas no ShopEasy são de responsabilidade dos vendedores e compradores.{'\n'}
                    5.2. O ShopEasy pode disponibilizar sistemas de pagamento integrados para maior conveniência. No entanto, não garantimos o sucesso das transações ou a devolução de valores.{'\n'}
                    5.3. É dever do usuário verificar as descrições dos produtos e condições de compra antes de finalizar qualquer pedido.
                    {'\n\n'}
                    <Text style={styles.bold}>6. Política de Cancelamento e Reembolso</Text>{'\n'}
                    6.1. O usuário tem o direito de solicitar cancelamento ou reembolso, respeitando as políticas definidas pelos vendedores e as normas aplicáveis (como o direito de arrependimento em até 7 dias para compras realizadas fora do estabelecimento comercial).
                    {'\n\n'}
                    <Text style={styles.bold}>7. Privacidade e Dados Pessoais</Text>{'\n'}
                    7.1. O ShopEasy coleta e utiliza dados pessoais conforme descrito na nossa Política de Privacidade.{'\n'}
                    7.2. Os dados fornecidos pelos usuários são armazenados com segurança e utilizados apenas para fins operacionais e legais.
                    {'\n\n'}
                    <Text style={styles.bold}>8. Modificações nos Termos</Text>{'\n'}
                    O ShopEasy reserva-se o direito de modificar os Termos e Condições a qualquer momento. Avisos sobre alterações substanciais serão fornecidos antes de sua implementação. O uso contínuo do aplicativo após as alterações implica na aceitação dos novos termos.
                    {'\n\n'}
                    <Text style={styles.bold}>9. Responsabilidades</Text>{'\n'}
                    9.1. O ShopEasy não é responsável por:{'\n'}
                    - Erros ou interrupções no funcionamento do aplicativo.{'\n'}
                    - Danos causados por terceiros durante o uso da plataforma.{'\n'}
                    - A entrega, qualidade ou conformidade dos produtos adquiridos no aplicativo.
                    {'\n\n'}
                    <Text style={styles.bold}>10. Encerramento de Conta</Text>{'\n'}
                    O ShopEasy pode encerrar ou suspender contas de usuários que violem estes Termos e Condições, sem aviso prévio.
                    {'\n\n'}
                    <Text style={styles.bold}>11. Contato</Text>{'\n'}
                    Para dúvidas, reclamações ou suporte, entre em contato pelo e-mail: suporte@shopeasy.com.br
                    {'\n\n'}
                    <Text style={styles.bold}>12. Legislação Aplicável</Text>{'\n'}
                    Este contrato é regido pelas leis do Brasil. Em caso de disputas, elegemos o foro de Trindade como competente, salvo disposição legal em contrário.
                </Text>

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={[styles.checkbox, aceito && styles.checkboxAtivo]}
                        onPress={() => setAceito(!aceito)}
                    >
                        {aceito && <Text style={styles.checkboxMarca}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={styles.checkboxTexto}>Eu li e aceito os Termos e Condições</Text>
                </View>

                <TouchableOpacity style={styles.botao} onPress={aceitarTermos}>
                    <Text style={styles.botaoTexto}>Continuar</Text>
                </TouchableOpacity>
            </ScrollView>

            {showFloatingButton && (
                <TouchableOpacity style={styles.floatingButton} onPress={() => { rolarParaFinal(); hideFloatingButton(); }}>
                    <MaterialIcons name="keyboard-arrow-down" size={30} color="white" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' || Platform.OS === 'android' ? Constants.statusBarHeight : 30,
    },
    scrollView: {
        flex: 1,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    texto: {
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxAtivo: {
        backgroundColor: '#007BFF',
    },
    checkboxMarca: {
        color: '#fff',
        fontWeight: 'bold',
    },
    checkboxTexto: {
        fontSize: 16,
        color: '#007BFF',
    },
    botao: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 123, 255, 0.7)',
        borderRadius: 50,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
