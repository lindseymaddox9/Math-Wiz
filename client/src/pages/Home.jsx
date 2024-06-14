import React from "react"
import ReactCardFlip from 'react-card-flip';
import FlashCard from "../components/Card/index.jsx";
class Home extends React.Component {
  constructor(){
    super();
      this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }





render(){
   return (//Math.floor(Math.random()*questionArray.length)
    // map questions into front carf and answers in to back card
    <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical"containerClassName="flipCard">
        <FlashCard >
          What is 60 x 60
          <button onClick={this.handleClick}>Click to flip</button>
        </FlashCard>

        <FlashCard>
          3600
          <button onClick={this.handleClick}>Click to flip</button>
        </FlashCard>
      </ReactCardFlip>
  );
}
    
}


 


export default Home;
