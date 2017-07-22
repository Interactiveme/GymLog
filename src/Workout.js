import React, { Component } from 'react';
import AddExercise from './AddExercise';

class Workout extends Component {

  constructor(){
    super();
    this.state = {
      exercise:null
    }
  }

  addExercise(workoutId, exercise, callback){
    this.setState({exercise:null});
    this.props.addExercise(workoutId, exercise, callback);
  }

  deleteExercise(exerciseId){
    this.setState({exercise:null});
    this.props.deleteExercise(this.props.workout.id, exerciseId);
  }

  editExercise(exerciseId, b){
    var item =this.refs[exerciseId];
    var data = item.dataset;
    this.setState({exercise:data});
  }

  render() {

    let workout, exercises;

    if(this.props.workout){

      workout = this.props.workout;

      exercises = workout.exercises.map(ex => {
      
        return (
          <tr ref={ex.id} data-id={ex.id} data-name={ex.name} data-reps={ex.reps} data-sets={ex.sets} data-weight={ex.weight}>
            <td>{ex.name}</td>
            <td>{ex.reps}</td>
            <td>{ex.sets}</td>
            <td>{ex.weight}</td>
            <td>
              <div className="pull-right">
              <span className="glyphicon glyphicon-pencil edit-icon-item" onClick={this.editExercise.bind(this,ex.id)}></span>            
              <span className="glyphicon glyphicon-remove edit-icon-item" onClick={this.deleteExercise.bind(this,ex.id)}></span>
              </div>
            </td>
          </tr>
        );
      });
    }

    return (

      <div className="Workout">
        <h2>{workout.name}</h2>
        <AddExercise addExercise={this.addExercise.bind(this)} workout={this.props.workout} exercise={this.state.exercise} modalClose={this.props.modalClose}/>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Weight</th>
                <th></th>
            
              </tr>
            </thead>
            <tbody>
            {exercises}
            </tbody>
          </table>
        </div>      
        <div>
          <a href="#" onClick={() => this.props.showWorkoutList()} > Back to workouts </a>   
        </div>
      </div>
      );
  }
}

export default Workout;
