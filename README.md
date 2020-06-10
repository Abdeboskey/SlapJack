# SlapJack
SlapJack is a two-player card-game-simulator based on the popular game of the same name.
The goal of the game is to collect all of the cards by slapping the middle deck when a Jack,
doubles (two cards of the same number-type in a row) or a sandwich (two cards of the same number-type with one card in-between)
is played. This game is played by two players on the same machine by using the
keyboard commands defined in the gameplay section below to deal and slap cards.

This was the final solo-project for Turing School of Software and Design's Front-End-Engineering program in during Mod 1 of the 2005 inning.
This project was designed to develop a thorough understanding of:

* Object-oriented programming using DRY JavaScript.
* Using event delegation to handle similar event listeners.
* Understanding the difference between the data-model and the DOM and how to separate them in your programming.
* Using localStorage to persist data across page-loads.
* Professionalism through practice of documentation, git and Github workflows,
and using project management tools to help break up large tasks into smaller, more manageable chunks.

## Gameplay
### Controls:
#### Player 1:
* Press 'q' to play a card.
* Press 'f' to slap!

#### Player 2:
* Press 'p' to play a card.
* Press 'j' to slap!

### Rules of the Game:

As mentioned above, the goal of the game is to collect all of the cards by slapping the middle deck when a Jack,
doubles (two cards of the same number-type in a row) or a sandwich (two cards of the same number-type with one card in-between)
is played. If a player slaps the middle deck when any of these three conditions are present, the middle deck gets shuffled into their existing hand and gameplay continues. If either player slaps the middle deck when none of these conditions are present, (i.e. if it is not a Jack, Doubles, or a Sandwich), then the top card in their hand is forfeited to the other player, and is placed at the bottom of their hand.

**When either player runs out of cards, we enter the Final stage and the rules change just a bit!**

* Once either player runs out of cards, doubles and sandwiches are no longer valid slaps! Jacks are the only valid slap while one player's hand is empty.

* When one player runs out of cards, the player with cards remaining must continuously deal until a Jack is played and slapped. If they run out of cards before a Jack has been played (or slapped, rather), the central pile is shuffled and returned to that same player's hand to continue dealing.

* If the player who is out of cards slaps a Jack in this final stage, the central pile is shuffled into their hand, they are back in the game and normal gameplay conditions resume! Otherwise, if the player who is out of cards slaps a card that is _not_ a Jack, that player loses the game.

* If the player with cards remaining slaps a Jack, they win the game! Otherwise if they slap a card that is _not_ a Jack, then then the top card in their hand is forfeited to the other player, and normal game conditions resume until one player runs out of cards again.

## Functionality

* When the page is loaded, the deck of 52 cards is shuffled 3 times and split evenly between the two players. A message is displayed that defines the controls for each player, and prompts Player 1 to start the game by playing a card!

![Initial instructions on pageload]()

* When a player plays a card, the instructions disappear and the card is displayed in the central pile. The card showing always has a shadow that is the same color as the player's deck who played it, to help keep track of who played what and who's turn it is next. If a player tries to play a card out of turn, a gameplay message gently reminds the players who's turn it is.

![Alternating cards and displaying current turn reminder]()

* If a player tries to slap when no cards are present, a message is displayed that informs the player that there is "nothin' to slap" and then reminds the players who's turn it is to play a card.

![There's nothin' to slap! gameplay message]()

* If a player slaps a Jack, Doubles or a Sandwich, a corresponding message is displayed, and the game pauses for one second, and all player controls are disabled so that the message persists even if both players try to slap the same card. After one second, controls are re-enabled, the middle deck disappears and an additional message displays reminding the players who's turn it is to play a card. The central pile is shuffled into the slapper's hand and gameplay resumes.

![Slapjack message with pause and current turn reminder]()

![Doubles message with pause and current turn reminder]()

![Sandwich message with pause and current turn reminder]()

* If a player slaps a card that is not a valid slap, (i.e. if it is not a Jack, Doubles, or a Sandwich), a message displays that notifies the players about the invalid slap, and that the slapper will forfeit a card from their hand to the other player. A one second pause will happen, and the top card from the slapper's deck will be placed at the bottom of the other player's hand. An invalid slap can happen any time there are cards showing that are not a Jack, Doubles or a Sandwich.

![Bad slap message]()

