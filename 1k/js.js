/** Globals **/
// a: init function
// b: body
// c, d, e: board size
// f: rules (0: reversi / 3: XnO & XnO 3D / 4: find 4), used to determine how many marks must be aligned
// g: game state  (0: game over / 1: playing)
// h: HTML
// i, j, k, l: loop vars
// m: model (array filled with -1/0/1)
// p: current player(1: O / -1: X)
// q: onclick
// x: reversi leader / pass (<p>)
// y: current player / winner (<p>)
// z: board (<p>)

/** Specific vars for init function **/
// i: lines
// j: columns
// k: cell number

/** Specific vars for play function **/
// c,d,e: params

// XnO, XnO3D, Find 4
// r: sum of the marks that are needed to win

// Reversi:
// s: cell is playable
// t: direction is playable
// u, v: loop vars
// w: score

/** Unicode space: " " **/

// Show the menu
b.innerHTML="<center><font face=arial><p><button onclick=p=g=s=1;m=[];c=1;d=e=f=3;a()>XnO<button onclick=p=g=s=1;m=[];c=d=e=f=3;a()>XnO3D<button onclick=p=g=s=1;m=[];c=1;d=6;e=7;f=4;a()>Find4<button onclick=p=g=s=1;m=[];c=1;d=8;e=8;f=w=0;m[27]=m[36]=-1;m[28]=m[35]=1;a()>Reversi</button><p id=z>";

// Init function
a=function(){
  
  // Init cell number, HTML
  l=0;
  h="<center>";
  
  // Show HTML and game status  
  
  // Loop on tables, write table HTML
  for(i=c;i--;)
  
    // Loop on lines
    for(j=d,h+="</table><br><table border>";j--;)

      // Write line HTML, loop on cells
      for(h+="<tr>",k=e;k--;)
      
        // Write cell HTML
        h+="<th width=20 onclick=q("+[l,7-j,7-k]+") id=t"+l+">"+"X.O"[1+(m[l]=m[l++]||0)];
  
  z.innerHTML=(g?(~m.indexOf(0)?"XnO"[p+1]+" next":(f?"draw":"")):(f?"XnO"[-p+1]+" won":""))+(f?"":"<br>"+(w?w>0?"O > X":"X > O":"X = O")+"<br><button onclick=p=-p;a()>pass</button>")+h;
}

// onclick
// c: current cell number
// d: current cell's line
// e: current cell's column
q=function(c,d,e){
  
  // If the game is not over and the cell is empty
  if(g&&!m[c]){
  
    // Find 4
    if(f>3){
    
      // If a wrong cell is clicked, apply gravity
      for(;35>c&&!m[c+7];c+=7);

      // Test if 4 marks are aligned
      for(i=6;i--;)
        for(j=7;j--;)
          if(
            k=i*7+j,
            ~[
              j<4&&m[k]+m[k+1]+m[k+2]+m[k+3],         // Horizontally
              i<3&&m[k]+m[k+7]+m[k+14]+m[k+21],       // Vertically
              i<3&&j<4&&m[k]+m[k+8]+m[k+16]+m[k+24],  // Diagonally 1
              i<3&&j>2&&m[k]+m[k+6]+m[k+12]+m[k+18]   // Diagonally 2
            ].indexOf(f*(m[c]=p))
          )
          g=0;
    }
    
    // XnO
    else if(f){
    
      // Put a mark
      // Update model, set total
      // Test victory
      for(i=3;i--;)
        for(j=3;j--;)
          if(
            k=i*9,
            l=j*3,
            ~[
              m[k+j]+m[k+j+3]+m[k+j+6],   // Columns 2D
              m[k+l]+m[k+l+1]+m[k+l+2],   // Lines 2D
              m[k+4]+m[k+0]+m[k+8],       // Diagonals 2D
              m[k+4]+m[k+2]+m[k+6],       // Diagonals 2D
              m[l+10]+m[l]+m[l+20],       // Lines 3D
              m[l+10]+m[l+2]+m[l+18],     // Lines 3D
              m[i+12]+m[i]+m[i+24],       // Columns 3D
              m[i+12]+m[i+6]+m[i+18],     // Columns 3D
              m[13]+m[0]+m[26],           // Diagonals 3D
              m[13]+m[2]+m[24],           // Diagonals 3D
              m[13]+m[6]+m[20],           // Diagonals 3D
              m[13]+m[8]+m[18],           // Diagonals 3D
              m[l+i]+m[l+i+9]+m[l+i+18]   // Same cell in all tables
            ].indexOf(f*(m[c]=p))
          )
          g=0;
    }
    
    
    // Reversi
    else{

      // Reset cell's playability
      s=0;

      // For each direction
      for(i=2;~i--;){
        for(j=2;~j--;){

          // Reset that direction's playability
          // If the neighbour is the opponent
          if(i|j&&(t=0,m[8*(d+i)+e+j]==-p)){

            // Loop on the next neighbours in that direction
            for(
              k=d+i,l=e+j;
              ~k&&k<9&&~l&&l<9;
              k+=i,l+=j
            ){
            
              // If current color is found, stop, good direction
              if(m[k*8+l]==p){
                s=t=1;
                break;
              }
              
              // If an empty cell is found, stop, bad direction
              if(!m[k*8+l]){
                break;
              }
            }

            // If this direction is playable
            if(t){

              // Loop on the opposite neighbours
              for(
                u=d,v=e;
                u!=k||v!=l;
                u+=i,v+=j
              ){

                // Toggle them
                m[u*8+v]=p;
              }
            }
          }
        }
      }
      
      // Compute score
      w=0;
      for(i in m){
        w+=m[i];
      }
    }

    // Change player
    if(s)p=-p;
    
    // Redraw board
    a();
  }  
}