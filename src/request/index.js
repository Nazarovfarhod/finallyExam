import { baseUrl } from "../myUtils";

//register
async function register(data) {
  const res = await fetch(baseUrl + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 400) {
    throw new Error("400");
  } else {
    throw new Error("Nimadir xato bo'ldi!");
  }
}

//refreshToken
async function refreshToken() {
  const refresh_token = JSON.parse(localStorage.getItem("user")).refresh_token;

  const res = await fetch(baseUrl + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token }),
  });

  if (res.status === 200) {
    return await res.json();
  } else if (res.status == 403) {
    throw new Error("403");
  } else {
    throw new Error("Nimadir xato bo'ldi");
  }
}

//Collect Article
function collectItem(array, item) {
  const result = [];
  for (const obj of array) {
    result.push(obj[item]);
  }
  return Array.from(new Set(result));
}

//login
async function login(data) {
  const res = await fetch(baseUrl + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 400) {
    throw new Error("Login yoki Parol xato kiritildi");
  } else {
    throw new Error("Nimadir xato bo'ldi!");
  }
}

//get data
async function getData({ skip, category }) {
  let query = new URLSearchParams(`skip=${skip}&limit=${10}`);
  if (category) {
    query.append("category", category);
  }

  const res = await fetch(baseUrl + "/articles?" + query, {
    method: "GET",
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    throw new Error("Nimadir xato bo'ldi!");
  }
}

//get all articles
async function getAllData() {
  const res = await fetch(baseUrl + "/articles", {
    method: "GET",
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    throw new Error("Nimadir xato bo'ldi!");
  }
}

//get category
async function getCategory() {
  const res = await fetch(baseUrl + "/articles", {
    method: "GET",
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    throw new Error("Nimadir xato bo'ldi!");
  }
}

//Upload Img
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(baseUrl + "/upload", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    return await res.text();
  } else {
    throw new Error(`Nimadir xato ketti!`);
  }
}

//edit Profile
async function editProfile(data, id) {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  const res = await fetch(baseUrl + `/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200) {
    return await res.json();
  } else if (res.status === 403) {
    throw new Error(`${res.status}`);
  } else {
    throw new Error("Nimadir xato boldi");
  }
}

//Add Article
async function addArticle(article) {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  const res = await fetch(baseUrl + "/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  if (res.status === 200) {
    return "Maqolangiz muvaffaqiyatli qo'shildi!";
  } else if (res.status === 403) {
    throw new Error(`${res.status}`);
  } else {
    throw new Error("Nimadir xato bo'ldi.");
  }
}

//Delete Article
async function deleteArticle(id) {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  const res = await fetch(baseUrl + "/articles/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return "Maqolangiz muvaffaqiyatli o'chirildi";
  } else if (res.status === 403) {
    throw new Error(`${res.status}`);
  } else {
    throw new Error("Nimadir xato bo'ldi.");
  }
}

//Update Article
async function updateArticle(article) {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  const res = await fetch(baseUrl + `/article/${article.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  if (res.status === 200) {
    return "Maqolangiz muvaffaqiyatli o'zgardi.";
  } else if (res.status === 403) {
    throw new Error(`${res.status}`);
  } else {
    throw new Error("Nimadir xato bo'ldi");
  }
}

export {
  register,
  getData,
  login,
  uploadFile,
  addArticle,
  updateArticle,
  deleteArticle,
  getCategory,
  collectItem,
  refreshToken,
  getAllData,
  editProfile,
};
