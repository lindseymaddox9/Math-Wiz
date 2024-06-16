import React from "react"

class Home extends React.Component {
 
render(){
   return(
    <main className="flex-row justify-center mb-4"> 
    <div className="col-12 col-lg-10">
      <div className="card">
        <h4 className="card-header bg-dark text-light p-2" id="card">Multiplication Flashcards Game</h4>
        <div className="card-body" id="card">
          <p class="gameIntro">
            Welcome to our multiplication flashcard game! This game 
            is designed to help students learn and master their multiplication tables.
            Practice with randomly generated multiplication questions and flip the cards to reveal the 
            answers. Have fun learning 😊!
          </p>
          <p class="gameIntro">
            To start playing, navigate to <strong>Flashcards</strong> section after 
            signing up or loggin in
          </p>
        </div>
      </div>
    </div>
    </main>
   )
}
    
}


 


export default Home;
