import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BASE_URL from '../confg';
import MenuLateral from './components/menuLateral';

// Tipo da anotação vinda do back-end
type Anotacao = {
    _id: string;
    titulo: string;
    data: string;
    conteudo: string;
};

export default function Anotacoes() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [novoTitulo, setNovoTitulo] = useState('');
    const [novaData, setNovaData] = useState('');
    const [novoConteudo, setNovoConteudo] = useState('');
    const [anotacaoEditando, setAnotacaoEditando] = useState<string | null>(null);
    const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);

    // Busca as anotações da API quando a tela abre
    useEffect(() => {
        buscarAnotacoes();
    }, []);

    async function buscarAnotacoes() {
        try {
            const resposta = await fetch(`${BASE_URL}/notes`);
            const dados = await resposta.json();
            setAnotacoes(dados);
        } catch (error) {
            console.log('Erro ao buscar anotações:', error);
        }
    }

    // Deleta anotação pelo id no back-end
    async function deletarAnotacao(id: string) {
        try {
            await fetch(`${BASE_URL}/notes/${id}`, {
                method: 'DELETE',
            });
            // Remove da tela após deletar
            setAnotacoes(anotacoes.filter((a) => a._id !== id));
        } catch (error) {
            console.log('Erro ao deletar anotação:', error);
        }
    }

    // Abre o modal já preenchido para editar
    function abrirEdicao(anotacao: Anotacao) {
        setNovoTitulo(anotacao.titulo);
        setNovaData(anotacao.data);
        setNovoConteudo(anotacao.conteudo);
        setAnotacaoEditando(anotacao._id);
        setModalAberto(true);
    }

    // Salva — edita se tiver id, cria nova se não tiver
    async function salvarAnotacao() {
        if (novoTitulo.trim() === '') return;

        try {
            if (anotacaoEditando !== null) {
                // Edita a anotação existente no back-end
                const resposta = await fetch(`${BASE_URL}/notes/${anotacaoEditando}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        titulo: novoTitulo,
                        data: novaData,
                        conteudo: novoConteudo,
                    }),
                });
                const atualizada = await resposta.json();
                setAnotacoes(anotacoes.map((a) =>
                    a._id === anotacaoEditando ? atualizada : a
                ));
                setAnotacaoEditando(null);
            } else {
                // Cria nova anotação no back-end
                const resposta = await fetch(`${BASE_URL}/notes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        titulo: novoTitulo,
                        data: novaData,
                        conteudo: novoConteudo,
                    }),
                });
                const nova = await resposta.json();
                setAnotacoes([...anotacoes, nova]);
            }
        } catch (error) {
            console.log('Erro ao salvar anotação:', error);
        }

        // Limpa os campos e fecha o modal
        setNovoTitulo('');
        setNovaData('');
        setNovoConteudo('');
        setModalAberto(false);
    }

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle-outline" size={28} color="#D1DDFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMenuAberto(true)}>
                    <Ionicons name="menu" size={28} color="#D1DDFF" />
                </TouchableOpacity>
            </View>

            {/* Conteúdo */}
            <View style={styles.conteudo}>
                <Text style={styles.title}>Anotações</Text>

                {/* Botão adicionar */}
                <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalAberto(true)}>
                    <Ionicons name="add" size={26} color="#1E3A8A" />
                </TouchableOpacity>

                {/* Grid de anotações */}
                <View style={styles.grid}>
                    {anotacoes.map((anotacao) => (
                        <View key={anotacao._id} style={styles.cardAnotacao}>
                            <Text style={styles.textoCard}>
                                {anotacao.titulo}{'\n'}{anotacao.data}
                            </Text>
                            <View style={styles.acoes}>
                                <TouchableOpacity onPress={() => abrirEdicao(anotacao)}>
                                    <Ionicons name="create-outline" size={22} color="#1E3A8A" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deletarAnotacao(anotacao._id)}>
                                    <Ionicons name="trash-outline" size={22} color="#1E3A8A" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer} />

            {/* Modal para adicionar/editar anotação */}
            <Modal visible={modalAberto} transparent animationType="slide">
                <View style={styles.modalFundo}>
                    <View style={styles.modalCaixa}>
                        <Text style={styles.modalTitulo}>
                            {anotacaoEditando !== null ? 'Editar Anotação' : 'Nova Anotação'}
                        </Text>

                        {/* Campo título */}
                        <TextInput
                            style={styles.input}
                            placeholder="Título"
                            value={novoTitulo}
                            onChangeText={setNovoTitulo}
                        />

                        {/* Campo data */}
                        <TextInput
                            style={styles.input}
                            placeholder="Data (ex: 24/04)"
                            value={novaData}
                            onChangeText={setNovaData}
                        />

                        {/* Campo conteúdo - texto livre */}
                        <TextInput
                            style={[styles.input, styles.inputConteudo]}
                            placeholder="Escreva sua anotação aqui..."
                            value={novoConteudo}
                            onChangeText={setNovoConteudo}
                            multiline={true}
                        />

                        {/* Botões do modal */}
                        <View style={styles.modalBotoes}>
                            <TouchableOpacity onPress={() => {
                                setModalAberto(false);
                                setAnotacaoEditando(null);
                                setNovoTitulo('');
                                setNovaData('');
                                setNovoConteudo('');
                            }}>
                                <Text style={styles.botaoCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={salvarAnotacao}>
                                <Text style={styles.botaoSalvar}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Menu lateral */}
            {menuAberto && (
                <MenuLateral fecharMenu={() => setMenuAberto(false)} />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D1DDFF',
    },
    header: {
        backgroundColor: '#1E3A8A',
        width: '100%',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    conteudo: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: 45,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1E3A8A',
        marginBottom: 10,
    },
    botaoAdicionar: {
        marginBottom: 28,
        borderWidth: 2,
        borderColor: '#1E3A8A',
        borderRadius: 4,
    },
    grid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 14,
        paddingHorizontal: 16,
    },
    cardAnotacao: {
        width: '42%',
        minHeight: 72,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#1E3A8A',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textoCard: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
    },
    acoes: {
        alignItems: 'center',
        gap: 4,
    },
    footer: {
        backgroundColor: '#1E3A8A',
        width: '100%',
        height: 50,
        padding: 15,
    },
    modalFundo: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCaixa: {
        backgroundColor: '#D1DDFF',
        width: '80%',
        borderRadius: 8,
        padding: 20,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E3A8A',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#1E3A8A',
        borderRadius: 6,
        padding: 10,
        marginBottom: 12,
    },
    inputConteudo: {
        height: 100,
        textAlignVertical: 'top',
    },
    modalBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    botaoCancelar: {
        color: '#1E3A8A',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botaoSalvar: {
        color: '#1E3A8A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});