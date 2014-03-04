// Globals
// a: HTML code (just for init) / sum of the winning moves (-3/3 for Tic Tac Toe, -4/4 for Find 4) (just for play)
// b: body
// c: current player (-1/1) a.k.a (O/X)
// d: game data (array filled with -1/0/1)
// e: game state (0: game over / 1: playing)
// f: current game (1: TicTacToe / 2: Find 4 / 0: Reversi / 3: Tic Tac Toe 3D)
// g: init function
// i, j, k, l: loop vars
// m: play function
// n: current line (reversi)
// o: current col (reversi)
// p: same color found (reversi)
// q: cell is playable (reversi)
// r: neighbours vertical offsets (reversi)
// s: neighbours horizontal offsets (reversi)
// t: subfunction to test / use a cell (reversi)
// u: sum of all cells (reversi)
// v: direction (reversi)
// x,y,z: params
// Unicode:  
// Unicode: ✌

// Menus
b.innerHTML="<center><p onclick=g(1,3,3,f=1)>XnO<p onclick=g(3,3,3,f=1)>XnO3D<p onclick=g(1,6,7,f=2)>Find4<p onclick=g(1,8,8,f=0)>Reversi<p id=B><p id=C>O";

// Initialization
// x: tables
// y: rows
// z: cols
g=function(x,y,z,A){

  // Reset current player, game state and cell number
  c=e=1;
  i=0;
  
  // Reset game data
  d=[];
  
  // Reversi: place 4 discs in the middle
  if(!f){
    d[27]=d[36]=-1;
    d[28]=d[35]=1;
  }
  
  // Reset HTML
  B.innerHTML="";

  // Loop on tables
  for(;x--;){

    // Write table HTML
    a="<p><table border>";

    // Loop on lines
    for(j=y;j--;){

      // Write line HTML
      a+="<tr>";
      
      // Loop on columns
      for(k=z;k--;){
        
        // Reset cell's data
        d[i]=d[i]||0;
      
        // Write cell HTML
        a+="<th width=20 onclick=m(this,"+i+","+j+","+k+") id=t"+i+">"+"X\xa0O"[d[i++]+1];
      }
    }

    // Add HTML
    B.innerHTML+=a;
  }

  // Show current player
  //C.innerHTML="O";
}

