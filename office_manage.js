
const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout});
const validation = require("./validation");

/* ------- object create start ------- */
let emp_data = {emp: [
    {
        emp_id: 1,
        emp_name: "Alex Smith",
        emp_phone: 9876542130,
        emp_email: "abc@email.com"
    },
    {
        emp_id: 2,
        emp_name: "Mic Eric",
        emp_phone: 9063587412,
        emp_email: "abc@email.com"
    },
    {
        emp_id: 3,
        emp_name: "John Stone",
        emp_phone: 7854962135,
        emp_email: "abc@email.com"
    }
]};
/* ------- object create end ------- */

/*------- main function start ------- */
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
/*------- main function end ------- */

/*------- create new employee start ------- */
function new_emp() {
    let new_id = emp_data.emp[emp_data.emp.length - 1].emp_id + 1;
    let add_obj = {emp_id: new_id};

    readline.question("\nEnter Employee First Name\n", (name) => {
        let name_check = validation.name_valid(name);
        name = name.toLowerCase();
        let first_name = cap_func(name);
        let last_name;

        if(name_check) {
            last_name_func();
        } else {
            console.log("Enter Valid First Name, Special Character and Number are not valid");
            new_emp();
        }

        function last_name_func() {
            readline.question("\nEnter Employee Last Name\n", (Lname) => {
                let Lname_check = validation.name_valid(Lname);

                if(Lname_check) {
                    Lname = Lname.toLowerCase();
                    last_name = cap_func(Lname);
        
                    add_obj.emp_name = `${first_name} ${last_name}`;
                    phone_func();
                } else {
                    console.log("Enter Valid Last Name, Special Character and Number are not valid");
                    last_name_func();
                }
            });
        }

    });
    
    function phone_func() {
        readline.question("\nEnter Employee phone no.\n", (phone) => {
            phone = parseInt(phone);
            let phone_check = validation.phone_valid(phone);

            if(phone_check) {
                add_obj.emp_phone = phone;
                email_func();
            } else {
                console.log("Enter Valid Phone no., 10 Digit only");
                phone_func();
            }
        });
    }
    
    function email_func() {
        readline.question("\nEnter Employee Email address\n", (email) => {
            let email_check = validation.email_valid(email);

            if(email_check) {
                add_obj.emp_email = email;
                addToObj(add_obj);
                console.log("New Employee Data Successfully Added");
                nav_func();
            }
            else {
                console.log("Enter Valid Email ID");
                email_func();
            }
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
        readline.question("\nEnter First Name:\n", new_name => {
            let name_check = validation.name_valid(new_name);
            new_name = new_name.toLowerCase();
            let first_name = cap_func(new_name);
            let last_name;

            if(name_check) {
                last_name_update(id);
            } else {
                console.log("Enter Valid First Name, Special Character and Number are not valid");
                name_update(id);
            }

            function last_name_update(id) {
                readline.question("\nEnter Employee Last Name\n", (new_Lname) => {
                    let Lname_check = validation.name_valid(new_Lname);
    
                    if(Lname_check) {
                        new_Lname = new_Lname.toLowerCase();
                        last_name = cap_func(new_Lname);
            
                        emp_data.emp.forEach((eve) => {
                            if(eve.emp_id == id) {
                                eve.emp_name = `${first_name} ${last_name}`;
                                console.log("Employee Name Successfully Updated");
                                nav_func();
                            }
                        });
    
                    } else {
                        console.log("Enter Valid Last Name, Special Character and Number are not valid");
                        last_name_update(id);
                    }
                });
            }
        });
    }
    
    function  phone_update(id) {
        readline.question("\nEnter new Phone no.:\n", new_phone => {
            new_phone = parseInt(new_phone);
            let phone_check = validation.phone_valid(phone);

            if(phone_check) {
                emp_data.emp.forEach((eve) => {
                    if(eve.emp_id == id) {
                        eve.emp_phone = new_phone;
                        console.log("Employee Phone no. Successfully Updated");
                        nav_func();
                    }
                });
            } else {
                console.log("Enter Valid Phone no., 10 Digit only");
                phone_update(id);
            }
        });
    }
    
    function  email_update(id) {
        readline.question("\nEnter new Email:\n", new_email => {
            let email_check = validation.email_valid(new_email);

            if(email_check) {
                emp_data.emp.forEach((eve) => {
                    if(eve.emp_id == id) {
                        eve.emp_email = new_email;
                        console.log("Employee Email Successfully Updated");
                        nav_func();
                    }
                });
            } else {
                console.log("Enter Valid Email ID");
                email_update(id);
            }
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
            delete emp_data.emp[index];
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
let exit_func = () => process.exit();
/*------- disp_exit end ------- */

function cap_func(name){
    return name[0].toUpperCase() + name.slice(1);
}

let addToObj = (e) => emp_data.emp.push(e);