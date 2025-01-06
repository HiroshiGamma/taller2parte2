## Funcionamiento

Este proyecto es una aplicación web desarrollada con Angular. Permite a los usuarios interactuar con una interfaz dinámica y receptiva para utilizar una tienda de productos de vestimenta. La aplicación se compone de varios componentes que se comunican entre sí para proporcionar una experiencia de usuario fluida.

## Requerimientos

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 14.x o superior)
- [Angular CLI](https://angular.io/cli) (versión 19.0.6 o superior)
- Un navegador web moderno (como Google Chrome, Mozilla Firefox, Microsoft Edge, etc.)

### Estilos

Este proyecto utiliza [Tailwind CSS](https://tailwindcss.com/) para la gestión de estilos y [Flowbite](https://flowbite.com/) para componentes UI adicionales. Tailwind CSS es un framework de CSS utilitario que permite un diseño rápido y eficiente. Flowbite proporciona componentes preconstruidos que se integran perfectamente con Tailwind CSS.

### API

Este proyecto se integra con una API externa para obtener y enviar datos. La API utilizada es http://localhost:5042/api, que proporciona endpoints para el uso de la tienda.

## Instalación

Para instalar las dependencias del proyecto, sigue estos pasos:

1. Clona el repositorio en tu máquina local:
```bash
git clone https://github.com/HiroshiGamma/taller2parte2.git
```

2. Navega al directorio del proyecto en caso de no estarlo:
```bash
cd frontend 
```

3. Instala las dependencias del proyecto:
```bash
npm install
```

4. Inicia el servidor de desarrollo:
```bash
ng serve
```

5. Abre tu navegador y navega a `http://localhost:4200/` para ver la aplicación en funcionamiento.

## Ejecución de pruebas unitarias

Para ejecutar pruebas unitarias con el ejecutor de pruebas [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Ejecución de pruebas de extremo a extremo

Para pruebas de extremo a extremo (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no incluye un marco de pruebas de extremo a extremo por defecto. Puedes elegir uno que se adapte a tus necesidades.

## Recursos Adicionales

Para más información sobre el uso de Angular CLI, incluyendo referencias detalladas de comandos, visita la página [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
