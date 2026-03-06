import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Index() {
  const [idade, setIdade] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [anoNascimento, setAnoNascimento] = useState<number | null>(null);

  function calcularAno(idadeValor: string, diaValor: string, mesValor: string) {
    const idadeNum = parseInt(idadeValor);
    const diaNum = parseInt(diaValor);
    const mesNum = parseInt(mesValor);

    if (!idadeNum || !diaNum || !mesNum) {
      setAnoNascimento(null);
      return;
    }

    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth() + 1;

    let anoCalculado = anoAtual - idadeNum;

    // verifica se a pessoa ainda vai fazer aniversário
    if (mesNum > mesAtual || (mesNum === mesAtual && diaNum > diaAtual)) {
      anoCalculado -= 1;
    }

    setAnoNascimento(anoCalculado);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.titulo}>Calculadora de Ano de Nascimento</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={(text) => {
          setIdade(text);
          calcularAno(text, dia, mes);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Dia de nascimento"
        keyboardType="numeric"
        value={dia}
        onChangeText={(text) => {
          setDia(text);
          calcularAno(idade, text, mes);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Mês de nascimento"
        keyboardType="numeric"
        value={mes}
        onChangeText={(text) => {
          setMes(text);
          calcularAno(idade, dia, text);
        }}
      />

      <Text style={styles.resultado}>
        Ano de nascimento: {anoNascimento ?? "-"}
      </Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f0ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5b21b6",
    textAlign: "center",
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d6ccff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#faf9ff",
  },

  resultado: {
    fontSize: 20,
    marginTop: 15,
    fontWeight: "bold",
    color: "#7c3aed",
  },
});