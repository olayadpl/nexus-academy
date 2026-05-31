# Nexus Academy — Plataforma de Aprendizaje Virtual

Nexus Academy es una plataforma de e-learning moderna e interactiva diseñada para ofrecer una experiencia educativa personalizada. Su propósito es facilitar el aprendizaje continuo mediante un catálogo estructurado de cursos, rutas de aprendizaje, evaluaciones interactivas y herramientas de productividad académica como un tutor de IA, generación automática de resúmenes y gamificación con rachas de estudio. Está construida sobre una arquitectura modular con Next.js y Payload CMS, priorizando la escalabilidad, la accesibilidad y una experiencia de usuario fluida tanto en escritorio como en dispositivos móviles.

## Actores del sistema

| Actor | Descripción |
|-------|-------------|
| Visitante | Usuario no registrado que puede navegar por el catálogo público de cursos y visualizar la página de inicio, pero no puede acceder a contenido protegido ni a funcionalidades personalizadas. |
| Estudiante | Usuario registrado y autenticado que puede inscribirse en cursos, realizar evaluaciones, tomar notas, guardar marcadores, consultar al tutor de IA y acceder a su progreso personal. |
| Profesor | Usuario con permisos de creación y gestión de contenido educativo: puede crear, editar, publicar y eliminar cursos, módulos, cuestionarios y archivos adjuntos. |
| Administrador | Usuario con control total sobre la plataforma: gestiona usuarios, roles, banners promocionales, certificados, notificaciones y la configuración general del sistema. |

---

## IV.2.1 Requisitos funcionales

Un requisito funcional define los servicios, funciones o tareas específicas que el sistema debe ser capaz de ejecutar. Describe cómo debe reaccionar el software ante entradas particulares, qué datos debe procesar y qué resultados debe entregar.

