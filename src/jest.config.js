module.exports = {
    // Other Jest configuration options...
  
    // Transform CSS files to return an empty string
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
  };
  