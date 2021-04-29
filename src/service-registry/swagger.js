module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Service Registry API",
    version: "1.0.0",
    description: "service registry",
  },
  tags: [{
    name: "Registry",
    description: "Everything about your Service Registry"
  }],
  schemes: [
    "https", "http"
  ],
  components: {
    schemas: {
      Registry: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
          ipv4: {
            type: "string",
            required: true
          },
          port: {
            type: "string",
            required: true
          }
        }
      }
    },
    requestBodies: {
      Registry: {
        content: {
          'application/json': {
            schema: {
              $ref: "#/components/schemas/Registry"
            }
          },
          'application/xml': {
            schema: {
              $ref: "#/components/schemas/Registry"
            }
          }
        },
        description: "Registry object that needs to be added to the service registry",
        required: true
      }
    }
  },
  paths: {
    '/registry/inscribe': {
      post: {
        tags: ["Registry"],
        summary: "Inscribe a new service",
        description: "",
        operationId: "inscribeRegistry",
        requestBody: {
          $ref: "#/components/requestBodies/Registry"
        },
        responses: {
          "200": {
            description: "Registry inscribe"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
    '/registry/{name}': {
      get: {
        tags: ["Registry"],
        summary: "Find service by service name",
        description: "",
        operationId: "findByServiceName",
        parameters: [{
          name: "name",
          in: "path",
          description: "Service name",
          required: true,
          schema:{
            type: "string",
          }
        }],
        responses: {
          "200": {
            description: "Get registry",
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    },
  }
}