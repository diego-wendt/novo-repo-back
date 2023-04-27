import { HttpStatus } from "@nestjs/common";

export const ApiGetEmailChangePassword = {
  apiOperation: {
    description:
      "This endpoint get data from a link sent to a e-mail in order to change password.",
  },

  okForgotPassword: {
    description: "Get a solicitation for change password from a e-mail",
    content: {
      "application/json": {
        examples: {
          ForgotPasswordOk: {
            summary: "Response when success in found mail",
            description: "Successful operation",
            value: {
              status_code: HttpStatus.OK,
              message: "Successful operation",
            },
          },
        },
      },
    },
  },

  notFoundForgotPassword: {
    description: "Return of endpoint when mail not exists",
    content: {
      "application/json": {
        examples: {
          ForgotPasswordNotFound: {
            summary: "Response when mail on link is not found.",
            description: "Email not found",
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message:
                "The email provided is not registered. Please check the email you entered and try again.",
              error: "Not Found",
            },
          },
        },
      },
    },
  },

  invalidToken: {
    description: "Return of endpoint when mail not exists",
    content: {
      "application/json": {
        examples: {
          ForgotPasswordNotFound: {
            summary: "Response when token is invalid",
            description: "Invalid token",
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message:
                "The token sent on link is not valid. Please check the link on email again.",
              error: "Invalid token",
            },
          },
        },
      },
    },
  },

  internalServerErrorForgotPassword: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          ForgotPasswordInternalServerError: {
            summary: "Response when an internal error occurred",
            description: "Internal error occurred",
            value: {
              status_code: HttpStatus.INTERNAL_SERVER_ERROR,
              message: "An internal error occurred",
              error: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};
