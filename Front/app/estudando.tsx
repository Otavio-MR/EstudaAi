import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BASE_URL from '../confg';
import MenuLateral from './components/menuLateral';

// Tipo da matéria vinda do back-end
type Materia = {
  _id: string;
  nome: string;
  concluida: boolean;
};

export default function Estudando() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [materias, setMaterias] = useState<Materia[]>([]);

  // Busca as matérias da API quando a tela abre
  useEffect(() => {
    buscarMaterias();
  }, []);

  async function buscarMaterias() {
    try {
      const resposta = await fetch(`${BASE_URL}/studying`);
      const dados = await resposta.json();
      // Se não tiver matérias, a API retorna mensagem — verifica se é array
      if (Array.isArray(dados)) {
        setMaterias(dados);
      }
    } catch (error) {
      console.log('Erro ao buscar matérias:', error);
    }
  }

  // Marca matéria como concluída no back-end
  async function concluirMateria(id: string) {
    try {
      const resposta = await fetch(`${BASE_URL}/studying/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluida: true }),
      });
      const atualizada = await resposta.json();
      setMaterias(materias.map((m) => m._id === id ? atualizada : m));
    } catch (error) {
      console.log('Erro ao concluir matéria:', error);
    }
  }

  // Deleta matéria no back-end
  async function excluirMateria(id: string) {
    try {
      await fetch(`${BASE_URL}/studying/${id}`, {
        method: 'DELETE',
      });
      setMaterias(materias.filter((m) => m._id !== id));
    } catch (error) {
      console.log('Erro ao excluir matéria:', error);
    }
  }

  return (
    <View style={styles.container}>

      {/* Barra do Topo */}
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
        <Text style={styles.title}>Estudando</Text>

        {/* Se não tiver matérias, mostra mensagem */}
        {materias.length === 0 ? (
          <Text style={styles.mensagemVazia}>
            Nenhuma matéria salva ainda.{'\n'}
            Clique no 📖 dentro de uma matéria para adicionar!
          </Text>
        ) : (
          <View style={styles.grid}>
            {materias.map((materia) => (
              <View key={materia._id} style={styles.cardMateria}>
                <Text style={styles.nomeMateria}>{materia.nome.toUpperCase()}</Text>
                <View style={styles.acoes}>
                  {/* Marca como concluída */}
                  <TouchableOpacity onPress={() => concluirMateria(materia._id)}>
                    <Ionicons
                      name={materia.concluida ? 'book' : 'book-outline'}
                      size={24}
                      color='#1E3A8A'
                    />
                  </TouchableOpacity>
                  {/* Deleta a matéria */}
                  <TouchableOpacity onPress={() => excluirMateria(materia._id)}>
                    <Ionicons name="trash-outline" size={24} color="#1E3A8A" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Barra Rodapé */}
      <View style={styles.footer} />

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
    alignItems: 'center',
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
    marginBottom: 35,
  },
  mensagemVazia: {
    textAlign: 'center',
    color: '#1E3A8A',
    fontSize: 15,
    marginTop: 40,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#1E3A8A',
    width: '100%',
    height: 50,
    padding: 15,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  cardMateria: {
    width: '45%',
    minHeight: 68,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  nomeMateria: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },
  acoes: {
    alignItems: 'center',
    gap: 12,
  },
});