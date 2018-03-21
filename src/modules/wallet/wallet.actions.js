import * as types from '../../constants/actionTypes';
import * as config from '../../constants/config';
import UWCrypto from '../../utils/Crypto';
import Bts2helper from '../../utils/Bts2helper';
import gql from 'graphql-tag';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
const networkInterface = createNetworkInterface(config.GRAPHQL_URL);
const apollo = new ApolloClient({
  networkInterface,
});

let memo_cache = {};

function myDecodeMemo(privkey, pubkey, memo_from, memo_to, memo_nonce, memo_message) {
	return new Promise( (resolve, reject) => {
		Bts2helper.decodeMemo(privkey, pubkey, memo_from, memo_to, memo_nonce, memo_message).then( message => {
			resolve({error:0, message:message});
		}, err => {
			console.log('No puedo con este memo ', memo_message);
			resolve({error:1, message:''});
		});
	});	
}

export function createAccountSuccess(account) {
	return {
		type      : types.CREATE_ACCOUNT_SUCCESS,
		account   : account
	};
}

export function createAccountSuccessHACK(account) {
	return function (dispatch) {
		//console.log(' -- REDUCER -> CREATE_ACCOUNT_SUCCESS');
		dispatch(createAccountSuccess(account));	
	}
}

// export function getAccount(name) {
// 	return new Promise((resolve, reject) => {
		
// 		fetch(config.getAPIURL('/account/'+name), {
// 			method: 'GET',
// 			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
// 		})
// 		.then((response) => response.json(), err=>{ reject(err); }) 
// 		.then((responseJson) => {
// 			resolve(responseJson);
// 		}, err => {
// 			reject(err);
// 		});
		
// 	}
// }


export function createAccount(name) {

		return new Promise((resolve, reject) => {

			
				reject('err');
			
		});
}

export function blockChainSuccess(blockchain) {
	return {
		type      	: types.BLOCKCHAIN_SUCCESS,
		blockchain  : blockchain
	};
}

// ---------------------
// Address
export function addressSuccessHACK(address) {
	return {
		type      : types.ADDRESS_SUCCESS,
		address  	: address
	};
}

export function addressSuccess(address) {
	return function (dispatch) {
		dispatch(addressSuccessHACK(address));	
	}
}
// ---------------------

export function memoSuccessHACK(memo) {
	return {
		type      : types.MEMO_SUCCESS,
		memo  		: memo
	};
}

export function memoSuccess(memo) {
	return function (dispatch) {
		dispatch(memoSuccessHACK(memo));	
	}
}

// USERS
export function endorseApply(from, endorse_type) {
	return new Promise((resolve, reject) => {
		fetch(config.getAPIURL('/endorse/apply'), {
			method: 'POST',
			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
			body: JSON.stringify({
				from         : from,
				endorse_type : endorse_type
			})
		})
		.then((response) => response.json()) 
		.then((responseJson) => {
			return resolve(responseJson);
		})
		.catch((error) => {
			return reject(error);
		});
	});
}

