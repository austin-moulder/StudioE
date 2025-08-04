import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const mockInstructors = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    specialty: 'Salsa & Bachata',
    experience: '8 years',
    rating: '4.9'
  },
  {
    id: 2,
    name: 'Carlos Martinez',
    specialty: 'Bachata & Kizomba',
    experience: '6 years',
    rating: '4.8'
  },
  {
    id: 3,
    name: 'Jessica Silva',
    specialty: 'Heels & Commercial',
    experience: '5 years',
    rating: '4.9'
  },
  {
    id: 4,
    name: 'Miguel Santos',
    specialty: 'Salsa & Latin Jazz',
    experience: '10 years',
    rating: '5.0'
  }
];

export default function InstructorsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Instructors</Text>
        <Text style={styles.headerSubtitle}>Meet the amazing teachers</Text>
      </View>

      {/* Instructors List */}
      <View style={styles.instructorsList}>
        {mockInstructors.map((instructor) => (
          <TouchableOpacity key={instructor.id} style={styles.instructorCard}>
            <View style={styles.instructorInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.instructorName}>{instructor.name}</Text>
                <Text style={styles.specialty}>{instructor.specialty}</Text>
                <Text style={styles.experience}>📚 {instructor.experience} experience</Text>
                <Text style={styles.rating}>⭐ {instructor.rating} rating</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactText}>Contact</Text>
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
    backgroundColor: '#9933CC',
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
  instructorsList: {
    padding: 20,
  },
  instructorCard: {
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
  instructorInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
  },
  instructorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#FF3366',
    fontWeight: '600',
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#9933CC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  contactText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
}); 