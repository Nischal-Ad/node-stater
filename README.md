## After Installing

### Config.env

create config.env in src->config with following credentials:

```bash
DB_URI= 'here gores databasae url'
PORT= 3000
FRONTEND_URL= 'here goes frontend url'

JWT_SECRET= 'here goes jwt secret key'
JWT_EXPIRES_IN= '7d'
```

### CORS

if you need  to listen in specific url by cors than in above config file specify your frontend url to FRONTEND_URL. if not cors will listen to all url


or if it doesnot work than replace cors origin code with this:

```bash
origin: process.env.FRONTEND_URL
? process.env.FRONTEND_URL
: 'http://localhost:5173',
```

### Package.json

if needed change package name and its description in package.json
