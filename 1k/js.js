// Globals
// a: HTML code (just for init) / sum of the winning moves (-3/3 for Tic Tac Toe, -4/4 for Find 4) (just for play)
// b: body / i*7+j (reversi)
// c: current player (-1/1) a.k.a (o/x)
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
// B,C,D: HTML containers
// Unicode:  
// Unicode: ✌

// Menus
b.innerHTML="<center><p onclick=g(1,3,3,f=1)>xno<p onclick=g(3,3,3,f=1)>xno3d<p onclick=g(1,6,7,f=2)>find4<p onclick=g(1,8,8,f=0)>reversi<p id=B><p id=C><p id=D>";

// Initialization
// w: tables
// x: rows
// y: cols
g=function(w,x,y,z){

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
  for(;w--;){

    // Write table HTML
    a="<br><table border>";

    // Loop on lines
    for(j=x;j--;){

      // Write line HTML
      a+="<tr>";

      // Loop on columns
      for(k=y;k--;){

        // Reset cell's data
        d[i]=d[i]||0;

        // Write cell HTML
        a+="<th width=20 onclick=m(this,"+[i,7-j,7-k]+") id=t"+i+">"+"x.o"[d[i++]+1];
      }
    }

    // Add HTML
    B.innerHTML+=a;
  }

  // Show current player
  C.innerHTML="o";

  // Reset current winner
  D.innerHTML="";
}

// play
// w: current cell
// x: current cell number
// y: current cell's line
// z: current cell's column
m=function(w,x,y,z){

  // If the game is not over and the cell is empty
  if(e&&!d[x]){

    // Reversi rules
    if(!f){

      // Reset current player's ability to play
      q=0;

      // For each direction
      for(v=2;~v--;){
        for(u=2;~u--;){
          if(u|v){

            // Reset this direction's playability
            p=0;

            // If the neighbour is the opponent
            if(d[(y+v)*8+z+u]==-c){

              // Loop on the next neighbours in that direction
              for(
                i=y+v,j=z+u;
                ~i&&i<9&&~j&&j<9;
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

              // If this direction is playable
              if(p){

                // Loop on the opposite neighbours
                for(
                  k=y,l=z;
                  k!=i||l!=j;
                  k+=v,l+=u
                ){

                  // Mark them
                  this["t"+(k*8+l)].innerHTML="xno"[c+1];
                  d[k*8+l]=c;
                }
              }
            }
          }
        }
      }

      // Compute score
      u=0;
      for(i in d){
        u+=d[i];
      }
      if(!q)
        return;
      //else
      D.innerHTML=u?u>0?"O>X":"X>O":"X=O"
    }

    // Tic Tac Toe (normal & 3D) rules
    else if(f==1){

      // Put a mark
      w.innerHTML="xno"[c+1];

      // Update model, set total
      a=3*(d[x]=c);

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
            return e &= C.innerHTML="xno"[c+1]+" won";
          }
        }
      }
    }

    // 4 in a row rules
    else if(f==2&&(x>34||d[x+7])){

      // Put a mark
      w.innerHTML="xno"[c+1];

      // Update model, set total
      a=4*(d[x]=c);

      // Test if 4 marks are aligned
      for(i=6;i--;){
        for(j=7;j--;){
          b=i*7+j;
          if(
            j<4&&d[b]+d[b+1]+d[b+2]+d[b+3]==a           // Horizontally
            ||i<3&&d[b]+d[b+7]+d[b+14]+d[b+21]==a       // Vertically
            ||i<3&&j<4&&d[b]+d[b+8]+d[b+16]+d[b+24]==a  // Diagonally 1
            ||i<3&&j>2&&d[b]+d[b+6]+d[b+12]+d[b+18]==a  // Diagonally 2
          ){
            return e &= C.innerHTML="xno"[c+1]+" won";
          }
        }
      }
    }

    // Do nothing if we click on a bad cell at Find 4
    else return;

    // Change player
    c=-c;
    C.innerHTML="xno"[c+1];

    // Detect draw
    if(d.indexof(0)==-1){
      e &= C.innerHTML=f?"=":"";
    }
  }
}