// USERS
export function retrieveUsers(query, search_filter) {
    search_filter = search_filter || '0';
		return new Promise((resolve, reject) => {
			fetch(config.getAPIURL('/searchAccount?search='+query+'&search_filter='+search_filter), {
				method: 'GET',
				headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			.then((response) => response.json()) 
			.then((responseJson) => {
        return resolve(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
			
		});
}

export function myAccountIdSuccess(id) {
	return {
		type    : types.MY_ACCOUNT_ID_SUCCESS,
		id      : id
	};
}

export function feeScheduleSuccess(fees) {
	return {
		type    : types.FEE_SCHEDULE_SUCCESS,
		fees    : fees
	};
}

export function readySuccess(ready) {
	return {
		type    : types.READY_SUCCESS,
		ready   : ready
	};
}

export function assetSuccess(asset) {
	return {
		type    : types.ASSET_SUCCESS,
		asset   : asset
	};
}


// HISTORY
export function retrieveHistoryError() {
	return {
		type         : types.RETRIEVE_HISTORY_ERROR,
	};
}

export function retrieveHistorySuccess(data, start) {
	return {
		type         : types.RETRIEVE_HISTORY_SUCCESS,
		history      : data,
		start        : start
	};
}

export function retrieveBalanceSuccess(balance) {
	return {
		type         : types.RETRIEVE_BALANCE_SUCCESS,
		balance      : balance
	};
}

export function creditReadySuccess(credit_ready) {
	return {
		type         : types.CREDIT_READY_SUCCESS,
		credit_ready : credit_ready
	};
}

export function retrieveHistory(account_name, keys, first_time, start) {
	return function (dispatch) {
		let data = JSON.parse('{"asset":{"symbol": "MONEDAPAR", "precision": 2, "id": "1.3.1236", "options": {"issuer_permissions": 79, "description": {"main":"Moneda PAR","short_name":"Moneda PAR","market":""}, "max_market_fee": 0, "whitelist_markets": [], "whitelist_authorities": [], "blacklist_authorities": [], "blacklist_markets": [], "max_supply": "10000000000", "flags": 4, "extensions": [], "market_fee_percent": 0, "core_exchange_rate": {"quote": {"asset_id": "1.3.1236", "amount": 50}, "base": {"asset_id": "1.3.0", "amount": 130625}}}, "dynamic_asset_data_id": "2.3.1236", "issuer": "1.2.150830"} ,"blockchain":{"refBlockNum":"25404985","refBlockPrefix":"1147155725","fees": {"scale": 10000, "parameters": [[0, {"price_per_kbyte": 5789, "fee": 10420}], [1, {"fee": 578}], [2, {"fee": 57}], [3, {"fee": 578}], [4, {}], [5, {"price_per_kbyte": 4052, "basic_fee": 57891, "premium_fee": 2894592}], [6, {"price_per_kbyte": 4052, "fee": 578}], [7, {"fee": 57891}], [8, {"membership_annual_fee": "57312931034482", "membership_lifetime_fee": 69470219}], [9, {"fee": 2894592}], [10, {"symbol3": "4631347962", "price_per_kbyte": 5789, "long_symbol": 28945924, "symbol4": 1157836990}], [11, {"price_per_kbyte": 4052, "fee": 1157836}], [12, {"fee": 2894592}], [13, {"fee": 2894592}], [14, {"price_per_kbyte": 5789, "fee": 10420}], [15, {"fee": 578}], [16, {"fee": 289459}], [17, {"fee": 28945}], [18, {"fee": 2894592}], [19, {"fee": 57}], [20, {"fee": 28945924}], [21, {"fee": 5789}], [22, {"price_per_kbyte": 28945, "fee": 86837}], [23, {"price_per_kbyte": 4052, "fee": 2894}], [24, {"fee": 0}], [25, {"fee": 86837}], [26, {"fee": 5789}], [27, {"price_per_kbyte": 4052, "fee": 8336}], [28, {"fee": 0}], [29, {"fee": 2894592}], [30, {"fee": 5789184}], [31, {"fee": 0}], [32, {"fee": 578918}], [33, {"fee": 1157836}], [34, {"fee": 28945924}], [35, {"price_per_kbyte": 28945, "fee": 5789}], [36, {"fee": 289459}], [37, {}], [38, {"price_per_kbyte": 4052, "fee": 578918}], [39, {"fee": 121572, "price_per_output": 40524}], [41, {"fee": 121572}], [43, {"fee": 578918}]]}},"account":{"id":"1.2.152779","blacklistedBy":false,"balance":[{"quantity":"949.62","asset":{"id":"1.3.1236"}},{"quantity":"1000","asset":{"id":"1.3.1237"}},{"quantity":"487","asset":{"id":"1.3.1319"}},{"quantity":"57","asset":{"id":"1.3.1320"}},{"quantity":"41","asset":{"id":"1.3.1322"}}],"history":[{"id":"1.11.152978429","__typename":"Transfer","block":{"timestamp":"2018-03-13T00:15:42"},"amount":{"quantity":"666","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.781834","name":"diego"},"to":{"id":"1.2.152779","name":"tuti"},"memo":{"from":"BTS8YBD81WPn9Ej58XynjbkeVaDNN4FU9eq6dKAMdtbvG3ZPAuKUs","to":"BTS5CAxUZEwiBntZEaqyawpgS63qWurWYva6hPnoVJm1GzAFQdEmd","nonce":"3316170225881434527","message":"cc64fd0e55353256d9f3b06649b739d3d43e7f19f66d75da81700d9edf965f67d2765d195d97baf1586efc822d1355c87b24729de028c64c6b2045e54cc9c12d"},"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.152835542","__typename":"Transfer","block":{"timestamp":"2018-03-12T19:13:51"},"amount":{"quantity":"49","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.781834","name":"diego"},"memo":{"from":"BTS5CAxUZEwiBntZEaqyawpgS63qWurWYva6hPnoVJm1GzAFQdEmd","to":"BTS8YBD81WPn9Ej58XynjbkeVaDNN4FU9eq6dKAMdtbvG3ZPAuKUs","nonce":"4397034118344059386","message":"33447d809b098959c427a4bbedea6bfbd917044eb014ada41b95ad3ce062ebe1f34bd42b9a214c94dfc1a17b16a5a891"},"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.152484854","__typename":"Transfer","block":{"timestamp":"2018-03-12T03:54:39"},"amount":{"quantity":"50","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.781834","name":"diego"},"to":{"id":"1.2.152779","name":"tuti"},"memo":null,"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.147275182","__typename":"Transfer","block":{"timestamp":"2018-03-02T18:40:24"},"amount":{"quantity":"1","asset":{"id":"1.3.1319","symbol":"MONEDAPAR.AI"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e69653a646965676f"},"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.141135192","__typename":"Transfer","block":{"timestamp":"2018-02-19T03:29:00"},"amount":{"quantity":"5","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152125","name":"matias"},"to":{"id":"1.2.152779","name":"tuti"},"memo":{"from":"BTS7At5MZ6FUMBM9vErYnjiTVX2o9TpJTXaBDXjBmiNXafctc2uv2","to":"BTS5CAxUZEwiBntZEaqyawpgS63qWurWYva6hPnoVJm1GzAFQdEmd","nonce":"14485095412558831227","message":"c355e13f77c1b73aeb5c6c9a33655d6c6618383e4f89ef7d3eff7bbff8318318"},"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.141070099","__typename":"Transfer","block":{"timestamp":"2018-02-19T00:07:42"},"amount":{"quantity":"1","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.294759","name":"seba"},"memo":null,"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.133593664","__typename":"Transfer","block":{"timestamp":"2018-02-06T14:10:18"},"amount":{"quantity":"25","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.709355","name":"jonibek"},"memo":null,"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.124534376","__typename":"Transfer","block":{"timestamp":"2018-01-25T12:57:03"},"amount":{"quantity":"10","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.294759","name":"seba"},"to":{"id":"1.2.152779","name":"tuti"},"memo":null,"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.124532947","__typename":"Transfer","block":{"timestamp":"2018-01-25T12:54:03"},"amount":{"quantity":"5","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.294759","name":"seba"},"memo":null,"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.124522318","__typename":"Transfer","block":{"timestamp":"2018-01-25T12:25:51"},"amount":{"quantity":"2","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.432761","name":"marinasolanas"},"memo":null,"fee":{"quantity":"0.01","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.103947514","__typename":"Transfer","block":{"timestamp":"2017-12-15T16:31:48"},"amount":{"quantity":"10","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.432761","name":"marinasolanas"},"memo":null,"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.99670776","__typename":"Transfer","block":{"timestamp":"2017-12-05T14:14:36"},"amount":{"quantity":"1","asset":{"id":"1.3.1319","symbol":"MONEDAPAR.AI"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e69653a6d6172696e61"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.89639928","__typename":"Transfer","block":{"timestamp":"2017-11-15T18:22:45"},"amount":{"quantity":"25","asset":{"id":"1.3.1236","symbol":"MONEDAPAR"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.294759","name":"seba"},"memo":null,"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.81732106","__typename":"Transfer","block":{"timestamp":"2017-10-25T11:38:39"},"amount":{"quantity":"1","asset":{"id":"1.3.1319","symbol":"MONEDAPAR.AI"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e69653a6e6168756d6d69726164"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.81699284","__typename":"Transfer","block":{"timestamp":"2017-10-25T09:09:15"},"amount":{"quantity":"1","asset":{"id":"1.3.1319","symbol":"MONEDAPAR.AI"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e69653a6d6172696e61736f6c616e6173"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.73480310","__typename":"Transfer","block":{"timestamp":"2017-09-28T18:19:48"},"amount":{"quantity":"5","asset":{"id":"1.3.1319","symbol":"MONEDAPAR.AI"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e65743a726164696f393635"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.73480311","__typename":"Transfer","block":{"timestamp":"2017-09-28T18:19:48"},"amount":{"quantity":"5","asset":{"id":"1.3.1322","symbol":"MONEDAPAR.AX"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e65743a726164696f393635"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.73480312","__typename":"Transfer","block":{"timestamp":"2017-09-28T18:19:48"},"amount":{"quantity":"5","asset":{"id":"1.3.1320","symbol":"MONEDAPAR.AXXX"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e65743a726164696f393635"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.73479919","__typename":"Transfer","block":{"timestamp":"2017-09-28T18:15:36"},"amount":{"quantity":"1","asset":{"id":"1.3.1320","symbol":"MONEDAPAR.AXXX"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e69653a726164696f393635"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.62762326","__typename":"Transfer","block":{"timestamp":"2017-08-30T20:07:57"},"amount":{"quantity":"5","asset":{"id":"1.3.1319","symbol":"MONEDAPAR.AI"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e65743a7061626c6f63"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.62762327","__typename":"Transfer","block":{"timestamp":"2017-08-30T20:07:57"},"amount":{"quantity":"5","asset":{"id":"1.3.1322","symbol":"MONEDAPAR.AX"}},"from":{"id":"1.2.152779","name":"tuti"},"to":{"id":"1.2.151476","name":"propuesta-par"},"memo":{"from":"BTS1111111111111111111111111111111114T1Anm","to":"BTS1111111111111111111111111111111114T1Anm","nonce":"0","message":"7e65743a7061626c6f63"},"fee":{"quantity":"0.09","asset":{"symbol":"MONEDAPAR","id":"1.3.1236"}}},{"id":"1.11.62761853","__typename":"Transfer","block":{"timestamp":"2017-08-30T20:07:00"},"amount":{"quantity":"50","asset":{"id":"1.3.1320","symbol":"MONEDAPAR.AXXX"}},"from":{"id":"1.2.151476","name":"propuesta-par"},"to":{"id":"1.2.152779","name":"tuti"},"memo":null,"fee":{"quantity":"0.21851","asset":{"symbol":"BTS","id":"1.3.0"}}},{"id":"1.11.62761630","__typename":"Transfer","block":{"timestamp":"2017-08-30T20:06:42"},"amount":{"quantity":"50","asset":{"id":"1.3.1322","symbol":"MONEDAPAR.AX"}},"from":{"id":"1.2.151476","name":"propuesta-par"},"to":{"id":"1.2.152779","name":"tuti"},"memo":null,"fee":{"quantity":"0.21851","asset":{"symbol":"BTS","id":"1.3.0"}}},{"id":"1.11.62761374","__typename":"Transfer","block":{"timestamp":"2017-08-30T20:06:09"},"amount":{"quantity":"500","asset":{"id":"1.3.1319","symbol":"MONEDAPAR.AI"}},"from":{"id":"1.2.151476","name":"propuesta-par"},"to":{"id":"1.2.152779","name":"tuti"},"memo":null,"fee":{"quantity":"0.21851","asset":{"symbol":"BTS","id":"1.3.0"}}}]}}');
		let memo_key_map = {};
		for(var i=0; i<keys.length; i++) {
			memo_key_map[keys[i].pubkey] = keys[i].privkey;
		}
		console.log(' --------- TODO COOL retrieveHistory ---------');

      	if (data) {

      	// 		console.log(' ------------------------------');
      	// 		console.log(' ------------ data ------------');
      	// 		let data_str = JSON.stringify(data);
      	// 		for (var i = 0 ; i <= 28000; i+=4000) {
      	// 			let part1 = data_str.slice(i, i+4000);
      	// 			console.log(part1);
      	// 			console.log(' ------------------------------');
      			
      	// 		}
      			
    			// console.log(' --------- END ---------');

    			console.log(' --------- #1');
				dispatch(myAccountIdSuccess(data.account.id));
				console.log(' --------- #2');
				dispatch(blockChainSuccess(data.blockchain));
				console.log(' --------- #3');
				if(data.blockchain.fees) {
					// dispatch(feeScheduleSuccess(JSON.parse(data.blockchain.fees)));
					dispatch(feeScheduleSuccess(data.blockchain.fees));
				}
				
				console.log(' --------- #3.1');
				if(data.asset) {
					// dispatch(assetSuccess(JSON.parse(data.asset)));
					dispatch(assetSuccess(data.asset));
				}
				console.log(' --------- #3.2');
				
				let history = data.account.history;
				let proms = [];
				let inxs  = [];
				console.log(' --------- #3.3');
				let real_ops = 0;
				
				console.log(' --------- #4');
				
				for(var i=0; i<history.length; i++) {

					//Meta magia
					if( history[i].__typename == 'OverdraftChange' ) {
						if(history[i].type == 'up')
							real_ops += 4;
						else
							real_ops += 6;
					} else {
						real_ops += 1;
					}
					
					console.log(' --------- #4.1');
					//history[i].__typename == 'Transfer' && 
					if(history[i].memo){
						//console.log(history[i].memo);
 						
 						console.log(' --------- #4.2');
						if(history[i].id in memo_cache) {
							//noconsole.log('CACHE HIT =>', history[i].id, memo_cache[history[i].id]);
							console.log(' --------- #4.3');
							history[i].message = memo_cache[history[i].id];
						} else {
							console.log(' --------- #4.4');
							let memo    = history[i].memo;
							let privkey = memo_key_map[memo.from];
							let pubkey  = memo.to;

							if(!privkey) {
								privkey = memo_key_map[memo.to];
								pubkey  = memo.from;
							}

							if(privkey) {
								console.log(' --------- #4.5');
								let p = myDecodeMemo(
									privkey,
									pubkey,
									memo.from,
									memo.to,
									memo.nonce,
									memo.message
								);

								proms.push(p);
								inxs.push(i);
							} else {
								console.log('no lo puedo DECODESSSSS');
							}
						}
					}

				}
				
				console.log(' --------- #5');
				let balance = data.account.balance;
				
				console.log(' --------- #5.1');

				let balance_map = {};
				if(balance) {
					for(var i=0; i<balance.length; i++) {
						balance_map[balance[i].asset.id] = parseFloat(balance[i].quantity);
						console.log('ENCONTRE ESTO ', balance[i].asset_id, ' => ', balance[i].quantity);
					}
					dispatch(retrieveBalanceSuccess(balance_map));
				}
				
				dispatch(creditReadySuccess(data.account.blacklistedBy));
				
				console.log(' --------- #6');

				//Decrypt memos
				Promise.all(proms).then(res => {
					for(var i=0; i<res.length;i++) {
							history[inxs[i]].message = res[i].message;
							memo_cache[history[inxs[i]].id] = res[i].message;
					}
					
					console.log(' --------- #7');
					console.log('**** retrieveHistorySuccess', start, history.length);
					
					dispatch(retrieveHistorySuccess(history, start));
					dispatch(readySuccess(1));
				}
				, err => {
					console.log(JSON.stringify(err));
					dispatch(retrieveHistorySuccess(null, start));
				});


		} //if(data)
	}
    
  
} //function
