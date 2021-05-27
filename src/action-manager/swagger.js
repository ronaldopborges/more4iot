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
          uuidFrom: {
            type: "string",
            required: true,
          },
          uuidTo: {
            type: "string",
            required: true,
          },
          data: {
            type: "object"
          },
          commands: {
            type: "object"
          },
          lifetime: {
            type: "object",
            required: true,
            properties: {
              validity: {
                type: "boolean",
                required: true,
                default: true
              },
              count: {
                type: "number",
                format: "integer",
                default: 0,
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
        operationId: "inscribe",
        requestBody: {
          $ref: "#/components/requestBodies/Action"
        },
        responses: {
          "200": {
            description: "Action inscribe"
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
          name: "uuidFrom",
          in: "path",
          description: "UUID",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "get all actions from device",
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
          name: "uuidFrom",
          in: "path",
          description: "UUID",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "notified if your action from about device exists"
          }
        }
      }
    },
  }
}