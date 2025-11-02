# Etapa de construcción
FROM node:lts AS build

# Habilitar corepack para usar pnpm sin instalación extra
RUN corepack enable

# Definir variables de entorno para pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

# Copiar archivos de lock para aprovechar cache de Docker
COPY pnpm-lock.yaml ./
COPY package.json ./

# Descargar las dependencias según lockfile (cacheable)
RUN --mount=type=cache,target=/pnpm/store pnpm fetch --frozen-lockfile

# Instalar solo dependencias necesarias para build
RUN --mount=type=cache,target=/pnpm/store pnpm install --frozen-lockfile

# Copiar el resto de la app
COPY . .

# Construir la app
RUN pnpm build

# Etapa de producción
FROM node:lts-alpine AS production

# Crear un usuario no root para mejor seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiar node_modules y dist desde build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV NODE_OPTIONS="--enable-source-maps"

# Usar usuario no root
USER appuser

# Entrada a la app
CMD ["node", "dist/main.js"]
