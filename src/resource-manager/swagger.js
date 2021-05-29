module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Resource Manager API",
    version: "1.0.0",
    description: "Persist and manage resource info",
  },
  tags: [{
    name: "resource",
    description: "Everything about resource"
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
          name:{
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
          schema:{
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
          schema:{
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
    '/resources/delete/{uuid}':{
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
          schema:{
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
  }
}