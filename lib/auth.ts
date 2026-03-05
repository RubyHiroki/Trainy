import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserData {
  id: string;
  userId: string;
  email: string;
  [key: string]: any;
}

/**
 * Firebase Authenticationを使用してログインする
 * @param email
 * @param password
 * @returns
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<UserData | null> {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new Error('有効なメールアドレスを入力してください');
    }

    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const userDocRef = doc(db, 'user', userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        id: userCredential.user.uid,
        userId: userData.userId || email,
        email: userCredential.user.email || email,
        ...userData,
      };
    } else {
      return {
        id: userCredential.user.uid,
        userId: email,
        email: userCredential.user.email || email,
      };
    }
  } catch (error: any) {
    console.error('認証エラー:', error);
    
    if (error.code === 'auth/user-not-found') {
      throw new Error('ユーザーが見つかりません');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('パスワードが正しくありません');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('無効なメールアドレスです');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('このアカウントは無効化されています');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('リクエストが多すぎます。しばらくしてから再試行してください');
    } else if (error.message) {
      throw error;
    } else {
      throw new Error('ログインに失敗しました');
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
 * ログアウト
 */
export async function signOut() {
  await auth.signOut();
}
