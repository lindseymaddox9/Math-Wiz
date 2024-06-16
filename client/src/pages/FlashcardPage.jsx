import React from "react";
import ReactCardFlip from "react-card-flip";
import FlashCard from "../components/Card/index.jsx";

const randomMath = () => {
  const num1 = Math.floor(Math.random() * 13);
  const num2 = Math.floor(Math.random() * 13);
  const question = `${num1} x ${num2}`;
  const answer = num1 * num2;
  return { question, answer };
};

class FlashcardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
      problem: randomMath(),
      userAnswer: "",
      correctAnswer: null,
      timeLeft: 15,
      score:0 //intialize score state
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nextProblem = this.nextProblem.bind(this);
    this.timer = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timeLeft <= 1) {
          clearInterval(this.timer);
          this.handleSubmit();
          return { timeLeft: 0 };
        }
        return { timeLeft: prevState.timeLeft - 1 };
      });
    }, 1000);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  handleChange(e) {
    this.setState({ userAnswer: e.target.value });
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    const { problem, userAnswer } = this.state;
    const correctAnswer = parseInt(userAnswer) === problem.answer;

    if(correctAnswer){
        this.setState((prevState)=>({
            correctAnswer: true,
            isFlipped: true,
            score: prevState.score +1,
        }));
    }else{
        this.setState({
            correctAnswer:false,
            isFlipped:true,
        });
    }
    clearInterval(this.timer)

  }

  nextProblem() {
    this.setState({
      isFlipped: false,
      problem: randomMath(),
      userAnswer: "",
      correctAnswer: null,
      timeLeft: 15,
    });
    this.startTimer();
  }

  render() {
    const { problem, isFlipped, correctAnswer, timeLeft } = this.state;

    return (
      <div>
        <h2 class="score">Score:{this.state.score}</h2>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical" containerClassName="flipCard">
          <FlashCard key="front">
            <div>
              <p>{problem.question}</p>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="number"
                  value={this.state.userAnswer}
                  onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
              </form>
              <p>Time left: {timeLeft} seconds</p>
            </div>
          </FlashCard>

          <FlashCard key="back">
            <div>
              {correctAnswer !== null && (
                <p>{correctAnswer ? "Correct!" : `Incorrect! The correct answer is ${problem.answer}`}</p>
              )}
              <button onClick={this.nextProblem}>Next Problem</button>
            </div>
          </FlashCard>
        </ReactCardFlip>
      </div>
    );
  }
}

export default FlashcardPage;

