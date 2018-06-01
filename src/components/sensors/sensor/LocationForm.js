import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form'
import Dialog from 'material-ui/Dialog';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem'
import { SelectField, TextField } from 'redux-form-material-ui'
import { Row, Col} from 'react-grid-system'
import PropTypes from 'prop-types';
import * as Waziup from 'waziup-js'

class LocationForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      location: Object.assign({}, this.initialLocation)
    };
  }
  initialLocation = this.props.initialLocation? this.props.initialLocation: {latitude: 12.238, longitude: -1.561};

  choosePosition = (formData) => {
    var location = this.state.location
    location.longitude = formData.latlng.lng
    location.latitude = formData.latlng.lat
    this.setState({location: location})
  }
  
  handleChange = (formData) => {
    var location = this.state.location
    location[formData.target.name] = parseFloat(formData.target.value);
    this.setState({location: location})
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={()=>{this.props.handleClose();}}/>,
      <FlatButton label="Submit" primary={true} onTouchTap={()=>{this.props.onSubmit(this.state.location); this.props.handleClose();}}/>,
    ];
    return (
      <Dialog title="Location" actions={actions} modal={true} open={this.props.modalOpen} autoScrollBodyContent={true}>
        <Map className="map" center={[this.initialLocation.latitude, this.initialLocation.longitude]} zoom={5}>
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
          <Marker onDrag={(e)=>{this.choosePosition(e)}} position={[this.state.location.latitude, this.state.location.longitude]} draggable={true}>
            <Popup>
              <span>Your sensor position !</span>
            </Popup>
          </Marker>
         </Map>
         <div className="locationCoords">
           <h3> Sensor Location: </h3>
           <TextField name="longitude" floatingLabelText="Longitude" value={this.state.location.longitude} onChange={this.handleChange}/>
           <TextField name="latitude"  floatingLabelText="Latitude"  value={this.state.location.latitude}  onChange={this.handleChange}/>
        </div>
      </Dialog>
    );
  }
}

LocationForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialLocation: PropTypes.object //Should be a Waziup.Location
}

export default reduxForm({
    form: 'simple'
})(LocationForm)
