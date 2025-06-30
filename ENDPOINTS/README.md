# CARPETA PARA ENDPOINTS CON CONEXIÓN A MONGO

El proyecto es realizado por medio de API's, por lo que los endpoint se encuentran aquí.

Para poder ejecutar el servicio de Endpoints seguir los siguientes pasos.

1. Crear entorno virtual de python.

    ```bash
    python3 -m venv venv
    ```

2. Activar el entorno virtual.

    ```bash
    source venv/bin/activate
    ```

3. Instalar fastapi y uvicorn dentro del entorno virtual.

    ```bash
    pip install fastapi uvicorn
    ```

4. Ejecutar el servicio.

    ```bash
    uvicorn app:app --reload
    ```