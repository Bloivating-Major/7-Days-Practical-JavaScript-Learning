- We have tiles
- To mark a tile we right click on it
    - When you mark a tile you cannot open it
- To open a tile we left click on it

- How is our approach?

1. Populate a board with tiles/mines
2. We need to build left click on tiles
    - 1. Reaveal Tiles
3. Right Click on tiles.
    - 1. Mark Tiles
4. Check for win/loss

- So overall we have 2 things in this game 1st is the logic and 2nd is the UI that's changed during the gameplay

- What we will do is create a seperate file to write logics of the game and in script.js we will target the UI changes.

- 1. Populate a board with tiles?
    - Create a function to populate mines
        - Function will take 2 params board size and number of mines
        - What you wil do here is create a 2d array of gievn size running 2 loops 1 to create rows and 2nd to create tiles in each row
        - This way you will have your board ready.
        - You can import it in script.js and call it to get the board
    - Create a element for each mine
        - Remember we have status for mines in our css file so make sure to use them in your mine creation.
    - Now target the board element and then use it to create board on the actual UI
        - Use 2 variables as Board Size and Number Of Mines to add the size to board and mines on the UI
        - Then you can iterate through board element and then add those mines on the board.
    - Creating and marking status is not an easy thing so what we can do is create getter and setter on the object that we will be using as our board tile.
    - Next thing to do is populate our board with mines.
        - So we will add a property on our tile as mine which be set to true or false based on it is a mine or not!
        - What we will do is create minePositions and in that we will use a function to create mines using boardSize and numberOfMines as getMinePositions so minePositions will give us Array of values in the end which will be x and y coordinates for our mines.
        - function getMines
            - here we will return an array of numbers as mines
            we will create positions as objects which has x and y
            - now how we will generate those x and y coordinates is through a randomNumber function
            - also we will check if our positions array has duplicate positions or not?
            - we will use some on positions to find our is our match true or not
            - so that we can remove duplicates
            - randomNumber function takes size and returns a number based on it!