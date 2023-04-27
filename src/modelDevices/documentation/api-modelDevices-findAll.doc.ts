import { HttpStatus } from "@nestjs/common";

export const ApiModelDevices = {

  apiOperation: {
    description:
      "This endpoint returns a list of devices by model",
  },

  okModelDevices: {
    description: "Example of response find all model of devices",
    content: {
      "application/json": {
        examples: {
          ModelDevicesOK: {
            summary: "Success in finding all models of devices",
            description: "Success in reading database",
            value: {
              "status_code": 200,
              "message": "Succssesfully done",
              "data": [
                {
                  "id": 1,
                  "name": "Sensor de Umidade do Solo 1",
                  "type": "umidade_do_solo",
                  "min_range": 0,
                  "max_range": 100,
                  "barcode": "123456789",
                  "batch": "ABC123"
                },
              ]
            }
          },
        },
      },
    },
  },

  unauthorizedModelDevices: {
    description: "Route access denied",
    content: {
      "application/json": {
        examples: {
          ModelDevicesUnauthorized: {
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

  internalServerErrorModelDevices: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          ModelDevicesInternalServerError: {
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
