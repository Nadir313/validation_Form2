
let Title = document.getElementById("Title"),
Error1 = document.getElementById("title_Error"),

Email =document.getElementById("Email"),
Error6 = document.getElementById("Email_Error"),

Author = document.getElementById("Author"),
Error2 = document.getElementById("Author_Error"),

Btn = document.getElementById("btn"),

Price = document.getElementById("Price"),
Error3 = document.getElementById("Price_Error"),

form = document.getElementById("form"),
validation = document.getElementById("validation"),

date = document.getElementById("date"),
Error4 = document.getElementById("date_Error"),

language = document.getElementById("language"),
Error5 = document.getElementById ("language_Error"),

pattern1 = /[1-9]/,
pattern2 = /[^@]+@[^\.]+\..+/gi,
pattern3 = / / ,

printBtn = document.getElementById("print"),
body = document.getElementById("body"),
printing = document.getElementById("printing"),


newDiv =  document.getElementById("newDiv"),

radio = document.querySelector(".radioBtn"),

checkedRadio = document.querySelector("input[name='textFont']:checked");

let E404 = document.getElementsByClassName("E404"),
bookList =[],
data = document.getElementById("tbody"),
p_Info = document.getElementById("info");

var currentRow = -1;
// let Cell1,Cell2,Cell3,Cell4,Cell5,Cell6 ;

// var updateBtn = document.createElement("")

class Novel {
    constructor(title,chekedRadio,language,author,date,price){
        this.title = title ; 
        this.checkedRadio = chekedRadio;
        this.language = language;
        this.author = author ; 
        this.date = date ; 
        this.price = price; 
    }
    novelInfos(){
        return "The " +  this.title +" is a "+this.checkedRadio +", in "+ this.language+ ", Written by "+this.author +", and was published in "+this.date+". The price of " +this.title+ " is " +this.price+"$."
    }
}

console.log(Title.value)
function myClass(){
    checkedRadio = document.querySelector("input[name='textFont']:checked");
    let BOOK = new Novel(Title.value,checkedRadio.value,language.value,Author.value,date.value,Price.value)
    bookList.push(BOOK)
    console.log(bookList)

    //start sorting 
    bookList.sort((book1,book2)=>{
        if(book1.title.toUpperCase() < book2.title.toUpperCase()){
            return -1 ;
        }
        else if(book1.title.toUpperCase() > book2.title.toUpperCase()){
            return 1 ;
        }
        else {
            return 0 ; 
        }
    }) ;
    p_Info.innerHTML = BOOK.novelInfos() 
    localStorage.setItem("newBook", JSON.stringify(bookList));

}


 function isvalid(){
    if(Title.value == ""   ){
        Error1.innerHTML = " Title is necessairy "
        return false
    }
     if (Title.value.length>30){
        Error1.innerHTML = " Title is too long "
        return false
    }
     if (Author.value == ""  ){
       Error2.innerHTML = "Please fill the Name "
       return false
     }
      if ( Author.value.length>30){
        Error2.innerHTML = "Author name is too long  "
        return false
     }
     if ( ! Price.value.match(pattern1) ){
         Error3.innerHTML = "The price must be filled with a number  "
         return false
        
     }
     if (Price.value<=0){
        Error3.innerHTML = "Your Price is negative   "
        return false
     }
     console.log(Email.value)
     if( !Email.value.match(pattern2) ){
         Error6.innerHTML = "please recheck the E-mail"
         return false
     }
     if (date.value == ""){
         Error4.innerHTML = "Please Enter the  Date "
         return false
     }
     if(language.value.length == 0){
         Error5.innerHTML = "languege field must be filled "
         return false
     }
     myClass();
     return true
}


form.addEventListener("submit",(e)=>{
    e.preventDefault()
})


