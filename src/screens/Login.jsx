import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Eye,
  EyeSlash,
} from 'iconsax-react-native';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleLogin = async () => {

  if (!email || !password) {
    alert('Email dan Password wajib diisi');
    return;
  }

  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    alert(error.message);
    return;
  }

  navigation.replace('MainApp');
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.headerSection}>
              <Text style={styles.brand}>
                FirstAction
              </Text>

              <Text style={styles.subTitle}>
                Cepat Tanggap, Selamatkan Nyawa
              </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Email Akun"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={() =>
                  setPasswordVisible(!passwordVisible)
                }
                style={styles.eyeIcon}
              >
                {passwordVisible ? (
                  <Eye
                    size="24"
                    color="#666"
                    variant="Linear"
                  />
                ) : (
                  <EyeSlash
                    size="24"
                    color="#666"
                    variant="Linear"
                  />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.btnLogin}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>
                Masuk
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
            >
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: '#E63946',
                }}
              >
                Belum punya akun? Daftar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  headerSection: {
    marginBottom: 40,
  },
  brand: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E63946',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 25,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  btnLogin: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});