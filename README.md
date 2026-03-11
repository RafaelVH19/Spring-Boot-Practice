# Practica Spring Boot React

[![Watch the video](https://raw.githubusercontent.com/RafaelVH19/Spring-Boot-Practice/main/springboot-react/A01741660_Thumbnail.png)](https://raw.githubusercontent.com/RafaelVH19/Spring-Boot-Practice/main/springboot-react/A01741660_Persistencia.mp4)
(Presiona en la imagen para descargar el video!)

## Una imagen NO es un contenedor

A comparacion de los contenedores que son aplicaciones o servicios que crean un ambiente virtual y se pueden ejecutar en cualquier lugar,
las imagenes son inmutables; no se pueden hacer cambios internos y almacenan los detalles de configuracion que son usados por los contenedores para ejecutarse.

## El volumen es importante

Si un contenedor sin volumen es eliminado, todos los datos que se hayan gestionado dentro del contendor no persisten y son inmediatamente eliminados.
Los cambios manuales y hasta cosas como el cache tambien se pierden.

## Los archivos .jar

Los archivos .jar usualmente guardan bibliotecas de archivos para leer al ejecutarse. Por eso, no es recomendable agregar archivos como el JSON que se utiliza en el
proyecto, ya que se esta modificando constantemente dentro del ccontenedor.

## Los beneficios de las imagenes ligeras

Una imagen va a ser corrida multiples veces para crear los diiferentes contenedores que modificaran los datos, es por eso que se debe mantener lo mas ligera
posible: Para poder desplegar la aplicacion mas rapido y evitar las perdidas monetarias que vienen con un proceso de desarrollo lento.

## Mapeo de puertos

Si uno busca administrar la conexion a la red de los contenedores, el mapeo de puertos permite redirigir el trafico desde el host del contenedor hasta el host destino.
Asi, aplicaciones externas a la que se corre dentro del contenedor pueden comunicarse con el mismo y acceder a sus servicios.
