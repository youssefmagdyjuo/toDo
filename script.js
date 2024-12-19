let tasks =[];
// const mood_btn = 'add';
const btn = document.getElementById('btn');
const input = document.getElementById('input');
const task__list = document.querySelector('.task__list');
const number = document.getElementById('numbers');
const progress = document.getElementById('progress');
//______________________________________________________________________________________________
//---------------------------- get data from local storage --------->
document.addEventListener('DOMContentLoaded',()=>{
    const stored_tasks = JSON.parse(localStorage.getItem('tasks'));
        stored_tasks.forEach((task)=> tasks.push(task))
        update_task_list()
        update_stats()
})
//---------------------------- save in local storage --------------->[8]
function save_to_localStorage(){
localStorage.setItem('tasks',JSON.stringify(tasks))
}
//---------------------------- update stats ------------------------>[7]
function update_stats(){
const completed_tasks = tasks.filter((task)=> task.completed).length;
const all_tasks= tasks.length;
let calc_progress;
    if(all_tasks>0 && completed_tasks>0)
    {calc_progress= (completed_tasks/all_tasks)*100;}
    else{calc_progress=0}
        progress.style.width=`${calc_progress}%`;
        number.innerHTML=`${completed_tasks}/${all_tasks}`
        if(all_tasks==completed_tasks && completed_tasks>0){
            animation()
        }
}
//---------------------------- update task ------------------------->[6]
function edit_task(index){
    input.value=tasks[index].title
    btn.innerHTML='<i class="uil uil-edit"></i>'
    delete_task(index)
}
//---------------------------- delete task ------------------------->[5]
function delete_task(index){
tasks.splice(index,1)
update_task_list()
update_stats()
save_to_localStorage()
}
//---------------------------- toggle tesk comblete ---------------->[4]
function change_combleted_attribute(index){
    tasks[index].completed= !tasks[index].completed
    update_task_list()
    update_stats()
    save_to_localStorage()
}
//---------------------------- enter tasks in ul in html ----------->[3]
function update_task_list(){
    task__list.innerHTML='';
    tasks.forEach((task,index) =>{
        const list_item = document.createElement('li');
        list_item.innerHTML=`
            <div class="task_item">
                <div class="task ${task.completed ?"completed":""}">
                    <input type="checkbox" class="checkbox" ${task.completed ?'checked':''}>
                    <p>${task.title}</p>
                </div>
                    <div class="icons">
                    <div class="update" onclick='edit_task(${index})'><i class="uil uil-edit"></i></div>
                    <div class="delete" onclick='delete_task(${index})'><i class="uil uil-trash-alt"></i></div>
                </div>
            </div>
        `;
        list_item.addEventListener('change',()=> change_combleted_attribute(index))
        task__list.append(list_item);
    })
}
//---------------------------- add task function ------------------->[2]
function add_task(){
    const task_title= input.value.trim();
    if(task_title){
        // creat object and push object to array
        tasks.push({title:task_title , completed:false});
        input.value=''
        update_task_list();
        update_stats()
        save_to_localStorage()
    }
}
//------------------------ --- click btn --------------------------->[1]
btn.addEventListener('click',(e)=>{
    e.preventDefault()
    add_task()
    
    if(btn.innerHTML=='<i class="uil uil-edit"></i>'){
        btn.innerHTML='+'
    }
})
//--------------------------- animation ---------------------------->
function animation(){
    const count = 200,
    defaults = {
    origin: { y: 0.7 },
};

function fire(particleRatio, opts) {
confetti(
    Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio),
    })
);
}

fire(0.25, {
spread: 26,
startVelocity: 55,
});

fire(0.2, {
spread: 60,
});

fire(0.35, {
spread: 100,
decay: 0.91,
scalar: 0.8,
});

fire(0.1, {
spread: 120,
startVelocity: 25,
decay: 0.92,
scalar: 1.2,
});

fire(0.1, {
spread: 120,
startVelocity: 45,
});
}