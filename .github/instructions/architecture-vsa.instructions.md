---
applyTo: "src/features/**,payload.config.ts"
description: "Usar cuando se implemente o refactorice código por funcionalidades (slices), capas de Clean Architecture y configuración de Payload por feature."
---

# Clean + Vertical Slice (Reglas del repositorio)

## Estructura por slice

- Organizar por funcionalidades en src/features/[feature-name].
- El 90% del código debe vivir en src/features/.
- Cada feature debe contener:
  - domain/: entidades, contratos de repositorio y use cases.
  - data/: implementación (datasources, mappers, repositorios, payload).
  - presentation/: componentes, screens y states de presentación.

## Regla de naming de capas

- Usar data como nombre de la capa de implementación.
- No usar infrastructure en este repositorio.

## Reglas de Payload por feature

- Definir colecciones en src/features/[feature]/data/datasources/payload/.
- En payload.config.ts solo importar y registrar colecciones por feature.
- No usar tipos de Payload dentro de domain/.

## Regla de mapeo

- Todo dato que venga de Payload debe pasar por data/mappers/.
- Domain y Presentation no consumArchivados
10
￼
myFlorecita￼￼:)￼
3:38 p.m.
0:22
Sucio￼￼
1:24 p.m.
a ti￼
￼
negrah￼￼
(Tú)
domingo
￼ Trenes ￼ Lunes 18 de Mayo  ￼ 19 de Mayo ￼Habana - Santiago de cuba ￼Bayamo_Mzllo - Habana ￼ 20 de Mayo ￼ Habana - Holguin ￼ Martes 19 de Mayo ￼ 22 de Mayo  ￼ Holguin - Habana ￼ 24 de Mayo  ￼ Guantanamo - Habana ￼ Miércoles 20 de Mayo  ￼ 25 de Mayo ￼ Habana-Bayamo_Mzllo  ￼ Santiago de Cuba - Habana ￼ 26 de Mayo ￼ Habana - Guantanamo  ￼ Jueves 21 de Mayo ￼ 27 de Mayo  ￼ Habana - Santiago ￼ Bayamo_Mzllo-Habana  ￼ Viernes 22 de Mayo ￼ 28 de Mayo  ￼ Habana - Holguin  ￼ 30 de Mayo  ￼ Holguin - Habana
￼
Luis Miguel UCI
9:33 a.m.
ah esta bien jj
￼
+53 5 9677173
Ayer
Ya lo borré
￼
Tata￼￼
Ayer
Si
￼
+53 5 8859818
Ayer
Invitación a grupo de WhatsApp
￼
Gretter
jueves
Ya está bien si eso déjalo para mañana si quieres , no te preocupes
￼
Lingulus￼￼
jueves
Sticker
￼
FEU_UCI Habana del Este
jueves
~Armando Leyva
: 
Foto
￼
￼
Facultad de Tecnologías Libres ￼￼
jueves
Cuarto Año Facultad de Tecnologías Libres ￼
~GINES
: 
Buenas tardes recuerden los del bloque 2 subír el documento para la defensa antes de las 11y55pm de hoy https://eva.uci.cu/mod/assign/view.php?id=36166
￼
My Life ￼￼
miércoles
boletin.pdf • 1 página
￼
Eber Uci￼￼️
martes
esas correcciones que te hicieron es para cuando te presentes para la defensa no tengas esos errores
￼
Dad ￼￼
lunes
Reaccionaste con ￼ a:
 
"
Foto"
￼
Suegro￼
lunes
Ya pudimos sacar pasaje
￼
Hermana￼￼
domingo
Reaccionó con ￼ a:
 
"
Puti felicidades mi vida ￼"
￼
￼
Grupos 1404
16/5/2026
GRUPO 1404 ￼￼
Leslo Uci
: 
La graduación en la habana es el 9 julio
￼
Mom￼￼
15/5/2026
Foto
+53 5 4319928
14/5/2026
+53 5 4319928 usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
Nayi￼￼￼
11/5/2026
Nayi￼￼￼ usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
María Osle
10/5/2026
María Osle usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
zorrita La
10/5/2026
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
Lina￼
10/5/2026
https://www.facebook.com/share/v/184h7rxf6b/
￼
Mediaceja
10/5/2026
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
Chanel￼
10/5/2026
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
My Amiguis/Rizos ￼￼
10/5/2026
Reaccionaste con ￼ a:
 
"
Audio"
￼
Facultad de Tecnologías Libres ￼￼
10/5/2026
+53 5 3232989
: 
Desde la Facultad de Tecnologías Libres les deseamos muchas felicidades a todas las madres en su día. ¡Pásenla bien! ￼￼
￼
Yeni Tía
10/5/2026
Yeni Tía usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
Osle￼￼￼
10/5/2026
Osle￼￼￼ usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
Mayra
1/5/2026
Mayra usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
+53 5 4817936
1/5/2026
+53 5 4817936 usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
Yosdan
1/5/2026
Yosdan activó los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
Kevin Edif
27/4/2026
Kevin Edif usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
my black ￼￼
26/4/2026
A ya
￼
Claudia 105 UCI
25/4/2026
Claudia 105 UCI usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
Suegris￼￼￼
22/4/2026
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
Vladimir Tio
20/4/2026
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
Iroel ￼￼￼
20/4/2026
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
William UCI
4/4/2026
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
Carlos Aula Uci
27/3/2026
Gracias ￼
￼
Salomé 105 UCI
￼
Iris Maikel
￼
￼
Grupos 1404
18/2/2026
Aprendizaje Automático 1404
Carlos Aula Uci
: 
Dígame profe
￼
Alamar Guagua UCI
14/2/2026
Añadiste a 
William UCI
.
￼
Grupos 1404
30/1/2026
GPI 1404
Leonel UCI
: 
Sticker
￼
TD 25_26￼
28/1/2026
+53 5 4243414
: 
Sticker
English. Level A2.1
27/1/2026
+53 5 4022981
: 
Así es. Gracias ￼
Arrastre de BD
26/1/2026
+53 5 6446318
: 
Nos vemos a la 1 en los lab
Family
23/1/2026
My Life ￼￼
 te añadió.
