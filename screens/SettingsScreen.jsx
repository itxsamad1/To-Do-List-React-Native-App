import React, { useState, useMemo, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../App';

const SettingsScreen = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      id: '1',
      title: 'Project Deadline',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      priority: 'high',
    },
    {
      id: '2',
      title: 'Client Meeting',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Team Review',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
      priority: 'low',
    },
  ]);

  const [settings, setSettings] = useState({
    enableReminders: true,
    showPriority: true,
  });

  const [newTask, setNewTask] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');

  const groupedTasks = useMemo(() => {
    const groups = {};
    upcomingTasks.forEach(task => {
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
      tasks: tasks.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }),
    }));
  }, [upcomingTasks]);

  const addTask = () => {
    if (newTask.trim().length === 0) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask,
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow by default
      priority: selectedPriority,
    };

    setUpcomingTasks([...upcomingTasks, task]);
    setNewTask('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#8E8E93';
    }
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(item.priority) }]} />
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.priorityText}>{item.priority}</Text>
    </View>
  );

  const renderDateGroup = ({ item }) => (
    <View style={styles.dateGroup}>
      <Text style={styles.dateTitle}>{item.date}</Text>
      <FlatList
        data={item.tasks}
        renderItem={renderTask}
        keyExtractor={(task) => task.id}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' }
      ]}
    >
      <View style={[styles.settingsSection, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
          Task Settings
        </Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
            Enable Reminders
          </Text>
          <Switch
            value={settings.enableReminders}
            onValueChange={(value) =>
              setSettings({ ...settings, enableReminders: value })
            }
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
            Dark Mode
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
            Show Priority
          </Text>
          <Switch
            value={settings.showPriority}
            onValueChange={(value) =>
              setSettings({ ...settings, showPriority: value })
            }
          />
        </View>
      </View>

      <View style={[styles.addTaskSection, { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }]}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
          Add Upcoming Task
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? '#2C2C2E' : '#F2F2F7',
                color: isDarkMode ? '#FFFFFF' : '#000000'
              }
            ]}
            value={newTask}
            onChangeText={setNewTask}
            placeholder="Enter task title"
            placeholderTextColor={isDarkMode ? '#8E8E93' : '#3C3C43'}
          />
          <View style={styles.prioritySelector}>
            {['low', 'medium', 'high'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  {
                    backgroundColor:
                      selectedPriority === priority
                        ? getPriorityColor(priority)
                        : isDarkMode ? '#2C2C2E' : '#E5E5EA',
                  },
                ]}
                onPress={() => setSelectedPriority(priority)}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    {
                      color:
                        selectedPriority === priority || isDarkMode
                          ? '#FFFFFF'
                          : '#1C1C1E',
                    },
                  ]}
                >
                  {priority}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Icon name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
        Upcoming Tasks
      </Text>
      <View style={styles.upcomingTasksContainer}>
        {groupedTasks.map((group) => (
          <View 
            key={group.date} 
            style={[
              styles.dateGroup,
              { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }
            ]}
          >
            <Text style={[styles.dateTitle, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
              {group.date}
            </Text>
            {group.tasks.map((task) => (
              <View 
                key={task.id} 
                style={[
                  styles.taskContainer,
                  { backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF' }
                ]}
              >
                <View 
                  style={[
                    styles.priorityIndicator,
                    { backgroundColor: getPriorityColor(task.priority) }
                  ]} 
                />
                <Text style={[styles.taskTitle, { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }]}>
                  {task.title}
                </Text>
                <Text style={styles.priorityText}>
                  {task.priority}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1C1C1E',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1C1C1E',
  },
  addTaskSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 48,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  prioritySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  addButton: {
    backgroundColor: '#007AFF',
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  dateGroup: {
    marginBottom: 20,
  },
  dateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1C1C1E',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 15,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  priorityText: {
    fontSize: 14,
    color: '#8E8E93',
    textTransform: 'capitalize',
  },
  upcomingTasksContainer: {
    flex: 1,
  },
});

export default SettingsScreen; 