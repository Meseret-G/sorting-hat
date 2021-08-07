const randomHouses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]
const studentInTheHouse = [];
const expelledArmy = [];


//Render to DOM function
const renderToDom = (divId, textToRender) => {
    const selectedDiv = document.querySelector(divId);
    selectedDiv.innerHTML = textToRender;
};
//Header of the application 
const introCard = () => {
    const domString = `
    <div class="card" >
    <div class="card-body">
      <h2 class="card-title">Welcome to Hoggy Warts</h2>
      <p class="card-text">Hogwarts will always be there to welcome you home!</p>
      <a href="#" class="btn btn-primary" id="startbtn">Lets Go Sort</a>
    </div>
  </div>`;

    renderToDom("#card", domString)
};

//student form 
const studentForm = () => {
    const allForm = document.querySelector('#form');
    allForm.innerHTML = `
      <form>
  <label for="name" class="form-label">Student Name</label>
  <input type="name" class="form-control" required id="name" placeholder="Enter here the student name">
    </div>
       <button id="sortbutton" type="submit">Sumbit</button>
    </form>`;
    document.querySelector("#form").addEventListener("submit", sortButton);
};

// function that prevents student form from displaying on the DOM before the button gets clicked
const enterStudent = (event) => {
    event.preventDefault();
    const targetType = event.target.type;
    const targetId = event.target.id;
    if (targetId === "startbtn") {
        studentForm();
    };
};
//create the student card and render it to the DOM
const studentHouseBuilder = (studentArray) => {
    let domString = ""
    studentArray.forEach((student) => {
        domString += `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${student.name}</h5>
                <p class="card-text">${student.house}</p>
                <button id = "Submit" type="button">Expel</button>
            </div>
            </div>
            `;
    });
    renderToDom("#studentHouse", domString)
};

//create a random number, assign it to each house, take input from the form and push it to the array
const sortButton = (event) => {

    const randomHouses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
    const availableHouse = randomHouses[Math.floor(Math.random() * randomHouses.length)]
    const object = {
        name: document.querySelector('#name').value,
        house: availableHouse
    };
    studentInTheHouse.push(object);
    studentHouseBuilder(studentInTheHouse);
    event.preventDefault();
    document.querySelector("form").reset();
};
// Expel students to Voldy Army
const evictStudents = (event) => {
    const targetType = event.target.type;
    const targetId = event.target.Id;
    if(targetType === "button") {
    const movedCard = studentInTheHouse.splice(targetId, 1);
    expelledArmy.push(movedCard[0]);
    studentHouseBuilder(studentInTheHouse);
    voldyArmyStudent(expelledArmy);
    }
};
//Render cards for student's in Voldy Army
const voldyArmyStudent = (armyArray) => {
    let domString= ""
    armyArray.forEach((student) => {
        domString+= `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${student.name}</h5>
            <p class="card-text">Joined the Army</p>   
        </div>
        </div>
        `
    });
    renderToDom("#filterCards", domString);
};

//Add buttons to filter students by house
const houseButton = () => {
    const domString = `
        <button type="button" class="btn btn-outline-success" id = "All" >All</button>
        <button type="button" class="btn btn-outline-primary" id="Gryffindor">Gryffindor</button>
        <button type="button" class="btn btn-outline-secondary" id="Hufflepuff" >Hufflepuff</button>
        <button type="button" class="btn btn-outline-danger" id = "Ravenclaw">Ravenclaw</button>
        <button type="button" class="btn btn-outline-danger" id = "Slytherin">Slytherin</button> 
    `;
    
    renderToDom("#buttonContainer", domString)
};
// filter the students by house
const houseFilter = (array , house) => {
    return array.filter((studentObject) => studentObject.house === house);
};

// house filter button event handler
const handleHouseFilter = (event) => {
    if (event.target.id === "All") {
        studentHouseBuilder(studentInTheHouse);
    }

    if (event.target.id === "Gryffindor") {
        const gryHouse = houseFilter (
            studentInTheHouse.sort((x, y) => (x.name > y.name ? 1: -1)),
            "Gryffindor"
        );
        studentHouseBuilder(gryHouse);
    }
    if (event.target.id === "Hufflepuff") {
        const hufHouse = houseFilter (
            studentInTheHouse.sort((x, y) => (x.name > y.name ? 1: -1)),
            "Hufflepuff"
        );
        studentHouseBuilder(hufHouse);
    }

    if(event.target.id === "Ravenclaw") {
        const ravHouse = houseFilter (
            studentInTheHouse.sort((x, y) => (x.name > y.name ? 1: -1)),
            "Ravenclaw"
        );
        studentHouseBuilder(ravHouse);
    }
    if (event.target.id === "Slytherin") {
        const slyHouse = houseFilter (
            studentInTheHouse.sort((x, y) => (x.name > y.name ? 1: -1)),
            "Slytherin"
        );
        studentHouseBuilder(slyHouse);  
    }

    };

//Event listener function
const buttonEvent = () => {
    document.querySelector("#card").addEventListener("click", enterStudent);
    document.querySelector("#studentHouse").addEventListener("click",evictStudents);
    document.querySelector("#buttonContainer").addEventListener("click", handleHouseFilter);
    
};

// starts the application 
const init = () => {
    //studentForm();
    introCard();
    studentHouseBuilder(studentInTheHouse); 
    voldyArmyStudent(expelledArmy);
    houseButton();
    buttonEvent();  
};

init();