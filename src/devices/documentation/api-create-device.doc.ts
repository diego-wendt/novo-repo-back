import { HttpStatus } from "@nestjs/common";

export const ApiCreateDevices = {
  apiOperation: {
    description:
      "This endpoint links a new sensor to a location. It is necessary to inform the name that will be given to the sensor, the sensor type id and the Mac address of the device to be registered.",
  },

  deviceCreated: {
    description: "Example of response device created sucesfully",
    content: {
      "application/json": {
        examples: {
          DeviceCreated: {
            summary: "Success in create a new device.",
            description: "Success in create a new device.",
            value: {
              status_code: HttpStatus.CREATED,
              message: "Device created sucesfully",
            }
          },
        },
      },
    },
  },

  unauthorizedCreateDevice: {
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

  deviceConflict: {
    description: "Return of endpoint when a conflict ocurred",
    content: {
      "application/json": {
        examples: {
          DeviceConflict: {
            summary: "Response when an conflict exception occurred",
            description: "Conflict exception error",
            value: {
              status_code: HttpStatus.CONFLICT,
              message: "MacAddress already registered",
              error: "Conflict exception",
            },
          },
        },
      },
    },
  },

  deviceNotFound: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          PlaceNotFound: {
            summary: "Response when an a place is not found",
            description: "Place not found",
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message: "Place not found.",
              error: "Place not found",
            },
          },
          ModelDeviceNotFound: {
            summary: "Response when an a model device is not found",
            description: "Model device not found",
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message: "Model device not found",
              error: "Model device not found",
            },
          },
        },
      },
    },
  },

  deviceInternalServerError: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          DeviceInternalServerError: {
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
}
