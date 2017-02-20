var inquirer = require("inquirer");
var fs = require('fs');

function BasicCard(front, back) {
	if(this instanceof BasicCard) {
	    this.front = front;
	    this.back = back;
	} else {
		return new BasicCard(front, back);
	}
};

function ClozeCard(fullText, clozeText) {
	if(this instanceof ClozeCard) {
	    this.full = fullText;
	    this.cloze = clozeText;
	    this.partText = fullText.replace(this.cloze, "...");
	}  else {
		return new ClozeCard(fullText, clozeText);
	}
};
// ClozeCard.partText = ClozeCard.full.replace(clozeText, "...");

function writeCard(newCard) {
		
         fs.appendFile('./cards.txt', JSON.stringify(newCard) +", ", function(err) {
		  // If an error was experienced we say it.
		  if (err) {
		    console.log(err);
		  }
		  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
		  else {
		    console.log("card Added!");
		  }
		});
	 
}


inquirer.prompt([{
        type: "rawlist",
        message: "What would you like to do today?",
        choices: ["Create Basic Flashcard", "Create Cloze Flashcard"],
        default: ["Create Basic Flashcard"],
        name: "commands"

    }]).then(function(user) {
    	if (user.commands === "Create Basic Flashcard") {
                    inquirer.prompt([{
	                type: "input",
	                message: "Create Front",
	                name: "basic_front"
	            }, 
	            {
	                type: "input",
	                message: "Create Back",
	                name: "basic_back"
	            
	            }]).then(function(basicCard) {
	                var basicCard = new BasicCard(basicCard.basic_front, basicCard.basic_back);
	                console.log(basicCard.front, basicCard.back);
	                //write in text file
	                writeCard(basicCard);
	            });    
           } else {
           		 inquirer.prompt([{
	                type: "input",
	                message: "Write Full Text",
	                name: "full_text"
	            }, 
	            {
	                type: "input",
	                message: "What is the Cloze-deleted Portion of the Text",
	                name: "cloze_text"
	            
	            }]).then(function(clozeCard) {
	            	var clozeCard = new ClozeCard(clozeCard.full, clozeCard.cloze, clozeCard.partText);
	                console.log(clozeCard);
	                //write in text file
	                writeCard(clozeCard);
	            });    
           }
    	});

