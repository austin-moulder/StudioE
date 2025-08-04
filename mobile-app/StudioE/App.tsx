import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Image, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// Import instructor and class utilities
import { getAllInstructors } from './src/lib/instructors/instructorUtils';
import { getAllClasses } from './src/lib/classes/classUtils';
import { Instructor } from './src/types/instructor';
import { Class } from './src/types/class';

// Home Screen Component (existing homepage content)
function HomeScreen() {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Feel confident, sexy, and unstoppable</Text>
        <Text style={styles.heroSubtitle}>
          Connect with top dance instructors who tailor every session to your style and pace.
        </Text>
        
        {/* Search Section */}
        <View style={styles.searchSection}>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍 Find Your Dance Style</Text>
          </TouchableOpacity>
        </View>

        {/* Value Props */}
        <View style={styles.valueProps}>
          <View style={styles.valueProp}>
            <Text style={styles.valuePropEmoji}>⭐</Text>
            <Text style={styles.valuePropText}>Experienced Instructors</Text>
          </View>
          <View style={styles.valueProp}>
            <Text style={styles.valuePropEmoji}>📅</Text>
            <Text style={styles.valuePropText}>Proven Curriculums</Text>
          </View>
          <View style={styles.valueProp}>
            <Text style={styles.valuePropEmoji}>👥</Text>
            <Text style={styles.valuePropText}>Personalized Learning</Text>
          </View>
        </View>

        {/* Stats Badge */}
        <View style={styles.statsBadge}>
          <Text style={styles.statsNumber}>500+</Text>
          <Text style={styles.statsLabel}>Students Served</Text>
        </View>
      </View>

      {/* Popular Dance Styles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Dance Styles</Text>
        <Text style={styles.sectionSubtitle}>
          Explore a variety of dance styles taught by our expert instructors
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {['Salsa', 'Bachata', 'Heels', 'Choreo'].map((style, index) => (
            <TouchableOpacity key={index} style={styles.danceStyleCard}>
              <View style={styles.danceStyleImage}>
                <Text style={styles.danceStyleEmoji}>
                  {style === 'Salsa' ? '💃' : style === 'Bachata' ? '🕺' : style === 'Heels' ? '👠' : '🎭'}
                </Text>
              </View>
              <Text style={styles.danceStyleName}>{style}</Text>
              <Text style={styles.danceStyleCount}>{Math.floor(Math.random() * 20) + 5} Instructors</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get Started Today</Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionEmoji}>💃</Text>
            <Text style={styles.quickActionTitle}>Book a Lesson</Text>
            <Text style={styles.quickActionSubtitle}>Private or group sessions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionEmoji}>📅</Text>
            <Text style={styles.quickActionTitle}>Join Events</Text>
            <Text style={styles.quickActionSubtitle}>Social dances & workshops</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionEmoji}>👥</Text>
            <Text style={styles.quickActionTitle}>Find Instructors</Text>
            <Text style={styles.quickActionSubtitle}>Browse our amazing teachers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionEmoji}>🎯</Text>
            <Text style={styles.quickActionTitle}>Browse Classes</Text>
            <Text style={styles.quickActionSubtitle}>All levels welcome</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// Instructors Screen
function InstructorsScreen() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  useEffect(() => {
    loadInstructors();
  }, []);

  const loadInstructors = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllInstructors();
      setInstructors(data);
    } catch (err) {
      setError('Failed to load instructors');
      console.error('Error loading instructors:', err);
    } finally {
      setLoading(false);
    }
  };

  const showInstructorProfile = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setProfileModalVisible(true);
  };

  const closeInstructorProfile = () => {
    setProfileModalVisible(false);
    setSelectedInstructor(null);
  };

  if (loading) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Our Instructors</Text>
          <Text style={styles.screenSubtitle}>Meet the amazing teachers</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF3366" />
          <Text style={styles.loadingText}>Loading instructors...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Our Instructors</Text>
          <Text style={styles.screenSubtitle}>Meet the amazing teachers</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadInstructors}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Our Instructors</Text>
        <Text style={styles.screenSubtitle}>Meet the amazing teachers</Text>
      </View>

      <View style={styles.contentPadding}>
        {instructors.map((instructor) => (
          <TouchableOpacity key={instructor.id} style={styles.instructorListCard}>
            <View style={styles.instructorInfo}>
              <View style={styles.instructorListAvatar}>
                {instructor.imageUrl ? (
                  <Image
                    source={{ uri: instructor.imageUrl }}
                    style={styles.instructorImage}
                  />
                ) : (
                  <Text style={styles.instructorListEmoji}>
                    {instructor.name.charAt(0)}
                  </Text>
                )}
              </View>
              <View style={styles.instructorDetails}>
                <Text style={styles.instructorListName}>{instructor.name}</Text>
                <Text style={styles.instructorListSpecialty}>
                  {instructor.danceStyles.join(' & ')}
                </Text>
                <Text style={styles.instructorListLocation}>📍 {instructor.location}</Text>
                <Text style={styles.instructorListPay}>💰 ${instructor.price.lower}-{instructor.price.upper}/hr</Text>
                {instructor.totalStudents > 0 && (
                  <Text style={styles.instructorStudents}>👥 {instructor.totalStudents} students</Text>
                )}
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => showInstructorProfile(instructor)}
            >
              <Text style={styles.contactButtonText}>View Profile</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Instructor Profile Modal */}
      <Modal
        visible={profileModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeInstructorProfile}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeInstructorProfile} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Instructor Profile</Text>
            <View style={styles.modalSpacer} />
          </View>

          {selectedInstructor && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.profileHeader}>
                {selectedInstructor.imageUrl ? (
                  <Image
                    source={{ uri: selectedInstructor.imageUrl }}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.profileImagePlaceholder}>
                    <Text style={styles.profileImageText}>
                      {selectedInstructor.name.charAt(0)}
                    </Text>
                  </View>
                )}
                <Text style={styles.profileName}>{selectedInstructor.name}</Text>
                <Text style={styles.profileStyles}>
                  {selectedInstructor.danceStyles.join(' • ')}
                </Text>
              </View>

              <View style={styles.profileSection}>
                <Text style={styles.sectionTitle}>Location</Text>
                <Text style={styles.sectionText}>📍 {selectedInstructor.location}</Text>
              </View>

              <View style={styles.profileSection}>
                <Text style={styles.sectionTitle}>Pricing</Text>
                <Text style={styles.sectionText}>
                  💰 ${selectedInstructor.price.lower}-{selectedInstructor.price.upper} per hour
                </Text>
              </View>

              {selectedInstructor.bio && (
                <View style={styles.profileSection}>
                  <Text style={styles.sectionTitle}>About</Text>
                  <Text style={styles.sectionText}>{selectedInstructor.bio}</Text>
                </View>
              )}

              <View style={styles.profileSection}>
                <Text style={styles.sectionTitle}>Experience</Text>
                <Text style={styles.sectionText}>
                  ⭐ {selectedInstructor.rating.toFixed(1)} rating • {selectedInstructor.reviews} reviews
                </Text>
                {selectedInstructor.totalStudents > 0 && (
                  <Text style={styles.sectionText}>
                    👥 {selectedInstructor.totalStudents}+ students taught
                  </Text>
                )}
              </View>

              <TouchableOpacity style={styles.contactInstructorButton}>
                <Text style={styles.contactInstructorButtonText}>Contact Instructor</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

