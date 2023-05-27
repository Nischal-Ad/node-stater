## After Installing

### Config.env

create config.env in src->config with following credentials:

```bash
DB_URI= 'here gores databasae url'
PORT= 3000
FRONTEND_URL= 'here goes frontend url'

JWT_SECRET= 'here goes jwt secret key'
JWT_EXPIRES_IN= '7d'
JWT_COOKIE_EXPIRES_IN= 2
```

### Config.env

if needed change cors origin setting to listen in specific url in src->app.ts

### Package.json

if needed change package name and its description in package.json
