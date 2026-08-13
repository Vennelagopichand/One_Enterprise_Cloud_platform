import type {
  LoginCredentials,
  LoginResult,
  User
} from "../../types/auth";

const SESSION_AUTH_KEY =
  "onecloud_session_authenticated";

const REMEMBER_AUTH_KEY =
  "onecloud_remember_authenticated";

const USER_KEY =
  "onecloud_user";


/*
  Temporary frontend-only demo user.

  Later this will be replaced
  by the Spring Boot API.
*/

const DEMO_USER = {
  employeeId: "admin",
  password: "admin123",

  user: {
    id: "EMP001",
    name: "Admin User",
    email: "admin@onecloud.com",
    role: "HR Administrator"
  } satisfies User
};


/*
  Authenticate user.
*/

export function authenticateUser(
  credentials: LoginCredentials
): LoginResult {

  const employeeId =
    credentials.employeeId
      .trim()
      .toLowerCase();

  const password =
    credentials.password.trim();


  if (
    employeeId !==
      DEMO_USER.employeeId ||
    password !==
      DEMO_USER.password
  ) {

    return {
      success: false,
      message:
        "Invalid Employee ID or password."
    };
  }


  saveAuthentication(
    DEMO_USER.user,
    credentials.rememberMe
  );


  return {
    success: true,
    message:
      "Login successful.",
    user: DEMO_USER.user
  };
}


/*
  Save authentication.
*/

export function saveAuthentication(
  user: User,
  rememberMe = false
): void {

  if (rememberMe) {

    localStorage.setItem(
      REMEMBER_AUTH_KEY,
      "true"
    );

    sessionStorage.removeItem(
      SESSION_AUTH_KEY
    );

  } else {

    sessionStorage.setItem(
      SESSION_AUTH_KEY,
      "true"
    );

    localStorage.removeItem(
      REMEMBER_AUTH_KEY
    );
  }


  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
}


/*
  Check authentication.
*/

export function isAuthenticated():
  boolean {

  const sessionAuthenticated =
    sessionStorage.getItem(
      SESSION_AUTH_KEY
    ) === "true";


  const rememberedAuthenticated =
    localStorage.getItem(
      REMEMBER_AUTH_KEY
    ) === "true";


  return (
    sessionAuthenticated ||
    rememberedAuthenticated
  );
}


/*
  Get user.
*/

export function getStoredUser():
  User | null {

  const storedUser =
    localStorage.getItem(
      USER_KEY
    );


  if (!storedUser) {
    return null;
  }


  try {

    return JSON.parse(
      storedUser
    ) as User;

  } catch {

    return null;
  }
}


/*
  Logout.
*/

export function clearAuthentication():
  void {

  sessionStorage.removeItem(
    SESSION_AUTH_KEY
  );

  localStorage.removeItem(
    REMEMBER_AUTH_KEY
  );

  localStorage.removeItem(
    USER_KEY
  );
}
