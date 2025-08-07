import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../../lib/auth/AuthContext';

export default function LoginScreen() {
  const { signInWithGoogle, signInWithEmail, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      clearError();
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      setEmailLoading(true);
      clearError();
      await signInWithEmail(email.trim());
      Alert.alert(
        'Check Your Email',
        'We sent you a magic link! Click the link in your email to sign in.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Email sign-in failed:', error);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logo}>Studio E</Text>
          <Text style={styles.tagline}>Feel confident, sexy, and unstoppable</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your dance journey</Text>

          {/* Google Sign In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#666" />
            ) : (
              <>
                <Text style={styles.googleIcon}>🔍</Text>
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Sign In */}
          <View style={styles.emailSection}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!emailLoading}
            />
            
            <TouchableOpacity
              style={[styles.emailButton, emailLoading && styles.emailButtonDisabled]}
              onPress={handleEmailSignIn}
              disabled={emailLoading}
            >
              {emailLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.emailButtonText}>Send Magic Link</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={clearError} style={styles.errorDismiss}>
                <Text style={styles.errorDismissText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.terms}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF3366',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#666',
  },
  emailSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emailInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  emailButton: {
    backgroundColor: '#FF3366',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  emailButtonDisabled: {
    opacity: 0.7,
  },
  emailButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee',
    borderWidth: 1,
    borderColor: '#fcc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    flex: 1,
    color: '#c33',
    fontSize: 14,
  },
  errorDismiss: {
    padding: 4,
  },
  errorDismissText: {
    color: '#c33',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 24,
  },
}); 