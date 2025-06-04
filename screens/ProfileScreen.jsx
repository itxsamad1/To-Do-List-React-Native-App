import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  });

  const updateAge = useCallback(() => {
    setUserInfo(prev => ({
      ...prev,
      age: prev.age + 1
    }));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.text}>Name: {userInfo.name}</Text>
      <Text style={styles.text}>Email: {userInfo.email}</Text>
      <Text style={styles.text}>Age: {userInfo.age}</Text>
      <Button
        title="Increment Age"
        onPress={updateAge}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen; 