// Classes Screen
function ClassesScreen() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [danceStyle, setDanceStyle] = useState('all');
  const [location, setLocation] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showSeriesOnly, setShowSeriesOnly] = useState(false);
  const [showDropInOnly, setShowDropInOnly] = useState(false);
  const [showOpenClassesOnly, setShowOpenClassesOnly] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllClasses();
      setClasses(data);
      applyFilters(data); // Apply filters immediately after loading
    } catch (err) {
      setError('Failed to load classes');
      console.error('Error loading classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (classData = classes) => {
    let filtered = [...classData];
    
    // Filter out past classes (only show classes within 2 weeks from today)
    const today = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);
    
    filtered = filtered.filter(classItem => {
      try {
        const classDate = new Date(classItem.class_date);
        return classDate >= today && classDate <= twoWeeksFromNow;
      } catch (error) {
        console.log('Error processing date for class:', classItem.id, error);
        return false;
      }
    });

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(classItem => 
        classItem.class_name.toLowerCase().includes(term) ||
        classItem.instructor.toLowerCase().includes(term) ||
        classItem.company.name.toLowerCase().includes(term)
      );
    }

    // Apply dance style filter
    if (danceStyle && danceStyle !== 'all') {
      filtered = filtered.filter(classItem => {
        const className = classItem.class_name.toLowerCase();
        if (danceStyle === 'Salsa') return className.includes('salsa');
        if (danceStyle === 'Bachata') return className.includes('bachata');
        if (danceStyle === 'Heels') return className.includes('heel');
        if (danceStyle === 'Choreo') return className.includes('choreo') || className.includes('choreography');
        if (danceStyle === 'Other') {
          return !className.includes('salsa') && 
                 !className.includes('bachata') && 
                 !className.includes('heel') && 
                 !(className.includes('choreo') || className.includes('choreography'));
        }
        return true;
      });
    }

    // Apply location filter
    if (location && location !== 'all') {
      filtered = filtered.filter(classItem => {
        const address = classItem.company.address;
        const addressParts = address.split(',').map((part: string) => part.trim());
        let city = 'Chicago';
        
        if (addressParts.length >= 3) {
          city = addressParts[addressParts.length - 2];
        } else if (addressParts.length === 2) {
          city = addressParts[1];
        }
        
        return city === location;
      });
    }

    // Apply price range filter
    filtered = filtered.filter(classItem => {
      const price = typeof classItem.price === 'number' ? classItem.price : parseFloat(String(classItem.price).replace('$', '')) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply class type filters
    if (showSeriesOnly) {
      filtered = filtered.filter(classItem => !classItem.is_drop_in);
    }

    if (showDropInOnly) {
      filtered = filtered.filter(classItem => classItem.is_drop_in);
    }

    // Apply open classes filter
    if (showOpenClassesOnly) {
      filtered = filtered.filter(classItem => !classItem.instructor_approval_required);
    }

    setFilteredClasses(filtered);
  };

  // Apply filters when any filter state changes
  useEffect(() => {
    if (classes.length > 0) {
      applyFilters();
    }
  }, [
    classes,
    searchTerm,
    danceStyle,
    location,
    priceRange,
    showSeriesOnly,
    showDropInOnly,
    showOpenClassesOnly
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Dance Classes</Text>
          <Text style={styles.screenSubtitle}>Learn from the best instructors</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF3366" />
          <Text style={styles.loadingText}>Loading classes...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.screenHeader}>
          <Text style={styles.screenTitle}>Dance Classes</Text>
          <Text style={styles.screenSubtitle}>Learn from the best instructors</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadClasses}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Dance Classes</Text>
        <Text style={styles.screenSubtitle}>Learn from the best instructors</Text>
        
        {/* Filter Toggle Button */}
        <TouchableOpacity 
          style={styles.filterToggleButton}
          onPress={() => setFiltersVisible(!filtersVisible)}
        >
          <Text style={styles.filterToggleText}>
            {filtersVisible ? 'Hide Filters' : 'Show Filters'} ({filteredClasses.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Section */}
      {filtersVisible && (
        <View style={styles.filterSection}>
          {/* Search Input */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Search</Text>
            <View style={styles.searchInputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <View style={styles.textInputWrapper}>
                <Text 
                  style={styles.textInput}
                  onPress={() => {
                    // For now, just show a placeholder behavior
                    // In a real app, you'd implement proper TextInput handling
                  }}
                >
                  {searchTerm || 'Class, instructor or studio...'}
                </Text>
              </View>
            </View>
          </View>

          {/* Dance Style Filter */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Dance Style</Text>
            <View style={styles.filterButtonRow}>
              {['all', 'Salsa', 'Bachata', 'Heels', 'Choreo', 'Other'].map((style) => (
                <TouchableOpacity
                  key={style}
                  style={[
                    styles.filterButton,
                    danceStyle === style && styles.filterButtonActive
                  ]}
                  onPress={() => setDanceStyle(style)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    danceStyle === style && styles.filterButtonTextActive
                  ]}>
                    {style === 'all' ? 'All' : style}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location Filter */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Location</Text>
            <View style={styles.filterButtonRow}>
              {['all', 'Chicago'].map((loc) => (
                <TouchableOpacity
                  key={loc}
                  style={[
                    styles.filterButton,
                    location === loc && styles.filterButtonActive
                  ]}
                  onPress={() => setLocation(loc)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    location === loc && styles.filterButtonTextActive
                  ]}>
                    {loc === 'all' ? 'All Cities' : loc}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Class Type Filters */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Class Type</Text>
            <View style={styles.checkboxRow}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  setShowSeriesOnly(!showSeriesOnly);
                  if (!showSeriesOnly) setShowDropInOnly(false);
                }}
              >
                <Text style={styles.checkbox}>
                  {showSeriesOnly ? '☑️' : '☐'}
                </Text>
                <Text style={styles.checkboxLabel}>Series Only</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => {
                  setShowDropInOnly(!showDropInOnly);
                  if (!showDropInOnly) setShowSeriesOnly(false);
                }}
              >
                <Text style={styles.checkbox}>
                  {showDropInOnly ? '☑️' : '☐'}
                </Text>
                <Text style={styles.checkboxLabel}>Drop-in Only</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </Text>
            <View style={styles.priceRangeContainer}>
              <TouchableOpacity
                style={styles.priceButton}
                onPress={() => setPriceRange([0, 50])}
              >
                <Text style={styles.priceButtonText}>$0-50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.priceButton}
                onPress={() => setPriceRange([0, 100])}
              >
                <Text style={styles.priceButtonText}>$0-100</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.priceButton}
                onPress={() => setPriceRange([0, 200])}
              >
                <Text style={styles.priceButtonText}>All Prices</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <View style={styles.contentPadding}>
        {filteredClasses.map((classItem) => (
          <TouchableOpacity key={classItem.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>${classItem.price}</Text>
              </View>
              <Text style={styles.styleText}>{classItem.company.name}</Text>
            </View>
            
            <Text style={styles.classTitle}>{classItem.class_name}</Text>
            <Text style={styles.classInstructor}>👩‍🏫 {classItem.instructor}</Text>
            <Text style={styles.classDate}>📅 {formatDate(classItem.class_date)}</Text>
            <Text style={styles.classTime}>⏰ {formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}</Text>
            <Text style={styles.classLocation}>📍 {classItem.company.address}</Text>
            
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Class</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Events Screen
function EventsScreen() {
  const events = [
    { title: 'Salsa Night Social', date: 'Tonight 8:00 PM', location: 'Studio E Main Floor', attendees: 42, type: 'Social Dance' },
    { title: 'Bachata Workshop', date: 'Tomorrow 7:00 PM', location: 'Studio E Room B', attendees: 28, type: 'Workshop' },
    { title: 'Heels Intensive', date: 'Friday 6:30 PM', location: 'Studio E Main Floor', attendees: 18, type: 'Class' },
    { title: 'Latin Competition Prep', date: 'Sunday 2:00 PM', location: 'Studio E Room A', attendees: 12, type: 'Competition' }
  ];

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Upcoming Events</Text>
        <Text style={styles.screenSubtitle}>Join the Studio E community</Text>
      </View>

      <View style={styles.contentPadding}>
        {events.map((event, index) => (
          <TouchableOpacity key={index} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={styles.eventTypeBadge}>
                <Text style={styles.eventTypeText}>{event.type}</Text>
              </View>
              <Text style={styles.attendeeCount}>👥 {event.attendees}</Text>
            </View>
            
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDate}>📅 {event.date}</Text>
            <Text style={styles.eventLocation}>📍 {event.location}</Text>
            
            <TouchableOpacity style={styles.rsvpButton}>
              <Text style={styles.rsvpButtonText}>RSVP Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

// Chat Screen
function ChatScreen() {
  const conversations = [
    { name: 'Maria Rodriguez', lastMessage: 'Great lesson today! See you next week', time: '2m ago', unread: 2, avatar: '👩‍🏫' },
    { name: 'Studio E Team', lastMessage: 'Welcome to Studio E! How can we help?', time: '1h ago', unread: 0, avatar: '💃' },
    { name: 'Carlos Martinez', lastMessage: 'The bachata workshop was amazing!', time: '3h ago', unread: 1, avatar: '👨‍🏫' },
    { name: 'Dance Community', lastMessage: 'Who\'s coming to salsa night?', time: '1d ago', unread: 5, avatar: '🕺' }
  ];

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Messages</Text>
        <Text style={styles.screenSubtitle}>Connect with instructors and community</Text>
      </View>

      <View style={styles.contentPadding}>
        {conversations.map((conversation, index) => (
          <TouchableOpacity key={index} style={styles.chatCard}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarEmoji}>{conversation.avatar}</Text>
            </View>
            
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{conversation.name}</Text>
                <Text style={styles.chatTime}>{conversation.time}</Text>
              </View>
              <Text style={styles.chatMessage}>{conversation.lastMessage}</Text>
            </View>
            
            {conversation.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{conversation.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const tabs = [
    { name: 'Home', icon: '🏠', component: HomeScreen },
    { name: 'Instructors', icon: '👥', component: InstructorsScreen },
    { name: 'Classes', icon: '🎯', component: ClassesScreen },
    { name: 'Events', icon: '📅', component: EventsScreen },
    { name: 'Chat', icon: '💬', component: ChatScreen },
  ];

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component || HomeScreen;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Main Content */}
      <View style={styles.mainContent}>
        <ActiveComponent />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tabButton, activeTab === tab.name && styles.activeTabButton]}
            onPress={() => setActiveTab(tab.name)}
          >
            <Text style={[styles.tabIcon, activeTab === tab.name && styles.activeTabIcon]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, activeTab === tab.name && styles.activeTabLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenHeader: {
    backgroundColor: '#FF3366',
    paddingTop: 80,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  contentPadding: {
    padding: 20,
  },
  hero: {
    backgroundColor: '#FF3366',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 24,
    lineHeight: 24,
  },
  searchSection: {
    width: '100%',
    marginBottom: 24,
  },
  searchButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3366',
  },
  valueProps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  valueProp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  valuePropEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  valuePropText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  statsBadge: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3366',
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    backgroundColor: 'white',
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  danceStyleCard: {
    width: 160,
    marginRight: 16,
    alignItems: 'center',
  },
  danceStyleImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  danceStyleEmoji: {
    fontSize: 48,
  },
  danceStyleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  danceStyleCount: {
    fontSize: 14,
    color: '#666',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Instructors Screen Styles
  instructorListCard: {
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
  instructorListAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3366',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructorListEmoji: {
    fontSize: 24,
  },
  instructorDetails: {
    flex: 1,
  },
  instructorListName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  instructorListSpecialty: {
    fontSize: 16,
    color: '#FF3366',
    fontWeight: '600',
    marginBottom: 4,
  },
  instructorListExperience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  instructorListRating: {
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
  contactButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  // Classes Screen Styles
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
  levelBadge: {
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
  classInstructor: {
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
    marginBottom: 8,
  },
  classLocation: {
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
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  // Events Screen Styles
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
  eventTypeBadge: {
    backgroundColor: '#FF3366',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventTypeText: {
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
  rsvpButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  // Chat Screen Styles
  chatCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatAvatarEmoji: {
    fontSize: 24,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  unreadBadge: {
    backgroundColor: '#FF3366',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingBottom: 34, // Extra padding for iPhone home indicator
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    // Active tab styling handled by text/icon colors
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeTabIcon: {
    // Active state handled by color
  },
  tabLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#FF3366',
    fontWeight: '600',
  },
  // Loading and Error Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3366',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF3366',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  instructorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  instructorListLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  instructorListPay: {
    fontSize: 14,
    color: '#FF3366',
    fontWeight: '600',
    marginBottom: 2,
  },
  instructorStudents: {
    fontSize: 14,
    color: '#666',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalSpacer: {
    width: 30,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF3366',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileImageText: {
    fontSize: 48,
    color: 'white',
    fontWeight: '600',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  profileStyles: {
    fontSize: 16,
    color: '#FF3366',
    fontWeight: '600',
  },
  profileSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 4,
  },
  contactInstructorButton: {
    backgroundColor: '#FF3366',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  contactInstructorButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Filter Styles
  filterToggleButton: {
    backgroundColor: '#FF3366',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 12,
  },
  filterToggleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  filterSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterRow: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  textInputWrapper: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    color: '#333',
  },
  filterButtonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    gap: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 18,
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priceButton: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  priceButtonText: {
    fontSize: 14,
    color: '#666',
  },
});
