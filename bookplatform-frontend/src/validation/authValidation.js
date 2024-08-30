const validateCredentials = (credentials) => {
    const errors = {};

    if (!credentials.name.trim()) {
        errors.name = "Name is required.";
    }
    if (!credentials.username.trim()) {
        errors.username = "Username is required.";
    }

    if (!credentials.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
        errors.email = "Email address is invalid.";
    }

    if (!credentials.password.trim()) {
        errors.password = "Password is required.";
    } else if (credentials.password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    if (!credentials.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm Password is required.";
    } else if (credentials.password.trim() !== credentials.confirmPassword.trim()) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
};

const validateLoginCredentials = (credentials) => {
    const errors = {};

    if (!credentials.email || !credentials.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email.trim())) {
        errors.email = "Email address is invalid.";
    }

    if (!credentials.password || !credentials.password.trim()) {
        errors.password = "Password is required.";
    } else if (credentials.password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    return errors;
};



export  { validateCredentials , validateLoginCredentials };
