import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TrainyTitle } from '@/components/trainy-title';

type WorkoutCard = {
  id: string;
  title: string;
  sets: Array<{
    setNumber: string;
    weight: string;
    reps: string;
  }>;
  date: string;
  imageUrl?: string;
};

const mockWorkouts: WorkoutCard[] = [
  {
    id: '1',
    title: 'BENCH PRESS',
    sets: [{ setNumber: 'SET 01', weight: '100kg', reps: '8' }],
    date: '2024.05.20',
  },
  {
    id: '2',
    title: 'BACK SQUAT',
    sets: [{ setNumber: 'SET 01', weight: '140kg', reps: '5' }],
    date: '2024.05.18',
  },
  {
    id: '3',
    title: 'DEADLIFT',
    sets: [{ setNumber: 'SET 01', weight: '160kg', reps: '3' }],
    date: '2024.05.15',
  },
  {
    id: '4',
    title: 'PULL UPS',
    sets: [{ setNumber: 'SET 01', weight: 'BW', reps: '12' }],
    date: '2024.05.12',
  },
];

function WorkoutCard({ workout }: { workout: WorkoutCard }) {
  return (
    <View style={styles.workoutCard}>
      <View style={styles.workoutCardInner}>
        <View style={styles.workoutHeader}>
          <ThemedText style={styles.workoutTitle}>{workout.title}</ThemedText>
        </View>
        <View style={styles.workoutSets}>
          {workout.sets.map((set, index) => (
            <View key={index} style={styles.setRow}>
              <View style={styles.setLabel}>
                <ThemedText style={styles.setNumber}>{set.setNumber}</ThemedText>
              </View>
              <View style={styles.setValue}>
                <ThemedText style={styles.setWeightReps}>
                  {set.weight} × {set.reps}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.workoutImageContainer}>
        <View style={styles.workoutImagePlaceholder} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}
          style={styles.workoutGradient}
        />
        <View style={styles.workoutDateContainer}>
          <ThemedText style={styles.workoutDate}>{workout.date}</ThemedText>
        </View>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container} lightColor="#FFFFFF" darkColor="#FFFFFF">
        {/* Header */}
        <View style={styles.header}>
          <TrainyTitle fontSize={20} fontWeight="700" />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImageBorder}>
                <View style={styles.profileImage}>
                  {/* Placeholder for profile image */}
                </View>
              </View>
            </View>

            {/* Username */}
            <View style={styles.usernameContainer}>
              <ThemedText style={styles.username}>ユーザー名</ThemedText>
            </View>

            {/* Bio */}
            <View style={styles.bioContainer}>
              <ThemedText style={styles.bio}>
                限界を超えて、理想の自分へ。毎日コツコツ{'\n'}トレーニング中。💪
              </ThemedText>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>128</ThemedText>
                <ThemedText style={styles.statLabel}>投稿</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>1.2k</ThemedText>
                <ThemedText style={styles.statLabel}>フォロワー</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>340</ThemedText>
                <ThemedText style={styles.statLabel}>フォロー</ThemedText>
              </View>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity style={styles.editButton}>
              <View style={styles.editButtonShadow} />
              <ThemedText style={styles.editButtonText}>プロフィールを編集</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Workouts Grid */}
          <View style={styles.workoutsContainer}>
            {mockWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </View>

          {/* Account Deletion Section */}
          <View style={styles.deleteSection}>
            <View style={styles.deleteContent}>
              <MaterialIcons name="warning" size={18} color="rgba(197, 78, 78, 0.7)" />
              <View style={styles.deleteTextContainer}>
                <ThemedText style={styles.deleteTitle}>アカウントの削除</ThemedText>
                <ThemedText style={styles.deleteDescription}>
                  データを完全に消去します。この操作は取り消{'\n'}
                  すことができませんのでご注意ください。
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <View style={styles.deleteButtonShadow} />
              <MaterialIcons name="delete-outline" size={16} color="#FFFFFF" />
              <ThemedText style={styles.deleteButtonText}>アカウントを削除する</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImageBorder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    padding: 4,
    borderWidth: 2,
    borderColor: 'rgba(240, 139, 51, 0.2)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 52,
    backgroundColor: '#F8F8F8',
  },
  usernameContainer: {
    marginBottom: 4,
  },
  username: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  bioContainer: {
    width: 280,
    marginBottom: 24,
    alignItems: 'center',
  },
  bio: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22.75,
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    paddingVertical: 8,
    marginBottom: 24,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Lexend' : 'sans-serif',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '400',
    color: '#94A3B8',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  editButton: {
    width: 200,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F08B33',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F08B33',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  editButtonShadow: {
    position: 'absolute',
    width: 200,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'transparent',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  workoutsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  workoutCard: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  workoutCardInner: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    gap: 4,
  },
  workoutHeader: {
    marginBottom: 4,
  },
  workoutTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F08B33',
    fontFamily: Platform.OS === 'ios' ? 'Lexend' : 'sans-serif',
    textTransform: 'uppercase',
  },
  workoutSets: {
    gap: 2,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  setLabel: {
    flex: 1,
  },
  setNumber: {
    fontSize: 11,
    fontWeight: '400',
    color: '#94A3B8',
    fontFamily: Platform.OS === 'ios' ? 'Lexend' : 'sans-serif',
  },
  setValue: {
    flex: 1,
    alignItems: 'flex-end',
  },
  setWeightReps: {
    fontSize: 11,
    fontWeight: '500',
    color: '#0F172A',
    fontFamily: Platform.OS === 'ios' ? 'Lexend' : 'sans-serif',
  },
  workoutImageContainer: {
    width: '100%',
    height: 165,
    position: 'relative',
  },
  workoutImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8F8F8',
  },
  workoutGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  workoutDateContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  workoutDate: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.8,
    letterSpacing: -0.5,
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'Lexend' : 'sans-serif',
  },
  deleteSection: {
    marginHorizontal: 24,
    marginTop: 32,
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(254, 226, 226, 0.5)',
    padding: 24,
    paddingTop: 40,
    gap: 20,
  },
  deleteContent: {
    flexDirection: 'row',
    gap: 12,
  },
  deleteTextContainer: {
    flex: 1,
    gap: 6,
  },
  deleteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  deleteDescription: {
    fontSize: 12,
    fontWeight: '400',
    color: '#64748B',
    lineHeight: 19.5,
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C54E4E',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#7F1D1D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  deleteButtonShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Noto Sans JP' : 'sans-serif',
  },
});
