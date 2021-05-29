module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Service Cataloger API",
    version: "1.0.0",
    description: "",
  },
  tags: [{
    name: "resource",
    description: "Everything about your Resource"
  },
  {
    name: "data",
    description: "Everything about your Data"
  },
  {
    name: "action",
    description: "Everything about your Action"
  }],
  schemes: [
    "https", "http"
  ],
  components: {
    schemas: {
      Resource: {
        type: "object",
        properties: {
          uuid: {
            type: "string",
            required: true,
          },
          name: {
            type: "string"
          },
          lat: {
            type: "number",
            format: "double"
          },
          lon: {
            type: "number",
            format: "double"
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
            type: "string"
          },
          isDevice: {
            type: "boolean",
            required: true,
            default: false
          },
        }
      },
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
      },
      Action: {
        type: "object",
        properties: {
          uuidAtuador: {
            type: "string",
            required: true,
          },
          uuidSensor: {
            type: "string",
            required: true,
          },
          dataSensor: {
            type: "object",
            required: true,
          },
          dataAtuador: {
            type: "object",
            required: true,
          },
          lifetimeAtuacao: {
            type: "object",
            required: true,
            properties: {
              lifetime: {
                type: "boolean",
                required: true,
                default: false
              },
              quant: {
                type: "number",
                format: "integer",
                required: true
              }
            }
          },
          status: {
            type: "boolean",
            required: true,
            default: true
          },
        }
      }
    },
    requestBodies: {
      Resource: {
        content: {
          'application/json': {
            schema: {
              $ref: "#/components/schemas/Resource"
            }
          },
          'application/xml': {
            schema: {
              $ref: "#/components/schemas/Resource"
            }
          }
        },
        description: "Resource object that needs to be added to the resource manager service",
        required: true
      },
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
      ,
      Action: {
        type: "object",
        properties: {
          uuidAtuador: {
            type: "string",
            required: true,
          },
          uuidSensor: {
            type: "string",
            required: true,
          },
          dataSensor: {
            type: "object",
            required: true,
          },
          dataAtuador: {
            type: "object",
            required: true,
          },
          lifetimeAtuacao: {
            type: "object",
            required: true,
            properties: {
              lifetime: {
                type: "boolean",
                required: true,
                default: false
              },
              quant: {
                type: "number",
                format: "integer",
                required: true
              }
            }
          },
          status: {
            type: "boolean",
            required: true,
            default: true
          },
        }
      }
    }
  },
  paths: {
    '/resources': {
      get: {
        tags: ["resource"],
        summary: "Get all resources",
        description: "",
        operationId: "getAllResources",
        responses: {
          "200": {
            description: "All resources"
          },
        }
      }
    },
    '/resources/inscribe': {
      post: {
        tags: ["resource"],
        summary: "Inscribe a new resource",
        description: "",
        operationId: "inscribe",
        requestBody: {
          $ref: "#/components/requestBodies/Resource"
        },
        responses: {
          "200": {
            description: "Resource inscribe"
          },
        }
      }
    },
    '/resources/update': {
      put: {
        tags: ["resource"],
        summary: "Update a new resource",
        description: "",
        operationId: "update",
        requestBody: {
          $ref: "#/components/requestBodies/Resource"
        },
        responses: {
          "200": {
            description: "Resource updated"
          },
        }
      }
    },
    '/resources/{uuid}': {
      get: {
        tags: ["resource"],
        summary: "Find the resource with uuid",
        description: "",
        operationId: "findByUuidResource",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of resource",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "get Resource",
          },
        }
      }
    },
    '/resources/verify/{uuid}': {
      get: {
        tags: ["resource"],
        summary: "verify the resource with uuid",
        description: "",
        operationId: "checkByUuidResource",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of resource",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "get Resource",
          },
        }
      }
    },
    '/resources/delete/{uuid}': {
      delete: {
        tags: ["resource"],
        summary: "Delete resource",
        description: "",
        operationId: "delete",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "Uuid of resource",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "delete Resource",
          },
        }
      }
    },
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
    '/actions': {
      get: {
        tags: ["action"],
        summary: "Get all actions",
        description: "",
        operationId: "getAllActions",
        responses: {
          "200": {
            description: "All actions"
          },
        }
      }
    },
    '/actions/inscribe': {
      post: {
        tags: ["action"],
        summary: "Inscribe a new action",
        description: "",
        operationId: "inscribeAction",
        requestBody: {
          $ref: "#/components/requestBodies/Action"
        },
        responses: {
          "200": {
            description: "Action inscribe"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/actions/{uuid}': {
      get: {
        tags: ["action"],
        summary: "Find all action from uuid",
        description: "",
        operationId: "getActions",
        parameters: [{
          name: "uuidSensor",
          in: "path",
          description: "Uuid of device",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "get all actions from device",
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/actions/notify': {
      get: {
        tags: ["action"],
        summary: "notify action communicator about receive data from device",
        description: "",
        operationId: "notifyActionCommunicator",
        parameters: [{
          name: "uuidSensor",
          in: "path",
          description: "Uuid of device",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "notified if your action from about device exists"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
  }
}