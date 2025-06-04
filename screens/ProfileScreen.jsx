import React, { useCallback, useState, useMemo, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../App';

const ProfileScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [pastTasks] = useState([
    {
      id: '1',
      title: 'Submit Project Report',
      completed: true,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    },
    {
      id: '2',
      title: 'Team Meeting',
      completed: true,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: '3',
      title: 'Code Review',
      completed: false,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
  ]);

  const groupedTasks = useMemo(() => {
    const groups = {};
    pastTasks.forEach(task => {
      const dateStr = task.date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(task);
    });
    return Object.entries(groups).map(([date, tasks]) => ({
      date,
      tasks,
    }));
  }, [pastTasks]);

  const getCompletionStatus = useCallback((tasks) => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    return `${completed}/${total} completed`;
  }, []);

  const renderTask = ({ item }) => (
    <View style={[
      styles.taskContainer,
      { 
        backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
        borderBottomColor: isDarkMode ? '#2C2C2E' : '#E5E5EA'
      }
    ]}>
      <Icon
        name={item.completed ? 'check-circle' : 'cancel'}
        size={24}
        color={item.completed ? '#34C759' : '#FF3B30'}
        style={styles.taskIcon}
      />
      <Text style={[
        styles.taskTitle,
        { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' },
        item.completed && styles.taskCompleted
      ]}>
        {item.title}
      </Text>
    </View>
  );

  const renderDateGroup = ({ item }) => (
    <View style={[
      styles.dateGroup,
      { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }
    ]}>
      <View style={[
        styles.dateHeader,
        { backgroundColor: isDarkMode ? '#2C2C2E' : '#007AFF' }
      ]}>
        <Text style={styles.dateTitle}>{item.date}</Text>
        <Text style={styles.completionStatus}>
          {getCompletionStatus(item.tasks)}
        </Text>
      </View>
      <FlatList
        data={item.tasks}
        renderItem={renderTask}
        keyExtractor={(task) => task.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' }
    ]}>
      <Text style={[
        styles.header,
        { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }
      ]}>
        Past Tasks
      </Text>
      <FlatList
        data={groupedTasks}
        renderItem={renderDateGroup}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    color: '#1C1C1E',
  },
  list: {
    padding: 20,
    paddingTop: 0,
  },
  dateGroup: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007AFF',
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  completionStatus: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  taskIcon: {
    marginRight: 10,
  },
  taskTitle: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
});

export default ProfileScreen; 