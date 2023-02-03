import format from "date-fns/format";
// format(new Date(), "yyyy-MM-dd")
// Initialize
const base = (() => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const allProject = [];
  const todayProject = [];
  const upcomingProject = [];
  const projectList = [];
  const homeProject = [];
  projectList.push(homeProject);
  const currentProject = homeProject;
  return {
    homeProject,
    todayProject,
    upcomingProject,
    projectList,
    currentProject,
    currentDate,
    allProject,
  };
})();

// Create a single task
const taskCreate = (title, dueDate) => {
  let priority = 0;
  let checked = 0;
  return {
    title,
    dueDate,
    priority,
    checked,
  };
};

// Functions on tasks
const checkedChange = (index) =>
  base.currentProject[index].checked === 0
    ? (base.currentProject[index].checked = 1)
    : (base.currentProject[index].checked = 0);
const priorityChange = (index) =>
  base.currentProject[index].priority === 0
    ? (base.currentProject[index].priority = 1)
    : (base.currentProject[index].priority = 0);
const taskDelete = (index) => {
  delete base.currentProject[index];
};
const taskAdd = (task) => {
  base.currentProject.push(task);
};

// Create and delete a single project
const projectCreate = () => {
  const newProject = [];
  base.projectList.push(newProject);
};
const projectDelete = (index) => {
  delete base.projectList[index];
};

// Update today
const updateToday = () => {
  base.todayProject.length = 0;
  console.log(base.projectList);
  const listOfProjects = base.projectList;
  for (let i = 0; i < listOfProjects.length; i++) {
    if (listOfProjects[i] !== undefined) {
      const proj = listOfProjects[i];
      console.log(proj);
      for (let j = 0; j < proj.length; j++) {
        console.log(proj[j].dueDate);
        console.log(base.currentDate);
        if (proj[j].dueDate === base.currentDate) {
          console.log("matching!");
          base.todayProject.push(proj[j]);
        }
      }
    }
  }
};

//Update upcoming
const updateUpcoming = () => {
  base.upcomingProject.length = 0;
  console.log(base.projectList);
  const listOfProjects = base.projectList;
  for (let i = 0; i < listOfProjects.length; i++) {
    if (listOfProjects[i] !== undefined) {
      const proj = listOfProjects[i];
      console.log(proj);
      for (let j = 0; j < proj.length; j++) {
        console.log(proj[j].dueDate);
        console.log(base.currentDate);
        if (proj[j].dueDate > base.currentDate) {
          console.log("upcoming!");
          base.upcomingProject.push(proj[j]);
        }
      }
    }
  }
};

//Update all
const updateAll = () => {
  base.allProject.length = 0;
  const listOfProjects = base.projectList;
  for (let i = 0; i < listOfProjects.length; i++) {
    if (listOfProjects[i] !== undefined) {
      const proj = listOfProjects[i];
      console.log(proj);
      for (let j = 0; j < proj.length; j++) {
        base.allProject.push(proj[j]);
      }
    }
  }
};

