import { HttpStatus } from "@nestjs/common";

export const ApiUpdateCompany = {
  apiOperation: {
    description:
      "Endpoint update registration of a new company in the system.",
  },

  updateCompany: {
    description: "This endpoint updates company data.",
    content: {
      "application/json": {
        examples: {
          CompanyUpdate: {
            summary: "succssesfully saved data.",
            description: "succssesfully saved data.",
            value: {
              status_code: HttpStatus.CREATED,
              message: "succssesfully saved data.",
            },
          },
        },
      },
    },
  },
  internalServerErrorUpdateCompany: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          CompanyUpdated: {
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