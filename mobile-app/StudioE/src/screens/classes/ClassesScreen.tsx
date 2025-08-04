import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const mockClasses = [
  {
    id: 1,
    title: 'Beginner Salsa',
    instructor: 'Maria Rodriguez',
    date: '2025-08-05',
    time: '7:00 PM',
    style: 'Salsa',
    level: 'Beginner',
    company: 'Studio E'
  },
  {
    id: 2,
    title: 'Intermediate Bachata',
    instructor: 'Carlos Martinez',
    date: '2025-08-06',
    time: '8:00 PM',
    style: 'Bachata',
    level: 'Intermediate',
    company: 'Studio E'
  },
  {
    id: 3,
    title: 'Heels Workshop',
    instructor: 'Jessica Silva',
    date: '2025-08-07',
    time: '6:30 PM',
    style: 'Heels',
    level: 'All Levels',
    company: 'Studio E'
  },
  {
    id: 4,
    title: 'Advanced Salsa Styling',
    instructor: 'Miguel Santos',
    date: '2025-08-08',
    time: '7:30 PM',
    style: 'Salsa',
    level: 'Advanced',
    company: 'Studio E'
  }
];

export default function ClassesScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dance Classes</Text>
        <Text style={styles.headerSubtitle}>Learn from the best instructors</Text>
      </View>

      {/* Classes List */}
      <View style={styles.classesList}>
        {mockClasses.map((classItem) => (
          <TouchableOpacity key={classItem.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>{classItem.level}</Text>
              </View>
              <Text style={styles.styleText}>{classItem.style}</Text>
            </View>
            
            <Text style={styles.classTitle}>{classItem.title}</Text>
            <Text style={styles.instructorName}>👩‍🏫 {classItem.instructor}</Text>
            <Text style={styles.classDate}>📅 {new Date(classItem.date).toLocaleDateString()}</Text>
            <Text style={styles.classTime}>⏰ {classItem.time}</Text>
            
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookText}>Book Class</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF3366',
    padding: 30,
    paddingTop: 80,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  classesList: {
    padding: 20,
  },
  classCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelContainer: {
    backgroundColor: '#9933CC',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  styleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3366',
  },
  classTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  instructorName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  classDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  classTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  bookButton: {
    backgroundColor: '#FF3366',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bookText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
}); 