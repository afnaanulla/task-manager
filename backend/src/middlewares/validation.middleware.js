// validation.middleware.js — Input validation and sanitization

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

exports.validateSignup = (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Email and password are required"
    });
  }

  const sanitizedEmail = sanitizeInput(email);
  const sanitizedPassword = sanitizeInput(password);


  request.body.email = sanitizedEmail;
  request.body.password = sanitizedPassword;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(sanitizedEmail)) {
    return response.status(400).json({
      message: "Invalid email format"
    });
  }

  if (sanitizedPassword.length < 8) {
    return response.status(400).json({
      message: "Password must be at least 8 characters long"
    });
  }

  next();
};


exports.validateLogin = (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Email and password are required"
    });
  }

  request.body.email = sanitizeInput(email);
  request.body.password = sanitizeInput(password);

  next();
};


exports.validateTask = (request, response, next) => {
  const { title, body, status } = request.body;

  if (!title) {
    return response.status(400).json({
      message: "Task title is required"
    });
  }

  const sanitizedTitle = sanitizeInput(title);

  if (sanitizedTitle.length === 0) {
    return response.status(400).json({
      message: "Task title cannot be empty"
    });
  }


  request.body.title = sanitizedTitle;

  if (body) {
    request.body.body = sanitizeInput(body);
  }


  if (status && !['PENDING', 'COMPLETED'].includes(status)) {
    return response.status(400).json({
      message: "Status must be either PENDING or COMPLETED"
    });
  }

  next();
};