￼
Cuñi ￼￼
￼
+53 63178761
24/12/2025
Activaste los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
Ale￼￼
13/12/2025
Ale￼￼ usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
￼
Grupos 1404
11/12/2025
Redes 404
+53 5 9032708 fijó un mensaje.
IoT2025
11/12/2025
+53 5 1862313
: 
Ok
ECTS 1404
9/12/2025
Tú
: 
@+53 5 5347530 buenos dias profe , se va a dar el turno de hoy
￼
109 101￼
martes
Salomé 105 UCI
 salió del grupo.
..
28/11/2025
Añadiste a 
Luis Miguel UCI
.
￼
￼
Grupos 1404
20/10/2025
Redes￼
Leonel UCI
: 
Se eliminó este mensaje.
￼
Merci Prima
￼
Grupos 1404
2/10/2025
Leslo Uci
 ahora es admin. de la comunidad.
￼
￼
Grupos 1404
11/12/2025
GPI
Leslo Uci
 se unió desde la comunidad.
Jefe de aptos.E 111,109,112.
Ayer
Iris UCI cambió su número de teléfono.
Dad ￼￼
6/9/2025
Dad ￼￼ usa una duración predeterminada para los mensajes temporales en chats nuevos. Los mensajes nuevos desaparecerán de este chat después de 7 días de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para establecer la duración predeterminada que desees.
￼
Terry￼￼￼￼
5/9/2025
Terry￼￼￼￼ activó los mensajes temporales. Los mensajes nuevos desaparecerán de este chat después de 24 horas de haber sido enviados, a menos que se use la opción para conservarlos. Haz clic para cambiar esto.
￼
￼
Grupos 1404
26/6/2025
ISW 1304
Eber Uci￼￼️
: 
notas finales x correo
￼
￼
Grupos 1404
19/6/2025
PWEB 1304
Leonel UCI
: 
@~Miguel López revise el privado
￼
Ale￼￼️
￼
￼
Grupos 1404
3/5/2024
SBD2 GRUPO 1304
negrah￼￼
 te añadió a un grupo en la comunidad Grupos 1404
Tus mensajes personales están cifrados de extremo a extremo.
￼
myFlorecita￼￼:)￼
en línea
￼
￼
￼
Haz clic aquí para obtener mensajes anteriores de tu teléfono.
Hoy
JPG
IMG_1539.JPG
JPG•68 kB
3:24 p.m.
￼
0:07
￼
1
￼
3:25 p.m.
￼
0:19
￼
1
￼
3:25 p.m.
￼
0:20
￼
1
￼
3:26 p.m.
yo lo tenia en mi telefono
3:26 p.m.
￼
0:10
￼
1
￼
3:26 p.m.
￼
0:12
￼
1
￼
3:27 p.m.
￼
0:09
￼
1
￼
3:28 p.m.
￼
0:07
￼
1
￼
3:29 p.m.
￼
0:36
￼
1
￼
3:30 p.m.
￼
0:12
￼
1
￼
3:30 p.m.
￼
0:10
￼
1
￼
3:31 p.m.
y por que no fuiste alla a casa de tu hermana amor
3:31 p.m.
te pesaste?
3:31 p.m.
tienes dinero?
3:31 p.m.
￼
0:07
￼
1
￼
3:32 p.m.
￼
0:02
￼
1
￼
3:32 p.m.
ah no bajaste de peso entonces
3:32 p.m.
menos mal jj, tienes que hacer ejercicios entonces
3:32 p.m.
aqui a mejorado bastante esto
3:32 p.m.
￼
0:11
￼
1
￼
3:32 p.m.
￼
0:02
￼
1
￼
3:33 p.m.
￼
0:13
￼
1
￼
3:33 p.m.
￼
0:32
￼
1
￼
3:34 p.m.
￼
0:27
￼
1
￼
3:34 p.m.
￼
0:37
￼
1
￼
3:35 p.m.
yo oi algo de esoen documentos de Payload directamente.

## Comunicación entre slices

- Si una feature necesita datos de otra, hacerlo mediante contratos de repositorio (domain).
- Nunca acceder directamente al data/ de otra feature.

## Use cases CRUD

- Para CRUD de una misma entidad, preferir un use case unificado en un archivo (ejemplo: manage-course.ts).
- Evitar dispersar create/update/get/delete de la misma entidad en múltiples use cases separados, salvo justificación fuerte.

## Convenciones adicionales

- Componentes base compartidos en src/core/ui/components.
- Utilidades compartidas de UI en src/core/ui/lib/utils.
- Server actions deben mapear errores de dominio (Failure) a errores de aplicación (AppError).
