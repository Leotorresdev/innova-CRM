import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//explicame este codigo
// Este código define una función llamada `cn` que toma un número variable de argumentos de tipo `ClassValue` 
// (que es un tipo proporcionado por la biblioteca `clsx`). La función utiliza `clsx` para combinar los
//  argumentos en una sola cadena de clases CSS, y luego utiliza `twMerge` para fusionar las clases 
// resultantes, eliminando cualquier clase duplicada o conflictiva. Esto es útil para manejar 
// dinámicamente las clases CSS en componentes de React, especialmente cuando se utilizan bibliotecas 
// como Tailwind CSS que pueden generar muchas clases.
