import { onAuthStateChanged, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserData {
  id: string;
  userId: string;
  email: string;
  [key: string]: any;
}

/**
 * ログインする
 * @param email
 * @param password
 * @returns
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<UserData | null> {
  try {
    const trimmedEmail = email.trim();
    console.log('ログイン試行:', { email: trimmedEmail, passwordLength: password.length });
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error('有効なメールアドレスを入力してください');
    }

    console.log('Firebase Authenticationでログイン試行中...');
    
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      trimmedEmail,
      password
    );

    console.log('認証成功:', {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });

    let userData: UserData = {
      id: userCredential.user.uid,
      userId: trimmedEmail,
      email: userCredential.user.email || trimmedEmail,
    };

    try {
      const userDocRef = doc(db, 'user', userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      console.log('Firestore userドキュメント存在:', userDoc.exists());

      if (userDoc.exists()) {
        const firestoreData = userDoc.data();
        console.log('Firestore userデータ:', firestoreData);
        userData = {
          ...userData,
          userId: firestoreData.userId || trimmedEmail,
          ...firestoreData,
        };
      } else {
        console.log('Firestoreにuserドキュメントが存在しません。Authenticationの情報のみ返します。');
      }
    } catch (firestoreError: any) {
      console.warn('Firestoreからのデータ取得でエラーが発生しました（ログインは続行）:', firestoreError);
    }

    return userData;
  } catch (error: any) {
    console.error('認証エラー詳細:', {
      code: error.code,
      message: error.message,
      email: email.trim(),
      fullError: error,
    });
    
    if (error.code === 'auth/user-not-found') {
      throw new Error('このメールアドレスで登録されているユーザーが見つかりません');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('パスワードが正しくありません');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('無効なメールアドレスです');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('このアカウントは無効化されています');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('リクエストが多すぎます。しばらくしてから再試行してください');
    } else if (error.code === 'auth/invalid-credential') {
      throw new Error('メールアドレスまたはパスワードが正しくありません');
    } else if (error.code === 'auth/invalid-login-credentials') {
      throw new Error('メールアドレスまたはパスワードが正しくありません');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('ネットワークエラーが発生しました。インターネット接続を確認してください');
    } else if (error.code === 'auth/internal-error') {
      throw new Error('サーバーエラーが発生しました。しばらくしてから再試行してください');
    } else if (error.message && error.message.includes('permission')) {
      throw new Error('データベースへのアクセス権限がありません');
    } else if (error.message) {
      throw error;
    } else {
      throw new Error(`ログインに失敗しました: ${error.code || '不明なエラー'}`);
    }
  }
}

/**
 * 現在ログインしているユーザーを取得
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * @param callback
 * @returns
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * ログアウト
 */
export async function signOut() {
  await auth.signOut();
}
