import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { authenticateUser } from '@/lib/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('メールアドレスとパスワードを入力してください');
      return;
    }

    setIsLoading(true);
    try {
      console.log('ログイン処理開始:', { email: email.trim() });
      const user = await authenticateUser(email, password);
      
      if (!user) {
        console.error('ユーザー情報が取得できませんでした');
        setError('ログインに失敗しました');
        return;
      }

      console.log('ログイン成功、画面遷移開始:', user);
      setError(null);
      setTimeout(() => {
        console.log('タイムライン画面に遷移');
        router.replace('/(tabs)');
      }, 100);
    } catch (error: any) {
      console.error('ログインエラー詳細:', {
        error,
        code: error?.code,
        message: error?.message,
        stack: error?.stack,
      });
      const errorMessage = error.message || 'ログイン中にエラーが発生しました。もう一度お試しください。';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) setError(null);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (error) setError(null);
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
                style={[styles.input, error && styles.inputError]}
                placeholder="メールアドレス"
                placeholderTextColor="rgba(161, 161, 161, 0.5)"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="パスワード"
                placeholderTextColor="rgba(161, 161, 161, 0.5)"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <ThemedText style={styles.errorText} lightColor="#FF3B30" darkColor="#FF3B30">
                  {error}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Login Button */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={isLoading}>
              <View style={styles.buttonShadow} />
              <ThemedText style={styles.loginButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
                {isLoading ? 'ログイン中...' : 'ログイン'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Links Section */}
          <View style={styles.linksSection}>
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => router.push('register' as any)}>
                <ThemedText style={styles.linkText} lightColor="#A1A1A1" darkColor="#A1A1A1">
                  新規登録はこちら
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('forgot-password' as any)}>
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
  inputError: {
    color: '#FF3B30',
  },
  errorContainer: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
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
  loginButtonDisabled: {
    opacity: 0.6,
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
    marginTop: 70,
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
