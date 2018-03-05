import React, { Component } from "react";
import Stuff from "./Stuff";
import transactions from './data/transactions.json';
import rules from './data/rules.json';
 
class Main extends Component {
  constructor() {
    super();  
    this.state = { matchedTxSets: [], showInitialView: true, categoryToShow: {}};
  }

  componentWillMount() {
    let matchedTxSets = [];

    transactions.forEach(tx => {
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
          tx.colour = matchRule.ruleFlag === 'Neutral' ? '#ead2b2' : matchRule.ruleFlag;
          tx.matchRule = matchRule;
          
          if (matchedTxSets.length) {
            let i = 0;
            let found = false;

            while (i < matchedTxSets.length && !found) {
              if ((matchedTxSets[i].set[0].transactionType === tx.transactionType) && (matchedTxSets[i].set[0].colour === tx.colour)) {
                matchedTxSets[i].set.push(tx);
                found = true;
              }
              i += 1;
            }

            if (!found) { 
              matchedTxSets.push({set: [tx], colour: matchRule.ruleFlag === 'Neutral' ? '#ead2b2' : matchRule.ruleFlag});
            }
          } else {
            matchedTxSets.push({set: [tx], colour: matchRule.ruleFlag === 'Neutral' ? '#ead2b2' : matchRule.ruleFlag});
          }
        }
      }
    });
    this.setState({ matchedTxSets });
  }

  render() {
    return (
      <div className="section">    
        <div style={{width: '25%'}} className="main">
        <div className="heading">TRANSACTIONS HISTORY - BY CATEGORY</div>
          {
            this.state.matchedTxSets.map((matchedTxSet => {
              return (
                <div>
                  <button style={{backgroundColor: matchedTxSet.colour}} className="button" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      this.setState({categoryToShow: matchedTxSet})
                    }}>
                    {matchedTxSet.set[0].transactionType}
                  </button>
                </div>
              );
            }))
          }
        </div> 
        <div style={{width: '75%'}} className="stuff"><Stuff categoryToShow={this.state.categoryToShow}/></div>
      </div>
    );
  }
}
 
export default Main;