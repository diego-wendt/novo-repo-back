import { HttpStatus } from "@nestjs/common";

export const ApiGetPlaces = {

  apiOperation: {
    description:
      "Returns a list of registered locations and the amount of linked sensors",
  },

  okGetPlaces: {
    description: "Example get places",
    content: {
      "application/json": {
        examples: {
          getPlaces: {
            summary: "Success in get places",
            description: "Success in get places",
            value: {
              status_code: HttpStatus.OK,
              data: [
                {
                  places_id: "fc19522c-f96a-4fa4-9c1e-81c40262714c",
                  places_name: "Name of place",
                  places_latitude: "10",
                  places_longitude: "10",
                  num_devices: "2"
                },
                {
                  places_id: "fc6a20c3-038d-403f-9df8-ae15b84fe336",
                  places_name: "Name of place 2",
                  places_latitude: "10",
                  places_longitude: "10",
                  num_devices: "0"
                }
              ],
              message: "Successful query"
            },
          },
        },
      },
    },
  },
  unauthorizedGetPlaces: {
    description: "Return of endpoint when UnauthorizedException",
    content: {
      "application/json": {
        examples: {
          getPlaces: {
            summary: "Response when UnauthorizedException",
            description: "The request requires user authentication.",
            value: {
              status_code: HttpStatus.UNAUTHORIZED,
              message: "Unauthorized",
            },
          },
        },
      },
    },
  },
  internalServerErrorGetPlaces: {
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
