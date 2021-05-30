module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Action Manager API",
    version: "1.0.0",
    description: "Persist and manage action info",
  },
  tags: [{
    name: "action",
    description: "Everything about Action"
  }],
  schemes: [
    "https", "http"
  ],
  components: {
    schemas: {
      Action: {
        type: "object",
        properties: {
          creator: {
            type: "string",
            required: true
          },
          origin: {
            type: "array",
            items: {
              type: "string"
            }
          },
          receiver: {
            type: "object",
            properties: {
              identifiers: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              protocol: {
                type: "string"
              },
              uri: {
                type: "string"
              },
            },
          },
          scope: {
            type: "object",
            properties: {
              data: {
                type: "object",
                default: {}
              },
              commands: {
                type: "object",
                default: {}
              },
            },
          },
          lifetime: {
            type: "object",
            properties: {
              validity: {
                type: "boolean",
                default: false,
                required: true,
              },
              count: {
                type: "number",
                default: 0,
                required: true
              },
            },
          },
          status: {
            type: "boolean",
            default: true,
            required: true
          },
        },
      },
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
          name: "uuid",
          in: "path",
          description: "creator UUID",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "get all actions from resources",
          }
        }
      }
    },
    '/actions/notify/{uuid}': {
      get: {
        tags: ["action"],
        summary: "notify action communicator about receive data from resource",
        description: "",
        operationId: "notifyActionCommunicator",
        parameters: [{
          name: "uuid",
          in: "path",
          description: "origin UUID",
          required: true,
          schema: {
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "notified if your action from about resources exists"
          }
        }
      }
    },
  }
}