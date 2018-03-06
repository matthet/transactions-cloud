import React, { Component } from "react";
import Sidebar from "./Sidebar";
 
class Match extends Component {
  constructor(props) {
    super(props);  
    this.state = { matchedRuleSets: [], matchCount: 0, relatedTxs: []};
    this.getSideBarDetails = this.getSideBarDetails.bind(this);
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

  componentWillReceiveProps (nextProps) {
    let matchedRuleSets = [];

    nextProps.categoryToShow.set.forEach(tx => {
      if (matchedRuleSets.length) {
        var i = 0;
        let found = false;

        while (i < matchedRuleSets.length && !found) {
          if (JSON.stringify(matchedRuleSets[i][0].matchRule) === JSON.stringify(tx.matchRule)) {
            matchedRuleSets[i].push(tx);
            found = true;
          }
          i += 1;
        }

        if (!found) { 
          matchedRuleSets.push([tx]);
        }
      } else {
        matchedRuleSets.push([tx]);
      }
    });
    console.log('matchedRuleSets', matchedRuleSets);
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
                this.state.matchedRuleSets.map((set => {
                  return (
                    <div>
                      <button style={{backgroundColor: set[0].colour}} 
                        className="button" 
                        onMouseOver={(e) => {
                          e.preventDefault(); 
                          this.setState({matchCount: set.length})
                        }}
                        onMouseLeave={(e) => {
                          e.preventDefault(); 
                          this.setState({matchCount: 0})
                        }}
                        onClick={(e) => {
                          e.preventDefault(); 
                          this.setState({matchCount: 0})
                          this.setState({relatedTxs: set})
                        }}>
                        {set[0].matchRule.ruleCategory}
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