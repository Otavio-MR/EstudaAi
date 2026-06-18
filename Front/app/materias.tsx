import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MenuLateral from './components/menuLateral';

// Matérias de cada categoria
const materiasPorCategoria = {
  vestibular: [
    { nome: 'MATEMÁTICA', rota: 'matematica' },
    { nome: 'BIOLOGIA', rota: 'biologia' },
    { nome: 'FÍSICA', rota: 'fisica' },
    { nome: 'QUÍMICA', rota: 'quimica' },
    { nome: 'HISTÓRIA', rota: 'historia' },
    { nome: 'GEOGRAFIA', rota: 'geografia' },
    { nome: 'FILOSOFIA', rota: 'filosofia' },
    { nome: 'SOCIOLOGIA', rota: 'sociologia' },
    { nome: 'PORTUGUÊS', rota: 'portugues' },
    { nome: 'LÍNGUAS', rota: 'linguas' },
    { nome: 'REDAÇÃO', rota: 'redacao' },
  ],
  enem: [
    { nome: 'MATEMÁTICA', rota: 'matematica' },
    { nome: 'PORTUGUÊS', rota: 'portugues' },
    { nome: 'REDAÇÃO', rota: 'redacao' },
    { nome: 'CIÊNCIAS DA NATUREZA', rota: 'ciencias' },
    { nome: 'CIÊNCIAS HUMANAS', rota: 'humanas' },
    { nome: 'LÍNGUAS', rota: 'linguas' },
  ],
  concursos: [
    { nome: 'PORTUGUÊS', rota: 'portugues' },
    { nome: 'MATEMÁTICA', rota: 'matematica' },
    { nome: 'DIREITO', rota: 'direito' },
    { nome: 'INFORMÁTICA', rota: 'informatica' },
    { nome: 'RACIOCÍNIO LÓGICO', rota: 'raciocinio' },
    { nome: 'ATUALIDADES', rota: 'atualidades' },
  ],
};

// Títulos bonitos para cada categoria
const titulosPorCategoria: Record<string, string> = {
  vestibular: 'Vestibular',
  enem: 'ENEM',
  concursos: 'Concursos',
};

export default function Materias() {
  const [menuAberto, setMenuAberto] = useState(false);

  // Lê a categoria passada pela URL
  const { categoria } = useLocalSearchParams();
  const categoriaAtual = String(categoria ?? 'vestibular');

  // Pega as matérias da categoria atual
  const materias = materiasPorCategoria[categoriaAtual as keyof typeof materiasPorCategoria] ?? materiasPorCategoria.vestibular;

  return (
    <View style={styles.container}>
      {/* Barra do Topo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={28} color="#D1DDFF" />
        </TouchableOpacity>

        {/* Botão que abre o menu lateral */}
        <TouchableOpacity onPress={() => setMenuAberto(true)}>
          <Ionicons name="menu" size={28} color="#D1DDFF" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo com scroll para caber todas as matérias */}
      <ScrollView contentContainerStyle={styles.conteudo}>

        {/* Título muda conforme a categoria */}
        <Text style={styles.title}>{titulosPorCategoria[categoriaAtual]}</Text>

        {/* Grid de matérias da categoria atual */}
        <View style={styles.grid}>
          {materias.map((materia) => (
            <TouchableOpacity
              key={materia.rota}
              style={styles.botao}
              onPress={() => router.navigate(`/materia/${materia.rota}?categoria=${categoriaAtual}` as any)}
            >
              <Text style={styles.textoBotao}>{materia.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

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
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  botao: {
    width: '45%',
    minHeight: 60,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#1E3A8A',
    width: '100%',
    height: 50,
    padding: 15,
  },
});