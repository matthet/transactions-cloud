import React, { Component } from "react";
import transactions from './data/transactions.json';
import rules from './data/rules.json';

class Home extends Component {
  constructor(props) {
    super();
    this.state = { matchedTxs: []};
    // this.state = { interest: {txs: [], colour: 'yellow'}, 
    //                loans: {txs: [], colour: 'yellow'}, 
    //                gaming: {txs: [], colour: ''}, 
    //                unpaid: {txs: [], colour: ''}, 
    //                latePayment: {txs: [], colour: ''}, 
    //                crowdfunding: {txs: [], colour: ''}, 
    //                consumerLoan: {txs: [], colour: ''}, 
    //                onlineGambling: {txs: [], colour: ''}, 
    //                penalization: {txs: [], colour: ''}};
  }

  componentWillMount() {
    let test = [transactions[0], transactions[1], transactions[2], transactions[3], transactions[4], transactions[5]];
    let matchedTxs = [];

    transactions.forEach(tx => {
      console.log('tx', tx.transactionId);
      if (tx.transactionDescription) {
        let matchRule = rules.find(function(rule) {
          if (rule.ruleMatchType === 'exact') {
            return tx.transactionDescription.toLowerCase() === rule.ruleMatchValue
          } else if (rule.ruleMatchType === 'contains') {
            return tx.transactionDescription.toLowerCase().indexOf(rule.ruleMatchValue) !== -1;
          } else if (rule.ruleMatchType === 'startsWith') {
            return tx.transactionDescription.toLowerCase().startsWith(rule.ruleMatchValue);
          } else if (rule.ruleMatchType === 'endsWith') {
            return tx.transactionDescription.toLowerCase().endsWith(rule.ruleMatchValue);
          } else if (rule.ruleMatchType === 'regex') {
            //come back later, there are no regex rules
          } else {
            return false;
          }
        });
        if (matchRule) {
          matchedTxs.push(tx);
          tx.colour = matchRule.ruleFlag === 'Neutral' ? '#ead2b2' : matchRule.ruleFlag;
        }
      }
    })
    this.setState({ matchedTxs });
  }
  
  render() {
    return (
      <div>
        {
          this.state.matchedTxs.map(function(tx){
            return <div style={{backgroundColor: tx.colour}}>{tx.transactionDescription}</div>;
          })
        }
      </div>
    );
  }
}
 
export default Home;