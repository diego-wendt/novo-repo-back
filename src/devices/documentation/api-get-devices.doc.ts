import { HttpStatus } from "@nestjs/common";

export const ApiGetDevices = {

  apiOperation: {
    description:
      "This endpoint returns a list of devices by location",
  },

  okGetDevices: {
    description: "Example get devices",
    content: {
      "application/json": {
        examples: {
          getDevices: {
            summary: "Success in get devices",
            description: "Success in get devices",
            value: {
              status_code: HttpStatus.OK,
              data: [
                {
                  id: "88717c78-e349-4a79-9b1b-f2148e18116e",
                  name: "Sensor Umidificator Philipps Walita",
                  status: true,
                  type_id: {
                    type: "umidade_do_solo",
                  }
                },
              ],
            },
          },
        },
      },
    },
  },

  unauthorizedListDevice: {
    description: "Route access denied",
    content: {
      "application/json": {
        examples: {
          DeviceUnauthorized: {
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

  notFoundGetDevices: {
    description: "Return of endpoint when place not exists",
    content: {
      "application/json": {
        examples: {
          getDevices: {
            summary: "Response when place not exists",
            description: "Place not found",
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message: "Place not found.",
              error: "Not Found",
            },
          },
        },
      },
    },
  },

  internalServerErrorGetDevices: {
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
