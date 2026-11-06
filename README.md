# Calculadora

Calculadora hecha con HTML, CSS y JavaScript, con dos cajas: una para lo que se escribe y otra para el resultado.

## Cómo funciona
Al pulsar los botones de números, estos aparecen en la caja de entrada. Los operadores son suma, resta, multiplicación y división (+, −, ×, ÷), y el resultado aparece en la caja de resultado al pulsar `=`.

El botón `C` vacía las dos cajas y reinicia la calculadora; el botón `⌫` borra el último dígito. Se pueden usar números decimales. Si se intenta dividir entre cero, la caja de resultado muestra el mensaje "No se puede dividir entre cero".

El teclado también funciona: números, punto y operadores, `Enter` para `=`, `Backspace` para `⌫` y `Esc` para `C`.
## Tecnologías usadas
HTML, CSS y JavaScript, sin librerías. Fuente Inter incluida en el propio proyecto y publicado con GitHub Pages.

## Decisiones técnicas
- Sin `eval()`: cada operación tiene su función (`add`, `subtract`, `multiply`, `divide`) y la función `operate` elige cuál usar según el operador.
- El número que se está escribiendo se guarda como texto (`currentNumber`) y se convierte con `Number()` solo al calcular. Así es fácil construir números de varias cifras y decimales.
- El programa recuerda su estado con variables: `firstNumber`, `operatorResult`, `currentNumber` y `endOperate`, que indica si ya se pulsó `=`.
- Los operadores se encadenan de izquierda a derecha: al pulsar un operador, se calcula antes la operación pendiente. No hay prioridad de operadores, así que `2 + 3 × 4` da 20.
- Cada botón guarda su valor en `data-value`, separado del símbolo que se ve (`*` y `×`). El teclado reutiliza esa información: busca el botón de la tecla pulsada y hace clic en él.
- La función `fitText` reduce el tamaño de la letra para que los números largos quepan en la pantalla, que tiene altura fija.
- Diseño con CSS Grid, botones circulares y fuente Inter incluida en el proyecto, sin peticiones a servicios externos.

## Versión publicada
[Abrir la calculadora](https://josetarrada-png.github.io/calculator/)