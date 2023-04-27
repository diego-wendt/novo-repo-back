import { HttpStatus } from "@nestjs/common";

export const ApiLogin = {

  apiOperation: {
    description:
      "This endpoint create a token for auth.",
  },

  okLogin: {
    description: 'Example sucessfull login',
    content: {
      'application/json': {
        examples: {
          LoginOk: {
            summary: 'Response when success login',
            description: 'Login succssesfully',
            value: {
              status_code: HttpStatus.OK,
              message: "Login success",
              data: {
                "status_code": 200,
                "message": "Login success",
                "data": {
                  "id": "12c9c575-fe27-440d-ae11-da8ccfd61f90",
                  "mail": "example@example.com",
                  "name": "Name of company",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyYzljNTc1LWZlMjctNDQwZC1hZTExLWRhOGNjZmQ2MWY5MCIsIm1haWwiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwibmFtZSI6Ik5hbWUgb2YgY29tcGFueSIsImlhdCI6MTY4MTg2MzEyOH0.mA2d3ibJYj9dI5BfICClNMKY_Zy15Y1Ciu-rfceehOw"
                }
              }
            }
          },
        },
      },
    },
  },

  badRequestLogin: {
    description: 'Error example when a required field is missing',
    content: {
      'application/json': {
        examples: {
          LoginBadRequest: {
            summary: 'Example of some field missing from the body',
            description: 'Required field missing',
            value: {
              status_code: HttpStatus.BAD_REQUEST,
              message: [
                "password should not be empty",
                "password must be longer than or equal to 8 characters",
                "password must be a string"
              ],
              error: "Bad Request"
            }
          },
        },
      },
    },
  },

  unauthorizedLogin: {
    description: 'Error example when password or mail is wrong',
    content: {
      'application/json': {
        examples: {
          LoginUnauthorizedPassword: {
            summary: 'Example of error when the password is wrong',
            description: 'Password is wrong',
            value: {
              status_code: 401,
              message: "Unable to login, invalid password or username"
            }
          },
        },
      },
    },
  },

}