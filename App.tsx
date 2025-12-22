import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

export default function App() {
  const [premio, setPremio] = useState<number>(0);
  const [pessoas, setPessoas] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  useEffect(() => {
    if (premio > 0 && pessoas > 0) {
      const valorPorPessoa = premio / pessoas;
      setResult(valorPorPessoa);
    }
  }, [premio, pessoas]);

  return (
    <View style={styles.container}>
      <Text>Cálculos Mega-Sena</Text>
      <CurrencyInput
        value={premio}
        onChangeValue={(value) => setPremio(value)}
        style={styles.input}
        keyboardType='numeric'
        placeholder='Digite o valor do prêmio'
      />
      <TextInput
        placeholder='Digite a quantidade de pessoas que irão dividir o prêmio'
        keyboardType='numeric'
        style={styles.input}
        value={pessoas}
        onChangeText={(text) => setPessoas(Number(text))}
      />
      <Text style={styles.result}>{`Cada pessoa receberá ${formatCurrency(result)}`}</Text>
    </View>
  )
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});
