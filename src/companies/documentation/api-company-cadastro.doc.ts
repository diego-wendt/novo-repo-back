import { HttpStatus } from "@nestjs/common";

export const ApiCompanyCadastro = {

  apiOperation: {
    description:
      "Endpoint for registering a new company in the system.",
  },
  create: {
    description: 'Example creation of a new company',
    content: {
      'application/json': {
        examples: {
          CompanyCreated: {
            summary: 'Success in creating a new company',
            description: 'Success in creation',
            value: {
              status_code: HttpStatus.CREATED,
              message: 'Company created succssesfully',
            },
          },
        },
      },
    },
  },
  conflict: {
    description: 'Return of endpoint when mail exists',
    content: {
      'application/json': {
        examples: {
          CompanyCreated: {
            summary: 'The email entered is already registered',
            description: 'Mail duplicated',
            value: {
              status_code: HttpStatus.CONFLICT,
              message: 'The email entered is already registered',
              error: 'Conflict'
            },
          },
        },
      },
    },
  },
  internalServerError: {
    description: 'Return of endpoint when an internal error ocurred',
    content: {
      'application/json': {
        examples: {
          CompanyCreated: {
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