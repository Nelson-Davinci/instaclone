export const validateEmail = (email) => {
  const validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!email) {
    return "Email is required.";
  } else if (!validRegex.test(email)) {
    return "Please enter a valid email address";
  }
};

export const validatePassword = (password) => {
  const validRegex = /^(?=.[a-z])(?=.[A-Z]).{5,}$/;
  if (!password) {
    return "Password is required";
  } else if (!validRegex.test(password)) {
    return "Password must contain at least one lowercase, uppercase, and at least 5 characters long";
  }
};

export const validateUsername = (username) => {
  if (!username) {
    return "Please enter a username.";
  } else if (username.length < 3 || username.length > 20) {
    return "Username must be between 3 and 20 characters long.";
  }
};

export const validateFullname = (fullname) => {
  if (!fullname) {
    return "Please enter your full name.";
  } else if (fullname.length < 5) {
    return "Fullname must be at least 5 characters long." ;
  }
};