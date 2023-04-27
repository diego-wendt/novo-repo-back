import { HttpStatus } from "@nestjs/common";

export const ApiGetUserDevicesData = {
  apiOperation: {
    description: "This endpoint returns sensor data from a location",
  },

  okUserDevicesData: {
    description: "Example of response save data sucessfully",
    content: {
      "application/json": {
        examples: {
          UserDevicesDataOk: {
            summary: "Success in query by place",
            description: "Example of successful query.",
            value: {
              status_cod: HttpStatus.OK,
              message: "Query succssesfully",
              data: [
                {
                  status_code: 200,
                  message: "Succssesfully done",
                  data: {
                    local: "f8dac8b7-a980-40eb-adf7-1d222b261938",
                    overview: [
                      {
                        id: 2,
                        type: "temperatura",
                        min_range: -30,
                        max_range: 60,
                        unit: "°C",
                        round: 39,
                      },
                    ],
                    dados: [
                      {
                        id: "4450144d-3d28-4f5c-959f-1dad9c48fdbc",
                        name: "Sensor de Temperatura",
                        type_id: 2,
                        type: "temperatura",
                        unit: "°C",
                        values: [40, 40, 40, 30, 40],
                        time: ["04:00", "05:00", "06:00", "07:00", "08:25"],
                      },
                    ],
                  },
                },
              ],
            },
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
