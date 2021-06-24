module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Input Communication API",
    version: "1.0.0",
    description: "HTTP/REST input device data",
  },
  tags: [{
    name: "input",
    description: "Everything about input device data"
  }],
  schemes: [
    "https", "http"
  ],
  components: {
    schemas: {
      Input: {
        type: "object",
        properties: {
          uuid: {
            type: "string",
            required: true
          },
          lat: {
            type: "number",
            format: "double"
          },
          lon: {
            type: "number",
            format: "double"
          },
          data: {
            type: "object",
            required: true
          },
        },
      },
    },
    requestBodies: {
      Input: {
        content: {
          'application/json': {
            schema: {
              $ref: "#/components/schemas/Input"
            }
          },
          'application/xml': {
            schema: {
              $ref: "#/components/schemas/Input"
            }
          }
        },
        description: "Input device data",
        required: true
      }
    }
  },
  paths: {
    '/inputCommunicator': {
      post: {
        tags: ["input"],
        summary: "input device data",
        description: "",
        operationId: "inputCommunicator",
        requestBody: {
          $ref: "#/components/requestBodies/Input"
        },
        responses: {
          "200": {
            description: "input device data [in process]"
          },
        },
      },
    },
  },
}