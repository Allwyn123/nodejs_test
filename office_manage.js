const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout});

/* ------- object create start ------- */
let emp_data = {emp: [
    {
    emp_id: 1,
    emp_name: "Alex",
    emp_phone: 9876542130,
    emp_email: "abc@email.com"},
    {
    emp_id: 2,
    emp_name: "Mic",
    emp_phone: 9876542130,
    emp_email: "abc@email.com"},
    {
    emp_id: 3,
    emp_name: "John",
    emp_phone: 9876542130,
    emp_email: "abc@email.com"}
]};
// console.log();

/* ------- object create end ------- */


function main_func() {
    console.log("\nSelect options: \n1: Add New Employee \n2: Update Employee Detail \n3: Delete Employee");
    console.log("4: Display Employee Table\n5: Exit\n");
    readline.question("Enter the number to select options\n",(value)=>{
        if(value == 1) new_emp();
        else if(value == 2) update_emp();
        else if(value == 3) delete_emp();
        else if(value == 4) display_emp();
        else if(value == 5) exit_func();
        else {
            console.log("ERROR: Enter above mentioned number only for access options");
            main_func();
        }
    });
}
main_func();

/*------- create new employee start ------- */
function new_emp() {
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
            add_obj.emp_phone = parseInt(phone);
            email_func();
        });
    }
    
    function email_func() {
        readline.question("\nEnter Employee Email address\n", (email) => {
            // emp_email = email;
            add_obj.emp_email = email;
            addToObj(add_obj);
            console.log("New Employee Data Successfully Added");
            nav_func();
        });
    }

}
/*------- create new employee end ------- */

/*------- update employee details start ------- */
function update_emp() {
    readline.question("\nEnter Employee id:\n", (e_id) => {
        let id_avaiable = false;
        
        emp_data.emp.forEach((e) => {
            if(e.emp_id == e_id) id_avaiable = true;
        });

        if(id_avaiable) {
            console.log("\nEnter number to select option");
            const str = "1: Update EMP Name\n2: Update EMP Phone no.\n3: Update EMP Email\n";
            
            readline.question(str, (opts) => {
                if(opts == 1) name_update(e_id);
                else if(opts == 2) phone_update(e_id);
                else if(opts == 3) email_update(e_id);
                else console.log("Error: Enter Correct Option");
            });
        }
        else { 
            console.log("Error: Enter Correct Employee ID");
            update_emp();
        }
    });

    function  name_update(id) {
        readline.question("\nEnter Name:\n", new_name => {
            emp_data.emp.forEach((eve) => {
                if(eve.emp_id == id) {
                    eve.emp_name = new_name;
                    console.log("Employee Name Successfully Updated");
                    nav_func();
                }
            });
        });
    }
    
    function  phone_update(id) {
        readline.question("\nEnter new Phone no.:\n", new_phone => {
            new_phone = parseInt(new_phone);
            emp_data.emp.forEach((eve) => {
                if(eve.emp_id == id) {
                    eve.emp_phone = new_phone;
                    console.log("Employee Phone no. Successfully Updated");
                    nav_func();
                }
            });
        });
    }
    
    function  email_update(id) {
        readline.question("\nEnter new Email:\n", new_email => {
            emp_data.emp.forEach((eve) => {
                if(eve.emp_id == id) {
                    eve.emp_email = new_email;
                    console.log("Employee Email Successfully Updated");
                    nav_func();
                }
            });
        });
    }
}
/*------- update employee details end ------- */

/*------- delete employee start ------- */
function delete_emp() {
    readline.question("\nEnter Employee id:\n", e_id => {
        e_id = parseInt(e_id);
        let id_avaiable = false;
        let index;

        emp_data.emp.forEach((e,i) => {
            if(e.emp_id == e_id) {
                id_avaiable = true;
                index = i;
            }
        });

        if(id_avaiable) {
            delete emp_data.emp[e_id];
            console.log("\nEmployee Data Successfully Deleted");
            nav_func();
        }
        else {
            console.log("Error: Enter Correct Employee ID");
            delete_emp();
        }
    });
}
/*------- delete employee end ------- */

/*------- nav_func start ------- */
function nav_func() {
    readline.question("\nEnter \n1: Back To Main\n2: Exit\n", (e) => {
        if(e == 1) main_func();
        else if(e == 2) exit_func();
        else console.log("ERROR: Enter correct option");
    });
}
/*------- nav_func end ------- */

/*------- display table start ------- */
let display_emp = () => { 
    console.table(emp_data.emp);
    nav_func();
}
/*------- display table end ------- */

/*------- disp_exit start ------- */
let exit_func = () => readline.close();
/*------- disp_exit end ------- */

function cap_func(name){
    return name[0].toUpperCase() + name.slice(1);
}

let addToObj = (e) => emp_data.emp.push(e);