// play
// x: current cell
// y: current cell number
// z: current cell's line
// A: current cell's column
m=function(x,y,z,A){

  // If the game is not over and the cell is empty
  if(e&&!d[y]){
  
    /*// Reversi rules
    if(!f){
      
      // Try to play on current cell
      t(z,A,1);
      
      // If it was valid
      if(q){
      
        // Change player
        c=-c;
        C.innerHTML="XnO"[c+1];
        
        // Loop on all cells and test if the player can play
        for(z=0;z<8;z++){
          for(A=0;A<8;A++){
            if(!d[z*8+A]){
              t(z,A);
            }
          }
        }
        
        // If the player can't play
        if(!q){
        
          // Come back to the current player
          c=-c;
          C.innerHTML="XnO"[c+1];
        
          
          // Loop on all cells and test if the player can play
          for(z=0;z<8;z++){
            for(A=0;A<8;A++){
              if(!d[z*8+A]){
                t(z,A);
              }
            }
          }
          
          // If the player can't play, both are stuck, the game ends
          if(!q){
          
            // Compute sum of the cells
            u=0;
            for(i in d){
              u+=d[i];
            }
            
            // Victory
            if(u){
              C.innerHTML="XO"[+(u>0)]+" won!";
            }
            
            // Draw
            else{
              C.innerHTML="Draw";
            }
            e=0;
          }
        }
      }
      return;
    }
    

    // Tic Tac Toe (normal & 3D) rules
    else*/ if(f==1){
      
      // Put a mark
      x.innerHTML="XnO"[c+1];
      
      // Update model, set total
      a=3*(d[y]=c);
      
      // Test victory
      for(i=3;i--;){
        for(j=3;j--;){
          if(
            d[9*i+j]+d[9*i+j+3]+d[9*i+j+6]==a           // columns 2D
            || d[9*i+3*j]+d[9*i+3*j+1]+d[9*i+3*j+2]==a  // lines 2D
            || d[9*i+0]+d[9*i+4]+d[9*i+8]==a            // diagonals 2D
            || d[9*i+2]+d[9*i+4]+d[9*i+6]==a            // diagonals 2D
            || d[3*i]+d[9+3*i+1]+d[18+3*i+2]==a         // Lines 3D
            || d[3*i+2]+d[9+3*i+1]+d[18+3*i]==a         // Lines 3D
            || d[i]+d[9+i+3]+d[18+i+6]==a               // Columns 3D
            || d[i+6]+d[9+i+3]+d[18+i]==a               // Columns 3D
            || d[13]+d[0]+d[26]==a                      // Diagonals 3D
            || d[13]+d[2]+d[24]==a                      // Diagonals 3D
            || d[13]+d[8]+d[18]==a                      // Diagonals 3D
            || d[13]+d[6]+d[20]==a                      // Diagonals 3D
            || d[i*3+j]+d[9+i*3+j]+d[18+i*3+j]==a       // Same cell in all tables
          ){
            C.innerHTML="XnO"[c+1]+" won";
            e=0;
            return;
          }
        }
      }
    }
    
    // 4 in a row rules
    else if(f==2&&(y>34||d[y+7])){
    
      // Put a mark
      x.innerHTML="XnO"[c+1];
      
      // Update model, set total
      a=4*(d[y]=c);

      // Test if 4 marks are aligned
      for(i=6;i--;){
        for(j=7;j--;){
          B=i*7+j;
          if(
            // Horizontally
            j<4 && d[B]+d[B+1]+d[B+2]+d[B+3]==a
            
            // Vertically
            || i<3 && d[B]+d[B+7]+d[B+14]+d[B+21]==a
            
            // Diagonally 1
            || i<3 && j<4 && d[B]+d[B+8]+d[B+16]+d[B+24]==a
            
            // Diagonally 2
            || i<3 && j>2 && d[B]+d[B+6]+d[B+12]+d[B+18]==a
          ){
            C.innerHTML="XnO"[c+1]+" won";
            e=0;
            return;
          }
        }
      }
    }
    
    // Do nothing if we click on a bad cell at Find 4
    else return;
    
    // Change player
    c=-c;
    C.innerHTML="XnO"[c+1];
    
    // Detect draw
    if(d.indexOf(0)==-1){
      C.innerHTML="Draw";
      e=0;
    }
  }
}

/*
// Reversi function to test / play a cell
// x: line
// y: column
// z: 0: test / 1: play
t=function(x,y,z){

  // Reset current player's ability to play
  q=0;

  // For each direction
  for(v=2;v--+1;){
    for(u=2;u--+1;){
      if(u||v){

        // Reset this direction's winning state
        p=0;
        
        // If the neighbour is the opponent
        if(d[(x+v)*8+y+u]==-c){
          
          // Loop on the next neighbours in that direction
          for(
            i=x+2*v,j=y+2*u;
            i>=0&&i<9&&j>=0&&j<9;
            i+=v,j+=u
          ){
            // If current color is found, stop, good direction
            if(d[i*8+j]==c){
              p=q=1;
              break;
            }
            // If an empty cell is found, stop, bad direction
            if(!d[i*8+j]){
              break;
            }
          }
          
          // If this direction wins and play flag == 1
          if(p&&z){
            
            // Loop on the opposite neighbours
            for(
              k=x,l=y;
              k!=i||l!=j;
              k+=v,l+=u
            ){
              
              // Mark them
              this["t"+(k*8+l)].innerHTML="XnO"[c+1];
              d[k*8+l]=c;
            }
          }
        }
      }
    }
  }
}
*/