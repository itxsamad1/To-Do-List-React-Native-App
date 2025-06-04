import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [currentDate] = useState(new Date());

  useEffect(() => {
    // Load tasks from storage in a real app
    const loadTasks = () => {
      // Simulated tasks for demo
      setTasks([
        { id: '1', title: 'Complete React Native Tutorial', completed: false },
        { id: '2', title: 'Update Project Documentation', completed: true },
      ]);
    };
    loadTasks();
  }, []);

  const addTask = () => {
    if (newTask.trim().length === 0) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    const task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      date: new Date(),
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setTasks(tasks.filter((task) => task.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000000' : '#F2F2F7' }
    ]}>
      <Text style={[
        styles.date,
        { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' }
      ]}>
        {currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
              color: isDarkMode ? '#FFFFFF' : '#000000'
            }
          ]}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add a new task"
          placeholderTextColor={isDarkMode ? '#8E8E93' : '#3C3C43'}
          returnKeyType="done"
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={[
            styles.taskContainer,
            { backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF' }
          ]}>
            <TouchableOpacity
              style={styles.taskCheckbox}
              onPress={() => toggleTask(item.id)}
            >
              <Icon
                name={item.completed ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="#007AFF"
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.taskTitle,
                { color: isDarkMode ? '#FFFFFF' : '#1C1C1E' },
                item.completed && styles.taskCompleted,
              ]}
            >
              {item.title}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Icon name="delete" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskCheckbox: {
    marginRight: 10,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default HomeScreen; 