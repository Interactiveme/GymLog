import React, { Component } from 'react';
import AddWorkout from './AddWorkout';

class WorkoutList extends Component {

  handleClick(id){
    console.log(id);
    this.props.showWorkout(id);
  }

  editWorkout(id){
    this.props.editWorkout(id);
  }

  deleteWorkout(id){
    this.props.deleteWorkout(id);
  }

  render() {

    let workouts;
    if(this.props.workouts){

      workouts = this.props.workouts.map(w => {
        return (
          <li className="list-group-item" key={w.id}>
            <div onClick={this.handleClick.bind(this,w.id)}>
              {w.name}
            </div>
            <div className="pull-right edit-icon">
              <span onClick={this.editWorkout.bind(this,w.id)} className="glyphicon glyphicon-pencil edit-icon-item"></span>
              <span onClick={this.deleteWorkout.bind(this,w.id)} className="glyphicon glyphicon-remove edit-icon-item"></span>
            </div>
          </li>
        );
      });
    }

    return (
      <div className="Workouts">
        
        <AddWorkout addWorkout={this.props.addWorkout} workoutToEdit={this.props.workoutToEdit}  modalClose={this.props.modalClose} />
        <ul className="list-group">
        {workouts}
        </ul>
      </div>
    );  
  }
}

export default WorkoutList;