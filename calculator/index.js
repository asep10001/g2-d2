(function() {
    let el = (element) => {
      if(element.charAt(0) === "#"){
      //jika merupakan sebuah id maka dia akan menampilkan single element;
      return document.querySelector(element);
      } 
      //jika bukan id maka dia akan mengembalikan nodelist
      return document.querySelectorAll(element);
  };
  
  
  let display = el("#viewer"), //display kalkulator
      equals = el("#equals"), //tombol sama dengan
      nums = el(".num"), // list dari tombol angka dan decimal
      ops = el(".ops"), // list dari tombol operator
      numSekarang = "", // angka pada saat ini
      numLama = "", // angka lama
      numHasil, // angka hasil
      operator; // operator
  
  // memilih numSekarang ketika button di klik
  let setNum = function(){
    if(numHasil){
      numSekarang = this.getAttribute("data-angka");
      console.log(this.outerHTML);
      numHasil = "";
    } else {
      console.log(this.outerHTML)
      numSekarang += this.getAttribute("data-angka");
      
    }
  
    display.innerHTML = numSekarang;
  }
  
  //ketika operator di klik
  let pindahNum = function (){
    numLama = numSekarang;
    numSekarang = "";
    operator = this.getAttribute("data-operator");
    console.log(operator);
  
    equals.setAttribute("data-result", "");
    //kembalikan nilai atrribute dari equals
  };
  
  //ketika tombol sama dengan diklik
  let displayNum = function(){
    console.log(numLama, numSekarang);
    //rubah string dari numLama dan numSekarang menjadi float
    numLama = parseFloat(numLama);
    numSekarang = parseFloat(numSekarang);
  
    //menjalankan perhitungan
    switch(operator) {
    case "plus":
      numHasil = numLama + numSekarang;
      break;
  
    case "minus":
      numHasil = numLama - numSekarang;
      break;
  
    case "times":
      numHasil = numLama * numSekarang;
      break;
      
    case "divided by":
      numHasil = numLama / numSekarang;
      break;
    
    //jika tombol sama dengan di klik tanpa melakukan satupun operator yang ada maka tetapkan nilai numHasil dengan nilai numSekarang
    default:
      numHasil = numSekarang;
      }
  
    //pengecekan tombol selain angka
    if (!isFinite(numHasil)) {
      if (isNaN(numHasil)) {//jika nilai hasil bukan angka
        numHasil = "Yah Rusak deh";
        el("#container").classList.add("animate__bounce");
        el("#container").classList.add("animate__hinge");
        el("#container").classList.add("show");
        document.querySelector("body").appendChild(document.createElement("h2")).appendChild(el("#reset"));
        var h2 = document.querySelector("h2");   // Get the first <h1> element in the document
        var att = document.createAttribute("class");      // Create a "class" attribute
        let button = document.querySelector("h2 button#reset");
        att.value = "democlass";                        // Set the value of the class attribute
        h2.setAttributeNode(att);
        button.setAttribute("style", "display:inline;")
      } else {
        numHasil = "JANGAN PENCET SAMA DENGAN LAGI";
        el("#calculator").classList.add("animate__animated");//efek animasi kalkulator rusak
        el("#calculator").classList.add("animate__bounce");//efek animasi kalkulator rusak
     // efek animasi untuk mereset kalkulator
      }
    }
  
    //munculkan nilai
    display.innerHTML = numHasil;
    equals.setAttribute("data-result", numHasil);
  
    //mereset angka lama dan menetapkan numHasil menjadi numSekarang
    numLama = 0;
    numSekarang = numHasil;
  
    console.log(numSekarang)
      
  };
  
  //ketika clear button di tekan
  let clear = function(){
    numLama ="";
    numSekarang = "";
    display.innerHTML = "0";
    equals.setAttribute("data-result", numSekarang);
  };
  
  // menambahkan klik even pada tombol
  
  // klik event ke angka
  for (let i = 0; i< nums.length; i++){
    nums[i].onclick = setNum;
  }
  
  //klik event untuk operator
  for (let i = 0; i< ops.length; i++){
    ops[i].onclick = pindahNum;
  }
  
  //klik event untuk sama dengan
  equals.onclick = displayNum;
  
  //untuk clear
  el("#clear").onclick = clear;
  
  //untuk reset windows
  el("#reset").onclick = function() {
    window.location = window.location;
  };
  
  
  }());