| ID | Nombre | Descripción |
|----|--------|-------------|
| RF-01 | Registrar usuario | El sistema debe permitir a un visitante crear una cuenta nueva introduciendo un nombre, correo electrónico y contraseña válida. |
| RF-02 | Autenticar usuario | El sistema debe validar las credenciales introducidas por el usuario contra la base de datos para otorgar los permisos correspondientes a su rol. |
| RF-03 | Iniciar sesión | El sistema debe permitir a un usuario registrado acceder a su cuenta tras introducir correctamente su correo electrónico y contraseña. |
| RF-04 | Consultar perfil | El sistema debe mostrar al usuario autenticado sus datos personales, información académica, estadísticas de progreso y preferencias de cuenta. |
| RF-05 | Editar perfil | El sistema debe permitir al usuario modificar sus datos personales, foto de perfil y configuraciones de cuenta, guardando los cambios de forma segura. |
| RF-06 | Eliminar cuenta | El sistema debe permitir al usuario dar de baja su cuenta de forma definitiva, eliminando o anonimizando sus datos según las políticas de privacidad. |
| RF-07 | Crear curso | El sistema debe permitir al rol autorizado (profesor/administrador) registrar un nuevo curso introduciendo título, descripción, portada y configuración inicial. |
| RF-08 | Eliminar curso | El sistema debe permitir al rol autorizado dar de baja un curso existente, eliminando su contenido o archivándolo para que no esté disponible. |
| RF-09 | Editar Curso | El sistema debe permitir al rol autorizado modificar la información general, metadatos, imágenes de portada o configuraciones de un curso existente. |
| RF-10 | Publicar curso | El sistema debe cambiar el estado de un curso de "Borrador" a "Publicado" para que sea visible y accesible a los estudiantes de la plataforma. |
| RF-11 | Consultar curso | El sistema debe permitir a los usuarios buscar, visualizar la estructura, la descripción y los detalles informativos de un curso específico. |
| RF-12 | Crear módulo dentro de un curso | El sistema debe permitir organizar el curso estructurándolo en secciones o unidades, agregando nuevos módulos vacíos listos para contener recursos. |
| RF-13 | Eliminar módulo dentro de un curso | El sistema debe permitir borrar un módulo específico de un curso, solicitando confirmación previa debido a la pérdida del orden secuencial. |
| RF-14 | Editar módulo dentro de un curso | El sistema debe permitir modificar el título, la descripción, el orden secuencial o el estado de visibilidad de un módulo existente. |
| RF-15 | Crear cuestionario | El sistema debe permitir al profesor diseñar una evaluación de tipo test interactivo agregando preguntas, opciones de respuesta y asignando la clave correcta. |
| RF-16 | Eliminar cuestionario | El sistema debe permitir remover un cuestionario o evaluación previamente enlazado a un módulo o curso específico. |
| RF-17 | Editar cuestionario | El sistema debe permitir modificar las preguntas, las opciones de respuesta, el tiempo límite o el puntaje mínimo de aprobación de una evaluación. |
| RF-18 | Visualizar cuestionario | El sistema debe renderizar la interfaz interactiva del cuestionario en pantalla, mostrando las preguntas de forma clara y adaptada al dispositivo. |
| RF-19 | Adjuntar Archivo | El sistema debe permitir la carga y el almacenamiento físico de recursos multimedia (videos, PDFs, imágenes) dentro de los bloques de contenido de un módulo. |
| RF-20 | Descargar documento | El sistema debe permitir a los estudiantes descargar a sus dispositivos locales los archivos y documentos complementarios enlazados al curso. |
| RF-21 | Editar documento | El sistema debe permitir al creador del curso reemplazar, actualizar el nombre o modificar las propiedades de un archivo digital adjunto a la plataforma. |
| RF-22 | Buscar recurso | El sistema debe proveer un motor de búsqueda con filtros que localice rápidamente cursos, lecciones o materiales mediante palabras clave. |
| RF-23 | Guardar curso | El sistema debe permitir al estudiante añadir un curso a su sección personal de marcadores o lista de deseos para cursarlo o consultarlo más tarde. |
| RF-24 | Tomar notas | El sistema debe proveer un área de texto interactiva para que el estudiante redacte anotaciones personales mientras visualiza o analiza un recurso de estudio. |
| RF-25 | Eliminar notas | El sistema debe permitir al estudiante borrar de forma definitiva apuntes o notas específicas que haya tomado anteriormente. |
| RF-26 | Editar notas | El sistema debe permitir al estudiante modificar el texto y contenido de las notas guardadas en su bloc personal de la lección. |
| RF-27 | Consultar notas | El sistema debe desplegar un panel con el listado ordenado cronológicamente o por lección de todas las notas redactadas por el estudiante. |
| RF-28 | Calificar curso | El sistema debe permitir al estudiante asignar una puntuación (por ejemplo, mediante estrellas) y dejar una reseña textual al finalizar un curso. |
| RF-29 | Contabilizar racha de estudio | El sistema debe registrar los días consecutivos de acceso activo del estudiante e incrementar un contador de "racha" para incentivar la gamificación. |
| RF-30 | Generar transcripciones y resúmenes | El sistema debe procesar localmente mediante IA los recursos audiovisuales para generar y mostrar automáticamente su transcripción textual y un resumen estructurado. |
| RF-31 | Consultar tutor de IA | El sistema debe desplegar una interfaz de chat interactiva que responda dudas académicas del estudiante en tiempo real, basándose en el contexto del recurso. |
| RF-32 | Crear ruta de aprendizaje | El sistema debe permitir estructurar un mapa secuencial o camino pedagógico que agrupe varios cursos en un orden lógico para lograr un objetivo educativo. |
| RF-33 | Editar ruta de aprendizaje | El sistema debe permitir modificar la secuencia de cursos, añadir nuevos requisitos o cambiar la descripción de un camino de aprendizaje existente. |
| RF-34 | Eliminar ruta de aprendizaje | El sistema debe permitir borrar una ruta de aprendizaje del catálogo general de la plataforma. |
| RF-35 | Consultar ruta de aprendizaje | El sistema debe mostrar de forma gráfica e interactiva la ruta de aprendizaje elegida, detallando los cursos completados, en progreso y pendientes. |
| RF-36 | Consultar historial de navegación | El sistema debe listar de forma cronológica los últimos cursos, lecciones o recursos que el usuario ha visitado dentro de la plataforma. |
| RF-37 | Eliminar historial de navegación | El sistema debe permitir al usuario vaciar su registro de actividad reciente o eliminar entradas específicas de su historial de visualización. |
| RF-38 | Filtrado por categorías | El sistema debe segmentar el catálogo de contenido permitiendo agrupar y mostrar los cursos según temáticas, áreas de conocimiento o etiquetas específicas. |
| RF-39 | Responder cuestionario | El sistema debe procesar y capturar las selecciones que realiza el estudiante durante la evaluación al pulsar el botón de envío de respuestas. |
| RF-40 | Consultar resultados del cuestionario | El sistema debe calcular la nota final inmediatamente después del envío, mostrando las respuestas correctas, los fallos y si se aprobó la evaluación. |
| RF-41 | Recuperar contraseña | El sistema debe permitir al usuario solicitar el restablecimiento de su clave mediante el envío seguro de un enlace o código único a su correo electrónico. |
| RF-42 | Generar certificado de finalización | El sistema debe expedir de forma automática un documento digital con identificador único cuando el estudiante complete el 100% de los requisitos del curso. |
| RF-43 | Descargar certificado de finalización | El sistema debe habilitar un botón de descarga para obtener el certificado generado en formato PDF de alta calidad. |
| RF-44 | Visualizar notificaciones del sistema | El sistema debe alertar al usuario mediante un panel integrado sobre eventos clave como nuevos comentarios, cursos publicados, recordatorios o mensajes. |
| RF-45 | Crear banner promocional | El sistema debe permitir al administrador subir imágenes de anuncios y configurar enlaces destacados para la sección principal de la plataforma. |
| RF-46 | Editar banner promocional | El sistema debe permitir modificar el diseño gráfico, el texto, las fechas de vigencia o la redirección del enlace de un anuncio activo. |
| RF-47 | Mostrar banner promocional | El sistema debe renderizar los banners configurados en carruseles o zonas estratégicas de la interfaz de inicio para todos los usuarios. |
| RF-48 | Eliminar banner promocional | El sistema debe retirar de forma permanente o desactivar la visualización de un anuncio publicitario en los paneles de la interfaz. |
| RF-49 | Cerrar sesión | El sistema debe destruir de manera segura los tokens de autenticación o la sesión activa del usuario, impidiendo accesos posteriores sin loguearse de nuevo. |

