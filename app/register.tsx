import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    console.log('Register:', { username, email, password, confirmPassword });
    router.replace('/');
  };

  const handleLoginLink = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container} lightColor="#FFFFFF" darkColor="#FFFFFF">
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Svg height={36} width={100} style={styles.titleSvg}>
            <Defs>
              <LinearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="rgba(248, 148, 104, 1)" />
                <Stop offset="100%" stopColor="rgba(255, 176, 142, 1)" />
              </LinearGradient>
            </Defs>
            <SvgText
              x="0"
              y="26"
              fontSize="24"
              fontWeight="800"
              letterSpacing="-1.2"
              fill="url(#titleGradient)"
              fontFamily={Platform.OS === 'ios' ? 'Inter' : 'sans-serif'}>
              Trainy
            </SvgText>
          </Svg>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Subtitle Section */}
          <View style={styles.subtitleSection}>
            <ThemedText style={styles.subtitle} lightColor="#A1A1A1" darkColor="#A1A1A1">
              登録するユーザー情報を入力してください
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
                placeholder="メールアドレス"
                placeholderTextColor="rgba(161, 161, 161, 0.5)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
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
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="パスワード（確認）"
                placeholderTextColor="rgba(161, 161, 161, 0.5)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Register Button */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
              <View style={styles.buttonShadow} />
              <ThemedText style={styles.registerButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
                登録
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Login Link Section */}
          <View style={styles.loginLinkSection}>
            <ThemedText style={styles.loginLinkText} lightColor="#A1A1A1" darkColor="#A1A1A1">
              すでにアカウントをお持ちの方
            </ThemedText>
            <TouchableOpacity style={styles.loginLinkContainer} onPress={handleLoginLink}>
              <View style={styles.loginLinkButton}>
                <ThemedText style={styles.loginLinkButtonText} lightColor="#F89468" darkColor="#F89468">
                  ログインはこちら
                </ThemedText>
              </View>
            </TouchableOpacity>
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
  statusBar: {
    paddingTop: Platform.OS === 'ios' ? 16 : (StatusBar.currentHeight || 0) + 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBarText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    color: '#2D2D2D',
    fontFamily: Platform.OS === 'ios' ? 'Inter' : 'sans-serif',
  },
  titleContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  titleSvg: {
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
  },
  subtitleSection: {
    paddingTop: 40,
    paddingBottom: 48,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 1.2,
    color: '#A1A1A1',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
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
    lineHeight: 16.8,
    color: '#000000',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
    textAlign: 'left',
    padding: 0,
  },
  buttonSection: {
    paddingTop: 40,
  },
  registerButton: {
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
  registerButtonText: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22.5,
    letterSpacing: 1.5,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  loginLinkSection: {
    marginTop: 70,
    paddingBottom: 64,
    alignItems: 'center',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  loginLinkText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19.5,
    color: '#A1A1A1',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  loginLinkButton: {
    marginLeft: 8,
    marginTop: -1,
  },
  loginLinkButtonText: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19.5,
    color: '#F89468',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
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
