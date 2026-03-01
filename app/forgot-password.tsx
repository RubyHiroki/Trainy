import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TrainyTitle } from '@/components/trainy-title';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSend = () => {
    console.log('Send password reset email:', { email });
    router.replace('/');
  };

  const handleBackToLogin = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container} lightColor="#FFFFFF" darkColor="#FFFFFF">

        {/* Title Section */}
        <TrainyTitle fontSize={24} fontWeight="800" />

        {/* Main Content */}
        <View style={styles.content}>
          {/* Icon and Subtitle Section */}
          <View style={styles.iconSubtitleSection}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="lock-reset" size={54} color="#A1A1A1" />
            </View>
            <ThemedText style={styles.subtitle} lightColor="#A1A1A1" darkColor="#A1A1A1">
              登録済みのメールアドレスを入力してください
            </ThemedText>
          </View>

          {/* Input Field */}
          <View style={styles.inputSection}>
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
          </View>

          {/* Send Button */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.8}>
              <View style={styles.buttonShadow} />
              <ThemedText style={styles.sendButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
                送信
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Back to Login Link Section */}
          <View style={styles.backLinkSection}>
            <TouchableOpacity style={styles.backLinkContainer} onPress={handleBackToLogin}>
              <MaterialIcons name="chevron-left" size={18} color="#A1A1A1" />
              <ThemedText style={styles.backLinkText} lightColor="#A1A1A1" darkColor="#A1A1A1">
                ログインに戻る
              </ThemedText>
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
  content: {
    flex: 1,
    paddingHorizontal: 40,
  },
  iconSubtitleSection: {
    paddingTop: 64,
    paddingBottom: 56,
    alignItems: 'center',
  },
  iconContainer: {
    paddingBottom: 24,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.5,
    letterSpacing: -0.325,
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
  sendButton: {
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
  sendButtonText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22.5,
    letterSpacing: 0.375,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  backLinkSection: {
    marginTop: 70,
    paddingBottom: 64,
    alignItems: 'center',
  },
  backLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#A1A1A1',
    marginLeft: 4,
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
