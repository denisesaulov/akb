# akb

```docker-compose up -d```

```npm i```

```npm run dev```

## user registration
**POST /user/register**
*Request Body:*
```json
{
  "login": "string",
  "password": "string"
}
```

## user login
**POST /user/login**
*Request Body:*
```json
{
  "login": "string",
  "password": "string"
}
```

## article create
**POST /article**
*Request Body:*
```
{
  "title": "string",
  "content": "string",
  "privacy": "PUBLIC"|"PRIVATE",
  "tags": "string[]"
}
```

## articles get
**GET /article**
*Request Query Params:*
```...?tag=tag1&tag=tag2```

## article get by id
**GET /article/[articleId]**
*Request Params:*
```articleId```

## article delete by id
**DELETE /article/[articleId]**
*Request Params:*
```articleId```

## article update by id
**PATCH /article/[articleId]**
*Request Body:*
```
{
  "title"?: "string",
  "content"?: "string",
  "privacy"?: "PUBLIC"|"PRIVATE",
  "tags"?: "string[]"
}
```