module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Device Manager API",
    version: "1.0.0",
    description: "Persist and manage device info",
  },
  tags: [{
    name: "device",
    description: "Everything about your Device"
  }],
  schemes: [
    "https", "http"
  ],
  components: {
    schemas: {
      Device: {
        type: "object",
        properties: {
          uuid: {
            type: "string",
            required: true,
          },
          latDefault: {
            type: "number",
            format: "double",
            required: true,
          },
          lonDefault: {
            type: "number",
            format: "double",
            required: true,
          },
          resource: {
            type: "array",
            items: {
              type: "string"
            }
          },
          uri: {
            type: "string",
            required: true
          },
          protocol: {
            type: "string",
            required: true
          },
          describe: {
            type: "string",
            required: true
          },
          typeDevice: {
            type: "string",
            required: true
          },
        }
      }
    },
    requestBodies: {
      Device: {
        content: {
          'application/json': {
            schema: {
              $ref: "#/components/schemas/Device"
            }
          },
          'application/xml': {
            schema: {
              $ref: "#/components/schemas/Device"
            }
          }
        },
        description: "Device object that needs to be added to the device manager service",
        required: true
      }
    }
  },
  paths: {
    '/devices': {
      get: {
        tags: ["device"],
        summary: "Get all devices",
        description: "",
        operationId: "getAllDevice",
        responses: {
          "200": {
            description: "All devices"
          },
        }
      }
    },
    '/devices/inscribe': {
      post: {
        tags: ["device"],
        summary: "Inscribe a new device",
        description: "",
        operationId: "inscribeDevice",
        requestBody: {
          $ref: "#/components/requestBodies/Device"
        },
        responses: {
          "200": {
            description: "Device inscribe"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/devices/update': {
      put: {
        tags: ["device"],
        summary: "Update a new device",
        description: "",
        operationId: "updateDevice",
        requestBody: {
          $ref: "#/components/requestBodies/Device"
        },
        responses: {
          "200": {
            description: "Device updated"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/devices/{uuid}': {
      get: {
        tags: ["device"],
        summary: "Find and check the device with uuid",
        description: "",
        operationId: "findByUuidDevice",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of device",
          required: true,
          schema:{
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "get Device",
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/devices/delete/{uuid}':{
      delete: {
        tags: ["device"],
        summary: "Delete Device",
        description: "",
        operationId: "deleteDevice",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of device",
          required: true,
          schema:{
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "delete Device",
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
  }
}