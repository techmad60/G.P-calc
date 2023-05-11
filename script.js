const section1 = document.querySelector("#section-one");
const section1Button = document.querySelector("#section-one-button");
const section2 = document.querySelector("#section-two");
const section2Button = document.querySelector("#section-two-button");
const section2Gobackbutton = document.querySelector("#section-two-go-back-button");
const section3 = document.querySelector("#section-three");
const section3Gobackbutton = document.querySelector("#section-three-go-back-button");
const section4 =document.querySelector("#section-four");

const showHelp = document.querySelector("#show-help");
const closeHelp = document.querySelector("#close-help");


const courseForm = document.getElementById("courseForm");
const generateBtn = document.getElementById("generateBtn");
const addCoursebtn = document.getElementById("addCoursebtn")
const unitLoadSelect = document.getElementById("unitLoad");
const gradeSelect = document.getElementById("grade");
const totalUnitLoadSpan = document.getElementById("totalunitLoad");
const totalScoreSpan = document.getElementById("totalScore");
const gpSpan = document.getElementById("gp");

const myName = document.querySelector("#myName");
const myDept = document.querySelector("#myDept");
const greetingOutput = document.querySelector("#greeting");


//Inputs for C.G.P.A

formInfo.addEventListener('submit', (event)=> {
  event.preventDefault();
  if (myName.value.trim() === '' || myDept.value.trim() === '' ) {
      alert('Please fill out all fields!');
      return;
  }
  section2.style.display = "none";
  section3.style.display = "block";
});

section1Button.addEventListener('click', ()=> {
  section1.style.display = "none";
  section2.style.display = "block";
});

section2Button.addEventListener('click', ()=> {
  NameandDept();
  if(unitLoadSelect.value === " " || gradeSelect.value === " " ) {
    alert("Comrade no fear, God de for you")
    generateBtn.disabled = true;
  }
  
});

section2Gobackbutton.addEventListener('click', ()=> {
  section1.style.display = "block";
  section2.style.display = "none";
});

section3Gobackbutton.addEventListener('click', ()=> {
  section3.style.display = "none";
  section2.style.display = "block";
});

showHelp.addEventListener("click", ()=> {
  section4.style.display = "block";
  section3.style.display = "none";
});

closeHelp.addEventListener("click", () => {
  section3.style.display = "block";
  section4.style.display = "none";
});

function NameandDept() {
  let inputname = myName.value;
  inputname = inputname.charAt(0).toUpperCase() + inputname.slice(1);
  
  let inputdept = myDept.value;
  inputdept = inputdept.charAt(0).toUpperCase() + inputdept.slice(1);

  greetingOutput.textContent = "Welcome " + inputname + " " +" of " + inputdept + " " + "Department";
}



function deleteCourseForm(event) {
  const formToDelete = event.target.closest("form");
  event.preventDefault();
  formToDelete.remove();
}

function addCourseForm() {
  const container = document.getElementById("course-forms");
  const template = document.getElementById("course-form-template");

  const newForm = template.cloneNode(true);
  container.appendChild(newForm);

  newForm.querySelector("#unitLoad").selectedIndex = 0;
  newForm.querySelector("#grade").selectedIndex = 0;

  const deleteBtn = newForm.querySelector("#delete-btn");

  deleteBtn.addEventListener("click", deleteCourseForm);
}

function calculateGPA() {
  const courseForms = document.querySelectorAll("#course-forms form");
  let totalScore = 0;
  let totalUnitLoad = 0;

  courseForms.forEach((form) => {
    const unitLoad = parseInt(form.querySelector("#unitLoad").value);
    const grade = parseInt(form.querySelector("#grade").value);

    if (!isNaN(unitLoad) && !isNaN(grade)) {
      totalScore += unitLoad * grade;
      totalUnitLoad += unitLoad;
    }
  });

  if (totalUnitLoad > 0) {
    const gpa = totalScore / totalUnitLoad;
    return gpa.toFixed(2);
  }

  return 0;
}

function generateResults() {
  const gpa = calculateGPA();
  totalScoreSpan.textContent = gpa;
  totalUnitLoadSpan.textContent = calculateTotalUnitLoad().toString();
  gpSpan.textContent = gpa;
}


function Alert() {
  const gpa = calculateGPA();
  if (gpa >= 4.5) {
    alert("Congrats comrade, you're doing well");
  } else if (gpa >= 3.50) {
    alert("Comrade, your mind de, put small effort sha");
  } else if (gpa >= 2.40) {
    alert("Comrade, hmmmmm!");
  } else if (gpa >= 1.50) {
    alert("Comrade, what's flying colours?");
  } else {
    alert("Omo you fail shaa, but you still gat this!!!");
  }
}

function  Remark() {
const gpa = calculateGPA();
  const gradeRemark = document.getElementById("gradeRemark");
  if (gpa >= 4.5) {
    gradeRemark.textContent = "You're on first class!";
  } else if (gpa >= 3.50) {
    gradeRemark.textContent = "You're on second class upper!";
  } else if (gpa >= 2.40) {
    gradeRemark.textContent = "You're on second class lower!";
  } else if (gpa >= 1.50) {
    gradeRemark.textContent = "You're on third class!";
  } else {
    gradeRemark.textContent = "You failed!";
  }
}


function calculateTotalUnitLoad() {
  const courseForms = document.querySelectorAll("#course-forms form");
  let totalUnitLoad = 0;

  courseForms.forEach((form) => {
    const unitLoad = parseInt(form.querySelector("#unitLoad").value);

    if (!isNaN(unitLoad)) {
      totalUnitLoad += unitLoad;
    }
  });

  return totalUnitLoad;
  
}

courseForm.addEventListener("submit", function (event) {
  event.preventDefault();
});


generateBtn.addEventListener("click", ()=> {
  generateResults();
  Remark();
  setTimeout(Alert, 400);

});

addCoursebtn.addEventListener("click", () => {
  addCourseForm();
  if(unitLoadSelect.value !== " " || gradeSelect.value !== " " ) {
    generateBtn.disabled = false;
  }
});



