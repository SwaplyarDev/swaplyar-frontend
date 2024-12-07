````markdown
# 💪 Contribuir al Proyecto

Gracias por tu interés en contribuir al proyecto **SwaplyAr**. Este documento describe los pasos recomendados para agregar nuevas funcionalidades, corregir errores y colaborar de manera efectiva.

---

## 📝 Reglas Básicas

1. **Mantén la Rama Base Limpia**: La rama `developer` es el punto de integración para nuevos cambios, por lo que solo debe incluir código revisado y aprobado.
2. **Crea Ramas Temáticas**: Trabaja siempre en una rama independiente creada a partir de `developer`.
3. **Sigue las Normas de Codificación**: Asegúrate de que tu código cumple con los estándares del proyecto utilizando las herramientas integradas (linting, formateo, pruebas).
4. **Documenta los Cambios**: Incluye descripciones claras en tus commits y Pull Requests (PR).

---

## 🚀 Guía de Contribución

### 1. Actualiza tu Rama `developer` Local

Antes de comenzar, asegúrate de que tu copia local de `developer` esté sincronizada con el repositorio remoto:

```bash
git checkout developer
git pull origin developer
```
````

---

### 2. Crea una Nueva Rama para tu Trabajo

Genera una nueva rama basada en `developer` para realizar tus cambios:

```bash
git checkout -b feature/nueva-funcionalidad  # Para nuevas características
git checkout -b fix/bug-descripcion         # Para correcciones de errores
```

---

### 3. Realiza los Cambios en el Código

Haz las modificaciones necesarias, asegurándote de mantener un código limpio y documentado.

---

### 4. Verifica y Prueba el Código

Antes de confirmar tus cambios, realiza las siguientes verificaciones:

```bash
npm run lint       # Analiza el código para detectar errores de estilo
npm run build --clean  # Compila el proyecto para verificar que no haya errores
npm run format     # Aplica el formato definido en el proyecto
```

---

### 5. Confirma y Sube tus Cambios

Cuando estés satisfecho con los cambios, confirma y sube la rama al repositorio remoto:

```bash
git add .                                 # Añade los archivos modificados
git commit -m "Descripción clara de los cambios realizados"
git push origin feature/nueva-funcionalidad
```

---

### 6. Crea un Pull Request (PR)

Crea un PR para que tus cambios sean revisados e integrados en `developer`. Puedes hacerlo desde GitHub o usando la CLI de GitHub:

```bash
gh pr create --base developer --head feature/nueva-funcionalidad --repo git@github.com:SwaplyAr/swaplyar-frontend.git --title "Título del PR" --body "Descripción detallada de los cambios"
```

> **Nota**: Asegúrate de incluir una descripción detallada en el PR para facilitar la revisión.

---

### 7. Mantén tu Rama Actualizada

Mientras esperas la revisión de tu PR, mantén tu rama sincronizada con `developer`:

```bash
git checkout developer
git pull origin developer
git checkout feature/nueva-funcionalidad
git rebase developer
```

Si encuentras conflictos durante el rebase, resuélvelos manualmente:

```bash
git add .                       # Añade los archivos con conflictos resueltos
git rebase --continue           # Continúa el rebase
```

---

### 8. Sube los Cambios Actualizados

Después de completar el rebase, sube tu rama nuevamente al repositorio remoto:

```bash
git push origin feature/nueva-funcionalidad --force-with-lease
```

---

### 9. Fusión del Pull Request

Una vez que tu PR sea aprobado:

1. **Fusiona el PR** a la rama `developer` utilizando la interfaz de GitHub.
2. **Actualiza tu Rama Local** después de la fusión:

```bash
git checkout developer
git pull origin developer
```

---

## 📢 Notas Finales

- **Responsabilidad del Contribuidor**: Asegúrate de que tus cambios sean probados y cumplan con los estándares del proyecto.
- **Colaboración**: Responde a los comentarios en tu PR de manera oportuna.
- **Documentación**: Si implementas una nueva funcionalidad, actualiza los archivos de documentación relacionados.

---

## 🎉 ¡Gracias por Contribuir!

Tu ayuda es invaluable para mejorar y hacer crecer **SwaplyAr**. Si tienes preguntas, no dudes en contactarnos. 😊

```

```