* If either player runs out of cards, a message will display that notifies that player that they have run out of cards, only a Jack can save them now, and that it is the other player's turn to play a card. This message will persist as long as one player's hand is empty. The final gameplay conditions are present as long as one player is out of cards (Only Jacks are valid slaps!).

![Player ran out of cards message]()

* If the player with cards remaining deals all of their cards without a Jack being slapped, the middle pile is shuffled back into their hand and a message notifies that they have run out of cards, but it is their turn again.

![Player ran out of cards but it is still their turn]()

* During the final stage, when one player has run out of cards, the only slap that is valid is to slap a Jack! If that player slaps a Jack, the central pile is shuffled into their hand and a message displays that notifies them of a Slapjack, and that they are now back in the game! The game then proceeds as normal.

![Close Call gameplay message]()

* If the player who has run out of cards slaps when a Jack is _not_ showing, they lose the game. A message is displayed that notifies the players that it was a bad slap, and the opposing player has won the game. The player wins are then saved to localStorage and updated on the page, while a "Gameover" sequence happens for 10 seconds, as all colors on the page rotate through the hue spectrum and back again. All controls are disabled during these 10 seconds, and after the Gameover sequence is completed, the game data is re-set and a message prompts player 1 to start a new game by playing a card.

![Game over "You Lose" sequence]()

* If one player has run out of cards, and the player with cards left slaps a Jack, a message displays notifying the players of the win, that player's win count is updated on the page and saved to localStorage, and the "Gameover" sequence happens for 10 seconds before the game data is re-set and a message prompts player 1 to start a new game by playing a card.

![Game over "You Win" sequence]()

* If the player with cards left slaps a card that is _not_ a Jack, it is just like an invalid slap in regular gameplay. They forfeit a card to the other player, and normal gameplay resumes.

![Final stage Bad Slap message]()

* When the page is refreshed, the wins are retrieved from localStorage and the Win displays are updated on the page. 

## Challenges/Wins

* This project was the largest project I have had to tackle by myself, and the size of the task was rather debilitating at first. I had to utilize planning and project management tools to break the work up into smaller tasks, set a schedule to keep me on the right track and set daily goals for myself, and be really aware of my time management in order to accomplish these tasks. This is something that I typically really struggle with, so getting this project completed (code-wise, a day early) was a huge win for me. I cannot remember ever completing an academic project with that much time to spare, and I'm really proud of the time/project management I utilized to achieve that.

* This program requires a dense web of conditional statements, and it became really hard to keep track of the functionality very quickly. To overcome this, I had to write out a lot of the conditions and control flow in english in a notebook multiple times before it became clear how to proceed with something and what was doing what. Ultimately, I became familiar enough with the rules of the game that it became easier to navigate the logic, and after a decent amount of refactoring, my code is much more readable and easy to follow for me. I have also learned a lot more about the power of truthy/falsey values in the process, and that knowledge is extremely valuable as a programmer!

* Because this was a solo project, I had to really just rely on myself and my own problem solving abilities to figure this out. Sometimes that meant researching concepts and methods in documentation, other times that meant pseudo-coding until the logic became clear, and other times it meant closing my computer for a little while and just thinking about the problem without code in front of me, or focusing on something else entirely to let my brain connect the dots behind the scenes. In the end, I am really proud of the application that I built, and feel like this was a huge moment of growth in my journey as a fledgling developer.

* Through the practice of making consistent commits and having to write, review, and merge my own pull requests on Github, I had to learn about being concise yet descriptive, and thorough with my reviews to make sure I understood the code I had written for each feature. The practice of reviewing and commenting on my own branches before merging provided a really great place for me to reflect on what went well/was difficult, and plan out what I wanted to address/fix/build in the next session. It was also kind of fun just to have this working conversation by myself, and I found it incredibly useful in terms of project management.

### Reflection

* Overall, there are still some things that I think I could do better in the future, and some improvements I could make to the code. But considering all of the environmental factors and my current progress as a developer, I am really proud of this application and I think that this was my favorite project of the entire mod. At a moment where I was starting to feel burned out and overwhelmed, this project gave me an opportunity to put all the skills I have been learning together and make a fully functional computer game from scratch with relatively vague instruction, and really re-invigorated my sense of awe in programming, and my excitement for this path. I would have never thought that I could build something like this and I am really really proud and excited. (And I'm very much open and excited to receive any and all types of feedback on this project. This has been, and will continue to be an awesome learning opportunity.)





// End
