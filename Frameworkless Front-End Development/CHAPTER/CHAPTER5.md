## 5. HTTP Requests

---

### REST: Representational State Transfer

- way to design and develop web services.
- The main abstraction of any REST API is **its resources.**
- REAT API Cheat Sheet
  - Read all users' data - `GET` - https://api.example.com/users/
  - Read data of user with ID "1" - `GET` - https://api.example.com/users/1
  - Create a new user - `POST` - https://api.example.com/users/
  - Replace user data with ID "1" - `POST` - https://api.example.com/users/1
  - Update user data with ID "1" - `PATCH` - https://api.example.com/users/1
  - Delete the user with ID "1" - `DELETE` - https://api.example.com/users/1

<br />

### XMLHttpRequest

- flow of an HTTP request with `XMLHttpRequest`

1. Create a `new XMLHttpRequest` object.

```javascript
new XMLHttpRequest();
```

2. Initialize the request to a specific URL

```javascript
xhr.open(method, url);
```

3. Configure the request.

```javascript
setting headers, timeout, etc.
```

4. Send the request

```javascript
xhr.send(JSON.stringify(body));
```

5. Wait for the end of the request.

- If the request ends successfully, the `onload` callback is invoked.
- If the request ends with an error, the `onerror` callback is invoked.
- If the request times out, the `ontimeout` callback is invoked.
