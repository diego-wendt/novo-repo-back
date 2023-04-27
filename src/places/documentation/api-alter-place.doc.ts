import { HttpStatus } from "@nestjs/common";

export const ApiAlterPlace = {

  apiOperation: {
    description:
      "This endpoint edit an place",
  },

  alterPlace: {
    description: "Update an existing place by ID",
    content: {
      "application/json": {
        examples: {
          PlaceUpdated: {
            summary: "Success in updating a place",
            description: "Success in updating",
            value: {
              status_code: HttpStatus.OK,
              message: "Place updated succssesfully",
            },
          },
        },
      },
    },
  },

  unauthorizedEditPlace: {
    description: "Route access denied",
    content: {
      "application/json": {
        examples: {
          PlaceUnauthorized: {
            summary: "Response when the acess is denied",
            description: "Acess denied",
            value: {
              status_code: HttpStatus.UNAUTHORIZED,
              message: "Unauthorized",
            },
          },
        },
      },
    },
  },

  notFoundPlace: {
    description: "Return of endpoint when place not exists",
    content: {
      "application/json": {
        examples: {
          PlaceNotFound: {
            summary: "Response when place entered is not located",
            description: "Place not found",
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message: "Place not found.",
            },
          },
        },
      },
    },
  },

  internalServerErrorAlterPlaces: {
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
