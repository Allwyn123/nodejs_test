/*------- validation check start ------- */

// name validation
function name_valid(value) {
    const namePattern = /^[a-zA-Z]+$/;

    if(namePattern.test(value) == false) return false;
    return true;
}

// phone validation
function phone_valid(value) {
    const phonePattern = /^[0-9]{10}$/;

    if(phonePattern.test(value) == false) return false;
    return true;
}

// email validation
function email_valid(value) {
    const emailPattern = /.+\@.+\..+/;

    if(emailPattern.test(value) == false) return false;
    return true;
}

module.exports = { name_valid, phone_valid, email_valid }
/*------- validation check end ------- */