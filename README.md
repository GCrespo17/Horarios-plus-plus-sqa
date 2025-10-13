# Horarios PlusPlus

Generador y gestor de horarios universitarios. Permite:
- Cargar materias y secciones con sus sesiones (CRUD).
- Administrar eventos personales y cruzarlos con clases.
- Generar combinaciones de horarios sin choques.
- Guardar y visualizar el horario del usuario.
- Administrar permisos y roles de usuario.

Stack principal: React (SPA) + Elysia/Bun (API) + MongoDB.

## Estructura del repositorio

```
.
├─ horarios-plus-plus-client/   # Frontend (React + react-scripts)
│  ├─ src/Interfaces/           # Páginas/componentes principales (TSX + CSS)
│  └─ public/					# index.html, manifest, robots
├─ horarios-plus-plus-server/   # Backend (Elysia sobre Bun + Mongoose)
│  ├─ src/index.ts              # Bootstrap del servidor
│  ├─ .env                      # variables de entorno (no se versiona)
│  ├─ .env.example              # variables de entorno de ejemplo
│  ├─ src/controllers/db.ts     # Conexión a Mongo y modelos
│  ├─ src/models/               # Clases y esquemas
│  └─ src/routes/               # Rutas: subjects, sections, sessions, schedules, users, events
├─ package.json                 # Workspaces (client + server) y scripts de ayuda
├─ tsconfig.json
└─ biome.jsonc
```

Referencias rápidas de archivos relevantes:
- Cliente: `horarios-plus-plus-client/src/index.js`, `horarios-plus-plus-client/src/Interfaces/*.tsx`
- Servidor: `horarios-plus-plus-server/src/index.ts`, `horarios-plus-plus-server/src/routes/*.routes.ts`

## Prerrequisitos

- Bun 1.1+ (https://bun.sh)
- Node.js opcional (para tooling)
- MongoDB local en `mongodb://127.0.0.1:27017` (por defecto la DB usada es `horariospp`)

Puertos por defecto:
- API: http://127.0.0.1:4000
- Web: http://127.0.0.1:3000

La URI de Mongo se configura con la variable de entorno `MONGO_URI` en `horarios-plus-plus-server/.env` (ver `horarios-plus-plus-server/.env.example`). Si no se define, se usa `mongodb://127.0.0.1:27017/horariospp`.

Usuario administrador inicial (configurable por .env):
- Si `CREATE_ADMIN_ON_START=true` (por defecto), al iniciar el backend se asegura un usuario admin.
- Variables:
	- `ADMIN_EMAIL` (por defecto: Admin@gmail.com)
	- `ADMIN_PASSWORD` (por defecto: Admin)
	- `ADMIN_TYPE` (por defecto: 4, donde 4=admin)

## Instalación

Desde la raíz puedes instalar todo usando workspaces:

```powershell
# Instala dependencias de raíz, cliente y servidor
bun install
```

O por paquete:

```powershell
# Cliente
cd horarios-plus-plus-client
bun install

# Servidor
cd ../horarios-plus-plus-server
bun install
```

Crear archivo de entorno (.env) en el backend:

```powershell
# Dentro de horarios-plus-plus-server
Copy-Item .env.example .env
# Edita el valor de MONGO_URI en .env según tu entorno
```

## Ejecución en desarrollo

1) Asegura que MongoDB esté corriendo localmente.
2) Levanta el servidor (API):

```powershell
cd horarios-plus-plus-server
bun run dev   # watch mode, levanta en http://127.0.0.1:4000
```

3) En otra terminal, levanta el cliente (SPA):

```powershell
cd horarios-plus-plus-client
bun run start # abre http://127.0.0.1:3000
```

Atajos desde la raíz:

```powershell
# Cliente
bun run client

# Servidor (usa el script dev del paquete server)
bun run server
```

## Build

- Cliente (producción):

```powershell
cd horarios-plus-plus-client
bun run build
```

- Servidor: se ejecuta con Bun directamente (no requiere build para dev). Para un bundle básico:

```powershell
cd horarios-plus-plus-server
bun run build
```

## Endpoints principales (API)

Base URL: `http://127.0.0.1:4000`

- Schedules
	- `GET /api/schedules/generate_schedules?owner=:email&nrcs=:nrc1,nrc2,...`
	- `PUT /api/schedules/save_schedule?owner=:email&nrcs=:nrc1,nrc2,...`
	- `GET /api/schedule/get_schedule_from_owner?owner=:email`

- Subjects
	- `GET /api/subjects/get_subjects`
	- `GET /api/subjects/get_subject_from_nrc?nrc=:nrc`
	- `GET /api/subjects/create_subject?name=:name`

- Sections
	- `GET /api/section/get_sections_from_subject?subjectName=:name`
	- `GET /api/section/add_section_to_subject?nrc=:nrc&teacher=:docente&subjectName=:name`
	- `GET /api/section/update_section?oldnrc=:old&nrc=:new&teacher=:docente`
	- `DELETE /api/section/delete_section?nrc=:nrc&mail=:email`

- Sessions
	- `GET /api/session/get_sessions_from_section?nrc=:nrc`
	- `POST /api/session/add_session_to_section?nrc=:nrc&day=:d&start=:ms&end=:ms`
	- `GET /api/session/delete_session?nrc=:nrc&day=:d&start=:ms&end=:ms`

- Users
	- `GET /api/get_usuarios`
	- `PUT /api/update_users` (body JSON: `{ usuarios: [{ email, tipo }] }`)
	- `GET /api/sign_up?email=:email&password=:pwd`
	- `GET /api/login?email=:email&password=:pwd`
	- `DELETE /api/deleteUser?email=:email`

- Events
	- `GET /api/events/get_all_events`
	- `POST /api/events/create_event?name=:name`
	- `DELETE /api/events/delete_event?eventName=:name`

Nota: algunas rutas usan query params y otras esperan body JSON; revisa `src/routes/*.routes.ts` para detalles y validaciones.

## Flujo típico de uso

1. Crear materias y secciones (Subjects/Sections), y añadir sesiones (Sessions).
2. Generar combinaciones de horarios con `generate_schedules` a partir de NRCs.
3. Guardar el horario elegido con `save_schedule` para un usuario.
4. Consultar tu horario guardado (`get_schedule_from_owner`).
5. Crear eventos personales y verificar choques.

## Configuración útil

- Cambia la URI de Mongo en `horarios-plus-plus-server/.env` si no usas localhost.
- CORS y OpenAPI están habilitados en el servidor (plugins `@elysiajs/cors` y `@elysiajs/openapi`).

---

Proyecto inicializado con Bun. Si algo no coincide con tu entorno, abre un issue o ajusta los scripts en cada `package.json`.
