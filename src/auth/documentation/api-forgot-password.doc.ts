import { HttpStatus } from "@nestjs/common";

export const ApiForgotPassword = {

  apiOperation: {
    description:
      "This endpoint Performs password change.",
  },

  okForgotPassword: {
    description: 'Example a founded mail',
    content: {
      'application/json': {
        examples: {
          ForgotPasswordOk: {
            summary: 'Response when success in found mail',
            description: 'Mail founded',
            value: {
              status_code: HttpStatus.OK,
              message: 'Mail founded',
              data: 'example@example.com'
            },
          },
        },
      },
    },
  },

  notFoundForgotPassword: {
    description: 'Return of endpoint when mail not exists',
    content: {
      'application/json': {
        examples: {
          ForgotPasswordNotFound: {
            summary: 'Response when mail entered is not located',
            description: 'Mail not found',
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message: 'The email provided is not registered. Please check the email you entered and try again.',
              error: 'Not Found'
            },
          },
        },
      },
    },
  },

  internalServerErrorForgotPassword: {
    description: 'Return of endpoint when an internal error ocurred',
    content: {
      'application/json': {
        examples: {
          ForgotPasswordInternalServerError: {
            summary: 'Response when an internal error occurred',
            description: 'Internal error occurred',
            value: {
              status_code: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'An internal error occurred',
              error: 'Internal Server Error'
            },
          },
        },
      },
    },
  },

}