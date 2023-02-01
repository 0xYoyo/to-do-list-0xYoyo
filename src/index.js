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
const taskCreate = (title, description, dueDate) => {
  let priority = 0;
  let checked = 0;
  return {
    title,
    description,
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

// Create a single project
const projectCreate = () => {
  const newProject = [];
  base.projectList.push(newProject);
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

// Testing examples
const yoyo = taskCreate(
  "hi",
  "my name is yoyo",
  format(new Date(), "yyyy-MM-dd")
);
const yoyo2 = taskCreate("bye", "my yoyo 222", "2024-03-10");
console.log(yoyo);
console.log(base.currentDate);
projectCreate();
base.currentProject = base.projectList[0];
taskAdd(yoyo);
base.currentProject = base.projectList[1];
taskAdd(yoyo2);
console.log(base.projectList);
//taskDelete(0);
checkedChange(0);
priorityChange(0);
updateAll();
console.log(base.allProject);
