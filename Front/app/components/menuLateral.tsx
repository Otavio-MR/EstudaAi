import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type MenuLateralProps = {
    fecharMenu: () => void;
};

export default function MenuLateral({ fecharMenu }: MenuLateralProps) {
    function navegarPara(rota: string) {
        fecharMenu();
        router.push(rota as any);
    }

    return (
        <View style= {styles.menuLateral}>
            <TouchableOpacity onPress={fecharMenu} style={styles.botaoFechar}>
                <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

             <TouchableOpacity onPress={() => navegarPara('/')}>
                <Text style={styles.textoMenu}>Menu Inicial</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navegarPara('/materias?categoria=vestibular')}>
                <Text style={styles.textoMenu}>Vestibular</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navegarPara('/materias?categoria=enem')}>
                <Text style={styles.textoMenu}>ENEM</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navegarPara('/materias?categoria=concursos')}>
                <Text style={styles.textoMenu}>Concursos</Text>
            </TouchableOpacity>            

            <TouchableOpacity onPress={() => navegarPara('/estudando')}>
                <Text style={styles.textoMenu}>Estudando</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navegarPara('/anotacoes')}>
                <Text style={styles.textoMenu}>Anotações</Text>
            </TouchableOpacity>

            </View>
    );
}

const styles = StyleSheet.create({
    menuLateral: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 150,
        backgroundColor: '#1E3A8A',
        paddingTop: 20,
        paddingHorizontal: 16,
        zIndex: 10,
    },
    botaoFechar: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    textoMenu: {
        color: '#D1DDFF',
        fontWeight: 'bold',
        fontSize: 13,
        marginBottom: 24,
    },
});