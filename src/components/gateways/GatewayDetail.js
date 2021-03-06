import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Container } from 'react-grid-system';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import GatewayNodeCard from './GatewayNodeCard'
import {
  deleteGateway, getGateway, updateGatewayName,
  getGatewayPermissions,
} from '../../actions/actions.js';
import gatewayImage from '../../images/gateway.png';
import Hidden from '@material-ui/core/Hidden';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { GatewayLoader } from './../Loaders';
import config from '../../config';

class GatewayDetail extends Component {

  interval = null;

  constructor(props) {
    super(props);
    this.state = { 
      modalLocation: false,
      loading: true 
    };
  }

  componentWillMount() {
    this.props.getGateway(this.props.params.gatewayId);
    this.props.getGatewayPermissions();
    this.interval = setInterval(() => {
      this.props.getGateway(this.props.params.gatewayId);
      this.props.getGatewayPermissions();
    }, config.delayRefresh);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.gateway !== this.props.gateway){
      this.setState({ loading: false })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let renderElement = (
      <h1>
        {' '}
        Gateway view is being loaded...
        {' '}
      </h1>
    );
    console.log(`sens:${JSON.stringify(this.props.gateway)}`);
    const gateway = this.props.gateway;
    console.log(gateway);
    if (gateway) {
      const position = gateway.location ? [
        gateway.location.latitude, gateway.location.longitude,
      ] : [
        12.238, -1.561,
      ];
      renderElement = (
        <Container fluid>
          <AppBar position="static" style={{marginBottom: '30px',background: '#e9edf2'}}>
            <Toolbar>
            <img src={gatewayImage} height="50"/>
              <Typography variant="h5" className="page-title">
                Gateway Details    
              </Typography>
            </Toolbar>
          </AppBar>
          { this.state.loading ? 
          GatewayLoader()
          : (
            <GatewayNodeCard
              className="gatewayNode"
              deleteGateway={(sid) => {
                this.props.deleteGateway(sid); browserHistory.push('/gateways');
              }}
              updateGatewayName={this.props.updateGatewayName}
              permission={this.props.permission}
              gateway={gateway}
          />
          )}
        </Container>
      );
    } else {
      browserHistory.push('/gateways');
    }

    return (
      <div className="gateway">
        {renderElement}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    gateway: state.gateway.gateway,
    permission: state.permissions.gateway.find(p => p.resource == ownProps.params.gatewayId),
    user: state.current_user,
  };
}

const mapDispatchToProps = {
  getGateway,
  getGatewayPermissions,
  deleteGateway,
  updateGatewayName
}

export default connect(mapStateToProps, mapDispatchToProps)(GatewayDetail);
