# Actividad 5.2 – Tarjeta de Producto en Angular

## 0. Investigación teórica

### 0.1 View Encapsulation (Encapsulación de Vista) en Angular

En Angular, **View Encapsulation** define cómo se aplican los estilos de un componente y si estos estilos afectan (o no) a otros componentes. Se configura en el decorador `@Component` mediante la propiedad `encapsulation`.

Angular tiene principalmente **tres modos**:

1. **Emulated (por defecto)**
   - Es el modo que Angular aplica automáticamente si no se especifica otro.
   - Angular modifica internamente los selectores del CSS y del HTML del componente, agregando atributos únicos, para simular el comportamiento del Shadow DOM.
   - **Efecto:**
     - Los estilos del componente se aplican solo a su propia plantilla.
     - No se “fugan” fácilmente a otros componentes.
     - Los estilos globales (por ejemplo, `styles.css`) sí pueden seguir afectando al componente.

2. **None**
   - Desactiva la encapsulación de estilos.
   - El CSS definido en el componente se inyecta como si fuera global.
   - **Efecto:**
     - Los estilos pueden afectar elementos fuera del componente.
     - Es útil cuando se quieren definir estilos realmente globales, pero puede generar conflictos si no se tiene cuidado.

3. **ShadowDom**
   - Usa el **Shadow DOM nativo** del navegador.
   - Crea un árbol DOM encapsulado para ese componente.
   - **Efecto:**
     - Los estilos del componente quedan totalmente aislados.
     - Estilos globales no entran al Shadow DOM, a menos que se incluyan explícitamente.

#### Modo usado en esta actividad

En el componente `TarjetaProducto` se utiliza **`ViewEncapsulation.Emulated`** (el valor por defecto en Angular), lo cual permite:

- Mantener los estilos de la tarjeta aislados en su componente.
- Controlar el diseño sólo desde el archivo `tarjeta-producto.css`.

---

### 0.2 Patrones de Diseño Web Adaptativo

En el diseño web moderno existen dos enfoques importantes:

#### 1. Responsive Web Design (RWD)

- Un **mismo HTML** se adapta a distintos tamaños de pantalla usando principalmente **CSS**:
  - `media queries`,
  - maquetación flexible con `flex` o `grid`,
  - imágenes fluidas (`max-width: 100%`, porcentajes, etc.).
- El diseño es **fluido**, cambia de forma continua cuando se modifica el ancho de la ventana.
- Se suele trabajar con el enfoque **móvil primero**: se define primero el estilo para pantallas pequeñas y luego se van agregando `media queries` para tablet y escritorio.

#### 2. Adaptive Web Design (AWD)

- Se diseñan **varias versiones** o layouts diferentes, cada una pensada para un rango de tamaño específico (ejemplo: móvil, tablet, desktop).
- Puede implicar cargar estructuras diferentes o plantillas distintas dependiendo del dispositivo.
- El cambio entre diseños suele ser más “por saltos” (versiones discretas), no tan fluido como en RWD.

#### Diferencias clave

- **RWD:** Un único diseño fluido que se adapta con CSS a cualquier tamaño.
- **AWD:** Conjunto de layouts específicos para diferentes dispositivos o rangos.

#### En esta actividad

- Se sigue principalmente el enfoque de **Responsive Web Design (RWD)**, aplicando la estrategia **móvil primero**.
- Sin embargo, al definir comportamientos específicos para **móvil (< 600px)**, **tableta (600px–992px)** y **escritorio (> 992px)**, también se incorporan ideas de diseño adaptativo (AWD) al tener layouts pensados para rangos concretos.

---

### 0.3 Imágenes responsivas con `srcset` y `picture` (opcional/bonus)

Además del uso de CSS, HTML ofrece mecanismos avanzados para optimizar imágenes en diferentes tamaños de pantalla y densidades de píxeles.

#### Uso de `srcset` y `sizes` en `<img>`

Permiten indicar varias versiones de una misma imagen para que el **navegador elija automáticamente** la más adecuada.

Ejemplo general:

```html
<img
  src="assets/producto-800.jpg"
  srcset="
    assets/producto-400.jpg 400w,
    assets/producto-800.jpg 800w,
    assets/producto-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, (max-width: 992px) 50vw, 33vw"
  alt="Nombre del producto"
/>
```

- `srcset`: lista de archivos de imagen con su ancho correspondiente.
- `sizes`: describe el ancho que ocupará la imagen en distintos rangos de pantalla.
- El navegador elige la imagen más adecuada según el espacio que ocupará y la resolución del dispositivo.

#### Uso de `<picture>`

Permite ofrecer **diferentes formatos de imagen** (ej. WebP, AVIF, JPG) y diferentes resoluciones:

```html
<picture>
  <source srcset="assets/producto-1200.webp" type="image/webp" />
  <source srcset="assets/producto-1200.jpg" type="image/jpeg" />
  <img src="assets/producto-1200.jpg" alt="Producto" />
</picture>
```

- El navegador escoge el primer formato que soporta.
- Mejora el rendimiento cargando formatos más ligeros en navegadores modernos.

En esta actividad, aunque la implementación base se realiza con un simple `<img>` y estilos CSS (por requerimiento mínimo), es posible extenderla con `srcset` o `<picture>` para una optimización superior.

