import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TrainyTitle } from '@/components/trainy-title';

type Post = {
  id: string;
  username: string;
  timeAgo: string;
  title: string;
  sets: Array<{
    setNumber: string;
    weight: string;
    reps: string;
  }>;
  likes: number;
  comments: number;
};

const mockPosts: Post[] = [
  {
    id: '1',
    username: 'ユーザー名',
    timeAgo: '2時間前',
    title: 'ベンチプレス',
    sets: [
      { setNumber: 'SET 01', weight: '80', reps: '10' },
      { setNumber: 'SET 02', weight: '80', reps: '10' },
      { setNumber: 'SET 03', weight: '75', reps: '8' },
    ],
    likes: 128,
    comments: 32,
  },
  {
    id: '2',
    username: 'ユーザー名2',
    timeAgo: '5時間前',
    title: 'スクワット',
    sets: [
      { setNumber: 'SET 01', weight: '100', reps: '12' },
      { setNumber: 'SET 02', weight: '100', reps: '12' },
    ],
    likes: 95,
    comments: 18,
  },
];

function PostCard({ post }: { post: Post }) {
  return (
    <View style={styles.postCard}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
        </View>
        <View style={styles.userDetails}>
          <ThemedText style={styles.username}>{post.username}</ThemedText>
          <ThemedText style={styles.timeAgo}>{post.timeAgo}</ThemedText>
        </View>
      </View>

      {/* Post Title */}
      <View style={styles.titleContainer}>
        <ThemedText style={styles.postTitle}>{post.title}</ThemedText>
      </View>

      {/* Sets */}
      <View style={styles.setsContainer}>
        {post.sets.map((set, index) => (
          <View key={index} style={styles.setRow}>
            <View style={styles.setLabel}>
              <ThemedText style={styles.setNumber}>{set.setNumber}</ThemedText>
            </View>
            <View style={styles.setValues}>
              <View style={styles.valueRow}>
                <ThemedText style={styles.value}>{set.weight}</ThemedText>
                <ThemedText style={styles.unit}>KG</ThemedText>
              </View>
              <View style={styles.valueRow}>
                <ThemedText style={styles.value}>{set.reps}</ThemedText>
                <ThemedText style={styles.unit}>REPS</ThemedText>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Workout Background */}
      <View style={styles.workoutBackground} />

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <MaterialIcons name="favorite-border" size={20} color="#2D2D2D" />
          <ThemedText style={styles.actionText}>{post.likes}</ThemedText>
        </View>
        <View style={styles.actionButton}>
          <MaterialIcons name="chat-bubble-outline" size={20} color="#2D2D2D" />
          <ThemedText style={styles.actionText}>{post.comments}</ThemedText>
        </View>
      </View>
    </View>
  );
}

export default function TimelineScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container} lightColor="#FFFFFF" darkColor="#FFFFFF">
        {/* Header */}
        <View style={styles.header}>
          <TrainyTitle fontSize={20} fontWeight="700" />
        </View>

        {/* Timeline */}
        <FlatList
          data={mockPosts}
          renderItem={({ item }) => <PostCard post={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.timelineContent}
          showsVerticalScrollIndicator={false}
        />
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
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineContent: {
    padding: 16,
    gap: 16,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2D',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  timeAgo: {
    fontSize: 12,
    color: '#A1A1A1',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  titleContainer: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D2D2D',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  setsContainer: {
    marginBottom: 16,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 12,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E5E5',
  },
  setLabel: {
    marginRight: 16,
  },
  setNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A1A1A1',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  setValues: {
    flexDirection: 'row',
    gap: 16,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
    marginRight: 4,
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  unit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A1A1A1',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  workoutBackground: {
    height: 120,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2D2D2D',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
});
