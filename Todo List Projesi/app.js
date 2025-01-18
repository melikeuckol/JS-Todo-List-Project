//Tüm elementleri seçmek

const form=document.querySelector("#todoAddForm");
const addInput=document.querySelector("#todoName");
const todoList=document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const todoClearButton=document.querySelector("#todoClearButton");
const filterInput=document.querySelector("#todoSearch");

let todos=[];

runEvents();
function runEvents(){
    form.addEventListener("submit",addtoDo); //submit butonuna tıkladığımızda bu metot tetiklenir
    document.addEventListener("DOMContentLoaded",loaded);
    secondCardBody.addEventListener("click",removetoTheUI);
    todoClearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
  
}

function allTodosEverywhere(){
    //Ekrandan silme
    const todoListesi=document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
    todoListesi.forEach(function(todo){
        todo.remove();
    })
}
else{
    showAlert("warning","Silinecek todo yok");
}
    //Storage silme
    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}

function filter(e){
    const filterValue=e.target.value.toLowerCase().trim();
    const todoListesi=document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block");
            }
            else{
                todo.setAttribute("style","display : none !important");
            }
        })

    }
    else{
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalıdır!");
    }
}

function removetoTheUI(e){
    //ekrandan silmek
   if(e.target.className==="fa fa-remove")
    {
    const todo=e.target.parentElement.parentElement;
    todo.remove();   
     // storage silmek
     removeToStorage(todo.textContent);

    showAlert("success","Todo başarıyla silindi!");
    }

   

}
function removeToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1); //sil
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));

}

function addtoDo(e){
    const inputText=addInput.value.trim();

    if(inputText==null || inputText== ""){
       
        showAlert("warning","Lütfen bir değer giriniz.");
    }
    else{
        //arayüze  ekleme
        addTodoUI(inputText);
        //storage ekleme
        addTodoStorage(inputText);
        showAlert("success","Todo eklendi!");
    }
  
    e.preventDefault();

}

function addTodoUI(newTodo){
//     <li class="list-group-item d-flex justify-content-between">Todo 2
//     <a href="#" class="delete-item">
//         <i class="fa fa-remove"></i>
//     </a>
// </li>
const li=document.createElement("li");
li.className="list-group-item d-flex justify-content-between";
li.textContent=newTodo;

const a=document.createElement("a");
a.className="delete-item";
a.href="#";

const i =document.createElement("i");
i.className="fa fa-remove";

a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);

addInput.value="";
}

function addTodoStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if (localStorage.getItem("todos")==null){
        todos=[];
    }
    else{
            todos=JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
/* <div class="alert alert-success">
  <strong>Success!</strong> Indicates a successful or positive action.
</div> */
const div=document.createElement("div");
div.className="alert alert-"+type;
div.textContent=message;
firstCardBody.appendChild(div); 

//2.5 saniye sonra uyarıyı kaldırır.
setTimeout(function(){
    div.remove();
},2500)


}