const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout});

/* ------- object create start ------- */
let emp_data = {emp: [
    {
    emp_id: 1,
    emp_name: "Alex",
    emp_phone: "9876542130",
    emp_email: "abc@email.com"},
    {
    emp_id: 2,
    emp_name: "Mic",
    emp_phone: "9876542130",
    emp_email: "abc@email.com"},
    {
    emp_id: 3,
    emp_name: "John",
    emp_phone: "9876542130",
    emp_email: "abc@email.com"}
]};
// console.log();

/* ------- object create end ------- */


(function main_func() {
    console.log("Select options: \n1: Add New Employee \n2: Update Employee Detail \n3: Delete Employee\n");

    readline.question("Enter the number to select options\n",(value)=>{
        if(value == 1) new_emp();
        else if(value == 2) update_emp();
        else if(value == 3) delete_emp();
        // if(value != 1 || value != 2 || value != 3) {
        else {
            console.log("ERROR: Enter above mentioned number only for access options");
        }
    });
})();

/*------- create new employee start ------- */
function new_emp() {
    // let emp_name, emp_phone, emp_email;
    let new_id = emp_data.emp[emp_data.emp.length - 1].emp_id + 1;
    let add_obj = {emp_id: new_id};

    readline.question("\nEnter Employee First Name\n", (name) => {
        name = name.toLowerCase();
        let first_name = cap_func(name);
        let last_name;

        readline.question("\nEnter Employee Last Name\n", (Lname) => {
            Lname = Lname.toLowerCase();
            last_name = cap_func(Lname);

            add_obj.emp_name = `${first_name} ${last_name}`;
            phone_func();
        });
    });
    
    function phone_func() {
        readline.question("\nEnter Employee phone no.\n", (phone) => {
            // emp_phone = phone;
            add_obj.emp_phone = phone;
            email_func();
        });
    }
    
    function email_func() {
        readline.question("\nEnter Employee Email address\n", (email) => {
            // emp_email = email;
            add_obj.emp_email = email;
            addToObj(add_obj);
            console.log(emp_data);
            nav_func();
        });
    }

}
/*------- create new employee end ------- */

function cap_func(name){
    return name[0].toUpperCase() + name.slice(1);
}

let addToObj = (e) => emp_data.emp.push(e);