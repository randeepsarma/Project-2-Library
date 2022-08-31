// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view
showTime();
class Book{

//Book Constructor
    constructor(bname,aname,type){
    this.bname=bname;
    this.aname=aname;
    this.type=type;
}
}
function deletefunct(index){
    let temp=localStorage.getItem("authors");
    let authors=(!temp)?[]:JSON.parse(temp);
 temp=localStorage.getItem("names");
    let namesofbooks=(!temp)?[]:JSON.parse(temp);
 temp=localStorage.getItem("types");
    let types=(!temp)?[]:JSON.parse(temp);
    console.log(index);
authors.splice(Number(index),1);
namesofbooks.splice(Number(index),1);
types.splice(Number(index),1);





    localStorage.setItem("authors",JSON.stringify(authors));
    localStorage.setItem("names",JSON.stringify(namesofbooks));
    localStorage.setItem("types",JSON.stringify(types)); 
    showTime();
}

function showTime(){
let temp=localStorage.getItem("authors");
    let authors=(!temp)?[]:JSON.parse(temp);
 temp=localStorage.getItem("names");
    let namesofbooks=(!temp)?[]:JSON.parse(temp);
 temp=localStorage.getItem("types");
    let types=(!temp)?[]:JSON.parse(temp);
    let tableBody=document.getElementById('tableBody');    
let html=``;
    Array.from(authors).forEach(function(element,index){
html+=`
<tr>
<td colspan="2">${namesofbooks[index]}</td>
<td>${element}</td>
<td>${types[index]}</td>
<td><button type="submit" class="btn btn-primary" id="${index}" onclick="deletefunct(${index})">Delete Book</button></td>
</tr>
`
 });
    tableBody.innerHTML=html;
}
class Checking{

validate(bname,aname){
if(bname.length<2 || aname.length<2)return false;
return true;
}
display(type,sentence){
    let message =document.getElementById("message");
let txt='';
if(type==='success')txt="Success!!";
else txt='Failure!!';

    message.innerHTML=`
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>${txt}:</strong> ${sentence}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
    </button>
</div>
`;
setTimeout(function(){
message.innerHTML="";    
}, 5000);

}
localfunction(book){
    let temp=localStorage.getItem("authors");
    let authors=(!temp)?[]:JSON.parse(temp);
 temp=localStorage.getItem("names");
    let namesofbooks=(!temp)?[]:JSON.parse(temp);
 temp=localStorage.getItem("types");
    let types=(!temp)?[]:JSON.parse(temp);
    authors.push(book.aname);
    namesofbooks.push(book.bname);
    types.push(book.type);




    localStorage.setItem("authors",JSON.stringify(authors));
    localStorage.setItem("names",JSON.stringify(namesofbooks));
    localStorage.setItem("types",JSON.stringify(types));

 showTime();   

}
clearreset(){
    document.getElementById("libraryForm").reset();
}
}

let libraryForm=document.getElementById("libraryForm");

libraryForm.addEventListener("submit",function(e){
let bookName=document.getElementById("bookName").value;
let author=document.getElementById("author").value;
let radios=libraryForm.elements["type"];
let type;
for(let i=0;i<radios.length;i++){
    if(radios[i].checked)type=radios[i].value;
}
let check=new Checking();
//Validation condition for true
if(check.validate(bookName,author)){
let book=new Book(bookName,author,type);

check.localfunction(book);
check.clearreset();
check.display('success','Your message was successfully displayed')

}//validation condition for false 
else{
check.display('danger','Your message was not displayed');
}
e.preventDefault();
});



