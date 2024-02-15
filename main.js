//유저가 값을 입력한다
//+버튼을 누르면 할일 추가
//delete누르면 할일 삭제
//check누르면 할일 끝나면서 밑줄이 간다
//1.check 버튼 클릭하는 순간 true<->false
//2.true면 끝난걸로 간주하고 밑줄보여주기
//3.false이면 안끝난걸로 간주하고 그대로

//진행중 끝난 탬을 누르면,언더바가 이동한다
//끝난탭은, 끝난 아이템만, 진행중인 아이템만
//전체 탭 누르면 다시 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList =[]
let mode = 'all'
let  filterList = [];


addButton.addEventListener("click",addTask);

for(let i=1 ;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}
console.log(tabs);


function addTask(){
    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false
    };
taskList.push(task);
console.log(taskList);
render();
taskInput.value = ""
}

function render(){
    let list=[];
    //1.내가 선택한 탭에 따라서 
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    //2. 리스트를 달리 보여준다.


    let resultHTML = "";
    for(let i=0; i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML+=`<div class="task">
            <div class="task-done">
                ${list[i].taskContent}
            </div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>  
        </div>`;
        } else{
            resultHTML += `<div class="task">
        <div>
            ${list[i].taskContent}
        </div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    console.log("filter",event.target.id);
    mode = event.target.id;
    filterList = [];
    if(mode === "all"){
        render();  //전체 리스트를 보여준다
    }else if(mode === "ongoing"){
        //진행 중인 아이템을 보여준다.
        //task.isComplete=false
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중", filterList);
    }else if(mode ==="done"){
        //끝나는 케이스 (task.isComplete=true)
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('.task-tabs > div:not(#under-line)');
    const underLine = document.getElementById('under-line');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // under-line의 너비를 클릭된 탭의 너비로 설정
            underLine.style.width = `${tab.offsetWidth}px`;
            // under-line을 클릭된 탭의 left 위치로 이동
            underLine.style.left = `${tab.offsetLeft}px`;
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-button");

    // 이전에 정의된 addTask 함수와 다른 함수들...

    // 엔터 키 이벤트 리스너 추가
    taskInput.addEventListener("keypress", function(event) {
        // 엔터 키가 눌렸는지 확인 (엔터 키의 keyCode는 13입니다)
        if (event.keyCode === 13) {
            event.preventDefault(); // 폼 제출 기본 동작 방지
            addButton.click(); // addButton의 클릭 이벤트 프로그래매틱하게 발생시킴
        }
    });

    // 여기에 이전에 추가했던 이벤트 리스너와 함수들...
});


function deleteTask(id) {
    // taskList에서 해당 아이템 삭제
    taskList = taskList.filter(task => task.id !== id);

    // 현재 모드에 따라 filterList 업데이트
    if (mode !== 'all') {
        filterList = filterList.filter(task => task.id !== id);
    }

    // UI 업데이트
    render();
}



