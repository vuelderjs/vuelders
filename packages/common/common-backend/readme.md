# @vuelder.js/common-backend

Common utilities for vuelders modules.

## Installation

To install the package, use the following command:

```bash
npm install @vuelder.js/common-backend
```

## Usage

Import the following components from the package:

```javascript
import { BaseMutations, BaseQueries, BaseRepository, BaseService, JWT } from '@vuelder.js/common-backend';
```

### BaseQueries

The `BaseQueries` class provides methods for executing common queries. It requires the following parameters:

- `name` (string): The name of the queries.
- `input` (object): An object with the following keys: `fetchService`, `findByIdService`, and `paginateService`. These keys should correspond to the respective service functions for fetching, finding by ID, and paginating data.
- `middlewares` (object, optional): An object with optional middleware functions for each query.

Example usage:

```javascript
const queries = new BaseQueries('Example', {
  fetchService: async () => {
    // Implementation for fetching data
  },
  findByIdService: async (id) => {
    // Implementation for finding data by ID
  },
  paginateService: async (input) => {
    // Implementation for paginating data
  }
});
```

### BaseMutations

The `BaseMutations` class provides methods for executing common mutations. It requires the following parameters:

- `name` (string): The name of the mutations.
- `input` (object): An object with the following keys: `createOneService`, `updateService`, and `deleteByIdService`. These keys should correspond to the respective service functions for creating, updating, and deleting data.
- `middlewares` (object, optional): An object with optional middleware functions for each mutation.

Example usage:

```javascript
const mutations = new BaseMutations('Example', {
  createOneService: async (input) => {
    // Implementation for creating data
  },
  updateService: async (id, upgrade) => {
    // Implementation for updating data
  },
  deleteByIdService: async (id) => {
    // Implementation for deleting data by ID
  }
});
```

### BaseRepository

The `BaseRepository` class provides methods for interacting with the underlying data model. It requires the following parameter:

- `Model` (mongoose.Model): The Mongoose model representing the data.

Example usage:

```javascript
const repository = new BaseRepository(ExampleModel);
```

The following methods are available:

- `findById(id)`: Find a document by ID.
- `find(query)`: Find documents based on a query.
- `findOne(query)`: Find a single document based on a query.
- `findByIdAndDelete(id)`: Find a document by ID and delete it.
- `findByIdAndUpdate(id, upgrade)`: Find a document by ID and update it.
- `paginate(query, options)`: Paginate documents based on a query and pagination options.
- `create(doc)`: Create a new document.

### BaseService

The `BaseService` class provides a high-level abstraction for performing common operations on the data. It requires the following parameters:

- `repository` (BaseRepository): An instance of the `BaseRepository` class.
- `filters` (function, optional): A function that takes a query and additional filters and returns a modified query.

Example usage:

```javascript
const service = new BaseService(repository, filters);
```

The following methods are available:

- `findById(id)`: Find a document by ID.
- `find(query)`: Find documents based on a query.
- `paginate(options)`: Paginate documents based on pagination options.
- `fetch()`: Fetch all documents.
- `update(id, upgrade)`: Update a document by ID.
- `deleteById(id)`: Delete a document by ID.
- `createOne(doc)`: Create a new document.

### JWT

The `JWT` class provides JWT token generation and verification functionalities. It requires the following parameters:

- None

Example usage:

```javascript
const jwt = new JWT();
```

The following methods are available:

- `generateToken(payload)`: Generate a JWT token based on the provided payload.
- `verifyToken(token)`: Verify the validity of a JWT token.

Make sure to set the `JWT_SECRET_KEY` and `JWT_REFRESHTOKEN_EXPIRED_IN` environment variables before using the `JWT` class.

## License

This package is licensed under the ISC License.