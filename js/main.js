const addBtn = document.querySelector('button.add');
const searchBtn = document.querySelector('button.search');
const taskList = document.querySelector('ul.tasklist');
const menu = document.querySelector('.menu');
const input = document.querySelector('.menu input');
const divShow = document.querySelector('div.show');

//Counter for counting how many elements are marked(contain class active)
let markCounter = 0;
//Flag for knowing when add or remove listener
let listenerFlag = false;
//Function for adding a task when button with plus has class active and making all li's appear if they have class hide
const addTask = (e) =>
{
    if(listenerFlag)
    {
        document.querySelectorAll('li.hide').forEach(li => li.classList.remove('hide'));
        document.querySelector('input.active').removeEventListener('input', searchList);
        listenerFlag = false;
    }
    if(!addBtn.classList.contains('active') && e.detail != 0)
    {
        input.classList.add('active');
        addBtn.className = "add active";
        searchBtn.className = "search inactive";
    }
    else if(addBtn.classList.contains('active') && input.value.trim())
    {
        const li = document.createElement('li');
        li.innerHTML = `<i class="far fa-check-square"></i>${input.value}`;
        taskList.appendChild(li);
        document.querySelector('li:last-child i').addEventListener('click', markTask);
    }
    input.value = "";
}
//Function for searching tasks when button with magnifier has class active and adding event listener on input
const searchTasks = () =>
{
    if(!searchBtn.classList.contains('active'))
    {
        input.classList.add('active');
        searchBtn.className = "search active";
        addBtn.className = "add inactive";
    }
    if(!listenerFlag)
    {
        document.querySelector('input.active').addEventListener('input', searchList);
        listenerFlag = true;
    }
}
//Function for preventing submit from reloading the page
const preventSubmit = function(e)
{
    e.preventDefault();
}
//Function for marking or unmarking tasks when checkbox is clicked and call function for making bottom div appear
const markTask = function()
{
    if(this.parentNode.classList.contains('active'))
    {
        this.parentNode.classList.remove('active');
        markCounter--;
    }
    else
    {
        this.parentNode.classList.add('active');
        markCounter++;
    }
    changeDivShow();
}
//Function for removing all marked tasks and calling a function which will make div.show content changed
const removeTasks = function()
{
    const tasksToClear = document.querySelectorAll('li.active');
    markCounter -= tasksToClear.length;
    changeDivShow();
    tasksToClear.forEach(task => task.remove());
}
//Function making div.show appear and changing its inner html
const changeDivShow = function()
{
    if(!divShow.classList.contains('active') && markCounter != 0)
    {
        divShow.classList.add('active');
    }
    else if(markCounter === 0)
    {
        divShow.classList.remove('active');
    }
    divShow.textContent = `Wyczyść zaznaczone (${markCounter})`;
}
//function which add class hide for li when its textContent doesnt match the word written in input
function searchList() 
    {
        document.querySelectorAll('li.hide').forEach(li => li.classList.remove('hide'));
        const text = input.value.toLowerCase();
        const searchedLi = document.querySelectorAll('ul.tasklist li').forEach(li => 
            {
            if (!li.textContent.toLowerCase().includes(text) && text.trim() != "")
            {
                li.classList.add('hide');
            }
            })
    }
//Event Listeners
divShow.addEventListener('click', removeTasks);
menu.addEventListener('submit', preventSubmit);
addBtn.addEventListener('click', addTask);
searchBtn.addEventListener('click', searchTasks);

