import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import configureStore from './store/configureStore';
import { iconsLoaded, iconsMap } from './utils/AppIcons';
import { launchTest, launchOnboard, launchWallet } from './utils/Helper';
import initialState from './reducers/initialState';
import * as walletActions from './modules/wallet/wallet.actions';

import { AsyncStorage } from 'react-native'


import {
  ToastAndroid,
} from 'react-native';

let account = null;
try {
	
	//HACKS
	AsyncStorage.removeItem('@Store:data');
	AsyncStorage.setItem('@Store:data', '{ "mnemonic": "asombro", "keys": [ { "extendedPrivateKey": "xprv", "pubkey": "BTS6NJ7HPBDfLGju7rMFgt92jfuZX6iAxwbbQrzMCWRt5fGZjqKLf", "privkey": "eb5", "address": "BTS7kdUxkGgG2hhkFjfgRHsJDiDvWJjTHMso" }, { "extendedPrivateKey": "xprv", "pubkey": "BTS5sKAiePdJZF8H6ZoCm1DE6yQUibT6f3Frd8FzY8agwuJV4EnA2", "privkey": "cc6", "address": "BTSCgRtPHS6NGA6AeZgQerR8391RdDBtu4v9" }, { "extendedPrivateKey": "xprv9vnFVFU4pEt5SvQJqJcwgCdHpeE2VV1mxtE7ZVirj1T1PCaJ9zphkfD4aauXeixuLVG3mtiNnJKTAgLEhjMrp4vNQZeLhRTPUG4fFUxNrFz", "pubkey": "BTS5CAxUZEwiBntZEaqyawpgS63qWurWYva6hPnoVJm1GzAFQdEmd", "privkey": "5a92049a6776288f7a64b44810d13e5430842dcb8c673a6fa902d2c62f372549", "address": "BTSDWkDobgbSp5Gv1bKttJDE78YssiBXKZDp" } ], "name": "tuti", "id": "1.2.152779" }');
	
	AsyncStorage.getItem('@Store:data').then((value)=>{
		console.log('@Store:data => ', value);
		
		if (value !== null) {
			account = JSON.parse(value);
		} else {
			account = null;
		}
		
		iconsLoaded.then(() => {
			initialState.wallet.account = account;
			const store = configureStore(initialState);
			
			registerScreens(store, Provider);
						
 			if(!account){
 				launchOnboard();
 			}
 			else{
        
				let unsubscribe = store.subscribe(() => {
					let s = store.getState();
					console.log('READY =>', s.wallet.ready);
					if(s.wallet.ready) {
						unsubscribe();
						launchWallet();
					} else if(s.wallet.errors > 0) {
						
						if(!(s.wallet.errors % 10)) {
							ToastAndroid.show('Está tomando mucho tiempo iniciar la aplicación, verifique su conexión a Internet', ToastAndroid.SHORT);
						}
						store.dispatch(walletActions.retrieveHistory(account.name, account.keys, true, 0) );
					}
				});

				store.dispatch(walletActions.retrieveHistory(account.name, account.keys, true, 0) );
 			}
		});

	});
} catch (error) {
	console.log('Error!!!!');
	//TODO: Error?
}


