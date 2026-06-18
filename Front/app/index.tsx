import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import MenuLateral from './components/menuLateral';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TelaHome() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <View style={styles.container}>
      {/* Barra do Topo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuAberto(true)}>
          <Ionicons name="menu" size={28} color="#D1DDFF" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo Central (Título e Botões) */}
      <View style={styles.conteudo}>
        <Text style={styles.title}>ESTUDA AÍ</Text>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1E3A8A' }]} 
        onPress={() => router.navigate('/materias?categoria=vestibular')}>
          <Text style={styles.textoBotao}>VESTIBULAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1E3A8A' }]} 
        onPress={() => router.navigate('/materias?categoria=enem' as any)}>
          <Text style={styles.textoBotao}>ENEM</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1E3A8A' }]} 
        onPress={() => router.navigate('/materias?categoria=concursos' as any)}>
          <Text style={styles.textoBotao}>CONCURSOS</Text>
        </TouchableOpacity>
      </View>

      {/* Barra Rodapé */}
      <View style={styles.footer} />

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
    alignItems: 'flex-end',
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontFamily: 'sans-serif',
    fontWeight: '800',
    color: '#1E3A8A',
    marginBottom: 40,
  },
  botao: {
    width: 200,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotao: {
    color: '#D1DDFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#1E3A8A',
    width: '100%',
    height: 50,
    padding: 15,
  },
});
