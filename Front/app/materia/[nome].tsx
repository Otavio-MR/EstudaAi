import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BASE_URL from '../../confg';
import MenuLateral from '../components/menuLateral';

export default function DetalheMateria() {
  const params = useLocalSearchParams();
  const [menuAberto, setMenuAberto] = useState(false);
  
  const nomeMateria = String(params.nome);
  const categoriaAtual = String(params.categoria ?? 'vestibular');

  const categoriaData = dados[categoriaAtual as keyof typeof dados];
  const materia = categoriaData?.[nomeMateria as keyof typeof categoriaData];

  // Salva a matéria no back-end ao clicar no livro
  async function salvarEstudando() {
    try {
      const resposta = await fetch(`${BASE_URL}/studying`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeMateria,
          concluida: false,
        }),
      });

      if (resposta.status === 201) {
        Alert.alert('✅ Salvo!', `${titulosCorretos[nomeMateria]} adicionada em Estudando!`);
        router.push('/estudando');
      } else if (resposta.status === 400) {
        Alert.alert('Atenção', 'Essa matéria já está na sua lista de Estudando!');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
      }
    } catch (error) {
      console.log('Erro ao salvar matéria:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={28} color="#D1DDFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMenuAberto(true)}>
          <Ionicons name="menu" size={28} color="#D1DDFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.title}>{titulosCorretos[nomeMateria] ?? nomeMateria.toUpperCase()}</Text>

        {/* Botão livro - salva no back-end */}
        <TouchableOpacity style={styles.iconeLivro} onPress={salvarEstudando}>
          <Ionicons name='book-outline' size={36} color='#1E3A8A' />
        </TouchableOpacity>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Resumo</Text>
          <Text>{materia?.resumo}</Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Tópicos Importantes</Text>
          {materia?.topicos.map((topico, index) => (
            <Text key={index}>• {topico}</Text>
          ))}
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Links de Estudo</Text>
          {materia?.links.map((link, index) => (
            <TouchableOpacity key={index} onPress={() => Linking.openURL(link.url)}>
              <Text style={styles.linkTexto}>• {link.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer} />

      {menuAberto && (
        <MenuLateral fecharMenu={() => setMenuAberto(false)} />
      )}
    </View>
  );
}

const dados = {
  vestibular: {
    matematica: {
      resumo: 'Nos vestibulares, a Matemática deixou de ser uma matéria puramente decorativa de fórmulas para se tornar uma ferramenta de interpretação da realidade e resolução de problemas práticos.',
      topicos: ['Funções', 'Probabilidade', 'Trigonometria', 'Estatística e Gráficos', 'Geometria'],
      links: [
        { nome: 'Matemática Rio (Youtube)', url: 'https://www.youtube.com/@matematicario' },
        { nome: 'Khan Academy', url: 'https://pt.khanacademy.org/math' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/matematica' },
      ],
    },
    biologia: {
      resumo: 'Nos vestibulares, a Biologia deixou de ser uma matéria de pura memorização. As bancas avaliam a capacidade do candidato de conectar a ciência com o cotidiano e com os problemas globais.',
      topicos: ['Ecologia', 'Citologia', 'Fisiologia Humana', 'Genética e Evolução', 'Botânica'],
      links: [
        { nome: 'Biologia Total (Youtube)', url: 'https://www.youtube.com/@biologiatotal' },
        { nome: 'Khan Academy Biologia', url: 'https://pt.khanacademy.org/science/biology' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/biologia' },
      ],
    },
    fisica: {
      resumo: 'Nos vestibulares, a Física foca na interpretação de fenômenos naturais e tecnológicos do cotidiano, indo além da simples aplicação mecânica de fórmulas.',
      topicos: ['Mecânica', 'Eletricidade e Magnetismo', 'Termologia', 'Ondulatória e Óptica', 'Física Moderna'],
      links: [
        { nome: 'Física e Vídeo (Youtube)', url: 'https://www.youtube.com/@fisicaevideo' },
        { nome: 'Khan Academy Física', url: 'https://pt.khanacademy.org/science/physics' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/fisica' },
      ],
    },
    quimica: {
      resumo: 'Nos vestibulares, a Química foca na química do cotidiano, cobrando análise de processos industriais, impactos ambientais e aplicação da estequiometria em situações reais.',
      topicos: ['Físico-Química', 'Química Geral e Inorgânica', 'Química Orgânica', 'Meio Ambiente e Poluição', 'Atomística e Tabela Periódica'],
      links: [
        { nome: 'Química com o Prof. Dudan (Youtube)', url: 'https://www.youtube.com/@professordudan' },
        { nome: 'Khan Academy Química', url: 'https://pt.khanacademy.org/science/chemistry' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/quimica' },
      ],
    },
    historia: {
      resumo: 'A cobrança de datas exatas perdeu espaço. As bancas avaliam a compreensão de processos históricos e a conexão crítica entre o passado e o presente.',
      topicos: ['História do Brasil (Império e República)', 'Idade Contemporânea e Guerras Mundiais', 'Idade Moderna e Colonização', 'Antiguidade Clássica', 'Movimentos Sociais e Cidadania'],
      links: [
        { nome: 'Xadrez Verbal (Youtube)', url: 'https://www.youtube.com/@xadrezverbal' },
        { nome: 'Brasil Escola - História', url: 'https://brasilescola.uol.com.br/historiab' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/historiadobrasil' },
      ],
    },
    geografia: {
      resumo: 'A prova exige a leitura analítica do espaço geográfico. O candidato precisa interpretar mapas e gráficos e compreender a interação entre ação humana, meio ambiente e geopolítica.',
      topicos: ['Geografia Física e Climatologia', 'Geopolítica e Conflitos Mundiais', 'Geografia Agrária e Meio Ambiente', 'Geografia Urbana e Indústria', 'Demografia e População'],
      links: [
        { nome: 'Geobrasil (Youtube)', url: 'https://www.youtube.com/@geobrasil' },
        { nome: 'Brasil Escola - Geografia', url: 'https://brasilescola.uol.com.br/geografia' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/geografia' },
      ],
    },
    filosofia: {
      resumo: 'A disciplina foca na interpretação de textos filosóficos clássicos. O candidato deve aplicar conceitos de ética, política e teoria do conhecimento nos dilemas contemporâneos.',
      topicos: ['Ética e Moral', 'Filosofia Antiga (Grécia)', 'Filosofia Moderna (Iluminismo)', 'Filosofia Contemporânea', 'Teoria do Conhecimento'],
      links: [
        { nome: 'Filosofia no Cotidiano (Youtube)', url: 'https://www.youtube.com/@filosofianocotidiano' },
        { nome: 'Brasil Escola - Filosofia', url: 'https://brasilescola.uol.com.br/filosofia' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/filosofia' },
      ],
    },
    sociologia: {
      resumo: 'A disciplina exige observar a sociedade com lente crítica. As questões cobram análise das estruturas de poder, transformações no trabalho e desigualdades estruturais.',
      topicos: ['Mundo do Trabalho e Capitalismo', 'Desigualdade e Estratificação Social', 'Cultura e Indústria Cultural', 'Poder, Estado e Política', 'Movimentos Sociais e Minorias'],
      links: [
        { nome: 'Sociologia Animada (Youtube)', url: 'https://www.youtube.com/@sociologiaanimada' },
        { nome: 'Brasil Escola - Sociologia', url: 'https://brasilescola.uol.com.br/sociologia' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/sociologia' },
      ],
    },
    portugues: {
      resumo: 'A gramática normativa deu lugar à interpretação profunda de textos. O foco está nas funções da linguagem, variação linguística e contexto das escolas literárias.',
      topicos: ['Interpretação de Texto', 'Escolas e Movimentos Literários', 'Figuras e Funções da Linguagem', 'Gramática Aplicada ao Texto', 'Variação Linguística'],
      links: [
        { nome: 'Português com Letícia (Youtube)', url: 'https://www.youtube.com/@portuguescomleticia' },
        { nome: 'Brasil Escola - Português', url: 'https://brasilescola.uol.com.br/gramatica' },
        { nome: 'Mundo da Educação', url: 'https://mundoeducacao.uol.com.br/gramatica' },
      ],
    },
    linguas: {
      resumo: 'As provas de idioma focam na compreensão de textos autênticos do cotidiano, como notícias, tirinhas, músicas e campanhas publicitárias.',
      topicos: ['Compreensão e Interpretação de Textos', 'Vocabulário Contextualizado', 'Falsos Cognatos e Expressões Idiomáticas', 'Análise de Gêneros Textuais', 'Temas Globais e Atualidades'],
      links: [
        { nome: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish' },
        { nome: 'Duolingo', url: 'https://www.duolingo.com' },
        { nome: 'Brasil Escola - Inglês', url: 'https://brasilescola.uol.com.br/ingles' },
      ],
    },
    redacao: {
      resumo: 'No vestibular, a redação avalia a capacidade de estruturar um pensamento crítico com argumentos sólidos e repertório sociocultural válido.',
      topicos: ['Estrutura Dissertativo-Argumentativa', 'Repertório Sociocultural', 'Coesão e Coerência', 'Introdução com Tese Clara', 'Conclusão com Proposta de Solução'],
      links: [
        { nome: 'Redação Nota 1000 (Youtube)', url: 'https://www.youtube.com/@redacaonota1000' },
        { nome: 'UOL Educação - Redação', url: 'https://educacao.uol.com.br/disciplinas/portugues/redacao' },
        { nome: 'Brasil Escola - Redação', url: 'https://brasilescola.uol.com.br/redacao' },
      ],
    },
  },

  enem: {
    matematica: {
      resumo: 'No ENEM, a Matemática foca na resolução de situações do cotidiano, exigindo interpretação de gráficos, tabelas e problemas contextualizados.',
      topicos: ['Funções e Gráficos', 'Geometria Plana e Espacial', 'Probabilidade e Estatística', 'Progressões e Sequências', 'Matemática Financeira'],
      links: [
        { nome: 'Matemática Rio (Youtube)', url: 'https://www.youtube.com/@matematicario' },
        { nome: 'Khan Academy', url: 'https://pt.khanacademy.org/math' },
        { nome: 'INEP - Provas Anteriores', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos' },
      ],
    },
    portugues: {
      resumo: 'No ENEM, o foco é na leitura e interpretação de textos variados. A gramática é cobrada sempre dentro de um contexto textual.',
      topicos: ['Interpretação de Textos Multimodais', 'Gêneros e Tipos Textuais', 'Variação Linguística', 'Literatura Brasileira Contextualizada', 'Semântica e Discurso'],
      links: [
        { nome: 'Português com Letícia (Youtube)', url: 'https://www.youtube.com/@portuguescomleticia' },
        { nome: 'Brasil Escola - Português', url: 'https://brasilescola.uol.com.br/gramatica' },
        { nome: 'INEP - Provas Anteriores', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos' },
      ],
    },
    redacao: {
      resumo: 'A redação do ENEM é dissertativo-argumentativa com tema social. O candidato deve apresentar uma proposta de intervenção detalhada com ação, agente, meio e finalidade.',
      topicos: ['Estrutura da Redação ENEM (5 parágrafos)', 'Proposta de Intervenção Completa', 'Repertório Sociocultural', 'Direitos Humanos na Redação', 'Coesão com Conectivos'],
      links: [
        { nome: 'Redação Nota 1000 (Youtube)', url: 'https://www.youtube.com/@redacaonota1000' },
        { nome: 'Brasil Escola - Redação ENEM', url: 'https://brasilescola.uol.com.br/redacao' },
        { nome: 'INEP - Provas Anteriores', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos' },
      ],
    },
    ciencias: {
      resumo: 'Ciências da Natureza no ENEM engloba Biologia, Física e Química de forma interdisciplinar, contextualizando fenômenos científicos com situações do dia a dia.',
      topicos: ['Ecologia e Meio Ambiente', 'Genética e Biotecnologia', 'Termodinâmica e Energia', 'Química Orgânica e Cotidiano', 'Ondas, Luz e Óptica'],
      links: [
        { nome: 'Khan Academy Ciências', url: 'https://pt.khanacademy.org/science' },
        { nome: 'Brasil Escola - Ciências', url: 'https://brasilescola.uol.com.br' },
        { nome: 'INEP - Provas Anteriores', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos' },
      ],
    },
    humanas: {
      resumo: 'Ciências Humanas no ENEM abrange História, Geografia, Filosofia e Sociologia de forma integrada, focando na análise crítica de processos sociais e políticos.',
      topicos: ['Direitos Humanos e Cidadania', 'Globalização e Geopolítica', 'Movimentos Sociais Brasileiros', 'Filosofia Política e Ética', 'Identidade Cultural e Diversidade'],
      links: [
        { nome: 'Xadrez Verbal (Youtube)', url: 'https://www.youtube.com/@xadrezverbal' },
        { nome: 'Brasil Escola - Humanas', url: 'https://brasilescola.uol.com.br' },
        { nome: 'INEP - Provas Anteriores', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos' },
      ],
    },
    linguas: {
      resumo: 'No ENEM, a prova de língua estrangeira avalia exclusivamente a leitura e compreensão de textos autênticos. Não há tradução nem produção escrita.',
      topicos: ['Leitura e Interpretação de Textos', 'Vocabulário em Contexto', 'Gêneros Textuais em Inglês/Espanhol', 'Temas Globais e Atualidades', 'Inferência de Significado'],
      links: [
        { nome: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish' },
        { nome: 'Duolingo', url: 'https://www.duolingo.com' },
        { nome: 'INEP - Provas Anteriores', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos' },
      ],
    },
  },

  concursos: {
    portugues: {
      resumo: 'Nos concursos públicos, o Português foca na gramática normativa, interpretação de textos oficiais e redação formal, variando conforme o nível do cargo.',
      topicos: ['Gramática Normativa (concordância, regência)', 'Interpretação de Texto Oficial', 'Ortografia e Acentuação', 'Pontuação e Crase', 'Redação Oficial'],
      links: [
        { nome: 'Gran Cursos Online (Youtube)', url: 'https://www.youtube.com/@grancursosonline' },
        { nome: 'Estratégia Concursos', url: 'https://www.estrategiaconcursos.com.br' },
        { nome: 'Tec Concursos', url: 'https://www.tecconcursos.com.br' },
      ],
    },
    matematica: {
      resumo: 'Nos concursos, a Matemática foca em raciocínio lógico-matemático e resolução de problemas práticos, variando conforme o nível do cargo.',
      topicos: ['Regra de Três e Proporções', 'Porcentagem e Juros', 'Matemática Financeira', 'Probabilidade Básica', 'Interpretação de Gráficos e Tabelas'],
      links: [
        { nome: 'Gran Cursos Online (Youtube)', url: 'https://www.youtube.com/@grancursosonline' },
        { nome: 'Estratégia Concursos', url: 'https://www.estrategiaconcursos.com.br' },
        { nome: 'Tec Concursos', url: 'https://www.tecconcursos.com.br' },
      ],
    },
    direito: {
      resumo: 'Direito é uma das matérias mais cobradas em concursos. O candidato deve conhecer os princípios constitucionais, direitos fundamentais e a estrutura do Estado brasileiro.',
      topicos: ['Constituição Federal de 1988', 'Direitos e Garantias Fundamentais', 'Organização do Estado Brasileiro', 'Direito Administrativo Básico', 'Princípios da Administração Pública (LIMPE)'],
      links: [
        { nome: 'Gran Cursos Online (Youtube)', url: 'https://www.youtube.com/@grancursosonline' },
        { nome: 'Estratégia Concursos', url: 'https://www.estrategiaconcursos.com.br' },
        { nome: 'Planalto - Constituição Federal', url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' },
      ],
    },
    informatica: {
      resumo: 'Informática é cobrada na maioria dos concursos. As questões avaliam ferramentas de escritório, internet, segurança da informação e sistemas operacionais.',
      topicos: ['Pacote Office (Word, Excel, PowerPoint)', 'Internet e Navegadores', 'Segurança da Informação', 'Sistemas Operacionais (Windows/Linux)', 'Conceitos de Hardware e Software'],
      links: [
        { nome: 'Gran Cursos Online (Youtube)', url: 'https://www.youtube.com/@grancursosonline' },
        { nome: 'Estratégia Concursos', url: 'https://www.estrategiaconcursos.com.br' },
        { nome: 'Tec Concursos', url: 'https://www.tecconcursos.com.br' },
      ],
    },
    raciocinio: {
      resumo: 'Raciocínio Lógico é eliminatório em muitos concursos. Avalia a capacidade de analisar situações e resolver problemas através de argumentos lógicos.',
      topicos: ['Lógica Proposicional', 'Tabela Verdade', 'Sequências e Padrões', 'Silogismos e Argumentos', 'Problemas de Lógica Situacional'],
      links: [
        { nome: 'Gran Cursos Online (Youtube)', url: 'https://www.youtube.com/@grancursosonline' },
        { nome: 'Estratégia Concursos', url: 'https://www.estrategiaconcursos.com.br' },
        { nome: 'Tec Concursos', url: 'https://www.tecconcursos.com.br' },
      ],
    },
    atualidades: {
      resumo: 'Atualidades avalia o conhecimento sobre os principais fatos políticos, econômicos, sociais e culturais do Brasil e do mundo.',
      topicos: ['Política Nacional e Internacional', 'Economia Brasileira', 'Meio Ambiente e Sustentabilidade', 'Ciência e Tecnologia', 'Cultura e Sociedade'],
      links: [
        { nome: 'G1 - Portal de Notícias', url: 'https://g1.globo.com' },
        { nome: 'BBC Brasil', url: 'https://www.bbc.com/portuguese' },
        { nome: 'Agência Brasil', url: 'https://agenciabrasil.ebc.com.br' },
      ],
    },
  },
};

const titulosCorretos: Record<string, string> = {
  matematica: 'Matemática',
  biologia: 'Biologia',
  fisica: 'Física',
  quimica: 'Química',
  historia: 'História',
  geografia: 'Geografia',
  filosofia: 'Filosofia',
  sociologia: 'Sociologia',
  portugues: 'Português',
  linguas: 'Línguas',
  redacao: 'Redação',
  ciencias: 'Ciências da Natureza',
  humanas: 'Ciências Humanas',
  direito: 'Direito',
  informatica: 'Informática',
  raciocinio: 'Raciocínio Lógico',
  atualidades: 'Atualidades',
};

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
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  iconeLivro: {
    marginBottom: 24,
  },
  secao: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  secaoTitulo: {
    backgroundColor: '#1E3A8A',
    color: '#D1DDFF',
    fontWeight: 'bold',
    padding: 6,
    marginBottom: 8,
  },
  linkTexto: {
    color: '#1E3A8A',
    fontSize: 14,
    marginBottom: 6,
    textDecorationLine: 'underline',
  },
  footer: {
    backgroundColor: '#1E3A8A',
    width: '100%',
    height: 50,
    padding: 15,
  },
});