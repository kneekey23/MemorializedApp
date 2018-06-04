import React, { Component } from 'react'
import { Form, FormControl, FormGroup} from 'react-bootstrap';
import ObituaryForm from '../../components/obituaryForm';
import NavBarComp from '../../components/navigation';
import "./ObituaryCreation.css";

class ObituaryCreation extends Component {


      render() {
        return (
            <div>
                <h1>Create your Obituary</h1>
                <ObituaryForm />
            </div>

        );
      }
}

export default ObituaryCreation