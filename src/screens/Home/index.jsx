import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Keyboard, Text } from 'react-native';
import firebase from '../../firebase/firebaseConnection';


import { ScreenLogin } from '../../components/login'; 
import { TaskList } from '../../components/TaksList';

import { Ionicons, Feather} from '@expo/vector-icons';

import { 
   Container, 
   AddTask, 
   InputTask, 
   ButtonTask, 
   ButtonCancelEditTask, 
   TextCancelEditTask } from './styled';

export function Home() {
   const [user, setUser] = useState(null);
   const [tasks, setTasks] = useState([])
   const [newTask, setNewTask] = useState('');
   const [key, setKey] = useState('');
   const inputRef = useRef(null);
   
   //como manter gravado oq foi adicionado na lista antes
   useEffect(() => {

      function getUser(){
         if(!user) { 
            return;
         }

         firebase.database().ref('tasks').child(user).once('value', (snapshot) => {
            setTasks([]);
            
            snapshot.forEach((childItem) =>{
               let data = {
                  key: childItem.key,
                  nome: childItem.val().nome
               }

               setTasks(oldTasks => [...oldTasks, data]) //manter tarefas antigas e adiciona novas por causa do 'data'
            })
         })
      }

      getUser();

   }, [user])//[user] conforme sofrer alteração vai chamar dados antigos ao usuário

   //se não tiver nada dentro de usuários quero que apareça o componente de login. Por isso user começa como 'null'.
   if(!user) { 
        return <ScreenLogin changeStatus={ (user) => setUser(user) }/>
   }

   function handleDelete(key){
      firebase.database().ref('tasks').child(user).child(key).remove()
      .then(() => {
         const findTasks = tasks.filter( item => item.key !== key)
         setTasks(findTasks)
      })

   }

   function handleEdit(data) {
      setKey(data.key);
      setNewTask(data.nome);
      inputRef.current.focus();
   }

   function calcelEdit() {
      setKey('');
      setNewTask('');
      Keyboard.dismiss();
   }

   //adiciona e armazena tarefas em banco de dados
   function handleAdd() {
      if(newTask === '') {
         return;
      }
      //Caso usuário queira editar uma tarefa
      if(key !== '') {
         firebase.database().ref('tasks').child(user).child(key).update({
            nome: newTask
         })
         .then(() => {
            //procura em toda nossa lista de tarefas, a igualdade entre key e data.key, para saber qual item está sendo clicado. 
            const tasksIndex = tasks.findIndex( item => item.key === key )
            //criamos uma variavel que clonao taks, ou seja, pega oq foi escrito nele
            const taskClone = tasks;
            //aqui alteramos o nome da tarefa
            taskClone[tasksIndex].nome = newTask
            //aqui adicionamos a nova tarefa
            setTasks([...taskClone])
         })
         Keyboard.dismiss();
         setNewTask('');
         setKey('');
         return; //para parar aqui, assim não vai criar uma tarefa nossa, e sim atualizar. 
      }

      //cria um nó no banco de dados chamado 'tasks' que recebe o 'user'
      let taskss = firebase.database().ref('tasks').child(user);
      
      //cria chave aleatória
      let keys = taskss.push().key
      
      //coloca nome da tarefa no banco de dados
      taskss.child(keys).set({
         nome: newTask
      })

      //se der certo: 
      .then(()=>{
         const data = {
            key: keys, //recebe a chave aleatória que criamos
            nome: newTask //recebe o nome da tarefa
         };
         
         setTasks(oldTasks => [...oldTasks, data]) //manter tarefas antigas e adiciona novas por causa do 'data'
      })

      Keyboard.dismiss();
      setNewTask('');
   }
    return(
      <Container>
         { key.length > 0 && (
            <ButtonCancelEditTask onPress={calcelEdit}>
               <Feather name="x-circle" size={23} color="#593942" />
               <TextCancelEditTask>Mode: Task switching enabled. Click to cancel.</TextCancelEditTask>
            </ButtonCancelEditTask>
         )}
         
         
         <AddTask>
            <InputTask
               placeholder="What's your next task?"
               value={newTask}
               onChangeText={ (text) => setNewTask(text) }
               ref={inputRef}
            />

            <ButtonTask onPress={handleAdd}>
               <Ionicons name="add-circle-sharp" size={45} color="#E5ACA5"/>
            </ButtonTask>
         </AddTask>  

         <FlatList
            data={tasks} //recebe as tarefas em forma de lista
            keyExtractor={ (item) => item.key }
            renderItem={ ({item}) => ( //envia itens da lista por pripriedade
               <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
            )}
         />
      </Container>
        
    )
}