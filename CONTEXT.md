# CONTEXT

Fecha: 2026-03-30

## Progreso completado

- Discover ya consume datos reales desde acciones agregadas, sin hardcode de negocio en componentes.
- Se integraron en Discover:
  - Cursos destacados desde courses.
  - Rutas destacadas desde career-paths.
  - Continuar aprendiendo desde enrollments.
  - Guardados recientes desde bookmarks.
  - Evaluaciones recientes desde assessments.
- Feature enrollments migrada de scaffold basico a implementacion por capas:
  - Entidad rica en domain.
  - Contrato de repositorio con metodos de negocio (getByUserId).
  - Use case unificado manage-enrollment con validaciones.
  - Mapper en data/mappers.
  - Datasource mock en data/datasources/mock.
  - Actions en presentation/states para consumo en discover.
- Feature bookmarks migrada de scaffold basico a implementacion por capas:
  - Entidad rica en domain.
  - Contrato de repositorio con metodos de negocio (getByUserId).
  - Use case unificado manage-bookmark con validaciones.
  - Mapper en data/mappers.
  - Datasource mock en data/datasources/mock.
  - Actions en presentation/states para consumo en discover.
- Feature assessments migrada de scaffold basico a implementacion por capas:
  - Entidad rica en domain.
  - Contrato de repositorio con metodos de negocio (getByUserId/getByCourseId).
  - Use case unificado manage-assessment con validaciones.
  - Mapper en data/mappers.
  - Datasource mock en data/datasources/mock.
  - Actions en presentation/states.
- Feature preferences migrada de scaffold basico a implementacion por capas:
  - Entidad rica en domain.
  - Contrato de repositorio con metodos de negocio (getByUserId).
  - Use case unificado manage-preference con validaciones.
  - Mapper en data/mappers.
  - Datasource mock en data/datasources/mock.
  - Actions en presentation/states (lectura y guardado/upsert de preferencias).
- Datasource mock completado para auth y discover (consistencia de mocking en features activas).
- Cobertura de rutas de pantallas de Nexus Academy:
  - Se implementaron rutas equivalentes para todas las paginas detectadas (normalizadas) en src/app.
  - Rutas sin feature migrada aun (briefs/collections/leaderboard y derivados) quedaron con pantalla placeholder de migracion.
- Home principal alineada visualmente a Nexus Academy (saludo + subtitulo + 3 metricas principales) en discover.
- Home principal ajustada a variante 1 estricta de Nexus (solo saludo, subtitulo y 3 metricas, sin bloques extra).
- Se implemento App Shell global con header + sidebar + footer para alinear estructura de navegacion con Nexus.
- Se agregaron rutas de navegacion del sidebar/footer que faltaban (tutorials, arcade, glossary, showcase, certifications, salary-explorer, jobs, terms, privacy, contact) con placeholder de migracion cuando aplica.
- Se elevaron pantallas clave para mayor paridad visual con Nexus:
  - courses ahora incluye cabecera/subtitulo, bloque de controles, grid de 3 columnas, CTA inferior y FAQ expandible.
  - history paso de lista simple a layout tipo historial con cards, metadatos y estados vacios.
  - search paso de listado plano a resultados con cabecera, barra de busqueda, tabs y estado sin resultados.
  - settings adopto cabecera y copy alineados a Nexus sobre la feature de preferencias.
  - briefs dejo de usar placeholder generico y ahora renderiza grid visual alineado para fase de integracion funcional.
  - history se acerco aun mas al original de Nexus incorporando Tabs de navegacion/busquedas y estructura por secciones.
  - collections y collections/[id] dejaron de usar placeholder y ahora muestran layouts funcionales tipo Nexus con listado y detalle.
  - leaderboard ya no usa placeholder y muestra encabezado y estructura base equivalente a Nexus.
  - header global alineado al patron visual de Nexus (capa fija superior, boton Explore, trigger de busqueda y acciones auth consistentes).
  - shell y sidebar ajustados para header fijo (offset en contenido principal + header spacer en sidebar), eliminando solapamientos.
  - se corrigio doble compensacion vertical del header en shell para evitar espacio extra superior.
  - se implemento overlay de busqueda del header con atajo Ctrl/Cmd+K y trigger movil/escritorio.

## Partes incompletas

- payload por feature para enrollments/bookmarks/career-paths/resources: pendiente de definir colecciones cuando se migre de mocks a Payload real.
- payload por feature para assessments/preferences: pendiente de definir colecciones cuando se migre de mocks a Payload real.
- vistas dedicadas de enrollments/bookmarks (screens/rutas app): pendientes si se requiere navegacion propia mas alla de discover.
- vistas dedicadas de assessments/preferences (screens/rutas app): pendientes si se requiere navegacion propia.
- Migracion funcional completa (logica de negocio, no solo ruta) pendiente para briefs, collections y leaderboard.
- Paridad visual exacta 1:1 aun pendiente en varias rutas secundarias (collections, leaderboard y subrutas relacionadas) y en interacciones avanzadas de Nexus (historial de busquedas completo, colecciones drag & drop, etc.).

## Notas de validacion

- Lint global del repositorio tiene errores preexistentes en __tmp__/nexus-academy fuera del alcance de esta migracion.
- Lint focalizado en archivos modificados de enrollments/bookmarks/discover: OK (sin errores).
- Lint focalizado en archivos modificados de assessments/preferences: OK (sin errores).
- Lint focalizado en rutas agregadas + auth/discover mocks + ajustes de career-paths: OK (sin errores).
- Lint focalizado de shell global + discover + rutas app: OK (sin errores).
- Verificacion de cobertura de rutas normalizadas de Nexus: ALL_COVERED.
