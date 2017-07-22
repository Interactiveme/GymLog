import React, { Component } from 'react';
import uuid from 'uuid';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';


class AddExercise extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      showExerciseModal:false
    }
  }

  saveExercise(e){
    var m = this;
    if(this.refs.name.value === ''){
      alert('Name is required');
    } else {
      let exercise= this.props.exercise;
      
      if(exercise === null){
        exercise = {};
        exercise.id = uuid.v4();
      }

      exercise.name = this.refs.name.value;
      exercise.reps = this.refs.reps.value;
      exercise.sets = this.refs.sets.value;
      exercise.weight = this.refs.weight.value;
      
      this.props.addExercise(this.props.workout.id,exercise,function(){
        m.hideModal();
      });
    }

    e.preventDefault();
  }

  componentWillReceiveProps(nextProps){
    
    if(nextProps.exercise !== null){
      this.showModal();
    }
  }

  getPropertyValue(fieldName){
    
    if(this.props.exercise){
      return this.props.exercise[fieldName];
    }
  }

 showModal(){
    this.setState({showExerciseModal: true});
  }

  hideModal() {
    this.setState({showExerciseModal: false});
  }

  render() {
    return (
      <div>
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showModal.bind(this)}>
          Add Exercise
        </Button>
      </ButtonToolbar>
      <Modal
          show={this.state.showExerciseModal}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div>
                <label>Name</label><br />
                <input type="text" ref="name" defaultValue={this.getPropertyValue("name") } />
              </div>
              <div>
                <label>Reps</label><br />
                <input type="number" ref="reps" defaultValue={this.getPropertyValue("reps")} />  
              </div>
              <div>
                <label>Sets</label><br />
                <input type="number" ref="sets" defaultValue={this.getPropertyValue("sets")} />  
              </div>
              <div>
                <label>Weight</label><br />
                <input type="number" ref="weight" defaultValue={this.getPropertyValue("weight")} />  
              </div>
              <br />             
            </form> 
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.saveExercise.bind(this)}>Save</Button>
            <Button onClick={this.hideModal.bind(this)}>Close</Button>
          </Modal.Footer>

      </Modal>
      </div>
    );
  }
}

export default AddExercise;