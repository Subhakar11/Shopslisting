# Server

## Install & Run
```bash
cd server
cp .env.example .env
# Fill env vars, especially Mongo + Cloudinary + JWT_SECRET
npm install
npm run dev
```

## REST API
- **POST** `/api/auth/register` `{ name, email, password }`
- **POST** `/api/auth/login` `{ email, password }` → `{ token }`
- **GET** `/api/shops?includeProducts=true` → all shops with nested products
- **GET** `/api/shops/:id` → single shop with its products
- **POST** `/api/shops` *(auth, multipart)* fields: `name`, `description` (optional), file field `image`
- **PUT** `/api/shops/:id` *(auth, multipart)* fields like above; replace image if provided
- **POST** `/api/products` *(auth, multipart)* fields: `shopId`, `name`, `price`, `description` (optional), file `image`
- **PUT** `/api/products/:id` *(auth, multipart)* fields: `name`, `price`, `description`, file `image` (optional)
