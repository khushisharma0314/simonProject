// step 1...game start krne k liye koi bhi key press krni hogi uske liye eventglistner key press lga dinge 
//game start hote hi level one pr aa jaye aur hamara btn flash kr jaye
//step 2...levelup + btnflash
//step3....press btn by user check it is same as game sequence
//step4...check=same(levelup)  check=wrong(game over)

let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];
let started=false;
let level=0;
let h2=document.querySelector("h2");
//step 1...
document.addEventListener("keypress",function(){
    //tbhi game start ho koi bhi key press krne se jb start false ho
    if(started==false){
        console.log("game started");
          started=true;
          levelUp();
    }
});
//step 2..random btn koi bhi flash karega aur hum level up ho jainge
   function gameFlash(btn){
      btn.classList.add("flash");
      setTimeout(function(){
        btn.classList.remove("flash");
      },250);
   }
   function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
      btn.classList.remove("userFlash");
    },250);
 }
  function levelUp(){
    userSeq=[];
    //suru user ko harr baar sare color press kene pdhe uske liye hum level up hone pr userseq ko empty kr dinge
    //esse saare suru se color press krne k baad hum level up honge
    level++;
    h2.innerText= `level ${level}`;
  //choose random btn from idx 0 to 3 from btns arr
  let ranIdx= Math.floor(Math.random()*3);
  let randColor= btns[ranIdx];//for accessing that color btn class
  let ranBtn=document.querySelector(`.${randColor}`);
  // console.log(ranIdx);
  // console.log(randColor);
  // console.log(ranBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
    gameFlash(ranBtn);
  }
  //step 3...
  function checkAns(idx){
   // console.log("curr level",level);
    //jitna level hoga utne hi dono seq arr ka size hoga ...toh idx last nikalne k liye level-1 kr dinge kyunki arr 0 idx se suru hoti
    //aur gsme and user seq check krne k liye hum dono k last color check kringe
  //  let idx=level-1; yha ye fix val k liye kaam kra tha curridx k liye jha se call hoga wha idx bheja jayega fn m
   if(userSeq[idx]===gameSeq[idx]){
      // console.log("same value");
      //agr last idx tk jo gmseq m user n press kr diya color toh level up
      if(userSeq.length==gameSeq.length){
        setTimeout(levelUp,1000);
      }
   }
   else{
    h2.innerHTML= `game over...your score was <b>${level}</b> <br> enter any key to restart..`;
    //game over hone k baad sb cheeze reset krni hongi aur atarting se game suru ho jyega
    //glt hone k baad color change ho toh
    document.querySelector("body").style.backgroundColor="red";
    
    //dubara phr se hi waisa krne k liye timout lga do
      setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
      },150);
       reset();
   }
   //jaise suru se game chlta aa ra h toh gamseq m bht val ho jaingi
   //aur user ko suru se leke last level tk k saare color press krne h har baar tbhi level bdhega
   //toh case 2 bnte h ek toh user gameseq k middle m ho skta h abhi aage col press krne ko rh gya h 
   //mid m ..continue check krte rhinge aage aage(that is next color k press hone k wait kringe) eske liye hume kuch ni krna
   //case2...last m hua toh check(curridx==lastidx) if yes level up and gam will generate new color eske liye krna hoga
  }
  function btnPress(){
    //esme whi btn this hoga jisse user click karega
  //  console.log(this);
    let btn=this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);
    //check userseq is correct seq or not
    //curr idx bhejne k liye..userseq.length-1
    checkAns(userSeq.length-1);
  }
  let allBtns=document.querySelectorAll(".btn");
    for(btn of allBtns){
      btn.addEventListener("click",btnPress);
    }
  function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;

  }