import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    console.log('Login:', { username, password });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container} lightColor="#FFFFFF" darkColor="#FFFFFF">
        {/* Main Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <ThemedText style={styles.title} lightColor="#F89468" darkColor="#F89468">
              Trainy
            </ThemedText>
          </View>

          {/* Input Fields */}
          <View style={styles.inputSection}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ユーザー名"
                placeholderTextColor="rgba(161, 161, 161, 0.5)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="パスワード"
                placeholderTextColor="rgba(161, 161, 161, 0.5)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Login Button */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
              <View style={styles.buttonShadow} />
              <ThemedText style={styles.loginButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
                ログイン
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Links Section */}
          <View style={styles.linksSection}>
            <View style={styles.linksContainer}>
              <TouchableOpacity>
                <ThemedText style={styles.linkText} lightColor="#A1A1A1" darkColor="#A1A1A1">
                  新規登録はこちら
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity>
                <ThemedText style={styles.linkText} lightColor="#A1A1A1" darkColor="#A1A1A1">
                  パスワードをお忘れの方
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Home Indicator */}
        <View style={styles.homeIndicator} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 25,
  },
  statusBarText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: '#2D2D2D',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
  },
  titleSection: {
    paddingTop: 128,
    paddingBottom: 96,
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: '700',
    lineHeight: 52,
    letterSpacing: -2.08,
    color: '#F89468',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
  },
  inputSection: {
    gap: 16,
  },
  inputContainer: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  input: {
    fontSize: 14,
    lineHeight: 20.27,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
    textAlign: 'left',
    padding: 0,
  },
  buttonSection: {
    paddingTop: 40,
  },
  loginButton: {
    backgroundColor: '#F89468',
    borderRadius: 9999,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#F89468',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    backgroundColor: 'transparent',
  },
  loginButtonText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22.5,
    letterSpacing: 0.375,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  linksSection: {
    marginTop: 24,
    paddingBottom: 64,
    alignItems: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  linkText: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16.5,
    color: '#A1A1A1',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  linkDivider: {
    width: 3,
    height: 3,
    borderRadius: 9999,
    backgroundColor: '#E5E5E5',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    marginLeft: -64,
    width: 128,
    height: 4,
    borderRadius: 9999,
    backgroundColor: 'rgba(45, 45, 45, 0.1)',
  },
});
