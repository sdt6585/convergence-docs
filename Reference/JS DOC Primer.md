# JSDoc: A Comprehensive Primer

JSDoc is a markup language used to annotate JavaScript source code files. When properly integrated with your development environment, it provides type checking, autocompletion, and documentation generation capabilities similar to TypeScript, but without requiring you to change your JavaScript code to a different language.

## Table of Contents

1. [Basic Syntax](https://claude.ai/chat/f507dd48-1a62-4d79-ba3f-020afe97550d#basic-syntax)
2. [Documenting Types](https://claude.ai/chat/f507dd48-1a62-4d79-ba3f-020afe97550d#documenting-types)
3. [Functions and Parameters](https://claude.ai/chat/f507dd48-1a62-4d79-ba3f-020afe97550d#functions-and-parameters)
4. [Classes and Objects](https://claude.ai/chat/f507dd48-1a62-4d79-ba3f-020afe97550d#classes-and-objects)
5. [Advanced Type Features](https://claude.ai/chat/f507dd48-1a62-4d79-ba3f-020afe97550d#advanced-type-features)
6. [Configuration](https://claude.ai/chat/f507dd48-1a62-4d79-ba3f-020afe97550d#configuration)
7. [Best Practices](https://claude.ai/chat/f507dd48-1a62-4d79-ba3f-020afe97550d#best-practices)

## Basic Syntax

Every JSDoc comment begins with `/**` and ends with `*/`. The content in between uses tags that start with an `@` symbol.

```javascript
/**
 * This is a JSDoc comment.
 * 
 * @tag This is the content for this tag
 */
```

## Documenting Types

### Basic Types

```javascript
/** @type {string} */
let name = "Claude";

/** @type {number} */
let count = 42;

/** @type {boolean} */
let isActive = true;
```

### Arrays

```javascript
/** @type {Array<string>} */
let names = ["Alice", "Bob"];

// Alternative syntax
/** @type {string[]} */
let moreNames = ["Charlie", "Dave"];
```

### Objects

```javascript
/** @type {Object} */
let simpleObject = {};

/** @type {{name: string, age: number}} */
let person = { name: "Eve", age: 30 };
```

### Nullable and Optional Types

```javascript
/** @type {string|null} */
let nullableName = null;  // Can be string or null

/** @type {string|undefined} */
let optionalName;  // Can be string or undefined
```

### Custom Types with @typedef

```javascript
/**
 * @typedef {Object} Person
 * @property {string} name - The person's name
 * @property {number} age - The person's age
 * @property {string[]} [hobbies] - Optional list of hobbies
 */

/** @type {Person} */
const alice = {
  name: "Alice",
  age: 28
  // hobbies is optional
};
```

The square brackets `[property]` indicate an optional property.

## Functions and Parameters

### Basic Function Documentation

```javascript
/**
 * Adds two numbers together.
 * 
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  return a + b;
}
```

### Optional Parameters

```javascript
/**
 * Greets a person.
 * 
 * @param {string} name - The person's name
 * @param {string} [greeting="Hello"] - Optional greeting prefix
 * @returns {string} The greeting message
 */
function greet(name, greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
```

### Rest Parameters

```javascript
/**
 * Calculates the average of several numbers.
 * 
 * @param {...number} values - Numbers to average
 * @returns {number} The average value
 */
function average(...values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
```

### Callback Parameters

```javascript
/**
 * Executes a callback for each item in an array.
 * 
 * @param {Array} array - The array to iterate over
 * @param {function(*, number): void} callback - Function to execute for each element
 * @param {*} callback.item - The current item being processed
 * @param {number} callback.index - The index of the current item
 */
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }
}
```

## Classes and Objects

### Documenting a Class

```javascript
/**
 * Represents a user in the system.
 */
class User {
  /**
   * Create a new User.
   * 
   * @param {string} name - The user's name
   * @param {string} email - The user's email
   */
  constructor(name, email) {
    /** @type {string} */
    this.name = name;
    
    /** @type {string} */
    this.email = email;
    
    /** @type {Date} */
    this.createdAt = new Date();
  }
  
  /**
   * Get the user's display name.
   * 
   * @returns {string} The user's display name
   */
  getDisplayName() {
    return this.name || this.email.split('@')[0];
  }
}
```

### Using @property for Object Properties

```javascript
/**
 * Configuration options for the application.
 * 
 * @typedef {Object} Config
 * @property {string} apiKey - The API key for authentication
 * @property {number} [timeout=3000] - Request timeout in milliseconds
 * @property {Object} endpoints - API endpoints
 * @property {string} endpoints.users - Users endpoint URL
 * @property {string} endpoints.products - Products endpoint URL
 */

/** @type {Config} */
const config = {
  apiKey: "abc123",
  endpoints: {
    users: "https://api.example.com/users",
    products: "https://api.example.com/products"
  }
};
```

## Advanced Type Features

### Union Types

```javascript
/** @type {string|number} */
let id = "abc123";
id = 456; // Also valid
```

### Intersection Types

```javascript
/**
 * @typedef {Object} Name
 * @property {string} firstName
 * @property {string} lastName
 */

/**
 * @typedef {Object} Contact
 * @property {string} email
 * @property {string} phone
 */

/** @type {Name & Contact} */
let person = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "555-1234"
};
```

### Type Guards with @template

```javascript
/**
 * Returns the first item in an array.
 * 
 * @template T
 * @param {Array<T>} array - The input array
 * @returns {T|undefined} The first item or undefined if empty
 */
function first(array) {
  return array.length > 0 ? array[0] : undefined;
}

const numbers = [1, 2, 3];
const firstNumber = first(numbers); // TypeScript infers this as number|undefined
```

### Record Types

```javascript
/** @type {Record<string, number>} */
const scores = {
  alice: 95,
  bob: 87,
  charlie: 92
};
```

### Partial Types

```javascript
/**
 * Updates user information.
 * 
 * @param {Object} user - The user to update
 * @param {Partial<User>} updates - Fields to update
 * @returns {User} The updated user
 */
function updateUser(user, updates) {
  return { ...user, ...updates };
}
```

### Function Types

```javascript
/** @type {(a: number, b: number) => number} */
const add = (a, b) => a + b;

/**
 * @typedef {Object} Handler
 * @property {(event: Event) => void} onClick
 * @property {(event: Event) => boolean} onHover
 */
```

## Configuration

### JSConfig.json for Editor Integration

Create a jsconfig.json file in your project root:

```json
{
  "compilerOptions": {
    "checkJs": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Using // @ts-check Comment

For file-specific checking, add this to the top of your JavaScript files:

```javascript
// @ts-check

/**
 * @param {string} name
 */
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet(42); // TypeScript error: Argument of type 'number' is not assignable to parameter of type 'string'
```

## Best Practices

### When to Use JSDoc

1. **Only add JSDoc when necessary**:
    
    - For function parameters and return types
    - For complex object structures
    - For variables where type inference fails
2. **Don't document the obvious**:
    
    ```javascript
    // Unnecessary
    /** @type {string} */
    const name = "Alice";
    
    // Necessary (type not obvious from initialization)
    /** @type {Record<string, User>} */
    const userMap = {};
    ```
    

### Separate Type Definitions

For complex projects, create a separate `types.js` file:

```javascript
// types.js
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} price
 */

export {};
```

Then import these types in your other files:

```javascript
// user-service.js
// @ts-check

/**
 * @typedef {import('./types').User} User
 */

/**
 * @param {string} id
 * @returns {Promise<User>}
 */
async function getUser(id) {
  // Implementation
}
```

### Use Type Inference Where Possible

Let TypeScript's inference do the work when possible:

```javascript
// TypeScript can infer the array type
const numbers = [1, 2, 3];

// TypeScript can infer the return type
function double(x) {
  return x * 2;
}

// But parameters usually need annotation
/**
 * @param {number} x
 */
function triple(x) {
  return x * 3;
}
```

### Use Module Documentation

Document modules with the `@module` tag:

```javascript
/**
 * User management utilities.
 * 
 * @module user-utils
 */

/**
 * Formats a user's full name.
 * 
 * @param {Object} user - The user object
 * @param {string} user.firstName - First name
 * @param {string} user.lastName - Last name
 * @returns {string} Formatted name
 */
export function formatName(user) {
  return `${user.firstName} ${user.lastName}`;
}
```

### Progressive Enhancement

Start with basic JSDoc and gradually enhance as needed:

1. Start with function parameters and return types
2. Add typedefs for complex objects
3. Enable strict checking in jsconfig.json
4. Add more specific type annotations where errors occur