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
  },
  paths: {
    '/devices/inscribe': {
      post: {
        tags: ["device"],
        summary: "Inscribe a new device",
        description: "",
        operationId: "inscribeDevice",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [{
          in: "body",
          name: "device",
          description: "Device object that needs to be inscribe to the device manager",
          required: true,
          schema: {
            $ref: "#/components/schemas/Device"
          }
        }],
        responses: {
          "200": {
            description: "Device inscribe"
          },
          "400": {
            description: "Invalid input"
          }
        }
      }
    }
  }
}