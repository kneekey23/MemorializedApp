import React, { Component } from 'react'
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Button} from 'react-bootstrap';
import { setWeb3Instance, getObituaries, obituaryContract } from '../services/blockChainService'
import NavBarComp from './navigation'
import ipfsAPI from 'ipfs-api';

class ObituaryForm extends Component {
    constructor(props, context) {
        super(props, context);

    this.ipfsApi = ipfsAPI('localhost', '5001')
    this.handleClick = this.handleClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurvivedByChange = this.handleSurvivedByChange.bind(this);
    this.handleObituaryChange = this.handleObituaryChange.bind(this);
    this.handlePictureChange = this.handlePictureChange.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);

    this.state = {
      deceasedName: '',
      survivedBy: '',
      obituary: '',
      pictureHash: 'test',
      ipfsInfo: 'https://ipfs.io/ipfs/',
      file: '',
      showPicturePreview: false
    };
      }

      componentDidMount() {
       
      }

      getValidationState() {
        const length = this.state.obituary.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
      }

      handleNameChange(e) {
        this.setState({deceasedName: e.target.value});
      }

      handleObituaryChange(e){
        this.setState({obituary: e.target.value});
      }

      handleSurvivedByChange(e){
        this.setState({survivedBy: e.target.value});
      }

      handlePictureChange(e) {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        let reader = new window.FileReader();
        reader.onloadend = () => this.saveToIpfs(reader)
        reader.readAsArrayBuffer(file)
      }

      saveToIpfs (reader) {
        let ipfsId
        const buffer = Buffer.from(reader.result)
        this.ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
          .then((response) => {
            console.log(response)
            ipfsId = response[0].hash
            console.log(ipfsId)
            this.setState({pictureHash: ipfsId, showPicturePreview: true})
          }).catch((err) => {
            console.error(err)
          })
      }
    
      handleClick(e) {
        console.log("inside click");
        var json = {
          name: this.state.deceasedName,
          obituary: this.state.obituary,
          survivedBy: this.state.survivedBy,
          pictureHash: this.state.pictureHash,
          ipfsInfo: this.state.ipfsInfo
          
        }
        setWeb3Instance()
        .then(() => obituaryContract(json.name, json.obituary, json.survivedBy, json.pictureHash, json.ipfsInfo))
        .then(console.log("success"));
      }

      render() {
        return (
            <form>
        <FormGroup
          controlId="nameOfDeceased">
          <ControlLabel>Name of Deceased</ControlLabel>
          <FormControl
            type="text"
            value={this.state.deceasedName}
            onChange={this.handleNameChange} 
            placeholder="Enter Name of Deceased"
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="survivedBy">
          <ControlLabel>Survived By</ControlLabel>
          <FormControl
            type="text"
            value={this.state.survivedBy}
            onChange={this.handleSurvivedByChange} 
            placeholder="Enter the names/relationships of those that the deceased is survived by"
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="obituary"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Obituary Message</ControlLabel>
          <FormControl
            type="text"
            value={this.state.obituary}
            onChange={this.handleObituaryChange} 
            placeholder="Write your message here"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
        <FormGroup
          controlId="photo">
          <ControlLabel>Photo of Deceased</ControlLabel>
          <FormControl
            type="file"
            value={this.state.file}
            onChange={this.handlePictureChange} 
            placeholder="Upload a picture of your loved one"
          />
          <FormControl.Feedback />
        </FormGroup>
        <img src={this.ipfsInfo + this.pictureHash} className={!this.state.showPicturePreview ? 'hidden' : 'previewImage'}  />
        <Button bsStyle="primary" onClick={this.handleClick}>Purchase Obituary</Button>
      </form>

        );
      }
}

export default ObituaryForm