module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Action Manager API",
    version: "1.0.0",
    description: "Persist and manage action info",
  },
  tags: [{
    name: "action",
    description: "Everything about your Action"
  }],
  schemes: [
    "https", "http"
  ],
  components: {
    schemas: {
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
      Action: {
        content: {
          'application/json': {
            schema: {
              $ref: "#/components/schemas/Action"
            }
          },
          'application/xml': {
            schema: {
              $ref: "#/components/schemas/Action"
            }
          }
        },
        description: "Action object that needs to be added to the action manager service",
        required: true
      }
    }
  },
  paths: {
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