Btn.addEventListener("click",function check(e){
    e.preventDefault()
    let valid = isvalid();
    
    // console.log(valid)
    if(!valid) return 
        checkedRadio = document.querySelector('input[name=textFont]:checked');
        Error1.style.color="green"
         Error1.innerHTML ="Good"
         Error2.style.color="green"
         Error2.innerHTML="Good"
         Error3.style.color="green"
         Error3.innerHTML="Good"
         Error4.style.color = "green"
         Error4.innerHTML = "Good"

         data.innerHTML = ""

         for(var i=0;i<bookList.length ; i++){ 
            var deleteBtn ;
            var editBtn   ;
           // var updateBtn ; 

            deleteBtn = document.createElement("button")
            deleteBtn.innerText = "Delete"
            deleteBtn.addEventListener("click", deleteBtnClick);

            editBtn = document.createElement("button")
            editBtn.innerText = "Edit"   
            editBtn.addEventListener("click",editBtnClick)

           // updateBtn.addEventListener("click", upDateBtnClick)
            // editBtn.addEventListener("click",editBtnClick)
        let data = document.getElementById("tbody"),
        newRow = data.insertRow(),
        Cell1 = newRow.insertCell(0),
        Cell2 = newRow.insertCell(1),
        Cell3 = newRow.insertCell(2),
        Cell4 = newRow.insertCell(3),
        Cell5 = newRow.insertCell(4),
        Cell6 = newRow.insertCell(5),
        Cell7 = newRow.insertCell(6) ;

         Cell1.innerHTML = bookList[i].title ;
         Cell2.innerHTML = bookList[i].author ;
         Cell3.innerHTML = bookList[i].price ;
         Cell4.innerHTML = bookList[i].date ;
         Cell5.innerHTML = bookList[i].language ;
         Cell6.innerHTML=  bookList[i].checkedRadio ;
         Cell7.append(deleteBtn , editBtn) ;
        }
    });


    function deleteBtnClick(e){
        let isAgree = confirm('Do you really want to delete ?')
        if(isAgree){
           e.target.parentElement.parentElement.remove();
           var listIndex = bookList.length - 1 ; 
           bookList.splice( listIndex , 1) ;
           // localStorage.removeItem("newBook")
           for( var i=0 ;i<bookList.length ; i++ ){
               bookList[i]
               console.log(bookList[i])
           }
           // localStorage.removeItem(bookList[this])

           // delete the new object Data
           p_Info.innerHTML = ""

           // Emty all the inputs
           Title.value = ""
           Author.value = ""
           Price.value= ""
           date.value = ""
           Email.value = ""
           language.value = ""
           checkedRadio.checked= false
           // Empty all the validation messages
           Error1.innerHTML =""
           Error2.innerHTML=""
           Error3.innerHTML=""
           Error4.innerHTML = ""
           Error6.innerHTML = ""
        }
    }


    function editBtnClick(e){
       var rowToEditIndex = e.target.parentElement.parentElement.rowIndex;
       currentRow = rowToEditIndex;
       var rowToEdit = data.rows[rowToEditIndex-1]
       Title.value = rowToEdit.cells[0].innerHTML;
       Author.value = rowToEdit.cells[1].innerHTML;
       Price.value = rowToEdit.cells[2].innerHTML;
       date.value = rowToEdit.cells[3].innerHTML;
       language.value = rowToEdit.cells[4].innerHTML;
       document.querySelector("input[value='"+rowToEdit.cells[5].innerHTML+"']").checked = true;
          // create edit button in newDiv, it appears when I clicke the edit button in the cell 
          newDiv.innerHTML = "";

          const updateBtn = document.createElement('button')  
          updateBtn.style.height = "30px" 
          updateBtn.style.width ="100px"         
          updateBtn.innerText = "Edit"
          updateBtn.addEventListener("click", upDateBtnClick)
          newDiv.append(updateBtn)
    }
       //    updateBtn.addEventListener('click',()=>{
           
           function upDateBtnClick(e) {
               let valid = isvalid();
           //    myClass();
               if(!valid) return 
           // take values from inputs and put them in cells 

           if(currentRow != -1) {
            var row = data.rows[currentRow-1];
            row.cells[0].innerHTML = Title.value;
            row.cells[1].innerHTML = Author.value
            row.cells[2].innerHTML = Price.value
            row.cells[3].innerHTML = date.value
            row.cells[4].innerHTML = language.value
            // row.cells[5].innerHTML = 
            checkedRadio = document.querySelector("input[name='textFont']:checked")
            // Cell1.innerHTML = Title.value;
            // Cell2.innerHTML = Author.value;
            // Cell3.innerHTML = Price.value;
            // Cell4.innerHTML = date.value;
            // Cell5.innerHTML = language.value;
            // checkedRadio = document.querySelector("input[name='textFont']:checked")
            // Cell6.innerHTML = checkedRadio.value;
            // empty all inputs
            Title.value = ""
            Author.value = ""
            Price.value= ""
            date.value = ""
            language.value =""
        // validation message will disappear 
            Error1.innerHTML =""
            Error2.innerHTML=""
            Error3.innerHTML=""
            Error4.innerHTML = ""

            e.target.remove();
           }
           
           }
    
    printBtn.addEventListener("click",()=>{  
        var x = printing.innerHTML
        var y = document.body.innerHTML
        console.log(y)
        document.body.innerHTML = x
         console.log(body)
         console.log(body)
         window.print() ;
         document.body.innerHTML = y
         console.log(body)

    //   body.innerHTML = body
    })

 form.addEventListener("focus",function(event){
    event.target.style.background="lightSeaGreen ";
 },true);

 form.addEventListener("blur",function(event1){
     event1.target.style.background="";
 },true);