// ------- DOM Manipulation -------//
const displayController = (() => {
  // Form toggling
  // Task
  const formTask = document.querySelector("#formTask");
  formTask.style.display = "none";
  const toggleFormTaskOn = () => {
    formTask.style.display = "block";
  };
  // Project
  const formProject = document.querySelector("#formProject");
  formProject.style.display = "none";
  const toggleFormProjectOn = () => {
    formProject.style.display = "block";
  };
  // Add task
  const addTaskToDOM = (event) => {
    const input = document.querySelector("#taskName");
    const taskDate = document.querySelector("#taskDate");
    console.log(taskDate.value);
    console.log(input.value);
    const newTask = taskCreate(input.value, taskDate.value);
    taskAdd(newTask);
    input.value = "";
    taskDate.value = "";
    formTask.style.display = "none";
    console.log(base.currentProject);
    displayTasks();
    event.preventDefault();
  };
  // Add Project
  const addProjectToDOM = (event) => {
    const projectIndex = base.projectList.length;
    projectCreate();
    const projects = document.querySelector(".projects");
    const projectName = document.querySelector("#projectName");
    const newProj = document.createElement("div");
    newProj.classList.add("proj");
    newProj.setAttribute("data-", `${projectIndex}`);
    projects.appendChild(newProj);
    const projectNameDiv = document.createElement("div");
    projectNameDiv.textContent = projectName.value;
    projectNameDiv.classList.add("name");
    newProj.appendChild(projectNameDiv);
    const delProjBtn = document.createElement("button");
    delProjBtn.textContent = "X";
    delProjBtn.classList.add("delProj");
    newProj.appendChild(delProjBtn);
    projectName.value = "";
    formProject.style.display = "none";
    // Set current project listener
    newProj.addEventListener("click", function () {
      base.currentProject = base.projectList[projectIndex];
      console.log(base.currentProject);
      const nameDisplay = document.querySelector("#nameDisplay");
      nameDisplay.textContent = projectNameDiv.textContent;
      displayTasks();
    });
    // Set delete button listener
    delProjBtn.addEventListener("click", function () {
      projectDelete(projectIndex);
      newProj.remove();
      console.log(base.currentProject);
    });
    event.preventDefault();
  };
  // Create check button
  const checkCreate = (divToCheck, indexToCheck) => {
    const newCheck = document.createElement("button");
    newCheck.textContent = "✓";
    newCheck.setAttribute("id", "check");
    divToCheck.appendChild(newCheck);
    base.currentProject[indexToCheck].checked === 0
      ? (newCheck.style.backgroundColor = "#d9d9d9")
      : (newCheck.style.backgroundColor = "#7ff17f");
    newCheck.addEventListener("click", function () {
      checkedChange(indexToCheck);
      base.currentProject[indexToCheck].checked === 0
        ? (newCheck.style.backgroundColor = "#d9d9d9")
        : (newCheck.style.backgroundColor = "#7ff17f");
    });
  };
  // Create star button
  const starCreate = (divToStar, indexToStar) => {
    const newStar = document.createElement("button");
    newStar.textContent = "★";
    newStar.setAttribute("id", "star");
    divToStar.appendChild(newStar);
    base.currentProject[indexToStar].priority === 0
      ? (newStar.style.backgroundColor = "#d9d9d9")
      : (newStar.style.backgroundColor = "yellow");
    newStar.addEventListener("click", function () {
      priorityChange(indexToStar);
      base.currentProject[indexToStar].priority === 0
        ? (newStar.style.backgroundColor = "#d9d9d9")
        : (newStar.style.backgroundColor = "yellow");
    });
  };
  // Create task delete button
  const taskDelCreate = (divToDelete, divToAppend, indexToDelete) => {
    const newTaskDel = document.createElement("button");
    newTaskDel.textContent = "X";
    newTaskDel.setAttribute("id", "delTask");
    divToAppend.appendChild(newTaskDel);
    newTaskDel.addEventListener("click", function () {
      taskDelete(indexToDelete);
      divToDelete.remove();
    });
  };
  // Display tasks
  const displayTasks = () => {
    const clearTasks = document.querySelectorAll(".task");
    clearTasks.forEach((task) => {
      task.remove();
    });
    const taskList = base.currentProject;
    const allTasksDiv = document.querySelector(".tasks");
    for (let i = 0; i < taskList.length; i++) {
      const element = taskList[i];
      if (element !== undefined) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.setAttribute("data-", `${i}`);
        allTasksDiv.appendChild(taskDiv);
        // Left
        const taskDivLeft = document.createElement("div");
        taskDivLeft.classList.add("taskL");
        taskDiv.appendChild(taskDivLeft);
        checkCreate(taskDivLeft, i);
        const taskTitle = document.createElement("div");
        taskTitle.textContent = `${element.title}`;
        taskDivLeft.appendChild(taskTitle);
        // Right
        const taskDivRight = document.createElement("div");
        taskDivRight.classList.add("taskR");
        taskDiv.appendChild(taskDivRight);
        const taskDateDiv = document.createElement("div");
        taskDateDiv.textContent = `${element.dueDate}`;
        taskDivRight.appendChild(taskDateDiv);
        starCreate(taskDivRight, i);
        taskDelCreate(taskDiv, taskDivRight, i);
      }
    }
  };
  // ------- Event Listeners -------//
  // Add task
  const addTaskBtn = document.querySelector("#addTask");
  addTaskBtn.addEventListener("click", toggleFormTaskOn);
  const subBtn = document.querySelector("#subBtn");
  subBtn.addEventListener("click", addTaskToDOM);
  // Add project
  const addProjectBtn = document.querySelector("#addProj");
  addProjectBtn.addEventListener("click", toggleFormProjectOn);
  const subBtnProject = document.querySelector("#subBtnProject");
  subBtnProject.addEventListener("click", addProjectToDOM);
  // Set current project for home projects
  // All
  const allProj = document.querySelector("#all");
  allProj.addEventListener("click", function () {
    updateAll();
    base.currentProject = base.allProject;
    console.log(base.currentProject);
    const nameDisplay = document.querySelector("#nameDisplay");
    nameDisplay.textContent = "All Tasks";
    displayTasks();
  });
  // Today
  const todayProj = document.querySelector("#today");
  todayProj.addEventListener("click", function () {
    updateToday();
    base.currentProject = base.todayProject;
    console.log(base.currentProject);
    const nameDisplay = document.querySelector("#nameDisplay");
    nameDisplay.textContent = "Today";
    displayTasks();
  });
  // All
  const upcomingProj = document.querySelector("#upcoming");
  upcomingProj.addEventListener("click", function () {
    updateUpcoming();
    base.currentProject = base.upcomingProject;
    console.log(base.currentProject);
    const nameDisplay = document.querySelector("#nameDisplay");
    nameDisplay.textContent = "Upcoming";
    displayTasks();
  });
  // Home Project
  const homeProj = document.querySelector("#homeProject");
  homeProj.addEventListener("click", function () {
    base.currentProject = base.homeProject;
    console.log(base.currentProject);
    const nameDisplay = document.querySelector("#nameDisplay");
    nameDisplay.textContent = "Home";
    displayTasks();
  });
})();
