/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string} grid - The Boggle game board.
 * @param {string} dictionary - The list of available words.
 * @return {string} solutions - Possible solutions to the Boggle board.
 */
function findAllSolutions(grid, dictionary) {
    const answer = [];
    const hash = createHashMap(dictionary);
    // edge case for dictionary size check
    if (dictionary.length === 0 || grid.length === 0 || grid.length === 1) {
      return answer;
    }
    // edge case for grid size check
    for (let i = 0; i <grid.length; i ++) {
      if (grid.length !== grid[i].length) {
        return answer;
      }
    }
    // turn grid all lowercase
    for ( let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        grid[i][j] = grid[i][j].toLowerCase();
      }
    }
  
    const visited = Array.from(Array(grid.length), () =>
      new Array(grid.length).fill(0));
  
    //  recursion to solve boggle
    let word = '';
    for ( let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        let node = [i, j];
        visited[i][j] = false;
        dfs(grid, i, j, hash, visited, word, answer);
      }
    }
    for (const words of answer) {
      if (words.length <3) {
        answer.delete(word);
      }
    }
    return Array.from(new Set(answer));
  };
  
   function createHashMap(dictionary) {
    const dict = {};
    for (let i = 0; i < dictionary.length; i++) {
      if (dictionary[i].length >= 3) {
        dict[dictionary[i].toLowerCase()] = 1;
        let wordlength = dictionary[i].length;
        let str = dictionary[i];
        for (wordlength; wordlength > 1; wordlength--) {
          str = str.substr(0, wordlength- 1).toLowerCase();
          if (str in dict) {
            if (str == 1) {
              dict[str] = 1;
            }
          } else {
            dict[str] = 0;
          }
        }
      }
    }
    return dict;
  };
  
  /**
   * Recursive function to find list of available words in
   * the dictionary present inside of the Boggle board.
   * @param {string} grid - The Boggle game board.
   * @param {int} i - The index of character on board.
   * @param {int} j - The index of character on board.
   * @param {hashmap} hash - Dictionary that maps substr to 1 or 0
   * @param {set} visited - Set of already traversed nodes on the game board
   * @param {string} word - Current word that is being built
   * @param {string} answer - List of found words on boggle board
  */
  function dfs(grid, i, j, hash, visited, word, answer) {
    visited[i][j] = true;
    word += grid[i][j];
    // console.log(word)
    if (hash[word] == 1 && word.length >= 3) {
      answer.push(word.toLowerCase());
    }
    if (hash[word] == 0) {
      for ( let actualNeighbors of validNeighbors([i, j], grid)) {
        let r = actualNeighbors[0];
        let c = actualNeighbors[1];
        if (visited[r][c] == false) {
          dfs(grid, r, c, hash, visited, word, answer);
        }
      }
    }
    word = '' + word[-1];
    visited[i][j] = false;
  }
  
  /**
   * Function to determine if neighbor nodes
   * should be traversed.
   * @param {int} node - character postion on Boggle game board.
   * @param {string} grid - The Boggle game board.
   * @return {int} lst - neighbor nodes that can be traversed
  */
  function validNeighbors(node, grid) {
    let lst = [];
    let potentialNeighbor = potentialNeighbors(node);
    for ( let potential of potentialNeighbor) {
      // console.log(potential, "checking var potential")
      let r = potential[0];
      let c = potential[1];
      if (r >= 0 && c >= 0 && r<grid.length && c < grid[0].length) {
        let validNeighbor = [r, c];
        lst.push(validNeighbor);
      }
    }
    // console.log(lst, "these r valid neighbors")
    return lst;
  }
  
  /**
   * Helper function to determine if neighbor nodes
   * should be traversed.
   * @param {int[]} node - character postion on Boggle game board.
   * @return {int[]} potentialNeighbor - neighbor nodes that can be traversed
   */
  function potentialNeighbors(node) {
    let r = node[0];
    let c = node[1];
    let potentialNeighbor = [
      [r - 1, c], // North
      [r + 1, c], // South
      [r, c + 1], // East
      [r, c - 1], // West
      [r - 1, c - 1], // North West
      [r + 1, c - 1], // South West
      [r - 1, c + 1], // North East
      [r + 1, c + 1], // South East
    ];
    // console.log(potential_neighbor, "these r given potential neighbors")
    return potentialNeighbor;
  }
  
  const grid = [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L'], ['A', 'B', 'C', 'D']];
  let dictionary = ['ABEF', 'AFJIEB', 'DGKD', 'DGKA'];
  export default findAllSolutions;

  
  