import { HttpStatus } from "@nestjs/common";

export const ApiGetDataCompany = {
  apiOperation: {
    description: "Endpoint for getting updated data from company.",
  },

  okResponse: {
    description: "Get data from company",
    content: {
      "application/json": {
        examples: {
          CompanyCreated: {
            summary: "Success in get data from company",
            description: "Company phone get successfully",
            value: {
              status_code: HttpStatus.OK,
              message: "Company phone get successfully",
              data: { phone: "1212349875" },
            },
          },
        },
      },
    },
  },

  notFound: {
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

  internalServerError: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          CompanyCreated: {
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
