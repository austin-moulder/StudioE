import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const mockEvents = [
  {
    id: 1,
    title: 'Salsa Night Social',
    date: 'Tonight 8:00 PM',
    location: 'Studio E Main Floor',
    attendees: 42,
    type: 'Social Dance'
  },
  {
    id: 2,
    title: 'Bachata Workshop',
    date: 'Tomorrow 7:00 PM',
    location: 'Studio E Room B',
    attendees: 28,
    type: 'Workshop'
  },
  {
    id: 3,
    title: 'Heels Intensive',
    date: 'Friday 6:30 PM',
    location: 'Studio E Main Floor',
    attendees: 18,
    type: 'Class'
  },
  {
    id: 4,
    title: 'Latin Competition Prep',
    date: 'Sunday 2:00 PM',
    location: 'Studio E Room A',
    attendees: 12,
    type: 'Competition'
  }
];

export default function EventsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Upcoming Events</Text>
        <Text style={styles.headerSubtitle}>Join the Studio E community</Text>
      </View>

      {/* Events List */}
      <View style={styles.eventsList}>
        {mockEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventTypeContainer}>
                <Text style={styles.eventType}>{event.type}</Text>
              </View>
              <Text style={styles.attendeeCount}>👥 {event.attendees}</Text>
            </View>
            
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>📅 {event.date}</Text>
            <Text style={styles.eventLocation}>📍 {event.location}</Text>
            
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpText}>RSVP Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Create Event Button */}
      <TouchableOpacity style={styles.createEventButton}>
        <Text style={styles.createEventText}>+ Create Event</Text>
      </TouchableOpacity>
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
  eventsList: {
    padding: 20,
  },
  eventCard: {
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
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTypeContainer: {
    backgroundColor: '#FF3366',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventType: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  attendeeCount: {
    fontSize: 14,
    color: '#666',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 16,
    color: '#FF3366',
    marginBottom: 4,
    fontWeight: '500',
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  rsvpButton: {
    backgroundColor: '#9933CC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  rsvpText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  createEventButton: {
    backgroundColor: '#FF3366',
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  createEventText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});