## IV.2.2 Requisitos no funcionales

Los requisitos no funcionales definen los atributos de calidad, restricciones, rendimiento y propiedades del sistema. No se traducen en un botón o una pantalla concreta, sino en el comportamiento global de la plataforma.

### IV.2.2.1 Rendimiento

- **RNF-01:** El sistema debe cargar las páginas de texto y navegación general en un tiempo máximo de 2 segundos. Las peticiones a la base de datos para cargar la estructura de un curso no deben exceder los 800 milisegundos.
- **RNF-02:** El sistema debe soportar hasta 200 usuarios interactuando simultáneamente en la plataforma sin sufrir degradación en los tiempos de respuesta del servidor ni pérdida de paquetes de datos.

### IV.2.2.2 Seguridad

- **RNF-03:** Todos los datos sensibles de los usuarios (especialmente contraseñas) deben ser encriptados en la base de datos utilizando algoritmos de hashing seguros como Bcrypt o Argon2id antes de ser almacenados.
- **RNF-04:** La autenticación de usuarios deben gestionarse mediante tokens seguros (como JWT u tokens basados en base de datos). Estos tokens deben viajar de forma cifrada mediante cookies HttpOnly y Secure para mitigar ataques de tipo XSS y CSRF.
- **RNF-05:** Todo el tráfico de datos entre el cliente (interfaz web) y el servidor debe realizarse obligatoriamente bajo el protocolo seguro HTTPS empleando TLS 1.3.

### IV.2.2.3 Usabilidad

- **RNF-06:** La interfaz debe ser intuitiva, permitiendo que un estudiante nuevo localice un recurso de estudio, tome una nota o consulte al tutor de IA en menos de 3 clics desde su panel principal.
- **RNF-07:** El sistema debe notificar visualmente al usuario el estado de cualquier operación en segundo plano (como la carga de un archivo adjunto o el procesamiento de un resumen por la IA) mediante barras de progreso o indicadores de carga (spinners).

### IV.2.2.4 Accesibilidad

- **RNF-08:** Los elementos de la interfaz deben cumplir con las pautas de accesibilidad WCAG 2.1 nivel AA, garantizando que el texto normal mantenga un contraste visual mínimo de 4.5:1 respecto al fondo para facilitar la lectura prolongada.
- **RNF-09:** Todos los formularios, reproductores de contenido y componentes interactivos deben ser completamente accesibles y operables utilizando únicamente el teclado (tecla Tab, Flechas y Enter).

### IV.2.2.5 Apariencia

- **RNF-10:** El diseño de la interfaz debe mantener una estética limpia y consistente mediante el uso estricto de componentes atómicos basados en Shadcn/UI y utilidades de Tailwind CSS.
- **RNF-11:** El entorno debe integrar de forma nativa un sistema de cambio de tema dinámico, soportando tanto modo claro (Light Mode) como modo oscuro (Dark Mode) para reducir la fatiga visual del estudiante durante las jornadas de estudio nocturnas.

### IV.2.2.6 Compatibilidad

- **RNF-12:** La interfaz del entorno virtual de aprendizaje debe ser 100% responsiva (Mobile-First), adaptándose sin pérdida de información ni desbordamientos visuales a resoluciones desde 360px (móviles) hasta 1920px (monitores de escritorio).
- **RNF-12:** El sistema debe ser completamente compatible con las versiones más recientes de los navegadores web modernos basados en Chromium (Google Chrome, Microsoft Edge, Brave), así como con Mozilla Firefox y Safari, asegurando un comportamiento idéntico en sistemas operativos Windows, macOS y entornos Linux de escritorio o ligeros.
