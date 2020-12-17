module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Data Manager API",
    version: "1.0.0",
    description: "Persist and manage data info",
  },
  tags: [{
    name: "data",
    description: "Everything about your Data"
  }],
  schemes: [
    "https", "http"
  ],
  components: {
    schemas: {
      Data: {
        type: "object",
        properties: {
          deviceUuid: {
            type: "string",
            required: true,
          },
          lat: {
            type: "number",
            format: "double",
          },
          lon: {
            type: "number",
            format: "double",
          },
          data: {
            type: "object",
            required: true
          },
        }
      }
    },
    requestBodies: {
      Data: {
        content: {
          'application/json': {
            schema: {
              $ref: "#/components/schemas/Data"
            }
          },
          'application/xml': {
            schema: {
              $ref: "#/components/schemas/Data"
            }
          }
        },
        description: "Data object that needs to be added to the data manager service",
        required: true
      }
    }
  },
  paths: {
    '/datas': {
      get: {
        tags: ["data"],
        summary: "Get all data from all device",
        description: "",
        operationId: "getAllData",
        responses: {
          "200": {
            description: "All data"
          },
        }
      }
    },
    '/datas/persist': {
      post: {
        tags: ["data"],
        summary: "persist a new data",
        description: "",
        operationId: "persistData",
        requestBody: {
          $ref: "#/components/requestBodies/Data"
        },
        responses: {
          "200": {
            description: "Data persisted"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/datas/last/{uuid}': {
      get: {
        tags: ["data"],
        summary: "get the last data from device",
        description: "",
        operationId: "getLastData",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of device",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "Last data from device"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/datas/{uuid}': {
      get: {
        tags: ["data"],
        summary: "Get all data from device",
        description: "",
        operationId: "getData",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of device",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "All data from device",
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/datas/delete/{uuid}': {
      delete: {
        tags: ["data"],
        summary: "Delete data",
        description: "",
        operationId: "deleteData",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of device",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "delete data",
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
  }
}