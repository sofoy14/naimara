# Setup Contentful CMS

## 1. Crear cuenta en Contentful
1. Ve a https://www.contentful.com/sign-up/
2. Crea una cuenta gratis
3. Crea un nuevo Space (espacio)

## 2. Crear Content Types

### Content Type: Hero Content
Entry ID: `heroContent`

Fields:
- badge (Text, short)
- title (Text, short)
- titleHighlight (Text, short)
- description (Text, long)
- ctaPrimary (Text, short) - Texto del botón principal
- ctaSecondary (Text, short) - Texto del botón secundario

### Content Type: Contact Info
Entry ID: `contactInfo`

Fields:
- whatsappNumber (Text, short) - Ejemplo: 573166998154
- phoneNumber (Text, short) - Ejemplo: 316-699-8154
- email (Text, short)
- address (Text, long)

## 3. Crear Entries
Crea una entry de cada tipo y llena la información.

## 4. Obtener API Keys
1. Ve a Settings → API Keys
2. Crea un nuevo Content Delivery API key
3. Copia:
   - Space ID
   - Content Delivery API - access token

## 5. Configurar en Vercel
Agrega estas variables de entorno en Vercel:

```
VITE_CONTENTFUL_SPACE_ID=tu-space-id
VITE_CONTENTFUL_ACCESS_TOKEN=tu-access-token
```

## 6. Listo!
El cliente puede editar el contenido desde Contentful y los cambios aparecerán en la web automáticamente.
