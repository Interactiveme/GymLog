import React, { Component } from 'react';
import uuid from 'uuid';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';


class AddWorkout extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      showWorkoutModal:false
    }
  }

  saveWorkout(e){
    var m = this;
    if(this.refs.name.value === ''){
      alert('Name is required');
    } else {
      let workout= this.props.workoutToEdit;
      
      if(!workout){
        workout = {};
        workout.id = uuid.v4();
      }

      workout.name = this.refs.name.value;
      
      this.props.addWorkout(workout,function(){
        m.hideModal();
      });
    }

    e.preventDefault();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.workoutToEdit){
      this.showModal();
    }
  }

  getPropertyValue(fieldName){    
    if(this.props.workoutToEdit){
      return this.props.workoutToEdit[fieldName];
    }
  }

 showModal(){
    this.setState({showWorkoutModal: true});
  }

  hideModal() {
    this.setState({showWorkoutModal: false});
    this.props.modalClose();
  }

  render() {
    return (
      <div>
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.showModal.bind(this)}>
          Add Workout
        </Button>
      </ButtonToolbar>
      <Modal
          show={this.state.showWorkoutModal}
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
              
              <br />             
            </form> 
          </Modal.Body>
          
          <Modal.Footer>
            <Button onClick={this.saveWorkout.bind(this)}>Save</Button>
            <Button onClick={this.hideModal.bind(this)}>Close</Button>
          </Modal.Footer>

      </Modal>
      </div>
    );
  }
}

export default AddWorkout;