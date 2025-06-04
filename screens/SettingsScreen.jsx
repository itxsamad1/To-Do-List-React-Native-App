import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  const settingsSummary = useMemo(() => {
    const enabledSettings = [
      isDarkMode && 'Dark Mode',
      isNotificationsEnabled && 'Notifications',
      isLocationEnabled && 'Location',
    ].filter(Boolean);

    return `Enabled settings: ${enabledSettings.join(', ') || 'None'}`;
  }, [isDarkMode, isNotificationsEnabled, isLocationEnabled]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
      
      <View style={styles.settingRow}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.text}>Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={setIsNotificationsEnabled}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.text}>Location</Text>
        <Switch
          value={isLocationEnabled}
          onValueChange={setIsLocationEnabled}
        />
      </View>

      <Text style={[styles.text, styles.summary]}>{settingsSummary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  summary: {
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default SettingsScreen; 