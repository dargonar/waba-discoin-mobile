import React, { PropTypes, Component } from 'react';

import {
  View,
  Text,
	Alert
} from 'react-native';

import UWCrypto from '../../utils/Crypto';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';
import styles from './styles/Sending';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';

class Sending extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
  
  
  constructor(props) {
    super(props);
		if(props.modal_type == 'sending')
		{
			this.state = {
				recipient : props.recipient,
				amount :    props.amount,
				memo :      props.memo,
				types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', 
										 '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
				size:       100,
				color:      "#F64D27",
				isVisible:  true,
				modal_type: props.modal_type
			};
		}
		else{
			this.state = {
      types:      ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', 
                   '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size:       100,
      color:      "#F64D27",
      isVisible:  true,
			modal_type: props.modal_type
    };
	}
    
//     console.log(' -- this.state.recipient => ', this.state.recipient);
    
  }
  
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	let type = this.state.types[8];
		let type2 = this.state.types[0];
    if(this.state.modal_type == 'sending')
		{
			let mensaje = this.state.memo;
			let mensaje_ui1 = undefined;
			let mensaje_ui2 = undefined;
			if(mensaje)
			{
				mensaje_ui1 = (<Text style={styles.title_part}>con mensaje:</Text>)
				mensaje_ui2 = (<Text style={styles.data_part}>{mensaje}</Text>)
			}
			return (
				<View style={styles.container}>
					<View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#0B5F83'}}>
						<Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#B7F072"/>
					</View>
					<View style={{flex:4, backgroundColor:'#0B5F83', paddingLeft:30, paddingRight:30}}>
						<Text style={styles.title_part}>Enviando:</Text>
						<Text style={styles.data_part}>$ {this.state.amount}</Text>
						<Text style={styles.title_part}>A:</Text>
						<Text style={styles.data_part}>{this.state.recipient.name}</Text>
						{mensaje_ui1}
						{mensaje_ui2}
					</View>
				</View>
			);
		}
		else
			return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#0B5F83'}}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type2} color="#B7F072"/>
        </View>
        <View style={{flex:4, backgroundColor:'#0B5F83', paddingLeft:30, paddingRight:30, alignItems:'center'}}>
          <Text style={styles.data_part}>Restaurando cuenta</Text>
        </View>
      </View>
    );
  }
}

// function mapDispatchToProps(dispatch) {
// 	return {
// 		actions: bindActionCreators(walletActions, dispatch)
// 	};
// }

export default Sending;