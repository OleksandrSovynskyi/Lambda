const axios = require("axios");

axios
  .post("http://localhost:3000/auth/login", {
    userName: "Gerald",
    password: "Rivija",
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

  axios
  .post("http://localhost:3000/auth/refresh", {
    "userName": "vfr",
    "password": "fdfgf"
  },
  {headers: {Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjVjMDc4YTg0ZjBjNThmN2QxMDAxZCIsInVzZXJOYW1lIjoiR2VyYWxkIiwiaWF0IjoxNjU2MDc4NTgxLCJleHAiOjE2ODc2MzYxODF9.8mwY2UItrsqcd1xDtwgzYuKpudKb8dMYpg54cn4giC4'}})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios
    .get(`http://localhost:3000/auth/me2`,
    {headers: {Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjVjMDc4YTg0ZjBjNThmN2QxMDAxZCIsInVzZXJOYW1lIjoiR2VyYWxkIiwiaWF0IjoxNjU2MDc4NDgxLCJleHAiOjE2NTYwNzg1MjF9.gRgk0CBXqXg-Q6nBeKjogVJu7Tv0sBu3HxyHUTEhWTM'}})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
