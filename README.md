## Tic Tac Toe Game

This is a simple Tic Tac Toe game built using React. It offers two modes of gameplay: Classic and Infinite. In Classic mode, players take turns marking squares in a 3x3 grid, aiming to achieve a row, column, or diagonal of their symbol (either 'X' or 'O'). In Infinite mode, The game only allows you to have a maximum of 3 marks, the first one is removed when you put a new one.

### Features

- **Two Gameplay Modes**: Choose between Classic and Infinite modes to enjoy different challenges.
- **LocalStorage**: The game state is stored in the browser's localStorage, allowing you to continue your game even after closing or refreshing the page.
- **Winner Modal**: When a player wins or the game ends in a draw, a modal pops up to announce the winner or declare a draw.

### How to Play

1. **Choose Mode**: Toggle between Classic and Infinite mode using the checkbox.
2. **Start Playing**: Click on the squares to mark your move. In Classic mode, aim to get three of your symbols in a row, column, or diagonal. In Infinite mode, strategize to dominate the infinite grid.
3. **Reset Game**: If you want to start over, simply click the "Reset Game" button.

### Technologies Used

- React
- Canvas Confetti (for the celebratory effect when someone wins)

### Installation and Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and go to `http://localhost:3000` to play the game.

### Contributions

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or create a pull request.

### License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your own purposes.
