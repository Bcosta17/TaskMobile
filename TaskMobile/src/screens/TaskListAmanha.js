import React, {Component} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import image from '../../assets/imgs/tomorrow.jpg';
import commonStyles from '../commonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';

import {Task} from '../components/Task';
import AddTask from './AddTask';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { server, showError } from '../common';
import axios from 'axios';
import Header from '../components/Header';


const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
};

export default class TaskList extends Component  {
 
  state = {
    ...initialState,
  };
  
  componentDidMount = async () => {
    const stateString  = await AsyncStorage.getItem('tasksState');
    const savedState = JSON.parse(stateString) || initialState;
    
    this.setState({
      showDoneTasks: savedState.showDoneTasks
    }, this.filterTasks);

    this.loadTasks()

  };

   loadTasks = async () => {
    try {
      const maxDate = moment().add(1,'day').format('YYYY-MM-DD 23:59:59');
      const res = await axios.get(`${server}/task/${maxDate}`);
      console.log(maxDate)
      this.setState({tasks: res.data.data}, this.filterTasks);
    } catch (error) {
      showError(error);
      console.log(error);
    }
  }

 toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      //pegar as tarefas não concluidas
      const pending = (task) => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }

    this.setState({visibleTasks});
    AsyncStorage.setItem('tasksState', JSON.stringify({
      showDoneTasks: this.state.showDoneTasks
    }));
  };

  // função para alternar entre concluido ou não.
  toggleTask = async id => {
    try {
      await axios.put(`${server}/task/${id}`)
      this.loadTasks()
    } catch (error) {
      showError(error)
    }
    
  };

 addTask = async (newTask) => {
    if (!newTask.desc === true || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada!');
      return;
    }

    try {
      await axios.post(`${server}/task`,{
        desc: newTask.desc,
        estimateAt: newTask.date
      });
      this.setState({showAddTask: false}, this.loadTasks)
    } catch (error) {
      showError(error)
    }
  };

  deleteTask = async (id) => {
    
   try{
       await axios.delete(`${server}/task/${id}`)
       this.loadTasks()
   } catch(error){
       showError(error);
   }
  };

  
   today = moment().locale('pt-br').format('ddd, D [de] MMM');
    render() {

    return (
      
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({showAddTask: false})}
          onSave={this.addTask}
        />
        <ImageBackground source={image} style={styles.background}>
          <View style={styles.iconBar}>
            <Header/>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Amanhã</Text>
            <Text style={styles.subTitle}>{this.today}</Text>
          </View>
        </ImageBackground>
        
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item._id}`}
            renderItem={({item}) => (
              <Task
                {...item}
                toggleTask={this.toggleTask}
                onDelete={this.deleteTask}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => this.setState({showAddTask: true})}>
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.colors.tomorrow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
