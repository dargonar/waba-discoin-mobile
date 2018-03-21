import React, { PropTypes, Component } from 'react';

import {
  Alert,
	AsyncStorage,
	Text,
	View
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as walletActions from './wallet.actions';

import styles from './styles/NewAccount';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Spinner from 'react-native-spinkit';

class NewAccount extends Component {
  
  static navigatorStyle = {
    navBarTextColor: '#ffffff', 
    navBarBackgroundColor: '#0B5F83',
    navBarButtonColor: '#ffffff',
		navBarTextFontFamily: 'roboto_thin'
  }
  
  
  constructor(props) {
    super(props);
    this.state = {
      types:      	['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', 
                   	'9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size:       	100,
      color:      	"#B7F072",
      isVisible:  	true,
			account_name: props.account_name
    };
    this._onCreateAccount = this._onCreateAccount.bind(this);
	this._back 						= this._back.bind(this);
	}
  

  _onCreateAccount(){
		
		Alert.alert(
			'Error',
			'NO SE PUEDE :)',
			[
				{text: 'OK', onPress: () => this._back  }
			]
		)	
			
		
  }
	
  _back(){
// 		this.props.navigator.pop({animated: true});
		this.props.navigator.dismissModal({
			animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
		});
	}					
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {
  	setTimeout(() => {
			this._onCreateAccount();
    }, 0)	;
  }

  componentWillUnmount() {
  }
  
  focus() {
  }

  render() {
  	let type = this.state.types[3];
    return (
      <View style={styles.container}>
        <View style={{flex:3, justifyContent: 'center', alignItems:'center', backgroundColor:'#0B5F83'}}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color="#B7F072"/>
        </View>
        <View style={{flex:4, backgroundColor:'#0B5F83', paddingLeft:30, paddingRight:30}}>
					<View style={{flexDirection:'row', justifyContent:'center'}}>	
						<Text style={styles.title_part}>Creando cuenta {this.state.account_name}</Text>
					</View>
        </View>
				<View style={{flex:1, backgroundColor:'#0B5F83', paddingLeft:30, paddingRight:30}}>
					<View style={{flexDirection:'row', justifyContent:'center'}}>	
						<Text style={styles.title_part}>Por favor aguarde...</Text>
					</View>
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

function mapStateToProps(state, ownProps) {
	return {
		
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(walletActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);
