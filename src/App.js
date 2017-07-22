import React, { Component } from 'react';

import './App.css';

import uuid from 'uuid';
import WorkoutList from './WorkoutList';
import Workout from './Workout';



class App extends Component {

  constructor(){
    super();

    var state = {
      view:'workoutlist',
      workoutId:4,
      workoutToEdit:null
    };

    if (!localStorage.workouts){
      localStorage.workouts = JSON.stringify(this.loadWorkouts());
      console.log("loading workouts into localStorage");
    }
    
    state.workouts = JSON.parse(localStorage.workouts);
     
    this.state = state;

  }

  loadWorkouts(){
    return [{
        name:"Workout 1",
        id:uuid.v4(),
        exercises:[]
      },{
        name:"Workout 2",
        id:uuid.v4(),
        exercises:[]
      }];
  }

  getActiveTemplate(){
    switch(this.state.view){
      case 'workoutlist':
        return  <WorkoutList 
                            workoutToEdit={this.state.workoutToEdit}
                            workouts={this.state.workouts} 
                            addWorkout={this.addWorkout.bind(this)}
                            showWorkout={this.showWorkout.bind(this)}
                            editWorkout={this.editWorkout.bind(this)} 
                            deleteWorkout={this.deleteWorkout.bind(this)} 
                            modalClose={this.modalClose.bind(this)}

                />    

      case 'workout':
        let workout = this.state.workouts.filter(w => w.id === this.state.workoutId)[0];
        return <Workout  
          workout={ workout }
          showWorkoutList={this.showWorkoutList.bind(this)}
          addExercise={this.addExercise.bind(this)} 
          deleteExercise={this.deleteExercise.bind(this)} 
          />    
      
      default:
        return "nothing to see here";
    }

  }

  deleteExercise(workoutId, exerciseId){
    let workouts = this.state.workouts;
    let workout = workouts.filter(w => w.id === workoutId)[0];
    let exercises = workout.exercises.filter(e => e.id !== exerciseId);
    workout.exercises = exercises;

    this.setState({workouts: workouts});
    this.setState({workoutToEdit:null});
    this.saveWorkouts();
  }

  deleteWorkout(workoutId){
    let workouts = this.state.workouts.filter(w => w.id !== workoutId);
    this.setState({workouts: workouts});
    this.setState({workoutToEdit:null});
    this.saveWorkouts();
  }

  showWorkout(id){
    this.setState({view: "workout", workoutId:id});
  }

  showWorkoutList(){
    this.setState({view: "workoutlist"});
  }

  editWorkout(workoutId,callback){
 
    let workout = this.state.workouts.filter(w => w.id === workoutId)[0];
    this.setState({workoutToEdit:workout});
  }

  modalClose(){
    this.setState({workoutToEdit:null});
  }

  addWorkout(workout,callback){

    let workouts = this.state.workouts; 
    let workoutToUpdate = workouts.filter(w => w.id === workout.id)[0];
    if(!workoutToUpdate){
        workoutToUpdate={};
        workoutToUpdate.exercises=[];
        workouts.push(workoutToUpdate);
    }
    
    workoutToUpdate.name = workout.name; 
    workoutToUpdate.id = workout.id;

    this.setState({workouts: workouts});
    this.setState({workoutToEdit:null});

    this.saveWorkouts();

    callback();
  }

  addExercise(workoutId, exercise, callback){
    let workouts = this.state.workouts; 
    let workout = workouts.filter(w => w.id === workoutId)[0];
    if(!workout.exercises){
      workout.exercises=[];
    }
    if(exercise !== null){
      
      let exerciseToUpdate = workout.exercises.filter(e => e.id === exercise.id)[0];
      if(!exerciseToUpdate){
        workout.exercises.push(exercise);
      }else{
        for(var k in exercise) exerciseToUpdate[k]=exercise[k];
      }
      this.setState({workouts: workouts});
      this.saveWorkouts();

      callback();
    }
  }

  saveWorkouts(){
    localStorage.workouts = JSON.stringify(this.state.workouts);
  }

  render() {
    return (
      <div>
        <h1>Workouts</h1>
        {this.getActiveTemplate()}
      </div>
      );
  }
}

export default App;
