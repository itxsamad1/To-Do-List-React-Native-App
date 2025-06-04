/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// Create Theme Context
export const ThemeContext = createContext();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const drawerItems = [
    { icon: 'today', label: "Today's Tasks", onPress: () => navigation.navigate('MainTabs', { screen: 'Home' }) },
    { icon: 'history', label: 'Task History', onPress: () => navigation.navigate('MainTabs', { screen: 'Profile' }) },
    { icon: 'event', label: 'Upcoming Tasks', onPress: () => navigation.navigate('MainTabs', { screen: 'Settings' }) },
    { icon: 'category', label: 'Categories', onPress: () => alert('Categories coming soon!') },
    { icon: 'bar-chart', label: 'Statistics', onPress: () => alert('Statistics coming soon!') },
    { icon: 'backup', label: 'Backup Tasks', onPress: () => alert('Backup feature coming soon!') },
    { icon: 'help-outline', label: 'Help & Support', onPress: () => alert('Help section coming soon!') },
  ];

  return (
    <ScrollView style={[
      styles.drawerContainer,
      { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }
    ]}>
      <View style={[
        styles.drawerHeader,
        { borderBottomColor: isDarkMode ? '#333333' : '#E5E5EA' }
      ]}>
        <Icon name="check-circle" size={50} color="#007AFF" />
        <Text style={[
          styles.drawerTitle,
          { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }
        ]}>
          Todo List App
        </Text>
      </View>
      {drawerItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.drawerItem,
            { backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7' }
          ]}
          onPress={item.onPress}
        >
          <Icon 
            name={item.icon} 
            size={24} 
            color={isDarkMode ? '#FFFFFF' : '#1C1C1E'} 
          />
          <Text style={[
            styles.drawerLabel,
            { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const TabNavigator = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'today';
              break;
            case 'Profile':
              iconName = 'history';
              break;
            case 'Settings':
              iconName = 'event';
              break;
            default:
              iconName = 'error';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: isDarkMode ? '#8E8E93' : '#3C3C43',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          borderTopColor: isDarkMode ? '#333333' : '#E5E5EA',
        },
        headerStyle: {
          backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          borderBottomColor: isDarkMode ? '#333333' : '#E5E5EA',
          borderBottomWidth: 1,
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: "Today's Tasks",
          tabBarLabel: "Today"
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Task History',
          tabBarLabel: 'History'
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          title: 'Upcoming Tasks',
          tabBarLabel: 'Upcoming'
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerTitle: 'Todo List App',
              headerStyle: {
                backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                borderBottomColor: isDarkMode ? '#333333' : '#E5E5EA',
                borderBottomWidth: 1,
              },
              headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              drawerStyle: {
                backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',
              },
            }}
          >
            <Drawer.Screen name="MainTabs" component={TabNavigator} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  drawerLabel: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default App;
