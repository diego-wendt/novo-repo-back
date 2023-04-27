import { HttpStatus } from "@nestjs/common";

export const ApiPostUserDevicesData = {

  apiOperation: {
    description:
      "This endpoint saves the data read by the sensor. It is necessary to inform the device ID and the read value.",
  },

  okUserDevicesData: {
    description: "Example of response save data sucessfully",
    content: {
      "application/json": {
        examples: {
          UserDevicesDataOk: {
            summary: "Success in save device data.",
            description: "Success in save device data.",
            value: [
              {
                status_code: HttpStatus.OK,
                message: "Data added sucessfully",
              },
            ],
          },
        },
      },
    },
  },

  unauthorizedUserDevicesData: {
    description: "Route access denied",
    content: {
      "application/json": {
        examples: {
          UserDevicesDataUnauthorized: {
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

  conflictUserDevicesData: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          UserDevicesDataConflict: {
            summary: "Response when an conflict exception occurred",
            description: "Conflict exception error",
            value: {
              status_code: HttpStatus.INTERNAL_SERVER_ERROR,
              message:
                "The value should be within the minimum and maximum value range of the device.",
              error: "Conflict exception",
            },
          },
        },
      },
    },
  },

  internalServerErrorUserDevicesData: {
    description: "Return of endpoint when an internal error ocurred",
    content: {
      "application/json": {
        examples: {
          UserDevicesDataInternalServerErrorCreate: {
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
