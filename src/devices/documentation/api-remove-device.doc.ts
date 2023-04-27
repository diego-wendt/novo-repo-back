import { HttpStatus } from "@nestjs/common";

export const ApiRemoveDevice = {
  apiOperation: {
    description:
      "This endpoint removes the device",
  },

  okRemoveDevice: {
    description: 'Example a removed device',
    content: {
      'application/json': {
        examples: {
          DeviceRemoveOk: {
            summary: 'Success in remove an device',
            description: 'Success in remove',
            value: {
              status_code: HttpStatus.OK,
              message: 'Device removed succssesfully',
            },
          },
        },
      },
    },
  },

  unauthorizedRemoveDevice: {
    description: "Route access denied",
    content: {
      "application/json": {
        examples: {
          DeviceRemoveUnauthorized: {
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

  notFoundRemoveDevice: {
    description: "Return of endpoint when Device not exists",
    content: {
      "application/json": {
        examples: {
          DeviceRemoveNotFound: {
            summary: "Response when Device entered is not located",
            description: "Device not found",
            value: {
              status_code: HttpStatus.NOT_FOUND,
              message: "Device doesn't exist or is registered to another place."
            },
          },
        },
      },
    },
  },

  internalServerErrorRemoveDevice: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          DeviceRemoveInternalServerError: {
            summary: "Response when an internal error occurred",
            description: "Internal error occurred",
            value: {
              status_code: HttpStatus.INTERNAL_SERVER_ERROR,
              message: "An internal error occurred",
            },
          },
        },
      },
    },
  },

};