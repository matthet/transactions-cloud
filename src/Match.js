import React, { Component } from "react";
import Sidebar from "./Sidebar";
 
class Match extends Component {
  constructor(props) {
    super(props);  
    this.state = { matchedRuleSets: [], matchCount: 0, relatedTxs: []};
    this.getSideBarDetails = this.getSideBarDetails.bind(this);
    this.randomPosForCloud = this.randomPosForCloud.bind(this);
  }

  getSideBarDetails () {
    let sideBarDetails = { heading: '', data: '' };

    if (this.state.matchCount === 0) {
      if (this.state.relatedTxs.length) {
        sideBarDetails.heading = <div>TRANSACTIONS</div>;
        sideBarDetails.data = this.state.relatedTxs.map(tx => {
          return <div className="detail">{tx.transactionId}: <div>{tx.transactionDescription}</div></div>
        })
      }
    } else {
      sideBarDetails.heading = <div>DETAILS</div>;
      sideBarDetails.data = <div>Total Matches: {this.state.matchCount}</div>
    }
    return sideBarDetails;
  }

  randomPosForCloud () {
    let random = Math.floor(Math.random() * (1 + 70 - 10)) + 10;
    return random + '%';
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps === this.props) {
      return;
    }
    
    let matchedRuleSets = [];
    console.log(nextProps.categoryToShow)
    nextProps.categoryToShow.set.forEach(tx => {
      if (matchedRuleSets.length) {
        let i = 0;
        let found = false;

        while (i < matchedRuleSets.length && !found) {
          if (JSON.stringify(matchedRuleSets[i].set[0].matchRule) === JSON.stringify(tx.matchRule)) {
            matchedRuleSets[i].set.push(tx);
            found = true;
          }
          i += 1;
        }

        if (!found) { 
          matchedRuleSets.push({set: [tx], randomPos: this.randomPosForCloud()});
        }
      } else {
        matchedRuleSets.push({set: [tx], randomPos: this.randomPosForCloud()});
      }
    });
    this.setState({ matchedRuleSets, matchCount: 0, relatedTxs: [] });
  }

  render() {
    let sideBarDetails = this.getSideBarDetails();
    return (
      <div>
        <div className="heading">TRANSACTIONS HISTORY - BY MATCH</div>
        <div className="section">
          <div className="rule">
            <div>
              {
                this.state.matchedRuleSets.map((matchedRuleSet => {
                  return (
                    <div>
                      <button style={{backgroundColor: matchedRuleSet.set[0].colour, marginLeft: matchedRuleSet.randomPos}} 
                        className="button"
                        onMouseOver={(e) => {
                          e.preventDefault(); 
                          this.setState({matchCount: matchedRuleSet.set.length})
                        }}
                        onMouseLeave={(e) => {
                          e.preventDefault(); 
                          this.setState({matchCount: 0})
                        }}
                        onClick={(e) => {
                          e.preventDefault(); 
                          this.setState({matchCount: 0})
                          this.setState({relatedTxs: matchedRuleSet.set})
                        }}>
                        {matchedRuleSet.set[0].matchRule.ruleMatchValue}
                      </button>
                    </div>
                  );
                }))
              }
            </div>
          </div>
          <div className="side"><Sidebar sideBarDetails={sideBarDetails} /></div>
        </div>
      </div>
    );
  }
}

export default Match;
