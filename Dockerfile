FROM node:24-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json backend/package-lock.json ./backend/
RUN npm ci && npm ci --prefix backend

COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src
COPY backend/tsconfig.json backend/tsconfig.build.json ./backend/
COPY backend/src ./backend/src
COPY backend/deployments ./backend/deployments
RUN npm run build && npm run build --prefix backend

FROM node:24-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/backend/node_modules ./backend/node_modules
COPY --from=build /app/backend/package.json ./backend/package.json
COPY --from=build /app/backend/deployments ./backend/deployments
RUN mkdir -p /app/data && chown node:node /app/data

EXPOSE 3000
USER node
CMD ["node", "backend/dist/main.js"]
