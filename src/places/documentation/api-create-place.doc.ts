import { HttpStatus } from "@nestjs/common";

export const ApiCreatePlace = {

  apiOperation: {
    description:
      "This endpoint create a new place",
  },

  createPlace: {
    description: 'Example creation of a new place',
    content: {
      'application/json': {
        examples: {
          PlaceCreated: {
            summary: 'Success in creating a new place',
            description: 'Success in creation',
            value: {
              status_code: HttpStatus.CREATED,
              message: 'Place created succssesfully',
            },
          },
        },
      },
    },
  },

  unauthorizedCreatePlace: {
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

  badRequestPlace: {
    description: 'Error example when a required field is missing',
    content: {
      'application/json': {
        examples: {
          PlaceBadRequestMissingField: {
            summary: 'Example of some field missing from the body',
            description: 'Required field missing',
            value: {
              "statusCode": HttpStatus.BAD_REQUEST,
              "message": [
                "longitude must not be less than -180",
                "longitude must not be greater than 180",
                "longitude must be a number conforming to the specified constraints",
                "Longitude is required"
              ],
              "error": "Bad Request"
            }
          },
          PlaceBadRequestLatitude: {
            summary: 'Example of invalid latitude',
            description: 'Invalid latitude',
            value: {
              "statusCode": HttpStatus.BAD_REQUEST,
              "message": [
                "latitude must not be greater than 90"
              ],
              "error": "Bad Request"
            }
          },
          PlaceBadRequestLongitude: {
            summary: 'Example of invalid longitude',
            description: 'Invalid longitude',
            value: {
              "statusCode": HttpStatus.BAD_REQUEST,
              "message": [
                "longitude must not be greater than 180"
              ],
              "error": "Bad Request"
            }
          },
        },
      },
    },
  },


}