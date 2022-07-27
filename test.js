// let dateInput = '2022-07-27';
// let arrYearMonthDate = dateInput.split('-');
// const [yearStr, monthStr, dateStr] = arrYearMonthDate;

// const dateConverted = new Date(+yearStr, +monthStr - 1, +dateStr);
// console.log(dateConverted);

// const currentDate = new Date();

// console.log(new Date('2022-07-27T00:00'));
// console.log(new Date('2022-07-27T00:00').setHours(0, 0, 0, 0));
// console.log(new Date().setHours(0, 0, 0, 0));
// console.log(dateConverted.setHours(0, 0, 0, 0));

// select elements
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const form = document.querySelector('form');
const date = document.querySelector('#date');
const small = document.querySelectorAll('small');
const inputFields = document.querySelectorAll('input');

//
const NAME_REQUIRED = 'Name cannot be blank.';
const EMAIL_INVALID = 'Please enter a valid email address';
const DATE_REQUIRED = 'Please enter a date';
const DATE_INVALID = 'Date cannot be earlier than today';

// handling submit event
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let nameValid = validateName(name);
  let emailValid = validateEmail(email);
  let dateValid = validateDate(date);
  console.log(nameValid);
  console.log(emailValid);
  console.log(dateValid);

  if (nameValid && emailValid && dateValid) {
    alert('Form submitted');
    resetForm();
  }
});

// 1. Check if an input has value
const hasValue = (field) => {
  if (!field.value) {
    return false;
  } else {
    return true;
  }
};

// 2. showError function
const showError = (field, message) => {
  field.classList.add('error');
  field.nextElementSibling.textContent = message;
};

// 3. showSuccess function
const showSuccess = (field) => {
  field.classList.remove('error');
  field.classList.add('success');
  field.nextElementSibling.textContent = '';
};

// 4. check if name field has value
function validateName(nameField) {
  if (!hasValue(nameField)) {
    showError(nameField, 'Name cannot be blank.');
    return false;
  } else {
    showSuccess(nameField);
    return true;
  }
}

// 5. check if email input is valid
function validateEmail(emailField) {
  const rePattern = /\S+@\S+\.\S+/g;
  if (rePattern.test(emailField.value)) {
    showSuccess(emailField);
    return true;
  } else {
    console.log(emailField.value);
    showError(emailField, 'Please enter a valid email address');
    return false;
  }
}
// The plus symbol + matches one or more occurrences of the pattern left to it.
// \S - Matches where a string contains any non-whitespace character. Equivalent to [^ \t\n\r\f\v].
// g: Performs a global match (find all matches)

// 6. helper function to check if date input is a past date
const dateInPast = (dateEl) => {
  const today = new Date(); // get current date
  const inputDate = new Date(`${dateEl.value}T00:00`); // add T00:00 to the date-only string to make it a date-time string and also make it ISO-8601-compliant, then covert it into a date object in local time
  // eg: new Date('2022-07-26T00:00') will print Tue Jul 26 2022 00:00:00 GMT-0500 (Central Daylight Time)
  // setHours(0, 0, 0, 0) sets the hours of the date to 00:00:00:00 then returns the number of milliseconds since January 1, 1970 00:00:00 UTC until the time represented by the updated date instance.
  // compare date inputted against current date
  if (inputDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
    return true;
  } else {
    return false;
  }
};

// 7. check if date input is valid
function validateDate(dateField) {
  if (!hasValue(dateField)) {
    showError(dateField, 'Please enter a date');
    return false;
  } else if (dateInPast(dateField)) {
    showError(dateField, 'Date cannot be earlier than today');
    return false;
  } else {
    showSuccess(dateField);
    return true;
  }
}

// 8. reset form;
function resetForm() {
  name.value = '';
  email.value = '';
  date.value = '';
  inputFields.forEach((field) => {
    field.classList.remove('success');
  });
}

/*
  // 1. validate name
  if (!name.value) {
    name.classList.add('error');
    name.parentElement.querySelector('small').textContent =
      'Name cannot be blank.';
  } else {
    name.classList.add('success');
  }

  // 2. check if email is valid
  // => display error message
  const rePattern = /\S+@\S+\.\S+/g;
  console.log(email.value);
  //  Tests for a match in a string and returns true or false.
  if (!rePattern.test(email.value)) {
    email.classList.add('error');
    email.closest('.field').querySelector('small').textContent =
      'Please enter a valid email address';
  } else {
    email.classList.add('success');
  }

  // 3. validate date
  const inputDateStr = dateField.value;
  // check if date is not entered
  if (!inputDateStr) {
    dateField.classList.add('error');
    dateField.nextElementSibling.textContent = 'Please enter a date';
  }
  //   check if date isn't in the past
  if (dateInPast(inputDateStr)) {
    dateField.classList.add('error');
    dateField.nextElementSibling.textContent =
      'Date cannot be earlier than today';
  }
*/
