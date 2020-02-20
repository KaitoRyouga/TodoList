import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

export const getKey = async () => {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    if (!value) return [];
    const valueValid = JSON.parse(value);
    return valueValid;
  } catch (error) {
    console.log('Error retrieving data' + error);
  }
};

saveKey = async value => {
  try {
    const ArrayValid = Array.isArray(value) ? value : [];
    const valueValid = JSON.stringify(ArrayValid);
    if (valueValid != null) {
      return AsyncStorage.setItem('@MySuperStore:key', valueValid);
    }
  } catch (error) {
    console.log('Error saving data' + error);
  }
};

// async removeKey()
 
export const addData = (name, types) => {
  if (!name) {
    console.log('Name is empty');
  }

  var data = {
    id: uuid.v4(),
    name: name,
    type: types,
    complete: false,
  };
  return getKey().then(value => {
    var tasks = [].concat(data, value);
    console.log(tasks);
    return saveKey(tasks).then(() => data);
    
  });
};

export const changeComplete = (id) => {
  return getKey().then(tasks => {
    const taskId = tasks.map(task => {
      if (task.id == id) {
        return {
          ...task,
          complete: !task.complete
        }
      }
      return task
    })
    saveKey(taskId)

    return getKey(taskId).then(() => taskId)
  })
}

export const remove = (id) => {
  return getKey().then(tasks => {
    const taskId = tasks.filter(task => task.id != id)

    return saveKey(taskId).then(() => taskId)
  })
}