---

## 1. Desarrollo del componente TarjetaProducto

### 1.1 Creación del proyecto y del componente

Vamos a crear un proyecto Angular desde cero.

1. **Creación del proyecto Angular** (desde la terminal):

   ```bash
   ng new actividad-tarjeta-producto
   ```

2. **Arrancar el servidor de desarrollo**:

   ```bash
   cd actividad-tarjeta-producto
   ng serve -o
   ```

3. **Creación del componente de tarjeta de producto**:

   ```bash
   ng g c tarjeta-producto
   ```

   Esto genera los archivos:

   - `src/app/tarjeta-producto/tarjeta-producto.ts`
   - `src/app/tarjeta-producto/tarjeta-producto.html`
   - `src/app/tarjeta-producto/tarjeta-producto.css`

### 1.2 Lógica del componente (`tarjeta-producto.ts`)

En el archivo TypeScript del componente se definieron las propiedades básicas del producto y se configuró la encapsulación de estilos:

- `titulo`: título del producto.
- `descripcion`: descripción corta.
- `precio`: precio numérico.
- `imagenUrl`: ruta de la imagen del producto.
- `encapsulation: ViewEncapsulation.Emulated`: para encapsular los estilos en el componente.

Además, el componente se definió como **standalone**, por lo que se importa directamente en el componente raíz.

### 1.3 Plantilla HTML (`tarjeta-producto.html`)

La estructura sigue lo solicitado:

- Contenedor principal de la tarjeta.
- Sección de imagen.
- Sección de contenido (título, descripción, precio).
- Botón "Añadir al carrito".

Distribución básica:

- En móvil: la tarjeta se muestra en **columna vertical** (imagen arriba, texto en medio, botón abajo).
- En pantallas más grandes: se cambia el layout a **lado a lado** mediante `media queries`.

### 1.4 Estilos por componente (`tarjeta-producto.css`)

Todos los estilos de la tarjeta (layout, colores, tipografías) están definidos **exclusivamente** en el archivo de estilos del componente, cumpliendo con el requisito de estilos por componente.

#### Estilos base (móvil primero)

- Se parte de un diseño pensado para pantallas pequeñas (menos de 600px):
  - `.tarjeta-producto` usa `display: flex` con `flex-direction: column`.
  - Ancho de la tarjeta: `width: 90%` del contenedor.
  - Margen automático para centrarla.
  - Sombra y bordes redondeados para simular una tarjeta.
- La imagen ocupa el 100% de ancho del contenedor y una altura fija, con `object-fit: cover` para que **no se distorsione** al cambiar de tamaño.

#### Media Query – Vista Tableta (600px a 992px)

Dentro del mismo archivo se declaró:

```css
@media (min-width: 600px) and (max-width: 992px) {
  .tarjeta-producto {
    flex-direction: row;
    align-items: stretch;
    max-width: 720px;
  }

  .tarjeta-producto__imagen {
    flex: 0 0 40%;
  }

  .tarjeta-producto__contenido {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
```

Cumpliendo así con el requisito:

- La tarjeta pasa a ser un **layout lado a lado**.
- La imagen ocupa aproximadamente **40%** del ancho.
- El contenido de texto y botón ocupa el **60%** restante.

#### Media Query – Vista Escritorio (> 992px)

También dentro del CSS del componente:

```css
@media (min-width: 992px) {
  .tarjeta-producto {
    flex-direction: row;
    max-width: 1000px;
  }

  .tarjeta-producto__imagen {
    flex: 0 0 40%;
  }

  .tarjeta-producto__contenido {
    flex: 1;
  }
}
```

Para escritorio:

- Se mantiene el layout con imagen y contenido **lado a lado**.
- Se incrementa el ancho máximo de la tarjeta para aprovechar mejor el espacio de pantallas grandes.

### 1.5 Imágenes responsivas

Para cumplir el requisito de que la imagen:

1. **No se distorsione al cambiar el tamaño**.
2. **Ocupe el 100% del espacio asignado** dentro de la tarjeta.

Se utilizó en CSS:

- `width: 100%;`
- `height` fija/ajustada según contexto.
- `object-fit: cover;` en la imagen.

Esto hace que la imagen se recorte si es necesario, pero siempre manteniendo su proporción original, sin verse “aplastada” o deformada.

---

## 2. Integración del componente en la aplicación

El componente `TarjetaProducto` se importó en el componente raíz `App` (que también es standalone en Angular 17+):

- En `app.ts` se importa `TarjetaProducto` y se agrega a la propiedad `imports` de `@Component`.

---

## 3. Conclusiones

- **Sobre View Encapsulation**: permite organizar mejor los estilos, evitando conflictos entre componentes y manteniendo el diseño de la tarjeta aislado del resto de la aplicación.
- **Sobre RWD y AWD**: el enfoque móvil primero con `media queries` es una forma práctica de aplicar Responsive Web Design, pero también se relaciona con Adaptive Web Design al definir comportamientos específicos en determinados rangos de tamaño.
- **Sobre imágenes responsivas**: combinar `object-fit: cover` con anchos flexibles permite que las imágenes se adapten bien al layout sin deformarse. Herramientas como `srcset` y `<picture>` ofrecen todavía más control y optimización para distintos dispositivos.

