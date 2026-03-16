# PRD Base

## 1. Vision del producto

Hazlo tu mismo es una plataforma de acompañamiento para construir soluciones digitales con no code e IA entre un asesor y un cliente. El valor principal no es solo vender sesiones, sino convertir cada proyecto en un proceso visible, ordenado y medible.

## 2. Objetivo del negocio

Crear una plataforma que permita:

- Vender sesiones de trabajo especializadas.
- Gestionar el avance de proyectos digitales con claridad.
- Aumentar la confianza del cliente mediante trazabilidad.
- Estandarizar la operacion del servicio.

## 3. Problemas a resolver

- El cliente no tiene visibilidad clara del avance.
- El asesor opera con herramientas fragmentadas.
- Las sesiones no siempre quedan conectadas con tareas y resultados.
- La evidencia del trabajo realizado se pierde entre chats, notas y archivos.
- El proceso comercial y operativo depende demasiado de seguimiento manual.

## 4. Usuarios y necesidades

### Cliente

Necesita entender en que va su proyecto, que tareas se hicieron, que falta, cuantas sesiones tiene y cuales fueron los resultados de cada encuentro.

### Asesor

Necesita un espacio donde gestionar tareas, preparar sesiones, registrar avances, subir evidencia y mantener alineado al cliente.

### Administrador

Necesita ver proyectos, compras, sesiones ejecutadas, estado operativo y posibles bloqueos.

## 5. Casos de uso principales

1. Un cliente compra un paquete de sesiones para construir un proyecto.
2. Se crea un proyecto con objetivos y alcance inicial.
3. Cliente y asesor trabajan con un tablero de tareas compartido.
4. El cliente agenda una sesion disponible.
5. La plataforma genera el enlace de videollamada.
6. Al terminar la sesion se registran notas, acuerdos y proximos pasos.
7. Se adjunta evidencia a las tareas realizadas.
8. El cliente revisa su avance y el saldo de sesiones.

## 6. Alcance MVP

### Incluye

- Login y gestion de roles.
- Creacion y visualizacion de proyectos.
- Membresia a proyectos entre asesor y cliente.
- Tablero Kanban por proyecto.
- Tareas con descripcion, estado, fecha, responsable y evidencia.
- Paquetes de sesiones y compra online.
- Reserva de sesiones disponible para el cliente.
- Creacion de evento con enlace de Google Meet.
- Registro de notas y resultado por sesion.
- Vista de historial de actividad del proyecto.

### No incluye

- Marketplace de multiples asesores.
- Chat en tiempo real tipo mensajeria.
- Automatizaciones avanzadas de IA.
- Integracion completa con Zoom desde la primera version.
- Facturacion compleja multi pais.

## 7. Reglas del negocio

- Un proyecto pertenece a un cliente y tiene al menos un asesor asignado.
- Solo se pueden reservar sesiones si el cliente tiene saldo disponible.
- Cada sesion consume una unidad o una duracion definida del paquete comprado.
- Las tareas deben quedar asociadas a un proyecto.
- La evidencia puede ser archivo, enlace, nota o checklist completado.
- Una sesion finalizada debe poder dejar acuerdos y tareas siguientes.

## 8. Flujo principal

1. El administrador o asesor crea el proyecto.
2. El cliente recibe acceso.
3. El cliente compra un paquete de sesiones.
4. El cliente agenda una sesion.
5. La plataforma crea el evento con videollamada.
6. Se ejecuta la sesion.
7. El asesor actualiza tareas y evidencia.
8. El cliente revisa progreso y siguientes pasos.

## 9. Modulos funcionales

### Autenticacion

- Registro e inicio de sesion.
- Recuperacion de contraseña.
- Perfil basico y rol.

### Proyectos

- Crear proyecto.
- Editar objetivo, descripcion y estado.
- Ver miembros, progreso y sesiones asociadas.

### Kanban

- Columnas base configurables.
- Crear, mover y completar tareas.
- Comentarios y evidencia por tarea.

### Sesiones

- Catalogo de paquetes.
- Compra con Stripe.
- Reserva por disponibilidad.
- Enlace Meet y estado de la sesion.
- Notas post sesion.

### Administracion

- Ver proyectos activos.
- Ver compras y saldo de sesiones.
- Revisar sesiones pendientes, realizadas y canceladas.

## 10. Modelo de datos inicial

### Usuario y relacion

- User
- Profile
- Role
- ProjectMember

### Operacion del proyecto

- Project
- Board
- Task
- TaskComment
- TaskEvidence

### Comercial y sesiones

- SessionPackage
- Purchase
- Session
- SessionNote
- Payment

## 11. KPIs iniciales

- Conversion de visita a compra.
- Proyectos activos por asesor.
- Porcentaje de sesiones ejecutadas vs compradas.
- Tiempo promedio de avance de una tarea.
- Tareas completadas por proyecto.
- Retencion de clientes por recompra de sesiones.

## 12. Riesgos y mitigaciones

### Riesgo

Demasiado alcance desde la primera version.

### Mitigacion

Concentrar el MVP en un solo tipo de asesor, una sola integracion de videollamada y un flujo comercial simple.

### Riesgo

Complejidad de agenda y disponibilidad.

### Mitigacion

Iniciar con una agenda controlada por slots configurados por el asesor.

### Riesgo

Dificultad para demostrar valor al cliente.

### Mitigacion

Priorizar historial, evidencia y resumen visible del progreso.

## 13. Definicion de exito del MVP

El MVP sera exitoso si un cliente puede comprar sesiones, reservarlas, ejecutar trabajo con su asesor y ver evidencia real del avance del proyecto sin depender de herramientas externas.
