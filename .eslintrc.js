module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "jest/globals": true
  },
  "plugins": ["jest"],
  "globals": {
    "API_URL": true,
    "ACCESS_TOKEN": true,
  },
  "rules": {
    "react/no-unescaped-entities": "off",
    "no-use-before-define": ["error", { "functions": false }],
    "jsx-a11y/label-has-for": [
      "error",
      {
        "required": ["id"]
      }
    ],
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"]
    }]
  }
};
