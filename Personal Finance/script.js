let title = document.querySelector('#title')
let form = document.querySelector('form')
let amount = document.querySelector('#amount')
let note = document.querySelector('#note')
let category = document.querySelector('#category')
let date = document.querySelector('#date');
let expense = document.querySelector('#radio-group') 
let btn = document.querySelector('button')
let search = document.querySelector('.search-box')
let table = document.querySelector('table');

//------------Dashboard------------
let b = document.querySelector('.b');
let i = document.querySelector('.i');
let e = document.querySelector('.e');

let transaction = [];



class Transaction{
    constructor(title,amount,note,category,date,type){
        this.title = title;
        this.amount = amount;
        this.note = note;
        this.category = category;
        this.date = date;
        this.type = type;
        console.log(this)
    }


}

btn.addEventListener('click',function(e){
    e.preventDefault()
    let type = document.querySelector('input[name="type"]:checked')
    let obj = new Transaction(title.value,amount.value,note.value,category.value,date.value,type.value) 
    transaction.push(obj)

    details();
    dashboard();


})

function details(){
    let x = `<tr>
                <th>Date</th>
                <th>Title</th>
                <th>Note</th>
                <th>Amount</th>
                <th>Type</th>
            </tr>`
    //let storedTransaction =  localStorage.getItem('transactions')
    //transaction = JSON.parse(storedTransaction)
    transaction.forEach(function(elem){
        x += `<tr>
                <td>${elem.date}</td>
                <td>${elem.title}</td>
                <td>${elem.note}</td>
                <td>${elem.amount}</td>
                <td>${elem.type}</td>
            </tr>`
    })
    table.innerHTML = x
}

function dashboard(){

    let expen = 0;
expen = parseInt(expen)
let inc = 0;
inc = parseInt(inc)
let balance = 0;
balance = parseInt(balance)
    
    transaction.forEach(function(elem){

        if(elem.type === 'Income'){
            inc += parseInt(elem.amount)
        }
        else{
            expen += parseInt(elem.amount)
        }

        balance = inc - expen;

    })

    i.innerHTML = parseInt(inc);
    e.innerHTML = parseInt(expen);
    b.innerHTML = parseInt(balance);

}

